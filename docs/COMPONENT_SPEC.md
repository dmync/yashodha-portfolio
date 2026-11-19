# Component Specifications

**Status:** Approved — implemented in Phase 4
**Architecture:** React + Vite + JavaScript + Tailwind CSS (no TypeScript interfaces; props described in plain language)
**Source of truth:** Approved Frontend Design System Proposal
**Related:** `docs/DESIGN_SYSTEM.md`, `docs/HOMEPAGE_LAYOUT.md`

---

## Conventions

- Props are described in **plain language** only. No TypeScript, no interfaces.
- Each component lists its responsibility, accepted props, variants/states, and relationships.
- Components marked **Implementation proposal** are not yet stakeholder-approved.
- The component list is intentionally focused. **Newsletter** and **Loader** components are **not** included.

---

## 1. BentoGrid

**Responsibility:** Renders the 4-column asymmetrical bento grid used by Featured Projects and Case Studies. Lays out child cards using CSS Grid with defined column tracks, row tracks, and gaps.

**Props (plain language):**
- `columns` — number of grid columns (desktop: 4; tablet: 2; mobile: 1).
- `gap` — spacing between cards (design token, e.g., `space-6`).
- `children` — the card components to place inside the grid (BentoCard, ProjectCard, CaseStudyCard).

**Variants / states:** None beyond responsive column count.

**Relationships:** Parent of `BentoCard` (and its specializations `ProjectCard`, `CaseStudyCard`). Used in homepage sections 4 and 5.

**Status:** Implementation proposal (grid track values to be confirmed).

---

## 2. BentoCard

**Responsibility:** A single card within the BentoGrid. Displays a title, optional description, optional image/placeholder, and optional action link/button. Can span multiple columns and rows.

**Props (plain language):**
- `title` — card heading text.
- `description` — short supporting text.
- `image` — URL or placeholder for a representative image (optional).
- `link` — destination URL when the card is a link (optional).
- `columnSpan` — how many grid columns the card occupies (1 or 2).
- `rowSpan` — how many grid rows the card occupies (1 to 3).
- `variant` — visual emphasis level (e.g., `featured`, `standard`).

**Variants / states:** `featured` (larger, more prominent), `standard`; hover state lifts card slightly (implementation proposal).

**Relationships:** Child of `BentoGrid`. Specialized into `ProjectCard` and `CaseStudyCard`.

**Status:** Implementation proposal (span values and hover motion to be confirmed).

---

## 3. EditorialHeading

**Responsibility:** Renders a section or page heading using the approved heading typeface (Playfair Display) with the appropriate scale step.

**Props (plain language):**
- `level` — HTML heading level (`h1` through `h6`).
- `text` — the heading text content.
- `size` — typographic scale step (e.g., `h1`, `h2`, `h3`, `display`) — overrides default for the level if needed.
- `align` — text alignment (left, center) — optional.

**Variants / states:** None beyond size/level.

**Relationships:** Used for all section headings and card titles across the homepage.

**Status:** Approved typeface (Playfair Display); scale values are implementation proposal.

---

## 4. EditorialBody

**Responsibility:** Renders general body copy using the approved body typeface (Inter) at the `body` scale step, with generous line height for readability.

**Props (plain language):**
- `text` — the body copy text.
- `size` — scale step (`body`, `body-lg`, `body-sm`) — optional, defaults to `body`.
- `align` — text alignment — optional.

**Variants / states:** None.

**Relationships:** Paired with `EditorialHeading` in every text-heavy section.

**Status:** Approved typeface (Inter); scale values are implementation proposal.

---

## 5. EditorialCaption

**Responsibility:** Renders small metadata, captions, labels, or fine print at the `caption` scale step.

**Props (plain language):**
- `text` — the caption text.
- `muted` — whether to use the muted text colour (for de-emphasized metadata) — optional boolean.

**Variants / states:** None.

**Relationships:** Used under cards, in Education/Experience/Contact sections, and in the Footer.

**Status:** Implementation proposal (scale value to be confirmed).

---

## 6. AccentButton

**Responsibility:** Primary call-to-action button using `--color-primary` background with `--color-inverse-text`.

**Props (plain language):**
- `text` — button label.
- `href` — navigation destination (if it behaves as a link) — optional.
- `type` — button type (`button`, `submit`, `reset`) — optional.
- `disabled` — whether the button is disabled — optional boolean.

**Variants / states:** Default, hover (`--color-primary-hover`), focus (visible outline), disabled (reduced opacity, not clickable).

**Relationships:** Used in Hero (primary CTA) and Contact sections.

**Status:** Colours are Approved decision; contrast must meet WCAG 2.2 AA.

---

## 7. SecondaryButton

**Responsibility:** Secondary action button with a transparent or lightly styled background and `--color-primary` text/border.

**Props (plain language):**
- `text` — button label.
- `href` — navigation destination — optional.
- `type` — button type — optional.
- `disabled` — whether the button is disabled — optional boolean.

