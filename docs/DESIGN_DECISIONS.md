# Design Decisions

**Status:** Approved; current production design direction is **Reel 001 — cinematic timeline** (approved 2026-11-19, §7 below)
**Source of truth:** `docs/superpowers/specs/2026-11-19-reel-001-design.md` (Reel 001) and `docs/DESIGN_SYSTEM.md` (implemented tokens); the earlier Playfair/Inter editorial proposal is superseded for production
**Architecture:** React + Vite + JavaScript + Tailwind CSS (stakeholder correction; replaces the original plain HTML/CSS/JS plan)

---

## 1. Finalized design direction (current: Reel 001)

The production direction is **Reel 001 — a cinematic timeline / film-reel portfolio** (approved 2026-11-19). Software development is the primary feature; multimedia is a secondary "supporting reel" nested inside the case-study scene. Each major section is a letterboxed film frame with a HUD bar (scene number, live timecode, REC indicator), corner/registration marks and mono metadata; navigation is a horizontal timeline with a playhead. Display type is condensed **Anton**; body copy is **IBM Plex Sans**; HUD/metadata is **IBM Plex Mono**. Project/case-study/skills card grids are **4 columns at ≥1024px, 2 columns at 768–1023px and 1 column below 768px**. Motion is restrained and filmic; there is no parallax or scroll-jacking. Both the dark "smoke" and light "daylight screening" palettes are implemented and the theme toggle is preserved.

This direction supersedes the earlier editorial Playfair Display / Inter direction recorded in the original proposal. References to Playfair/Inter or the blue/neutral palette elsewhere in this document are historical and are not the implemented design.

---

## 2. Design rationale

| Decision | Rationale |
|----------|-----------|
| Anton for display headings | Tall condensed film-title voice; the approved Reel 001 direction (supersedes Playfair Display). |
| IBM Plex Sans for body | Legible neutral sans-serif for long-form copy; IBM Plex Mono is used for HUD/metadata (supersedes Inter). |
| Light + Dark theme | User preference accommodation; both cinematic palettes are implemented and the existing toggle is preserved. |
| 4 → 2 → 1 card grid | Four columns at ≥1024px, two at 768–1023px, one below 768px; reuses the approved bento intent in the film-frame system. |
| React + Vite + Tailwind CSS | Component reuse and consistent design tokens; small dependency footprint; fast static build that is easy to host (stakeholder correction, 2026-11-18). |
| Focused component list | Keeps surface area small; every component has a clear homepage role; excludes Newsletter and Loader per stakeholder. |
| WCAG 2.2 AA contrast | Ensures readability in both themes and compliance with accessibility expectations. |

---

## 3. Approved design decisions

The following are treated as **approved** (finalized by stakeholders; do not change without approval):

- Headings: **Anton**; body: **IBM Plex Sans**; HUD/metadata: **IBM Plex Mono** (Reel 001; supersedes the earlier Playfair Display / Inter proposal).
- Two themes: **light "daylight screening"** and **dark "smoke"** (default), with the existing toggle and system-preference fallback preserved.
- Homepage sections (exactly 10, in order): Navigation, Hero, About/Disciplines, Featured Projects, Case Studies, Skills/Technologies, Education & Certifications, Experience, Contact, Footer (approved proposal).
- **No Newsletter section** and **no Testimonials** on the homepage (stakeholder correction).
- Card grids render **4 / 2 / 1 columns** at desktop / tablet / mobile (stakeholder correction; implemented via the Reel 001 frame system).
- Architecture: React + Vite + JavaScript + Tailwind CSS; no TypeScript, no unnecessary dependencies beyond the approved stack (stakeholder correction).
- Component list is focused; **no Newsletter** and **no Loader** components (stakeholder correction).
- Accessibility target: **WCAG 2.2 AA** (approved proposal).
- Exact Light Mode and Dark Mode colour token HEX values (from approved proposal; see `docs/DESIGN_SYSTEM.md`).

---

## 4. Assumptions and deferred decisions

The following are **not** approved values. They are assumptions or implementation proposals that must be confirmed against the approved proposal before implementation:

- Exact **spacing scale** pixel values (base unit, token steps).
- Exact **border-radius** values.
- Exact **shadow** values.
- Exact **responsive breakpoint** pixel values and container max-width.
- Exact **typographic scale** pixel sizes and line heights (typefaces are approved; sizes are proposals).
- `ThemeToggle` persistence key name and mobile navigation behaviour.
- Card span configurations in the Bento Grid.
- Any animation or reduced-motion specifics beyond respecting `prefers-reduced-motion`.
- CMS vs static content decision.
- Form backend (if a contact form is added later).
- Deployment target.
- Image/video asset strategy — resolved for MULTIMEDIA-INTEGRATION-001 in §6; video covers/posters were later implemented in §8.

