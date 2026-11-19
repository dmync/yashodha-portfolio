# Homepage Layout

**Status:** Approved — implemented in Phase 4
**Architecture:** React + Vite + JavaScript + Tailwind CSS
**Theme:** Light mode / Dark mode
**Source of truth:** Approved Frontend Design System Proposal
**Related:** `docs/DESIGN_SYSTEM.md`, `docs/COMPONENT_SPEC.md`, `docs/MULTIMEDIA_CONTENT.md`

---

## 1. Section structure (exactly 10 sections)

The homepage must contain the following sections, in this exact order. No other sections are permitted.

| # | Section | Component(s) involved | Notes |
|---|---------|----------------------|-------|
| 1 | Navigation (Header) | Navigation/Header, ThemeToggle | Fixed or sticky top bar |
| 2 | Hero | EditorialHeading, EditorialBody, AccentButton | Page introduction, primary CTA |
| 3 | About / Disciplines | EditorialHeading, EditorialBody, Badge/Tag | Discipline tags |
| 4 | Featured Projects | BentoGrid, BentoCard / ProjectCard | Single bento grid with four project cards: the original three plus PrettyPick LK as the fourth, with a small in-card status label |
| 5 | Case Studies & Creative Work | BentoGrid, BentoCard / CaseStudyCard, VideoCard, CreativeWorkCard, ImageLightbox | Bento grid plus one nested Creative Work band; `id="case-studies"` is unchanged |
| 6 | Skills / Technologies | EditorialHeading, Badge/Tag, SectionDivider | Skill tags |
| 7 | Education & Certifications | EditorialHeading, EditorialBody, EditorialCaption | Content from `docs/EDUCATION_EXPERIENCE_CONTENT.md` |
| 8 | Experience | EditorialHeading, EditorialBody, EditorialCaption | Content from `docs/EDUCATION_EXPERIENCE_CONTENT.md` |
| 9 | Contact | EditorialHeading, EditorialBody, AccentButton, SecondaryButton | Content from `docs/HOMEPAGE_CONTENT.md` |
| 10 | Footer | EditorialCaption, SectionDivider | Copyright, links |

### Explicitly excluded

The following must **not** appear on the homepage:
- **Newsletter section** (and no Newsletter component).
- **Testimonials section** (and no testimonial content anywhere on the homepage).

Do not add these sections or components without stakeholder approval.

### Section 5 internal structure (not a new section)

- The visible heading is **Case Studies & Creative Work**; the section id remains `case-studies` so the existing Navbar anchor continues to work.
- The three software case studies remain unchanged. Diagram thumbnails inside the SPES and CTMS cards open the shared ImageLightbox.
- A single compact band with `id="creative-work"` sits **below** the case-study cards, inside Section 5. It contains four labelled groups: Video Production, Digital Art & Graphic Design, 2D/3D & VFX, and UI/UX Design.
- Navbar adds one link, **Creative** → `#creative-work`. The scroll spy observes this sub-anchor alongside `#case-studies`; it is not counted as an eleventh homepage section.
- Section 4 keeps the original three projects unchanged and renders PrettyPick LK as the fourth card in the **same** Featured Projects grid, with a small in-card “Personal Project / Working Prototype” status label. There is no separate supporting category or section.

---

## 2. Desktop Bento Grid layout (4-column asymmetrical)

Sections 4 (Featured Projects) and 5 (Case Studies) use a **Bento Grid**.

### Grid contract
- **Column count:** 4 columns (asymmetrical). This is the approved visual arrangement.
- **Track sizing:** Asymmetrical — columns are not equal width (implementation proposal; e.g., `1fr 1.2fr 0.9fr 1.1fr` as a starting point, to be confirmed).
- **Row tracks:** Automatic; row heights vary based on card content (masonry-like but implemented with CSS Grid `grid-template-rows` and explicit spans).
- **Card spanning:** Individual `BentoCard`s span 1–2 columns and 1–3 rows depending on content priority.
- **Gaps:** `space-6` (24px) between cards (implementation proposal).

### Example card span configuration (implementation proposal)

| Card type | Column span | Row span | Priority |
|-----------|-------------|----------|----------|
| Featured / featured project | 2 columns | 2 rows | High |
| Standard project | 1 column | 1–2 rows | Medium |
| Case study highlight | 2 columns | 2 rows | High |
| Standard case study | 1 column | 1–2 rows | Medium |

> **On 12-column CSS:** The visual arrangement is and must remain a **4-column asymmetrical bento grid**. If a 12-column CSS grid is used internally for implementation convenience, it must be grouped/subdivided so that the *visual* result preserves exactly the 4-column arrangement. It must **not** become a 12-column visual layout, and the 4-column visual contract must be stated wherever a 12-column implementation is mentioned.

The Creative Work band inside Section 5 reuses the same responsive grid contract: four columns on desktop, two on tablet, one on mobile. Video cards and the 2D/3D & VFX clips span two columns; image cards span one.

---

## 3. Tablet layout (640px – 1023px)

- Bento Grid collapses from 4 columns to **2 columns**.
- Cards reflow into the 2-column grid; spans adjusted so no card exceeds the available width (implementation proposal).
- Navigation remains accessible (may condense to a menu button; implementation proposal).
- Section vertical padding reduces from `space-16` to `space-12` (implementation proposal).

---

## 4. Mobile layout (0px – 639px)

- Bento Grid collapses to a **single column**; all cards become full-width, stacked vertically.
- Hero heading scales down (e.g., `display` → `h1` equivalent sizes; implementation proposal).
- Navigation condenses to a hamburger/menu button (implementation proposal).
- Touch targets meet the 44 × 44 px minimum.
- Horizontal padding reduces to `space-4` (16px) (implementation proposal).

---

## 5. Navigation and footer

### Navigation (Header)
- Contains: site logo/wordmark, primary navigation links, `ThemeToggle`.
- Links: Home, About, Projects, Case Studies, Creative, Skills, Education, Experience, Contact.
- `Creative` targets the `#creative-work` sub-anchor inside Section 5; all other links are unchanged.
- Sticky or fixed at top (implementation proposal).
- On mobile, collapses into a menu toggle (implementation proposal).
- Active section indicated visually (not by colour alone); the scroll spy includes the `creative-work` sub-anchor.

### Footer
- Contains: copyright line, secondary links, `SectionDivider` above footer content if needed (implementation proposal).
- Uses `EditorialCaption` for fine print.
- No newsletter signup and no testimonials.

---

## 6. Content hierarchy

- **One `h1` per page** — the Hero main title.
- **`h2`** for each section heading (About, Featured Projects, Case Studies & Creative Work, Skills, Education, Experience, Contact).
- **`h3`** for subsection or card titles within sections.
- **`h4`** for card-level titles (project names, case study titles).
- Body copy uses `EditorialBody`; captions/meta use `EditorialCaption`.
- All copy is supplied and approved by the stakeholder (see `docs/HOMEPAGE_CONTENT.md`, `docs/PROJECTS_CONTENT.md`, `docs/EDUCATION_EXPERIENCE_CONTENT.md`; see also `docs/DESIGN_DECISIONS.md`).