**Variants / states:** Default, hover, focus, disabled.

**Relationships:** Paired with `AccentButton` where a primary and secondary action appear together (e.g., Contact).

**Status:** Implementation proposal.

---

## 8. Badge

**Responsibility:** Small inline label that categorizes or tags an item (e.g., discipline, skill level).

**Props (plain language):**
- `text` — badge label text.
- `variant` — colour/style variant (e.g., `primary`, `neutral`, `muted`) — optional.

**Variants / states:** None interactive.

**Relationships:** Used in About/Disciplines and Skills/Technologies sections; visually similar to `Tag` but semantically a category badge.

**Status:** Implementation proposal.

---

## 9. Tag

**Responsibility:** Lightweight keyword-style label (e.g., a technology or skill name), typically rendered as a chip.

**Props (plain language):**
- `text` — tag label text.
- `link` — whether the tag links to a filtered view — optional boolean.
- `href` — destination if linked — optional.

**Variants / states:** None interactive by default; optional link styling.

**Relationships:** Used in Skills/Technologies and on ProjectCard/CaseStudyCard to list technologies.

**Status:** Implementation proposal.

---

## 10. ProjectCard

**Responsibility:** Specialized `BentoCard` for a featured project in the BentoGrid. Presents project title, short description, technologies (tags), and a link to the project/case study.

**Props (plain language):**
- Inherits all `BentoCard` props.
- `technologies` — list of tag labels to render as `Tag` chips.
- `featured` — whether this is a featured (larger-span) project — optional boolean.

**Variants / states:** `featured` (larger grid span), `standard`.

**Relationships:** Child of `BentoGrid`; contains `Tag` components; rendered in Featured Projects section.

**Status:** Implementation proposal.

---

## 11. CaseStudyCard

**Responsibility:** Specialized `BentoCard` for a case study in the BentoGrid. Presents case study title, summary, outcome highlights, and a link to the full case study.

**Props (plain language):**
- Inherits all `BentoCard` props.
- `outcome` — short outcome statement (optional).
- `technologies` — list of tag labels (optional).

**Variants / states:** `featured`, `standard`.

**Relationships:** Child of `BentoGrid`; contains `Tag` components; rendered in Case Studies section.

**Status:** Implementation proposal.

---

## 12. Navigation / Header

**Responsibility:** Top-of-page navigation bar containing the site identifier, primary navigation links, and the theme toggle.

**Props (plain language):**
- `siteName` — site/brand name text.
- `navLinks` — list of navigation items (label and destination).
- `themeToggle` — the ThemeToggle component instance.

**Variants / states:** Default, scrolled/sticky (implementation proposal), mobile menu open/closed.

**Relationships:** Contains `ThemeToggle`. Present on every page.

**Status:** Implementation proposal (mobile menu behaviour to be confirmed).

---

## 13. ThemeToggle

**Responsibility:** Control that switches between Light mode and Dark mode. Persists choice to `localStorage` and respects system preference on first load.

**Props (plain language):**
- `label` — accessible label for the toggle (e.g., "Toggle theme").
- `iconSun` / `iconMoon` — optional icons for current mode indication.

**Variants / states:** `light`, `dark`.

**Relationships:** Owned by `Navigation/Header`; writes to `localStorage`; reads `prefers-color-scheme`.

**Status:** Implementation proposal (persistence key name to be confirmed).

---

## 14. SectionDivider

**Responsibility:** Decorative or semantic divider placed between major homepage sections.

**Props (plain language):**
- `variant` — line style (e.g., `solid`, `dashed`, `none`) — optional.
- `colour` — border colour token override — optional.

**Variants / states:** None interactive.

**Relationships:** Placed between sections (e.g., above Footer) as needed.

**Status:** Implementation proposal.

---

## Component relationships summary

```
Navigation/Header
└── ThemeToggle

Hero
├── EditorialHeading (h1 / display)
├── EditorialBody (body-lg)
└── AccentButton

About / Disciplines
├── EditorialHeading
├── EditorialBody
└── Badge / Tag

Featured Projects
└── BentoGrid
    └── BentoCard / ProjectCard
        └── Tag (technologies)

Case Studies
└── BentoGrid
    └── BentoCard / CaseStudyCard
        └── Tag (technologies)

Skills / Technologies
├── EditorialHeading
└── Badge / Tag

Education & Certifications
├── EditorialHeading
├── EditorialBody
└── EditorialCaption

Experience
├── EditorialHeading
├── EditorialBody
└── EditorialCaption

Contact
├── EditorialHeading
├── EditorialBody
├── AccentButton
└── SecondaryButton

Footer
└── EditorialCaption
    (SectionDivider above if needed)
```

> **Focused list:** `Newsletter` and `Loader` components are deliberately excluded. No other components should be added without stakeholder approval.