---

## 5. Content status (resolved in Phase 1)

All homepage copy was subsequently supplied and approved by the stakeholder. The source of truth is:

| Content area | Source of truth |
|--------------|-----------------|
| Hero, About / Disciplines, Contact, Footer | `docs/HOMEPAGE_CONTENT.md` |
| Featured Projects, Case Studies, Skills / Technologies | `docs/PROJECTS_CONTENT.md` (4 projects after FEATURED-PROJECTS-001) |
| Education, Experience, Certifications | `docs/EDUCATION_EXPERIENCE_CONTENT.md` |
| Creative Work band, diagrams, PrettyPick fourth featured project | `docs/MULTIMEDIA_CONTENT.md`, `docs/PROJECTS_CONTENT.md` |

| Excluded area | Reason |
|---------------|--------|
| Testimonials | Not part of homepage (stakeholder correction) |
| Newsletter | Not part of homepage (stakeholder correction) |

> No copy, project details, education entries, experience entries, or contact details are invented in the implementation. The LinkedIn profile URL was supplied by the stakeholder on 2026-11-18 and is rendered as a verified link.
>
> Reel 001 content authority (developer-approved): contact follows the prototype (both emails shown, no phone, `Send Message` → Gmail mailto, no `Call Me` / `Get in Touch`); skills tags and experience descriptions follow the source code (`src/components/SkillsSection.jsx`, `src/components/ExperienceSection.jsx`), which wins over the shorter reference docs.

---

## 6. Multimedia integration (MULTIMEDIA-INTEGRATION-001, approved 2026-11-18)

- The homepage still has exactly **10 sections**. Section 5 is retitled **Case Studies & Creative Work**, but keeps `id="case-studies"` so existing anchors remain valid.
- Creative work is a compact band (`id="creative-work"`) **inside Section 5**, never a new top-level section. Navbar adds one `Creative` link to that sub-anchor; the scroll spy observes it alongside `#case-studies`.
- The three original software projects and three software case studies remain unchanged. **PrettyPick LK** is the fourth card in the main Featured Projects collection, distinguished only by a small in-card status label; it has no demo link, credentials, personal data or figures.
- SPES and CTMS diagram thumbnails and creative images/clips open a shared, accessible ImageLightbox. The lightbox provides ESC, backdrop close, focus trap and focus restore, is full-screen on mobile, and adds no motion of its own.
- VideoCards use native `<video>` controls with `preload="metadata"` and `playsInline`, with **no autoplay**. Per-video poster attributes were later added in §8, reversing the earlier "posters deferred" decision.
- Layout reuses the approved 4-column asymmetrical bento contract: four columns on desktop, two on tablet, one on mobile; video cards span two columns. Media frames use existing surface tokens in both themes.
- Existing approved typography, colour tokens, theme behaviour and reduced-motion handling were preserved. The repository’s approved tokens are the blue/neutral palette in `docs/DESIGN_SYSTEM.md`; no terracotta/sage palette substitution was made because that wording is not present in the approved docs or implementation.
- The **Multimedia & Creative** skills group contains only the evidence-backed tools **Adobe Photoshop**, **Krita** and **3ds Max**. Unsupported, duplicative or discipline-only tags were removed from that group.
- Rights/consent clearance remains an open governance item. The portfolio is publicly deployed at the developer's direction; `docs/MULTIMEDIA_CONTENT.md` records per-asset status and the residual clearance considerations to revisit.

---

## 7. Reel 001 — current approved design direction (2026-11-19)

Selected by the developer from four researched concepts and approved for production. Binding spec: `docs/superpowers/specs/2026-11-19-reel-001-design.md`. Implemented palettes and typography are recorded in `docs/DESIGN_SYSTEM.md` §1–§2 with the exact token values.

