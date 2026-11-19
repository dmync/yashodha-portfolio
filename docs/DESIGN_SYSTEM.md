# Design System — Portfolio

**Status:** Approved; current production design direction is **Reel 001 — cinematic timeline** (approved 2026-11-19)
**Architecture:** React + Vite + JavaScript + Tailwind CSS (no TypeScript; design tokens exposed as CSS custom properties and consumed by Tailwind)
**Theme support:** dark **"smoke"** (primary scheme) and light **"daylight screening"**; user-toggleable, with system-preference fallback
**Source of truth:** `docs/superpowers/specs/2026-11-19-reel-001-design.md` (Reel 001, exact palettes) and `docs/DESIGN_DECISIONS.md`; the earlier Playfair/Inter blue/neutral proposal is superseded for production
**Accessibility target:** WCAG 2.2 AA (ratios computed for the exact tokens below; §1 carries the Task 10 post-darkening evidence, while the Task 8 report records the earlier pre-darkening measurements)

---

## How to read this document

| Label | Meaning |
|-------|---------|
| **Approved decision** | Finalized by stakeholders. Do not change without approval. |
| **Implementation proposal** | Suggested by the frontend developer; not yet stakeholder-approved. Treat as a draft starting point. |
| **Unresolved / TBD** | Decision or content still needed; do not implement as final. |
| **[Placeholder]** | Content that must be supplied by the stakeholder before implementation. |

---

## 1. Colour tokens

Colours are exposed as CSS custom properties on `:root` (light "daylight screening") and `.dark` (dark "smoke"). These exact Reel 001 values replace the earlier blue/neutral palette; component utility class names are unchanged. Two tokens (`--color-brass`, `--color-rec`) are new.

### Approved colour tokens — Dark "smoke" (default; `.dark`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#050609` | Page / root background |
| `--color-surface` | `#0B0D10` | Cards, raised panels, HUD bars |
| `--color-surface-strong` | `#161B21` | Frame gradient start |
| `--color-text-primary` | `#EDE7DA` | Headings, primary body copy |
| `--color-text-secondary` | `rgba(237,231,218,.66)` | Body copy, captions |
| `--color-text-muted` | `#97A29E` | Metadata, HUD labels |
| `--color-border` | `rgba(99,200,188,.34)` | Dividers, frame and card borders |
| `--color-primary` | `#63C8BC` | Teal accent, primary links/buttons, HUD |
| `--color-primary-hover` | `#8FE3DA` | Hover / active state |
| `--color-primary-soft` | `rgba(99,200,188,.12)` | Soft tag/badge background |
| `--color-primary-contrast` | `#0B0D10` | Text on solid `--color-primary` |
| `--color-inverse-text` | `#0B0D10` | Inverse text on teal fills |
| `--color-brass` (new) | `#C9A24B` | Brass HUD tags, ledger numerals |
| `--color-rec` (new) | `#E98378` | REC indicator |

### Approved colour tokens — Light "daylight screening" (`:root`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#EDE7DA` | Page / root background |
| `--color-surface` | `#F4F1E9` | Cards, raised panels, HUD bars |
| `--color-surface-strong` | `#E2DCCA` | Frame gradient start |
| `--color-text-primary` | `#14130F` | Headings, primary body copy |
| `--color-text-secondary` | `#3A3B37` | Body copy, captions |
| `--color-text-muted` | `#585B56` | Metadata, HUD labels |
| `--color-border` | `rgba(20,20,15,.5)` | Dividers, frame and card borders |
| `--color-primary` | `#0A655C` | AA-darkened teal accent, links/buttons, HUD |
| `--color-primary-hover` | `#0B5E56` | Hover / active state |
| `--color-primary-soft` | `rgba(10,101,92,.12)` | Soft tag/badge background |
| `--color-primary-contrast` | `#F4F1E9` | Text on solid `--color-primary` |
| `--color-inverse-text` | `#F4F1E9` | Inverse text on teal fills |
| `--color-brass` (new) | `#76591B` | AA-darkened brass HUD tags, ledger numerals |
| `--color-rec` (new) | `#B44134` | AA-adjusted REC indicator |

Light teal, brass, muted text, border and soft tint were darkened further in the developer-approved Task 10 scope change specifically to meet WCAG 2.2 AA; the requirement was to measure, not assume, compliance. Task 8 measured the pre-darkening palette and found small-text shortfalls (point-in-time evidence, not rewritten). After Task 10, every light small-text pair clears 4.5:1 and the light border clears 3:1: muted `#585B56` 5.60 / 6.11 / 5.03, primary `#0A655C` 5.63 / 6.14 / 5.06, brass `#76591B` 5.30 / 5.79 / 4.77 (background / surface / surface-strong), border `rgba(20,20,15,.5)` 3.33 / 3.40 / 3.23, and primary-soft kept as the 12% tint of the new primary with chip text 4.73 / 5.14. The dark "smoke" palette is unchanged; see `docs/DESIGN_DECISIONS.md` §7 for the decision record.

