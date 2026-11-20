// Dependency-free static invariant checks for the Reel 001 redesign.
// Usage: node scripts/verify-reel001.mjs [tokens|primitives|chrome|content|creative|records|contact|fixes|all]
// Unknown group names run every known group so partial implementations are caught.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const projectRoot = new URL('../', import.meta.url);
const read = (relativePath) => readFileSync(new URL(relativePath, projectRoot), 'utf8');

const LIGHT_TOKENS = {
  background: '#EDE7DA',
  surface: '#F4F1E9',
  'surface-strong': '#E2DCCA',
  'text-primary': '#14130F',
  'text-secondary': '#3A3B37',
  'text-muted': '#585B56',
  border: 'rgba(20,20,15,.5)',
  primary: '#0A655C',
  'primary-hover': '#0B5E56',
  'primary-soft': 'rgba(10,101,92,.12)',
  'primary-contrast': '#F4F1E9',
  'inverse-text': '#F4F1E9',
  brass: '#76591B',
  rec: '#B44134',
};

const DARK_TOKENS = {
  background: '#050609',
  surface: '#0B0D10',
  'surface-strong': '#161B21',
  'text-primary': '#EDE7DA',
  'text-secondary': 'rgba(237,231,218,.66)',
  'text-muted': '#97A29E',
  border: 'rgba(99,200,188,.34)',
  primary: '#63C8BC',
  'primary-hover': '#8FE3DA',
  'primary-soft': 'rgba(99,200,188,.12)',
  'primary-contrast': '#0B0D10',
  'inverse-text': '#0B0D10',
  brass: '#C9A24B',
  rec: '#E98378',
};

const normalizeCss = (source) => source.replace(/\s*([:;{}])\s*/g, '$1').replace(/\s+/g, ' ');

function cssBlock(source, selectorSource, label) {
  const match = source.match(new RegExp(`${selectorSource}\\s*\\{([^}]*)\\}`, 'm'));
  assert.ok(match, `${label}: block not found`);
  return normalizeCss(match[1]);
}

function assertTokens(block, expected, label) {
  for (const [name, value] of Object.entries(expected)) {
    assert.ok(
      block.includes(`--color-${name}:${value}`),
      `${label}: missing or wrong --color-${name} (expected ${value})`,
    );
  }
}

let failedChecks = 0;

function check(label, fn) {
  try {
    fn();
    console.log(`  ok   ${label}`);
  } catch (error) {
    failedChecks += 1;
    console.error(`  FAIL ${label} — ${error.message}`);
  }
}

