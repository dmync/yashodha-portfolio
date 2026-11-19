# Multimedia Content

**Status:** Inventory for MULTIMEDIA-INTEGRATION-001 (frontend integration complete; publication deferred)  
**Scope:** Supporting evidence only. Software development remains the portfolio’s primary focus; multimedia lives inside Section 5.  
**Approval:** Developer approved the consolidated task plan on 2026-11-18 (recorded in `logs/tasks/MULTIMEDIA-INTEGRATION-001.md`).

## Identity note

- **Confirmed student ID:** `MMW/23/B1/05`.
- The string `MMW/23/01/05` appears in `D:\UOVT\SEMESTER-3\vedio\MMW-23-B1-05\details.docx` and is a **documented discrepancy**. Never use it in portfolio copy.
- The confirmed ID is recorded here for internal content traceability only; it is not used as visible portfolio copy.

## Publication gate

- Authorship of the listed videos and artwork was confirmed by the developer.
- **Third-party music and participant consent are specific clearance considerations, not ownership problems.** They must still be checked before public deployment.
- Do **not** publish or deploy the multimedia band until those checks are cleared.
- Video covers/posters are deferred. The UI therefore uses native video controls with `preload="metadata"`, `playsInline`, no autoplay and no `poster` attribute.
- Still derivatives for the short 2D/3D clips exist in `public/assets/` but are not rendered as covers yet.

---

## 1. Video Production — three VideoCards

| Path | UI use | Role | Tool / method | Rights note |
|---|---|---|---|---|
| `/assets/video/MMW-23-B1-05.mp4` | VideoCard: Care is also a way of saying “I love you” | Script, direction and editing | Video production / editing | Developer-authored coursework. Contains credited cast and may contain third-party music; obtain participant consent and music clearance before publishing. |
| `/assets/video/music-video.mp4` | VideoCard “Music Video” | Course production edit | Video editing | Developer-authored coursework. Third-party music is a specific clearance consideration; do not publish until cleared. |
| `/assets/video/MMW-23-B1-05-BTS.mp4` | VideoCard “Behind the Scenes” | Behind-the-scenes footage | Video production | Developer-authored coursework. Visible participants require consent review before publishing. |

---

## 2. Digital Art & Graphic Design — CreativeWorkCards

| Path | UI use | Role | Tool | Rights note |
|---|---|---|---|---|
| `/assets/images/creative/krita-child-ball.png` | “Child with Ball” | Character study | Krita | Developer-authored coursework; no known third-party assets. Review recognizable subject consent before publishing. |
| `/assets/images/creative/krita-walkcycle.png` | “Walk Cycle” | Animation study frames | Krita | Developer-authored coursework; no known third-party assets. |
| `/assets/images/creative/krita-rose.png` | “Rose” | Painting study | Krita | Developer-authored coursework; no known third-party assets. |
| `/assets/images/creative/krita-staircase.png` | “Staircase” | Perspective study | Krita | Developer-authored coursework; no known third-party assets. |
| `/assets/images/creative/photoshop-MMW-23-B1-05.png` | “Video Production Poster” | Poster layout and compositing | Photoshop | Developer-authored coursework. Review any third-party imagery, fonts or credited material before publishing. |

---

## 3. 2D/3D & VFX — CreativeWorkCards with lightbox

| Path | UI use | Role | Tool / method | Rights note |
|---|---|---|---|---|
| `/assets/images/creative/2d3d-animate.mp4` | “Animate Clip” | Short animation study | 2D/3D animation | Developer-authored coursework; no known third-party assets. |
| `/assets/images/creative/2d3d-animate.png` | Not rendered yet — still derivative for a future cover | Still frame from the animation study | 2D/3D animation export | Same status as the clip; covers/posters deferred. |
| `/assets/images/creative/2d3d-cv.mp4` | “CV Clip” | Short 3D/VFX study | 3D / visual effects | Developer-authored coursework; no known third-party assets. |
| `/assets/images/creative/2d3d-cv.png` | Not rendered yet — still derivative for a future cover | Still frame from the 3D/VFX study | 3D/VFX export | Same status as the clip; covers/posters deferred. |

---

## 4. UI/UX Design — Gates & Fences before/after

| Path | UI use | Role | Tool / method | Rights note |
|---|---|---|---|---|
| `/assets/images/uiux/gates-before.png` | “Gates & Fences — Before” | Original interface screen | UI/UX design / Figma handoff | Confirm licensing for any third-party imagery or fonts embedded in the mockup before publishing. |
| `/assets/images/uiux/gates-after-1.png` | “Gates & Fences — After 1” | Redesigned interface screen | UI/UX design / Figma handoff | Same check as above. |
| `/assets/images/uiux/gates-after-2.png` | “Gates & Fences — After 2” | Redesigned interface screen | UI/UX design / Figma handoff | Same check as above. |
| `/assets/images/uiux/gates-after-3.png` | “Gates & Fences — After 3” | Redesigned interface screen | UI/UX design / Figma handoff | Same check as above. |

---

## 5. Case-study diagrams — thumbnails inside existing cards

| Path | UI use | Role | Tool / method | Rights note |
|---|---|---|---|---|
| `/assets/images/diagrams/spes-eer.png` | SPES card thumbnail → lightbox | Entity-relationship diagram | UML / data modelling | Developer-authored university assignment. Review organization-name references before publishing. |
| `/assets/images/diagrams/spes-class.png` | SPES card thumbnail → lightbox | Class diagram | UML / class modelling | Same check as above. |
| `/assets/images/diagrams/spes-flow.png` | SPES card thumbnail → lightbox | Process flow diagram | Flowcharting | Same check as above. |
| `/assets/images/diagrams/spes-module.png` | SPES card thumbnail → lightbox | Module diagram | Modular decomposition | Same check as above. |
| `/assets/images/diagrams/ctms-flowchart.png` | CTMS card thumbnail → lightbox | Tournament/match flowchart | Flowcharting | Developer-authored university assignment; no known third-party assets. |

---

## Component mapping

- `VideoCard.jsx` renders the three Video Production assets with native controls.
- `CreativeWorkCard.jsx` renders Digital Art, 2D/3D & VFX, and UI/UX assets.
- `ImageLightbox.jsx` displays all non-VideoCard images/video expansions with keyboard and focus handling.
- `CaseStudyCard.jsx` renders the diagram thumbnails and opens the same lightbox.
- Skills tags in **Multimedia & Creative**: **Adobe Photoshop**, **Krita** and **3ds Max** only. Unsupported, duplicative or discipline-only tags were removed from that group.