### Contrast requirements (WCAG 2.2 AA)

| Use case | Minimum contrast ratio | Notes | Status |
|----------|------------------------|-------|--------|
| Normal text (< 18px or < 14px bold) | 4.5:1 | Against its background | Approved decision |
| Large text (≥ 18px or ≥ 14px bold) | 3:1 | Against its background | Approved decision |
| UI components / graphical objects | 3:1 | Borders, buttons, focus indicators | Approved decision |
| Non-text contrast | 3:1 | Active UI components | Approved decision |

All colour pairs above must be verified to meet these ratios in both modes (QA responsibility). Colour must never be the sole means of conveying information, indicating an action, or distinguishing a visual element.

> **Reel 001 note (2026-11-19; updated by Task 10):** the old blue/neutral palette's muted-token and `--color-primary-contrast` deviations are obsolete. The tables above are the exact spec §2 values implemented in `src/index.css`, including the developer-approved Task 10 darkening of five light tokens. `--color-primary-contrast` is now the light-on-teal text colour for solid primary buttons/links; it is **not** a text colour for `--color-primary-soft` tag backgrounds (Task 9 changed the badge call sites to `text-primary` on `bg-primary-soft`). Task 8 measured the pre-darkening palette and found shortfalls; Task 10 resolved them — all light small-text pairs now measure ≥4.5:1 and the border ≥3:1, with the computed numbers in §1. No browser pass is claimed by the documentation task.

---

## 2. Typography

### Approved typography decisions (Reel 001)

| Setting | Approved value | Source |
|---------|----------------|--------|
| Display / heading font family | Anton (condensed), fallback `"Arial Narrow", Impact, sans-serif` | Reel 001 spec §3 (supersedes Playfair Display) |
| Body font family | IBM Plex Sans, fallback `system-ui, sans-serif` | Reel 001 spec §3 (supersedes Inter) |
| HUD / metadata font family | IBM Plex Mono, fallback `Consolas, monospace` (`.hud` / `font-mono`) | Reel 001 spec §3 (new) |

### Typographic scale (implementation proposal)

| Style | Font size | Line height | Font weight | Typical usage | Status |
|-------|-----------|-------------|-------------|---------------|--------|
| `display` | 56px | 1.1 | 700 | Hero main title | Implementation proposal |
| `h1` | 40px | 1.2 | 700 | Page / section title | Implementation proposal |
| `h2` | 32px | 1.25 | 700 | Section heading | Implementation proposal |
| `h3` | 24px | 1.3 | 600 | Subsection heading | Implementation proposal |
| `h4` | 20px | 1.35 | 600 | Card / component title | Implementation proposal |
| `body-lg` | 18px | 1.6 | 400 | Lead paragraph, hero intro | Implementation proposal |
| `body` | 16px | 1.7 | 400 | General body copy | Implementation proposal |
| `body-sm` | 14px | 1.55 | 400 | Secondary body copy | Implementation proposal |
| `caption` | 12px | 1.4 | 500 | Metadata, labels, captions | Implementation proposal |

> Typeface families (Anton display, IBM Plex Sans body, IBM Plex Mono HUD) are **Approved decisions** under Reel 001. All pixel sizes, line heights, and weights above are **implementation proposals** pending stakeholder confirmation. Fonts are loaded from Google Fonts with `preconnect`; `theme-color` is `#050609` (dark) and `#EDE7DA` (light).

---

## 3. Spacing system

A single base unit drives all spacing to keep the layout consistent.

| Token | Value | Usage | Status |
|-------|-------|-------|--------|
| `space-1` | 4px | Tight internal padding | Implementation proposal |
| `space-2` | 8px | Small gaps, icon spacing | Implementation proposal |
| `space-3` | 12px | Compact component padding | Implementation proposal |
| `space-4` | 16px | Default component padding | Implementation proposal |
| `space-6` | 24px | Section-internal gaps | Implementation proposal |
| `space-8` | 32px | Between major blocks | Implementation proposal |
| `space-12` | 48px | Section vertical padding | Implementation proposal |
| `space-16` | 64px | Between homepage sections | Implementation proposal |
| `space-24` | 96px | Hero / major section padding | Implementation proposal |

**Base unit:** 4px (implementation proposal). All spacing values above are **implementation proposals**.

---

## 4. Borders, radii, and shadows

| Token | Value | Usage | Status |
|-------|-------|-------|--------|
| `border-width` | 1px | Card borders, dividers, inputs | Implementation proposal |
| `border-style` | solid | All borders | Implementation proposal |
| `radius-none` | 0px | Editorial elements, sharp divisions | Implementation proposal |
| `radius-sm` | 6px | Buttons, badges, tags | Implementation proposal |
| `radius-md` | 8px | Bento cards, project cards | Implementation proposal |
| `radius-lg` | 12px | Large panels, hero containers | Implementation proposal |
| `shadow-sm` | 0 1px 3px rgba(0,0,0,0.08) | Subtle card elevation (light) | Implementation proposal |
| `shadow-md` | 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.06) | Raised cards | Implementation proposal |
| `shadow-dark` | 0 4px 6px -1px rgba(0,0,0,0.4) | Card elevation (dark mode) | Implementation proposal |