function checkTokens() {
  const css = read('src/index.css');
  const html = read('index.html');
  const tailwind = read('tailwind.config.js');

  check('src/index.css :root light palette (spec §2)', () => {
    assertTokens(cssBlock(css, ':root', ':root'), LIGHT_TOKENS, ':root');
  });

  check('src/index.css .dark palette (spec §2)', () => {
    assertTokens(cssBlock(css, '\\.dark', '.dark'), DARK_TOKENS, '.dark');
  });

  check('src/index.css HUD primitives and rec-blink', () => {
    for (const selector of ['.hud', '.hud--teal', '.hud--brass', '.rec']) {
      assert.match(css, new RegExp(`${selector.replace('.', '\\.')}\\s*\\{`), `missing ${selector}`);
    }
    assert.match(css, /@keyframes\s+rec-blink\s*\{/, 'missing @keyframes rec-blink');
  });

  check('src/index.css typography (IBM Plex Sans body / Anton headings)', () => {
    assert.match(cssBlock(css, 'body', 'body'), /IBM Plex Sans/, 'body font is not IBM Plex Sans');
    assert.match(cssBlock(css, 'h1[^{}]*', 'headings'), /Anton/, 'headings font is not Anton');
  });

  check('src/index.css prefers-reduced-motion rule preserved', () => {
    assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/, 'reduced-motion block missing');
  });

  check('index.html Google Fonts (Anton / IBM Plex Sans / IBM Plex Mono)', () => {
    const fontLinks = [...html.matchAll(/<link\b[^>]*href="([^"]*fonts\.googleapis\.com[^"]*)"[^>]*>/gi)]
      .map((match) => decodeURIComponent(match[1]).replace(/\+/g, ' '));
    assert.ok(fontLinks.length > 0, 'no Google Fonts stylesheet link');
    for (const family of ['Anton', 'IBM Plex Sans', 'IBM Plex Mono']) {
      assert.ok(fontLinks.some((href) => href.includes(family)), `font not loaded: ${family}`);
    }
    assert.match(html, /fonts\.gstatic\.com/, 'missing fonts.gstatic.com preconnect');
  });

  check('index.html theme-color is #050609', () => {
    const meta = html.match(/<meta\b[^>]*name=["']theme-color["'][^>]*>/i);
    assert.ok(meta, 'theme-color meta missing');
    assert.match(meta[0], /content=["']#050609["']/, 'theme-color is not #050609');
  });

  check('tailwind.config.js fontFamily display/body/mono', () => {
    const block = tailwind.match(/fontFamily\s*:\s*\{([\s\S]*?)\}/)?.[1] ?? '';
    assert.match(block, /display\s*:\s*\[[^\]]*['"]Anton['"]/, 'fontFamily.display missing Anton');
    assert.match(block, /body\s*:\s*\[[^\]]*['"]IBM Plex Sans['"]/, 'fontFamily.body missing IBM Plex Sans');
    assert.match(block, /mono\s*:\s*\[[^\]]*['"]IBM Plex Mono['"]/, 'fontFamily.mono missing IBM Plex Mono');
  });

  check('tailwind.config.js brass/rec colors map to new tokens', () => {
    const block = tailwind.match(/colors\s*:\s*\{([\s\S]*?)\}/)?.[1] ?? '';
    assert.match(block, /brass\s*:\s*['"]var\(--color-brass\)['"]/, 'colors.brass missing');
    assert.match(block, /rec\s*:\s*['"]var\(--color-rec\)['"]/, 'colors.rec missing');
  });
}

const CLOCK_PATH = 'src/components/cinematic/clock.js';
const SCENE_FRAME_PATH = 'src/components/cinematic/SceneFrame.jsx';
const TIMECODE_PATH = 'src/components/cinematic/Timecode.jsx';

function checkPrimitives() {
  check('cinematic primitive files exist', () => {
    for (const path of [CLOCK_PATH, SCENE_FRAME_PATH, TIMECODE_PATH]) {
      assert.ok(existsSync(new URL(path, projectRoot)), `missing ${path}`);
    }
  });

  check('clock.js uses a subscription-backed shared clock', () => {
    const source = read(CLOCK_PATH);
    for (const token of ['useSyncExternalStore', 'prefers-reduced-motion', 'setInterval', 'clearInterval']) {
      assert.match(source, new RegExp(token.replace(/[-]/g, '\\-')), `missing ${token}`);
    }
  });

  check('SceneFrame.jsx renders the film frame structure and HUD labels', () => {
    const source = read(SCENE_FRAME_PATH);
    for (const token of ['frame__body', 'corner--tl', 'corner--tr', 'corner--bl', 'corner--br', 'SCENE', 'REEL 001 / FRAME']) {
      assert.ok(source.includes(token), `missing ${token}`);
    }
  });

  check('Timecode.jsx consumes the shared clock', () => {
    const source = read(TIMECODE_PATH);
    assert.match(source, /import\s*\{[^}]*useCinematicClock[^}]*\}\s*from\s*['"]\.\/clock\.js['"]/, 'useCinematicClock import missing');
  });

  check('src/index.css frame system selectors', () => {
    const css = read('src/index.css');
    const selectors = [
      '.scene',
      '.frame',
      '.letterbox',
      '.letterbox--bottom',
      '.frame__body',
      '.frame__inner',
      '.corner',
      '.corner--tl',
      '.corner--tr',
      '.corner--bl',
      '.corner--br',
      '.reg',
      '.reg--tr',
      '.reg--bl',
    ];
    for (const selector of selectors) {
      const escaped = selector.replace(/\./g, '\\.');
      assert.match(css, new RegExp(`${escaped}\\s*\\{`), `missing ${selector} rule`);
    }
  });
}

const HERO_PATH = 'src/components/Hero.jsx';
const NAVBAR_PATH = 'src/components/Navbar.jsx';
const THEME_TOGGLE_PATH = 'src/components/ThemeToggle.jsx';
const APP_PATH = 'src/App.jsx';

const CHROME_NAV_HREFS = [
  '#hero',
  '#about',
  '#featured-projects',
  '#case-studies',
  '#creative-work',
  '#skills',
  '#education',
  '#experience',
  '#contact',
];

function checkChrome() {
  check('Hero.jsx keeps View Projects and drops Get in Touch', () => {
    const source = read(HERO_PATH);
    assert.match(source, /View Projects/, 'View Projects CTA missing');
    assert.doesNotMatch(source, /Get in Touch/, 'legacy Get in Touch CTA still present');
  });

  check('Hero.jsx renders a blinking REC indicator via the rec class', () => {
    const source = read(HERO_PATH);
    assert.match(source, /className=["'][^"']*\brec\b[^"']*["'][^>]*>\s*REC\s*</, 'rec-class REC indicator missing');
  });

  check('Hero.jsx wraps content in SceneFrame scene 1 / OPENING', () => {
    const source = read(HERO_PATH);
    assert.match(source, /<SceneFrame\b/, 'SceneFrame wrapper missing');
    assert.match(source, /scene=\{1\}/, 'scene={1} missing');
    assert.match(source, /label="OPENING"/, 'label="OPENING" missing');
    assert.match(source, /id="hero"/, 'forwarded id="hero" missing');
  });

  check('Navbar.jsx keeps all nine NAV_LINKS hrefs and Main navigation label', () => {
    const source = read(NAVBAR_PATH);
    for (const href of CHROME_NAV_HREFS) {
      assert.ok(source.includes(href), `missing nav href ${href}`);
    }
    assert.match(source, /aria-label="Main navigation"/, 'Main navigation label missing');
  });

  check('ThemeToggle.jsx updates theme-color for both palettes', () => {
    const source = read(THEME_TOGGLE_PATH);
    assert.match(source, /theme-color/, 'theme-color meta not updated');
    assert.ok(source.includes('#050609'), 'dark theme-color #050609 missing');
    assert.ok(source.includes('#EDE7DA'), 'light theme-color #EDE7DA missing');
  });

  check('App.jsx keeps the main landmark and skip link', () => {
    const source = read(APP_PATH);
    assert.match(source, /<main id="main-content">/, 'main landmark missing');
    assert.match(source, /className="skip-link"/, 'skip link missing');
    assert.match(source, /href="#main-content"/, 'skip link target missing');
  });
}

const ABOUT_PATH = 'src/components/AboutSection.jsx';
const FEATURED_PATH = 'src/components/FeaturedProjects.jsx';
const BENTO_PATH = 'src/components/BentoGrid.jsx';
const PROJECT_CARD_PATH = 'src/components/ProjectCard.jsx';

// Captured verbatim from the pre-redesign source — content authority for Task 4.
const DISCIPLINE_TITLES = [
  'Web Application Development',
  'Frontend Development',
  'Backend Development',
  'UI/UX Design & Multimedia Production',
];

const PROJECT_TITLES = [
  'US Client House Auction Website',
  'Sales Performance Evaluation System (SPES)',
  'Cricket Tournament Management System (CTMS)',
  'PrettyPick LK — Inventory Management System',
];

function checkContent() {
  check('AboutSection.jsx keeps all four discipline titles verbatim', () => {
    const source = read(ABOUT_PATH);
    for (const title of DISCIPLINE_TITLES) {
      assert.ok(source.includes(`title: '${title}'`), `missing discipline title: ${title}`);
    }
  });

  check('AboutSection.jsx is SceneFrame scene 2 / ABOUT with forwarded id', () => {
    const source = read(ABOUT_PATH);
    assert.match(source, /<SceneFrame\b/, 'SceneFrame wrapper missing');
    assert.match(source, /scene=\{2\}/, 'scene={2} missing');
    assert.match(source, /label="ABOUT"/, 'label="ABOUT" missing');
    assert.match(source, /id="about"/, 'forwarded id="about" missing');
    assert.doesNotMatch(source, /<section\b/, 'duplicate wrapping <section> found');
  });

  check('AboutSection.jsx discipline cards use CSS-only .fcard__media placeholders', () => {
    const source = read(ABOUT_PATH);
    assert.match(source, /fcard__media/, '.fcard__media hook missing');
    assert.doesNotMatch(source, /<img\b/i, 'unexpected <img> in discipline media');
    assert.doesNotMatch(source, /https?:\/\//, 'unexpected external URL in AboutSection');
  });

  check('FeaturedProjects.jsx keeps all four project titles verbatim', () => {
    const source = read(FEATURED_PATH);
    for (const title of PROJECT_TITLES) {
      assert.ok(source.includes(title), `missing project title: ${title}`);
    }
  });

  check('FeaturedProjects.jsx keeps both approved footnotes', () => {
    const source = read(FEATURED_PATH);
    assert.ok(source.includes('not publicly released'), 'auction footnote missing');
    assert.ok(source.includes('hardening in progress'), 'PrettyPick footnote missing');
  });

  check('FeaturedProjects.jsx keeps the approved PrettyPick card copy', () => {
    const source = read(FEATURED_PATH);
    const titleIndex = source.indexOf("title: 'PrettyPick LK — Inventory Management System'");
    assert.ok(titleIndex >= 0, 'PrettyPick must be in the main PROJECTS collection');
    const card = source.slice(titleIndex, source.indexOf('\n  },', titleIndex));
    assert.ok(
      card.includes(
        'A practical inventory management system developed to support product management and day-to-day operations of a small clothing resale business.',
      ),
      'approved PrettyPick description missing',
    );
    assert.match(card, /'React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Supabase'/, 'approved technology list missing');
    assert.match(card, /link:\s*null/, 'PrettyPick must not publish a demo link');
    assert.doesNotMatch(card, /https?:\/\//, 'PrettyPick must not publish a URL');
    for (const feature of [
      'Product management',
      'Inventory tracking and stock adjustments',
      'Sales management',
      'Dashboard and reporting',
      'CSV export',
      'Consignment management',
      'Product image uploads',
    ]) {
      assert.ok(card.includes(`'${feature}'`), `missing PrettyPick feature: ${feature}`);
    }
  });

  check('FeaturedProjects.jsx renders exactly four cards in one collection, PrettyPick fourth', () => {
    const source = read(FEATURED_PATH);
    const projects = source.slice(source.indexOf('const PROJECTS = ['), source.indexOf('\n];'));
    const titles = [...projects.matchAll(/title: '([^']+)'/g)].map((match) => match[1]);
    assert.equal(titles.length, 4, `expected exactly 4 project objects, found ${titles.length}`);
    assert.deepEqual(titles, PROJECT_TITLES, 'project order must be the original three followed by PrettyPick');
    assert.equal((source.match(/<BentoGrid\b/g) ?? []).length, 1, 'Featured Projects must use a single BentoGrid');
    assert.match(source, /\{PROJECTS\.map\(/, 'all four cards must come from the one PROJECTS map');
    assert.ok(!source.includes('SUPPORTING_PROJECT'), 'separate SUPPORTING_PROJECT still present');
    assert.ok(
      !source.includes('Supporting work, kept separate from the three selected projects above.'),
      'separate Supporting work text still present',
    );
    assert.ok(!source.includes('Personal project — supporting work'), 'separate Supporting grid still present');
    assert.ok(!source.includes('>Supporting<'), 'standalone Supporting badge still present');
    assert.ok(
      source.includes("statusLabel: 'Personal Project / Working Prototype'"),
      'in-card PrettyPick status label missing',
    );
  });

  check('all four Featured Projects cards share one standard presentation', () => {
    const source = read(FEATURED_PATH);
    const projects = source.slice(source.indexOf('const PROJECTS = ['), source.indexOf('\n];'));
    assert.doesNotMatch(projects, /\bfeatured\s*:/, 'no project may use a special featured variant');
    const card = read(PROJECT_CARD_PATH);
    assert.doesNotMatch(card, /\bfeatured\b/i, 'ProjectCard must not keep a featured-only branch');
    assert.match(card, /const spanClasses = 'md:col-span-1 lg:col-span-2';/, 'all cards must use the same span');
    assert.match(
      card,
      /<h3 className="mt-6 font-display leading-1\.3 text-h4 text-text-primary">/,
      'all card titles must use text-h4',
    );
    assert.match(card, /mt-6 flex min-h-11 flex-wrap items-center gap-4/, 'footer row needs a consistent 44px minimum height');
    assert.match(card, /features\?\.length > 0/, 'PrettyPick feature list must be preserved');
    assert.match(card, /\{statusLabel && \(/, 'PrettyPick status label must be preserved');
  });

  check('ProjectCard.jsx renders the optional in-card status label with existing badge tokens', () => {
    const source = read(PROJECT_CARD_PATH);
    assert.match(source, /\bstatusLabel\b/, 'statusLabel prop missing');
    assert.match(source, /\{statusLabel && \(/, 'conditional status label render missing');
    assert.match(source, /bg-primary-soft[\s\S]*?text-primary[\s\S]*?\{statusLabel\}/, 'status label must reuse existing badge tokens');
    assert.match(source, /flex flex-wrap items-center justify-between gap-4/, 'header must wrap the long status label on narrow cards');
  });

  check('FeaturedProjects.jsx keeps the auction project live-link-free', () => {
    const source = read(FEATURED_PATH);
    const auction = source.match(/\{\s*title:\s*'US Client House Auction Website'[\s\S]*?\n\s*\}/)?.[0];
    assert.ok(auction, 'auction project object not found');
    assert.match(auction, /link:\s*null/, 'auction link must remain null');
    assert.doesNotMatch(auction, /https?:\/\//, 'auction project must not contain an http link');
  });

  check('FeaturedProjects.jsx is SceneFrame scene 3 / FEATURES with forwarded id and tag', () => {
    const source = read(FEATURED_PATH);
    assert.match(source, /<SceneFrame\b/, 'SceneFrame wrapper missing');
    assert.match(source, /scene=\{3\}/, 'scene={3} missing');
    assert.match(source, /label="FEATURES"/, 'label="FEATURES" missing');
    assert.match(source, /tag="FEATURES \/ 04"/, 'tag="FEATURES / 04" missing');
    assert.match(source, /id="featured-projects"/, 'forwarded id="featured-projects" missing');
    assert.doesNotMatch(source, /<section\b/, 'duplicate wrapping <section> found');
  });

  check('BentoGrid.jsx keeps the 4 / 2 / 1 grid contract', () => {
    const source = read(BENTO_PATH);
    const hasFourTracks =
      /\blg:grid-cols-4\b/.test(source) || /\blg:grid-cols-\[[^\]]*1fr[^\]]*1fr[^\]]*1fr[^\]]*1fr[^\]]*\]/.test(source);
    assert.ok(hasFourTracks, 'lg 4-track grid class missing');
    assert.match(source, /\bmd:grid-cols-2\b/, 'md:grid-cols-2 missing');
    assert.match(source, /\bgrid-cols-1\b/, 'base grid-cols-1 missing');
  });

  check('ProjectCard.jsx uses CSS-only .fcard__media feature media', () => {
    const source = read(PROJECT_CARD_PATH);
    assert.match(source, /fcard__media/, '.fcard__media hook missing');
    assert.doesNotMatch(source, /<img\b/i, 'unexpected <img> in feature media');
    assert.doesNotMatch(source, /url\(/i, 'unexpected CSS url() in feature media');
  });

  check('ProjectCard.jsx renders an optional key-features list with existing tokens', () => {
    const source = read(PROJECT_CARD_PATH);
    assert.match(source, /features\?\.length > 0/, 'conditional features guard missing');
    assert.match(source, /aria-label="Key features"/, 'features list aria-label missing');
    assert.match(source, /bg-primary/, 'existing primary token not used for feature bullets');
  });
}

const CASE_STUDIES_PATH = 'src/components/CaseStudies.jsx';
const CREATIVE_CARD_PATH = 'src/components/CreativeWorkCard.jsx';
const LIGHTBOX_PATH = 'src/components/ImageLightbox.jsx';

// Captured from CaseStudies.jsx. The duplicate /assets/video/music-video.mp4 was
// intentionally replaced by the MMW-23-B1-05.MOV transcode in MULTIMEDIA-PROJECTS-001,
// and three unique real-frame posters were added. All other entries are unchanged.
const CASE_MEDIA_SOURCES = [
  '/assets/images/diagrams/spes-eer.png',
  '/assets/images/diagrams/spes-class.png',
  '/assets/images/diagrams/spes-flow.png',
  '/assets/images/diagrams/spes-module.png',
  '/assets/images/diagrams/ctms-flowchart.png',
  '/assets/video/MMW-23-B1-05.mp4',
  '/assets/video/MMW-23-B1-05-MOV.mp4',
  '/assets/video/MMW-23-B1-05-BTS.mp4',
  '/assets/video/posters/poster-care-film.jpg',
  '/assets/video/posters/poster-music-video.jpg',
  '/assets/video/posters/poster-behind-scenes.jpg',
  '/assets/images/creative/krita-child-ball.png',
  '/assets/images/creative/krita-walkcycle.png',
  '/assets/images/creative/krita-rose.png',
  '/assets/images/creative/krita-staircase.png',
  '/assets/images/creative/photoshop-MMW-23-B1-05.png',
  '/assets/images/creative/2d3d-animate.mp4',
  '/assets/images/creative/2d3d-cv.mp4',
  '/assets/images/uiux/gates-before.png',
  '/assets/images/uiux/gates-after-1.png',
  '/assets/images/uiux/gates-after-2.png',
  '/assets/images/uiux/gates-after-3.png',
];

// Minimal JSX tag tokenizer: respects quoted attributes and {expressions}, so a
// '>' inside an arrow function or a string cannot terminate a tag early.
function jsxTagTokens(source) {
  const tokens = [];
  let index = 0;

  while (index < source.length) {
    const next = source[index + 1] ?? '';
    const isOpeningTag = /[A-Za-z]/.test(next);
    const isClosingTag = next === '/' && /[A-Za-z]/.test(source[index + 2] ?? '');
    if (source[index] !== '<' || (!isOpeningTag && !isClosingTag)) {
      index += 1;
      continue;
    }

    let cursor = index + 1;
    let quote = null;
    let braces = 0;
    while (cursor < source.length) {
      const char = source[cursor];
      if (quote) {
        if (char === quote) quote = null;
      } else if (char === '"' || char === "'" || char === '`') {
        quote = char;
      } else if (char === '{') {
        braces += 1;
      } else if (char === '}') {
        braces -= 1;
      } else if (char === '>' && braces === 0) {
        break;
      }
      cursor += 1;
    }
    if (cursor >= source.length) break;

    const raw = source.slice(index, cursor + 1);
    const name = raw.match(/^<\/?([A-Za-z][\w.]*)/)?.[1];
    if (name) {
      tokens.push({
        name,
        closing: raw.startsWith('</'),
        selfClosing: /\/\s*>$/.test(raw),
        raw,
        start: index,
        end: cursor + 1,
      });
    }
    index = cursor + 1;
  }

  return tokens;
}

function assertCreativeWorkNesting(source) {
  const tokens = jsxTagTokens(source);
  const caseTag = tokens.find((token) => !token.closing && token.raw.includes('id="case-studies"'));
  const creativeTag = tokens.find((token) => !token.closing && token.raw.includes('id="creative-work"'));

  assert.ok(caseTag, 'opening element with id="case-studies" not found');
  assert.ok(creativeTag, 'opening element with id="creative-work" not found');
  assert.ok(creativeTag.start > caseTag.start, 'creative-work must start inside #case-studies');

  const stack = [caseTag];
  let creativeClose = null;
  let caseClose = null;

  for (const token of tokens) {
    if (token.start < caseTag.end) continue;

    if (token.closing) {
      let popIndex = -1;
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].name === token.name) {
          popIndex = i;
          break;
        }
      }
      assert.ok(popIndex >= 0, `unbalanced closing tag </${token.name}>`);
      const opened = stack[popIndex];
      stack.splice(popIndex, 1);
      if (opened === creativeTag) creativeClose = token;
      if (opened === caseTag) {
        caseClose = token;
        break;
      }
    } else if (!token.selfClosing) {
      stack.push(token);
    }
  }

  assert.ok(caseClose, 'closing tag for #case-studies not found');
  assert.ok(creativeClose, 'closing tag for #creative-work not found');
  assert.ok(creativeClose.end <= caseClose.start, 'creative-work must close before #case-studies closes');
}

function checkCreative() {
  check('CaseStudies.jsx keeps canonical IDs unique and creative-work nested inside #case-studies', () => {
    const source = read(CASE_STUDIES_PATH);
    assert.equal((source.match(/id="case-studies"/g) ?? []).length, 1, 'id="case-studies" must appear exactly once');
    assert.equal((source.match(/id="creative-work"/g) ?? []).length, 1, 'id="creative-work" must appear exactly once');
    assertCreativeWorkNesting(source);
  });

  check('CaseStudies.jsx is SceneFrame scene 4 / RECORDS with forwarded id', () => {
    const source = read(CASE_STUDIES_PATH);
    assert.match(source, /<SceneFrame\b/, 'SceneFrame wrapper missing');
    assert.match(source, /scene=\{4\}/, 'scene={4} missing');
    assert.match(source, /label="RECORDS"/, 'label="RECORDS" missing');
    assert.match(source, /id="case-studies"/, 'forwarded id="case-studies" missing');
    assert.doesNotMatch(source, /<section\b/, 'duplicate wrapping <section> found');
  });

  check('CaseStudies.jsx labels the nested reel SUPPORTING REEL / NOT PRIMARY WORK', () => {
    const source = read(CASE_STUDIES_PATH);
    assert.ok(source.includes('SUPPORTING REEL / NOT PRIMARY WORK'), 'supporting-reel label missing');
  });

  check('CaseStudies.jsx keeps every captured public/assets media src verbatim', () => {
    const source = read(CASE_STUDIES_PATH);
    for (const mediaSrc of CASE_MEDIA_SOURCES) {
      assert.ok(source.includes(`'${mediaSrc}'`), `missing media src: ${mediaSrc}`);
    }
  });

  check('CaseStudies.jsx uses three distinct video sources and three distinct posters', () => {
    const source = read(CASE_STUDIES_PATH);
    const block = source.slice(source.indexOf('const VIDEO_PRODUCTION'), source.indexOf('const CREATIVE_GROUPS'));
    const videoSrcs = [...block.matchAll(/src: '([^']+\.mp4)'/g)].map((match) => match[1]);
    const posters = [...block.matchAll(/poster: '([^']+\.jpg)'/g)].map((match) => match[1]);
    assert.equal(videoSrcs.length, 3, `expected 3 video sources, found ${videoSrcs.length}`);
    assert.equal(posters.length, 3, `expected 3 posters, found ${posters.length}`);
    assert.equal(new Set(videoSrcs).size, 3, 'video sources must all be distinct');
    assert.equal(new Set(posters).size, 3, 'posters must all be distinct');
    assert.ok(!block.includes('music-video.mp4'), 'the old duplicate video source is still present');
  });

  check('VideoCard.jsx forwards an optional poster to native <video> controls', () => {
    const source = read('src/components/VideoCard.jsx');
    assert.match(source, /\bsrc,\s*poster\b/, 'poster prop missing from VideoCard props');
    assert.match(source, /poster=\{poster\}/, 'poster is not passed to the <video> element');
    assert.match(source, /controls\b/, 'native controls missing');
    assert.match(source, /preload="metadata"/, 'preload="metadata" missing');
    assert.match(source, /playsInline\b/, 'playsInline missing');
    assert.doesNotMatch(source, /autoPlay\b/, 'autoplay must remain absent');
  });

  check('CaseStudies.jsx keeps the 4 / 2 / 1 grid contract', () => {
    const source = read(CASE_STUDIES_PATH);
    const hasFourTracks =
      /\blg:grid-cols-4\b/.test(source) || /\blg:grid-cols-\[[^\]]*1fr[^\]]*1fr[^\]]*1fr[^\]]*1fr[^\]]*\]/.test(source);
    assert.ok(hasFourTracks, 'lg 4-track grid class missing');
    assert.match(source, /\bmd:grid-cols-2\b/, 'md:grid-cols-2 missing');
    assert.match(source, /\bgrid-cols-1\b/, 'base grid-cols-1 missing');
  });

  check('media lists, Expand buttons and onOpen wiring remain intact', () => {
    const source = read(CASE_STUDIES_PATH);
    assert.ok((source.match(/role="list"/g) ?? []).length >= 2, 'role="list" media lists missing');
    assert.match(source, /onMediaOpen=\{setActiveItem\}/, 'case-study diagram onMediaOpen wiring missing');
    assert.match(source, /onOpen=\{setActiveItem\}/, 'creative media onOpen wiring missing');
    assert.match(source, /<ImageLightbox\b[^>]*item=\{activeItem\}[^>]*onClose=/, 'lightbox wiring missing');

    const cardSource = read(CREATIVE_CARD_PATH);
    assert.match(cardSource, /aria-label=\{`Expand \$\{item\.title\}`\}/, 'Expand button aria-label missing');
    assert.match(cardSource, />\s*Expand\s*</, 'Expand button text missing');
    assert.match(cardSource, /onClick=\{\(\) => onOpen\(item\)\}/, 'Expand button onOpen handler missing');
  });

  check('ImageLightbox.jsx keeps Escape / Tab / focus-restore keyboard handling', () => {
    const source = read(LIGHTBOX_PATH);
    for (const token of [
      "event.key === 'Escape'",
      "event.key !== 'Tab'",
      'document.addEventListener(\'keydown\', onKeyDown)',
      'document.removeEventListener(\'keydown\', onKeyDown)',
      'restoreFocusRef.current = document.activeElement',
      'closeButtonRef.current?.focus()',
    ]) {
      assert.ok(source.includes(token), `missing lightbox keyboard token: ${token}`);
    }
  });

  check('CaseStudyCard.jsx uses one standard presentation with optional labels', () => {
    const source = read('src/components/CaseStudyCard.jsx');
    assert.match(source, /contributionLabel = 'Recorded contributions'/, 'default contribution label missing');
    assert.match(source, /aria-label=\{contributionLabel\}/, 'contributions list does not use the label prop');
    assert.match(source, /statusLabel \|\| 'FILED \/ 04'/, 'status label fallback missing');
    assert.doesNotMatch(source, /\bfeatured\b/i, 'CaseStudyCard must not keep a featured-only branch');
    assert.match(source, /const spanClasses = 'md:col-span-1 lg:col-span-2';/, 'all cards must use the same span');
    assert.match(source, /text-h4/, 'all card titles must use text-h4');
    assert.match(source, /mt-6 flex min-h-11 flex-wrap items-center gap-4/, 'footer row needs a consistent 44px minimum height');
    assert.match(source, /\{footnote && \(/, 'optional footnote render missing');
    assert.match(source, /text-caption text-text-muted/, 'footnote token style missing');
  });

  check('CaseStudies.jsx renders four records with PrettyPick fourth', () => {
    const source = read(CASE_STUDIES_PATH);
    const block = source.slice(source.indexOf('const CASE_STUDIES = ['), source.indexOf('\n];'));
    assert.doesNotMatch(block, /\bfeatured\s*:/, 'no case study may use a special featured variant');
    assertAllStrings(block, [
      'US Client House Auction Website',
      'Angular frontend development from Figma designs',
      'Angular', 'Node.js', 'Figma',
    ], 'auction record content must be preserved');
    const titles = [...block.matchAll(/title: '([^']+)'/g)].map((m) => m[1]);
    assert.deepEqual(titles, [
      'US Client House Auction Website',
      'Sales Performance Evaluation System',
      'Cricket Tournament Management System',
      'PrettyPick LK — Inventory Management System',
    ], 'expected three original records followed by PrettyPick');
    assertAllStrings(block, [
      'A practical inventory management system developed to support product management and day-to-day operations of a small clothing resale business.',
      ...["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase"],
      'Product management', 'Inventory tracking and stock adjustments', 'Sales management',
      'Dashboard and reporting', 'CSV export', 'Consignment management', 'Product image uploads',
      "contributionLabel: 'Features shown in the UI'",
      "statusLabel: 'Personal Project / Working Prototype'",
      'Authentication and database security hardening in progress.',
      'link: null',
    ], 'PrettyPick case study copy');
    assert.doesNotMatch(block, /case-studies\/prettypick/, 'no screenshot assets may be referenced');
    assert.match(source, /tag="RECORDS \/ 04"/, 'scene tag must count four records');
    assert.doesNotMatch(source, /same three projects/, 'stale three-project intro copy remains');
    assert.match(source, /the four projects featured above/, 'four-project intro copy missing');
    assertAllStrings(block, [
      'Angular frontend development from Figma designs',
      'Full-stack development with role-based login and access control',
      'Match simulation engine and ball-by-ball event generation',
      'https://github.com/dmync/spes', 'https://github.com/dmync/CTMS',
    ], 'original three records must be preserved');
  });
}

const SKILLS_PATH = 'src/components/SkillsSection.jsx';
const EDUCATION_PATH = 'src/components/EducationSection.jsx';
const EXPERIENCE_PATH = 'src/components/ExperienceSection.jsx';

// Captured verbatim from the pre-redesign source — SOURCE WINS for Task 6
// (developer decision overrides docs/). Do not edit these to match a restyle.
const SKILL_GROUP_TITLES = [
  'Frontend',
  'Backend',
  'Database',
  'Tools & Practices',
  'Multimedia & Creative',
];

const SKILL_ITEMS = [
  'HTML5', 'CSS3', 'JavaScript', 'Angular', 'Bootstrap 5', 'jQuery', 'Chart.js', 'Font Awesome', 'Tailwind CSS',
  'Responsive Design',
  'Node.js', 'PHP', 'REST APIs', 'Backend Routing', 'AJAX', 'JSON',
  'MySQL', 'Microsoft SQL Server',
  'Git', 'GitHub', 'Visual Studio', 'Postman', 'Figma design handoff', 'WCAG 2.2 AA accessibility',
  'Adobe Photoshop', 'Krita', '3ds Max',
];

const EXPERIENCE_ROLES = ['Web Development Trainee', 'Industrial Exposure Trainee'];
const EXPERIENCE_PERIODS = ['10 Jan 2022 – 10 Jan 2023', '1 Jan 2025 – 1 Apr 2025'];
const EXPERIENCE_DESCRIPTIONS = [
  'Developed web applications and frontend interfaces using HTML, CSS and JavaScript. Worked on backend development with Node.js and MySQL, including application customization and maintenance. Used Git for version control and supported production activities.',
  'University industrial exposure at Inventive Mechanics.',
];

const EDUCATION_TITLES = [
  'B.Tech in Multimedia and Web Technology',
  'NVQ Level 5 in Information Technology',
  'AAT Foundation Level',
  'A. Rathnayake Central College',
];
const EDUCATION_ORGANIZATIONS = [
  'University of Vocational Technology',
  'Vocational Training Authority',
  'AAT Sri Lanka',
  'G.C.E. O/L — 2016 · G.C.E. A/L — 2019',
];
const EDUCATION_PERIODS = ['2024 – Present', '2020 – 2022', '2017', '2016 / 2019'];
const EDUCATION_DETAILS = ['Undergraduate', 'Diploma (NVQ Level 5)', 'Foundation', 'Secondary education'];

const CERTIFICATION_TITLES = [
  'AWS Academy Graduate – Cloud Foundations',
  'AWS Academy Graduate – Cloud Architecting',
];
const CERTIFICATION_PERIODS = ['August 2026', 'September 2026'];

function assertAllStrings(source, strings, label) {
  for (const value of strings) {
    assert.ok(source.includes(value), `${label}: missing verbatim string: ${value}`);
  }
}

function assertSceneWrapper(source, { scene, label, id }) {
  assert.match(source, /<SceneFrame\b/, 'SceneFrame wrapper missing');
  assert.ok(source.includes(`scene={${scene}}`), `scene={${scene}} missing`);
  assert.ok(source.includes(`label="${label}"`), `label="${label}" missing`);
  assert.ok(source.includes(`id="${id}"`), `forwarded id="${id}" missing`);
  assert.doesNotMatch(source, /<section\b/, 'duplicate wrapping <section> found');
  assert.equal((source.match(new RegExp(`id="${id}"`, 'g')) ?? []).length, 1, `id="${id}" must appear exactly once`);
}

function checkRecords() {
  check('SkillsSection.jsx keeps every SKILL_GROUPS title and tag verbatim', () => {
    const source = read(SKILLS_PATH);
    assertAllStrings(source, [...SKILL_GROUP_TITLES, ...SKILL_ITEMS], 'SkillsSection');
  });

  check('SkillsSection.jsx is SceneFrame scene 5 / CAPABILITIES with forwarded id="skills"', () => {
    assertSceneWrapper(read(SKILLS_PATH), { scene: 5, label: 'CAPABILITIES', id: 'skills' });
  });

  check('SkillsSection.jsx keeps the 4 / 2 / 1 skill-tag grid contract', () => {
    const source = read(SKILLS_PATH);
    assert.match(source, /\bgrid-cols-1\b/, 'base grid-cols-1 missing');
    assert.match(source, /\bsm:grid-cols-2\b/, 'sm:grid-cols-2 missing');
    assert.match(source, /\blg:grid-cols-4\b/, 'lg:grid-cols-4 missing');
  });

  check('EducationSection.jsx keeps all education and certification content verbatim', () => {
    const source = read(EDUCATION_PATH);
    assertAllStrings(
      source,
      [
        ...EDUCATION_TITLES,
        ...EDUCATION_ORGANIZATIONS,
        ...EDUCATION_PERIODS,
        ...EDUCATION_DETAILS,
        ...CERTIFICATION_TITLES,
        'AWS Academy',
        ...CERTIFICATION_PERIODS,
      ],
      'EducationSection',
    );
  });

  check('EducationSection.jsx is SceneFrame scene 6 / BACKGROUND with forwarded id="education"', () => {
    assertSceneWrapper(read(EDUCATION_PATH), { scene: 6, label: 'BACKGROUND', id: 'education' });
  });

  check('EducationSection.jsx ledger rows use mono numbers', () => {
    assert.match(read(EDUCATION_PATH), /\bfont-mono\b/, 'font-mono ledger number missing');
  });

  check('ExperienceSection.jsx keeps every role, period and description verbatim', () => {
    const source = read(EXPERIENCE_PATH);
    assertAllStrings(source, [...EXPERIENCE_ROLES, ...EXPERIENCE_PERIODS, ...EXPERIENCE_DESCRIPTIONS], 'ExperienceSection');
  });

  check('ExperienceSection.jsx is SceneFrame scene 7 / EXPERIENCE with forwarded id="experience"', () => {
    assertSceneWrapper(read(EXPERIENCE_PATH), { scene: 7, label: 'EXPERIENCE', id: 'experience' });
  });

  check('ExperienceSection.jsx ledger rows use mono numbers', () => {
    assert.match(read(EXPERIENCE_PATH), /\bfont-mono\b/, 'font-mono ledger number missing');
  });
}

const CONTACT_PATH = 'src/components/ContactSection.jsx';
const FOOTER_PATH = 'src/components/Footer.jsx';
const GMAIL_EMAIL = 'yashodhaariyarathne587@gmail.com';
const UOV_EMAIL = 'mmw23b105@uovt.ac.lk';
// Assembled so the forbidden tokens never appear literally in verification source.
const PHONE_DIGITS = ['0783', '249206'].join('');
const TEL_SCHEME = ['te', 'l:'].join('');
const ALLOWED_CTA_LABELS = ['View Projects', 'Send Message'];
const FORBIDDEN_CTA_LABELS = ['Call Me', 'Get in Touch', 'Download CV'];
const CONTACT_BODY_COPY =
  'I’m open to new opportunities. Feel free to reach out for collaboration, internship placements, or software development roles.';

function siteSourceFiles() {
  const files = [];
  const walk = (relativeDirectory) => {
    for (const entry of readdirSync(new URL(relativeDirectory, projectRoot), { withFileTypes: true })) {
      const relativePath = `${relativeDirectory.endsWith('/') ? relativeDirectory : `${relativeDirectory}/`}${entry.name}`;
      if (entry.isDirectory()) walk(relativePath);
      else if (/\.(jsx?|html)$/.test(entry.name)) files.push(relativePath);
    }
  };
  walk('src/');
  files.push('index.html');
  return files;
}

function checkContact() {
  const contact = read(CONTACT_PATH);

  check('ContactSection.jsx shows both emails and no phone or tel link', () => {
    assert.ok(contact.includes(GMAIL_EMAIL), `Gmail address missing: ${GMAIL_EMAIL}`);
    assert.ok(contact.includes(UOV_EMAIL), `UOV address missing: ${UOV_EMAIL}`);
    assert.ok(!contact.includes(PHONE_DIGITS), 'phone number must never appear in ContactSection.jsx');
    assert.ok(!contact.toLowerCase().includes(TEL_SCHEME), 'tel: link must never appear in ContactSection.jsx');
  });

  check('ContactSection.jsx is SceneFrame scene 8 / CONTACT with one forwarded id="contact"', () => {
    assertSceneWrapper(contact, { scene: 8, label: 'CONTACT', id: 'contact' });
  });

  check('ContactSection.jsx keeps the original body copy verbatim', () => {
    assert.ok(
      contact.replace(/\s+/g, ' ').includes(CONTACT_BODY_COPY),
      'contact body copy changed — keep it verbatim',
    );
  });

  check('ContactSection.jsx lists both emails, location, GitHub and LinkedIn without a phone entry', () => {
    for (const token of [
      `value: '${GMAIL_EMAIL}'`,
      `href: 'mailto:${GMAIL_EMAIL}'`,
      `value: '${UOV_EMAIL}'`,
      `href: 'mailto:${UOV_EMAIL}'`,
      "value: 'Kandy, Sri Lanka'",
      "href: 'https://github.com/dmync'",
      "href: 'https://www.linkedin.com/in/yashodha-ariyarathne-413335222/'",
    ]) {
      assert.ok(contact.includes(token), `missing contact detail: ${token}`);
    }
    assert.doesNotMatch(contact, /label:\s*'Phone'/, 'phone entry still present in CONTACT_DETAILS');
  });

  check('Send Message is the single CTA and its anchor targets the Gmail mailto', () => {
    assert.equal((contact.match(/Send Message/g) ?? []).length, 1, 'expected exactly one Send Message CTA');
    const sendAnchor = [...contact.matchAll(/<a\b([\s\S]*?)>([\s\S]*?)<\/a>/g)].find(
      ([, , content]) => content.trim() === 'Send Message',
    );
    assert.ok(sendAnchor, 'Send Message is not the plain text of an <a> element');
    assert.ok(
      sendAnchor[1].includes(`href="mailto:${GMAIL_EMAIL}"`),
      `Send Message must link to mailto:${GMAIL_EMAIL}`,
    );
  });

  check('phone number and tel: links are absent from all site source', () => {
    for (const path of siteSourceFiles()) {
      const source = read(path);
      assert.ok(!source.includes(PHONE_DIGITS), `${path}: forbidden phone number found`);
      assert.ok(!source.toLowerCase().includes(TEL_SCHEME), `${path}: forbidden tel: link found`);
    }
  });

  check('only View Projects / Send Message are used as CTA labels site-wide', () => {
    const sources = siteSourceFiles().map((path) => ({ path, text: read(path) }));
    for (const label of FORBIDDEN_CTA_LABELS) {
      for (const { path, text } of sources) {
        assert.ok(
          !text.toLowerCase().includes(label.toLowerCase()),
          `${path}: forbidden CTA label "${label}" found`,
        );
      }
    }
    const allSource = sources.map(({ text }) => text).join('\n');
    for (const label of ALLOWED_CTA_LABELS) {
      assert.ok(allSource.includes(label), `allowed CTA label missing site-wide: ${label}`);
    }
  });

  check('Footer.jsx keeps the cinematic colophon links and copyright verbatim', () => {
    const footer = read(FOOTER_PATH);
    assert.ok(footer.includes('© 2026 Yashodha Ariyarathne. All rights reserved.'), 'copyright changed');
    assert.ok(footer.includes('href="https://github.com/dmync"'), 'GitHub link changed');
    assert.ok(
      footer.includes('href="https://www.linkedin.com/in/yashodha-ariyarathne-413335222/"'),
      'LinkedIn link changed',
    );
    assert.ok(footer.includes('GitHub') && footer.includes('LinkedIn'), 'footer link labels changed');
    assert.match(footer, /<footer\b/, 'footer landmark missing');
    assert.match(footer, /\b(hud|font-mono)\b/, 'cinematic colophon hook missing');
  });
}

const BADGE_TOKEN_PATHS = [
  'src/components/AboutSection.jsx',
  'src/components/SkillsSection.jsx',
  'src/components/ProjectCard.jsx',
  'src/components/Navbar.jsx',
];

// Extract one top-level function body so the notification assertion cannot be
// satisfied by a listener loop that lives somewhere else in the module.
function functionBody(source, name) {
  const start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `${name}(): declaration not found`);
  const open = source.indexOf('{', start);
  assert.ok(open >= 0, `${name}(): body not found`);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    else if (source[index] === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(open + 1, index);
    }
  }
  assert.fail(`${name}(): unbalanced body`);
}

function checkFixes() {
  check('clock.js handleMotionPreferenceChange() notifies subscribers after the stop/start branch', () => {
    const body = functionBody(read(CLOCK_PATH), 'handleMotionPreferenceChange');

    // The stop/start branch must still exist (do not "fix" by deleting it).
    const stopAt = body.indexOf('stopClock()');
    const startAt = body.indexOf('startClock()');
    assert.ok(stopAt >= 0, 'stopClock() branch missing');
    assert.ok(startAt >= 0, 'startClock() branch missing');

    // Non-vacuous: for..of over listeners whose loop variable is actually called.
    const notification = body.match(/for\s*\(\s*const\s+(\w+)\s+of\s+listeners\s*\)\s*\{\s*\1\(\)\s*;?\s*\}/);
    assert.ok(
      notification,
      'handleMotionPreferenceChange() has no for (const x of listeners) { x(); } notification',
    );
    assert.ok(
      notification.index > Math.max(stopAt, startAt),
      'listener notification must come after the stop/start branch',
    );
  });

  check('clock.js keeps single-interval / reduced-motion / subscription invariants', () => {
    const source = read(CLOCK_PATH);
    assert.equal((source.match(/\bsetInterval\s*\(/g) ?? []).length, 1, 'expected exactly one setInterval call site');
    assert.equal((source.match(/\bclearInterval\s*\(/g) ?? []).length, 1, 'expected exactly one clearInterval call site');
    assert.match(source, /listeners\.size === 1[\s\S]*?addEventListener\('change',\s*handleMotionPreferenceChange\)/, 'first-subscriber media listener registration missing');
    assert.match(source, /listeners\.size === 0[\s\S]*?removeEventListener\('change',\s*handleMotionPreferenceChange\)/, 'last-subscriber media listener cleanup missing');
    assert.match(source, /function getSnapshot\(\)\s*\{[\s\S]*?prefersReducedMotion\(\)\s*\?\s*INITIAL_SNAPSHOT\s*:\s*snapshot/, 'reduced-motion snapshot freeze missing');
    assert.match(source, /function getServerSnapshot\(\)\s*\{\s*return INITIAL_SNAPSHOT;\s*\}/, 'getServerSnapshot changed');
  });

  check('badge text uses text-primary on bg-primary-soft in the four named components', () => {
    for (const path of BADGE_TOKEN_PATHS) {
      const softLines = read(path).split(/\r?\n/).filter((line) => line.includes('bg-primary-soft'));
      assert.ok(softLines.length > 0, `${path}: no bg-primary-soft call site found`);
      for (const line of softLines) {
        assert.ok(
          !line.includes('text-primary-contrast'),
          `${path}: text-primary-contrast still paired with bg-primary-soft: ${line.trim()}`,
        );
      }
      assert.ok(
        softLines.some((line) => /\btext-primary(?![\w-])/.test(line)),
        `${path}: no text-primary paired with bg-primary-soft`,
      );
    }
  });
}

const groups = {
  tokens: checkTokens,
  primitives: checkPrimitives,
  chrome: checkChrome,
  content: checkContent,
  creative: checkCreative,
  records: checkRecords,
  contact: checkContact,
  fixes: checkFixes,
};

const requested = process.argv[2] || 'all';
const selected = requested === 'all' || !Object.hasOwn(groups, requested) ? Object.keys(groups) : [requested];

console.log(`Reel 001 verification — group(s): ${selected.join(', ')}`);
for (const name of selected) {
  console.log(`\n[${name}]`);
  groups[name]();
}

if (failedChecks > 0) {
  console.error(`\nFAILED — ${failedChecks} check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log('\nPASSED — all checks passed.');
}