- **Direction:** cinematic timeline / film reel; software development primary, multimedia as a nested, visibly secondary supporting reel inside `#case-studies` (`#creative-work`).
- **Frames:** every major section is a `SceneFrame` with a scene number, live `Timecode`, corner/registration marks and HUD bars (`SCENE 0n — LABEL`, `REEL 001 / FRAME <n>`). The REC indicator lives in the hero.
- **Typography:** Anton display; IBM Plex Sans body; IBM Plex Mono HUD/metadata.
- **Palettes:** dark **"smoke"** (`--color-background` `#050609`) is the primary/default cinematic scheme; light **"daylight screening"** (`--color-background` `#EDE7DA`) is an AA-adjusted variant that preserves the existing theme toggle. Both are implemented as the same semantic tokens, so component utility classes are unchanged.
- **Light palette AA darkening (Task 10, developer-approved scope change, 2026-11-19):** after QA Task 8 measured light-mode WCAG 2.2 AA shortfalls in the pre-darkening palette, the developer chose "Darken light tokens to AA". Five light tokens changed: `--color-text-muted` `#6B6E68` → `#585B56`; `--color-border` `rgba(20,20,15,.22)` → `rgba(20,20,15,.5)`; `--color-primary` `#0F7A70` → `#0A655C`; `--color-primary-soft` `rgba(15,122,112,.12)` → `rgba(10,101,92,.12)`; `--color-brass` `#8A6A22` → `#76591B`. Measured post-change ratios clear 4.5:1 for every light small-text pair and 3:1 for the border (evidence in `docs/DESIGN_SYSTEM.md` §1 and the spec §2 note). The dark palette, `primary-hover` `#0B5E56`, `rec` `#B44134`, all backgrounds/surfaces, `primary-contrast`, `inverse-text` and every component file are unchanged. Historical Task 8 reports were not rewritten; they record the pre-darkening palette.
- **Canonical IDs (unchanged, exactly once each):** `main-content`, `hero`, `about`, `featured-projects`, `case-studies`, `creative-work` (nested), `skills`, `education`, `experience`, `contact`.
- **Responsive contract:** 4 / 2 / 1 card columns; no horizontal overflow at 1440 / 768 / 390 px.
- **Preserved behaviour:** theme toggle with system-preference fallback, skip link, focus-visible outlines, mobile nav, footer links, lightbox keyboard handling, and `prefers-reduced-motion`.
- **Content authority:** contact from the approved prototype (both emails, no phone, only `View Projects` / `Send Message`, `Send Message` → Gmail mailto); skills and experience from source code (source wins). No invented achievements, results or links; the auction project has no live link; PrettyPick carries its documented limitation.

---

## 8. Video duplicate fix, PrettyPick copy update and video posters (MULTIMEDIA-PROJECTS-001, 2026-11-19)

Developer-approved scoped update; task record `logs/tasks/MULTIMEDIA-PROJECTS-001.md`. Reel 001 direction and every other section are unchanged.

- **Duplicate resolution:** the two visually identical videos were identified by frame fingerprints (10 s / 60 s / 120 s). The "Music Video" entry was the duplicate; its source is now an H.264/AAC 1280×720 MP4 transcoded from the developer-specified `MMW-23-B1-05.MOV`. The 281 MB HEVC original is not committed (GitHub 100 MB limit; browser codec support) and the old unreferenced duplicate MP4 was deleted.
- **Poster decision reversed:** §6's "posters deferred" choice is superseded. Each of the three videos has a unique 1280×720 JPEG poster extracted from its own actual frames with ffmpeg (no AI-generated or stock imagery). `VideoCard` gained an optional `poster` prop; native controls, `preload="metadata"`, `playsInline`, no autoplay, aspect ratio and responsive layout are unchanged.
- **PrettyPick LK is the fourth card in the main Featured Projects collection** (developer correction, FEATURED-PROJECTS-001). It uses the same `ProjectCard` structure, span, typography and spacing as the original three; the only distinction is a small in-card "Personal Project / Working Prototype" status label. Its approved copy is unchanged: exact description, `Tailwind CSS` in the stack, seven key features and the development-status footnote. No demo link, credentials, personal data or statistics.
- **Non-goals honoured:** no change to the three main projects, case studies, other sections, typography, colour tokens or the 4/2/1 bento grid; no new dependencies.

---

## 9. Featured Projects single collection (FEATURED-PROJECTS-001, 2026-11-19)

Developer correction: the earlier "separately grouped Supporting card" presentation was wrong. Featured Projects now contains exactly **four** project cards in **one** `BentoGrid label="Featured projects"`: the original three unchanged, then `PrettyPick LK — Inventory Management System` as the fourth.

- The separate `SUPPORTING_PROJECT` object, its "Personal project / working prototype" heading, the "Supporting" badge, the second BentoGrid and the text "Supporting work, kept separate from the three selected projects above." were removed.
- PrettyPick uses the same `ProjectCard` structure, `featured: false` span, typography, spacing and hover behaviour as SPES and CTMS. All existing details, features and the `link: null` no-demo rule are preserved verbatim; no features were invented and no production-complete claim was made.
- A new optional `statusLabel` prop renders a small "Personal Project / Working Prototype" badge inside that card only, using the existing badge tokens. The header row can wrap on narrow screens.
- The intro copy now reads "Four selected projects, including one personal working prototype." The 4/2/1 bento contract, tokens and all other sections are unchanged; the fourth standard card leaves one empty desktop grid cell, accepted rather than redesigning the grid.