> Editorial aesthetic generally favours sharp (0px) radii on headings and dividers; rounded radii are reserved for interactive cards and buttons. All values above are **implementation proposals**.

---

## 5. Responsive breakpoints

| Breakpoint | Min width | Max width | Intended use | Status |
|------------|-----------|-----------|--------------|--------|
| `--bp-mobile` | 0px | 639px | Single-column mobile layout | Implementation proposal |
| `--bp-tablet` | 640px | 1023px | Two-column tablet layout | Implementation proposal |
| `--bp-desktop` | 1024px | — | Four-column asymmetrical desktop bento | Implementation proposal |

**Container max-width:** 1200px, centered (implementation proposal).  
All breakpoint values above are **implementation proposals** pending confirmation against the approved proposal.

---

## 6. Accessibility and contrast (WCAG 2.2 AA)

- **Colour contrast:** Target is 4.5:1 (normal text) / 3:1 (large text) against the background in both themes. Task 8 measured shortfalls in the pre-darkening light palette; the developer-approved Task 10 darkened five light tokens, after which every light small-text pair measures ≥4.5:1 and the light border ≥3:1 (computed numbers in §1). The dark palette is unchanged.
- **Non-text contrast:** Interactive components and graphical objects meet 3:1.
- **Focus visible:** Keyboard focus shows a 2px outline in `--color-primary` with a 2px offset; never removed via `outline: none` without a visible replacement.
- **Touch targets:** Minimum 44 × 44 px for all interactive elements.
- **Reduced motion:** Respects `prefers-reduced-motion`; animations reduced or disabled accordingly.
- **Colour not sole means:** Status, errors, and active states are reinforced with icons, text, or patterns, not colour alone.
- **Semantic HTML:** Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, heading hierarchy (`h1` → `h6`), lists, and buttons/links.
- **ARIA:** Used only where native HTML is insufficient (e.g., theme toggle, disclosure widgets).
- **Zoom:** Page remains usable up to 200% browser zoom without loss of content or functionality.

**QA responsibility:** Task 8 statically computed relative-luminance ratios for the pre-darkening §2 token pairs in both themes; Task 10 re-measured the darkened light palette and met AA (see §1 and the Task 10 report). Browser-side verification of rendered text, non-text contrast, and the deferred minors is performed separately by the QA agent; no browser pass is claimed by the documentation task.

---

## 7. Theme switching mechanism

- `:root` holds the light "daylight screening" tokens; the dark "smoke" scheme is the primary cinematic direction and is applied via a `.dark` class on `<html>` that overrides the colour tokens.
- On load, the inline script and `ThemeToggle` respect a stored preference or `prefers-color-scheme`; both write `theme-color` as `#050609` (dark) / `#EDE7DA` (light).
- A `ThemeToggle` component toggles the class, writes the choice to `localStorage`, and on load respects `prefers-color-scheme` when no stored preference exists.
- Implemented with a React `ThemeToggle` component that writes to `localStorage` and an inline pre-paint script that prevents theme flash on load.

---

## 8. Reel 001 cinematic system (current implementation)

- **Frame primitives:** `SceneFrame` renders `.scene` / `.frame`, top and bottom `.letterbox` HUD bars, `.frame__body` / `.frame__inner`, four corner marks (`.corner--tl/tr/bl/br`) and two registration marks (`.reg--tr/bl`), all decorative marks `aria-hidden`. `Timecode` / `FrameCounter` consume one shared `useCinematicClock()`.
- **HUD utilities:** `.hud`, `.hud--teal` (`--color-primary`), `.hud--brass` (`--color-brass`), `.rec` / `.rec::before` with `@keyframes rec-blink`. All colour values come from the tokens in §1; no hard-coded accent hex values in component CSS.
- **Scene map:** `hero` (01 OPENING, REC), `about` (02), `featured-projects` (03 FEATURES), `case-studies` (04 RECORDS, with nested `creative-work` as a visibly secondary supporting reel), `skills` (05 CAPABILITIES), `education` (06 BACKGROUND), `experience` (07), `contact` (08). `main-content`, all ten IDs and the footer colophon are preserved exactly once.
- **Responsive contract:** 4 / 2 / 1 grid columns, verified statically by `scripts/verify-reel001.mjs` and pending computed-style verification in the browser at 1440 / 768 / 390 px.
- **Motion / a11y:** `prefers-reduced-motion` freezes the shared clock and neutralizes animations; `:focus-visible` outlines, skip link, semantic landmarks and lightbox keyboard handling are preserved.
