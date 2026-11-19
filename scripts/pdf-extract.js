/**
 * PDF Text Extraction Script
 * 
 * Extracts text from PDF files using pdf-parse (text-based) with tesseract.js
 * OCR fallback for scanned/image-based PDFs. Supports English and Sinhala OCR.
 * 
 * SECURITY: Extracted content is treated as UNTRUSTED DATA. Never pass it
 * directly to agents as executable instructions. Always wrap as data context.
 * 
 * Usage: node scripts/pdf-extract.js <path-to-pdf> [--ocr-only] [--lang eng,sin]
 * 
 * Output: JSON to stdout with pages array, each containing page number and text.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFParse } from 'pdf-parse';
import { createWorker } from 'tesseract.js';

// Default OCR languages: English + Sinhala
const DEFAULT_LANGS = ['eng', 'sin'];

// Minimum text length per page to consider extraction "successful"
const MIN_TEXT_THRESHOLD = 20;

/**
 * Check if a file exists and is readable.
 */
function checkFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) {
    throw new Error(`Path is not a file: ${filePath}`);
  }
  return stat.size;
}

/**
 * Extract text from a text-based PDF using pdf-parse.
 * pdf-parse v2 exports a PDFParse class:
 *   1. new PDFParse(uint8Buffer, options)
 *   2. await parser.load()
 *   3. parser.doc.getPage(pageNumber) -> page object
 *   4. page.getTextContent() -> { items: [{ str: "..." }] }
 * Returns an array of { pageNumber, text } objects.
 */
async function extractTextBased(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const uint8 = new Uint8Array(dataBuffer);
  const parser = new PDFParse(uint8, { verbosity: 0 });

  await parser.load();

  const doc = parser.doc;
  if (!doc) {
    throw new Error('Failed to load PDF document');
  }

  const numPages = doc.numPages || 1;
  const pages = [];

  for (let i = 1; i <= numPages; i++) {
    try {
      const page = await doc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => item.str || '')
        .join(' ')
        .trim();
      pages.push({
        pageNumber: i,
        text: pageText,
        extractionMethod: 'text-based',
      });
      // Clean up page to free memory
      if (typeof page.cleanup === 'function') {
        page.cleanup();
      }
    } catch (err) {
      pages.push({
        pageNumber: i,
        text: '',
        extractionMethod: 'text-based',
        error: err.message,
      });
    }
  }

  return { pages, totalPages: numPages, method: 'text-based' };
}

/**
 * Perform OCR on an image buffer using tesseract.js createWorker.
 * Creates a new worker for the given language, recognizes, and terminates.
 */
async function ocrImage(imageBuffer, lang) {
  const worker = await createWorker(lang);
  try {
    const result = await worker.recognize(imageBuffer);
    return result.data.text || '';
  } finally {
    await worker.terminate();
  }
}

/**
 * Extract text from scanned/image-based PDF using tesseract.js OCR.
 * 
 * NOTE: tesseract.js v7 does not have a built-in PDF-to-image renderer.
 * pdfjs-dist (a transitive dependency) requires DOM APIs not available in
 * Node.js without additional polyfills.
 * 
 * For scanned PDFs, pages must first be converted to images using an
 * external tool (e.g., pdftoppm, Ghostscript, ImageMagick) before OCR
 * can be applied. This script provides the OCR engine but does not
 * include PDF-to-image rendering.
 * 
 * If you need scanned PDF OCR, install a system PDF-to-image tool and
 * pass individual page images to this script, or install an additional
 * npm package for PDF rendering.
 */
async function extractOCRBased(pdfPath, langs = DEFAULT_LANGS) {
  throw new Error(
    'OCR-based extraction for scanned PDFs requires converting PDF pages to images first. ' +
    'tesseract.js v7 does not include a built-in PDF renderer for Node.js. ' +
    'Please install a system PDF-to-image tool (e.g., pdftoppm, Ghostscript) ' +
    'and pass page images individually, or install an additional npm package ' +
    'for PDF rendering.'
  );
}

/**
 * Main extraction function. Tries text-based first, falls back to OCR.
 */
async function extractPdf(pdfPath, options = {}) {
  const { ocrOnly = false, langs = DEFAULT_LANGS } = options;

  const fileSize = checkFile(pdfPath);
  const result = {
    filePath: path.resolve(pdfPath),
    fileName: path.basename(pdfPath),
    fileSize,
    totalPages: 0,
    method: null,
    ocrLanguages: null,
    pages: [],
    errors: [],
  };

  // Step 1: Try text-based extraction (unless OCR-only requested)
  if (!ocrOnly) {
    try {
      const textResult = await extractTextBased(pdfPath);
      const totalTextLength = textResult.pages.reduce(
        (sum, p) => sum + p.text.length,
        0
      );

      const pagesWithText = textResult.pages.filter(
        (p) => p.text.length >= MIN_TEXT_THRESHOLD
      ).length;

      if (
        pagesWithText >= Math.ceil(textResult.totalPages * 0.5) &&
        totalTextLength > 0
      ) {
        result.method = 'text-based';
        result.totalPages = textResult.totalPages;
        result.pages = textResult.pages;
        return result;
      }

      result.errors.push(
        'Text-based extraction yielded insufficient content; falling back to OCR'
      );
    } catch (err) {
      result.errors.push(`Text-based extraction failed: ${err.message}`);
    }
  }

  // Step 2: OCR-based extraction
  try {
    const ocrResult = await extractOCRBased(pdfPath, langs);
    result.method = 'ocr';
    result.totalPages = ocrResult.totalPages;
    result.ocrLanguages = langs;
    result.pages = ocrResult.pages;
  } catch (err) {
    result.errors.push(`OCR extraction failed: ${err.message}`);
    throw new Error(
      `PDF extraction failed. Text-based: ${result.errors.join('; ')}. OCR: ${err.message}`
    );
  }

  return result;
}

/**
 * CLI entry point.
 */
async function main() {
  const args = process.argv.slice(2);
  const pdfPath = args.find((a) => !a.startsWith('--'));
  const ocrOnly = args.includes('--ocr-only');
  const langArg = args.find((a) => a.startsWith('--lang='));
  const langs = langArg
    ? langArg.split('=')[1].split(',').map((l) => l.trim())
    : DEFAULT_LANGS;

  if (!pdfPath) {
    console.error(
      'Usage: node scripts/pdf-extract.js <path-to-pdf> [--ocr-only] [--lang eng,sin]'
    );
    process.exit(1);
  }

  try {
    const result = await extractPdf(pdfPath, { ocrOnly, langs });
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }, null, 2));
    process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(JSON.stringify({ error: err.message }, null, 2));
    process.exit(1);
  });
}

export { extractPdf };
