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

> **Superseded in part by §10 (FEATURED-PROJECTS-UI-001):** the single four-card collection, preserved content and in-card status label below remain current; the span/grid arrangement and the empty-cell note do not.

Developer correction: the earlier "separately grouped Supporting card" presentation was wrong. Featured Projects now contains exactly **four** project cards in **one** `BentoGrid label="Featured projects"`: the original three unchanged, then `PrettyPick LK — Inventory Management System` as the fourth.

- The separate `SUPPORTING_PROJECT` object, its "Personal project / working prototype" heading, the "Supporting" badge, the second BentoGrid and the text "Supporting work, kept separate from the three selected projects above." were removed.
- PrettyPick uses the same `ProjectCard` structure, standard 2-column span, typography, spacing and hover behaviour as SPES and CTMS. All existing details, features and the `link: null` no-demo rule are preserved verbatim; no features were invented and no production-complete claim was made.
- A new optional `statusLabel` prop renders a small "Personal Project / Working Prototype" badge inside that card only, using the existing badge tokens. The header row can wrap on narrow screens.
- The intro copy now reads "Four selected projects, including one personal working prototype." The 4/2/1 bento contract, tokens and all other sections are unchanged. The empty desktop grid cell noted in the original implementation was later removed by §10's card-consistency change.

---

## 10. Featured Projects card consistency (FEATURED-PROJECTS-UI-001, 2026-11-19)

Developer directed a scoped polish pass using the SPES and CTMS cards as exact references. This removed the "one featured 2×2 card" example from Section 4; CASE-STUDY-BALANCE-001 later removed it from Section 5 as well, so neither section uses it now.

- **Measured inconsistencies:** the auction card alone used `featured: true` (2×2 span, 32px title, "Featured" badge), producing a 498px internal gap and an empty desktop grid cell; a link row is 44px while a footnote-only row is ~16.8px, offsetting chips/link rows by 27.2px.
- **Resolution:** the special `featured` variant was removed. All four project cards now use one standard presentation — same 2-column span, `text-h4` title, media band, padding, badge tokens, feature-list style, chips and footer placement. The link/footnote row has a 44px minimum height so cards in the same row align. The desktop grid is a balanced 2×2 with no empty cell; tablet remains 2 columns and mobile 1 column.
- **Information preserved:** every title, description, technology, link, footnote, PrettyPick's seven features and its status label are unchanged. No features were invented, no information was deleted to force equal heights, and no images were added.
- **No images/object-fit:** these cards use a shared CSS-only `.fcard__media` band; there are no `<img>` elements, so object-fit consistency was already inherent and no asset change was needed or made.
- Non-goals honoured: no changes to Case Studies, Creative Work, tokens, theme, responsive column contract or any other section; no new dependencies. The Case Studies part of this note was later superseded by §12.

---

## 11. PrettyPick LK as the fourth Case Study Record (CASE-STUDY-PRETTYPICK-001, 2026-11-20)

Developer asked that Case Study Records mirror the four Featured Projects; the section had three records. The developer initially asked for UI screenshots, then confirmed none exist and approved an amended design that adds the record without images.

- **Content:** `PrettyPick LK — Inventory Management System` is RECORD 04, using only the approved copy in `docs/PROJECTS_CONTENT.md` — the one-sentence description, five technologies, seven UI features, `Personal Project / Working Prototype` status and the security-hardening footnote. No demo link, credentials, PII or figures.
- **Honest labelling:** the seven items are features shown in the UI, so the record sets `contributionLabel: 'Features shown in the UI'`; the shared default remains `Recorded contributions` for the original three records.
- **No screenshots:** no images were generated or reused from other projects. Real screenshots can be added later as `media` exhibits without changing the record's structure.
- **Component change:** `CaseStudyCard.jsx` gained three optional, defaulted props — `contributionLabel`, `statusLabel`, `footnote` — so the original three records render exactly as before.
- **Non-goals honoured:** the original three records, Creative Work band, Featured Projects, theme, tokens, 4/2/1 responsive grid and all other sections were left untouched; no new dependency.

---

## 12. Balanced Case Study Records (CASE-STUDY-BALANCE-001, 2026-11-20)

Developer reported that the four Case Study Records cards were unbalanced and asked for the same arrangement as Featured Projects. The auction record still used `featured: true` (2×2 span, larger title, "FEATURED FILE" badge), leaving an empty desktop cell beside the fourth record.

- **Resolution:** the `featured` variant was removed from both `CaseStudies.jsx` data and `CaseStudyCard.jsx`. All four records now share `md:col-span-1 lg:col-span-2`, a `text-h4` title, the `FILED / 04` default badge (PrettyPick keeps its explicit status label) and a shared `min-h-11` link/footnote row so `END OF RECORD` markers align.
- **Result:** desktop is a balanced 2×2 with no empty cell; tablet stays 2 columns and mobile 1 column. The 4/2/1 responsive contract is unchanged.
- **Information preserved:** every title, description, contribution/feature list, technology, diagram exhibit, GitHub link, footnote and status label is unchanged. No content, images or dependencies were added.
- **Non-goals honoured:** Featured Projects, Creative Work, theme, tokens, scene frame and all other sections untouched.

---

## 13. 375px Contact section horizontal overflow (CONTACT-OVERFLOW-001, 2026-11-20)

QA found a pre-existing 7px horizontal overflow at 375×812 during CASE-STUDY-BALANCE-001; the developer asked for it to be fixed in its own task. Systematic debugging measured the cause before any fix was proposed.

- **Root cause:** the Gmail detail anchor used Tailwind `break-words` (`overflow-wrap: break-word`), which does not contribute soft-wrap opportunities to intrinsic min-content sizing. The unbroken email's 273.59px min-content propagated through 40px row padding and 2px borders into a 315.59px grid track, painting to x=366.59 — 7px past the 360px client width at 375px. At 390px the same right edge left 8.41px spare, which is why it was invisible there. `ContactSection.jsx` had not changed since the initial release.
- **Resolution:** replaced `break-words` with `break-all` on the contact detail anchors only — one class token, no new CSS. Browser-injected `break-all` measured document client/scroll width equal (360/360), track 258px, item right 309px and `dl` client/scroll 256/256 with no clipped text.
- **Rejected:** `min-w-0` on grid items or `overflow-x: hidden` removes the page overflow but clips the email behind `dl`'s `overflow: hidden` (symptom fix); a custom `overflow-wrap: anywhere` rule adds CSS where the existing `break-all` utility already works.
- **Information preserved:** both emails, location, GitHub, LinkedIn, the single `Send Message` mailto CTA, body copy, theme and tokens are unchanged. No phone number or `tel:` link was introduced.
- **Non-goals honoured:** no other section, global CSS rule or dependency changed.
