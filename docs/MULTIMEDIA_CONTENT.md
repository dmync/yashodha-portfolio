# Multimedia Content

**Status:** Inventory for MULTIMEDIA-INTEGRATION-001 (implementation complete) + MULTIMEDIA-PROJECTS-001 (duplicate video fix, PrettyPick copy update and unique video posters complete; verified and deployed 2026-11-19)  
**Scope:** Supporting evidence only. Software development remains the portfolio’s primary focus; multimedia lives inside Section 5.  
**Approval:** Developer approved the consolidated task plan on 2026-11-18 (recorded in `logs/tasks/MULTIMEDIA-INTEGRATION-001.md`). The 2026-11-19 update and its publication/verification scope were approved by the developer in the task request (recorded in `logs/tasks/MULTIMEDIA-PROJECTS-001.md`).

## Identity note

- **Confirmed student ID:** `MMW/23/B1/05`.
- The string `MMW/23/01/05` appears in `D:\UOVT\SEMESTER-3\vedio\MMW-23-B1-05\details.docx` and is a **documented discrepancy**. Never use it in portfolio copy.
- The confirmed ID is recorded here for internal content traceability only; it is not used as visible portfolio copy.

## Publication gate

- Authorship of the listed videos and artwork was confirmed by the developer.
- **Third-party music and participant consent are specific clearance considerations, not ownership problems.** The portfolio is publicly deployed at the developer's direction (live since 2026-11-18). Treat any residual music/participant clearance as an outstanding governance item to revisit; no new claims about clearance are made here.
- Video covers/posters are **implemented** as of MULTIMEDIA-PROJECTS-001. Each VideoCard keeps native controls with `preload="metadata"`, `playsInline`, no autoplay, and now has a unique `poster` frame extracted from its own video. This supersedes the earlier "posters deferred" decision.
- Still derivatives for the short 2D/3D clips exist in `public/assets/` but are not rendered as covers yet (unchanged).

---

## 1. Video Production — three VideoCards

| Path | Poster | UI use | Role | Tool / method | Rights note |
|---|---|---|---|---|---|
| `/assets/video/MMW-23-B1-05.mp4` | `/assets/video/posters/poster-care-film.jpg` | VideoCard: Care is also a way of saying “I love you” | Script, direction and editing | Video production / editing | Developer-authored coursework. Contains credited cast and may contain third-party music; consent and music clearance remain an open governance item. |
| `/assets/video/MMW-23-B1-05-MOV.mp4` | `/assets/video/posters/poster-music-video.jpg` | VideoCard “Music Video” | Course production edit | Video editing | Transcoded from the developer-specified `MMW-23-B1-05.MOV` coursework source. Developer-authored; third-party music is a clearance consideration to revisit. |
| `/assets/video/MMW-23-B1-05-BTS.mp4` | `/assets/video/posters/poster-behind-scenes.jpg` | VideoCard “Behind the Scenes” | Behind-the-scenes footage | Video production | Developer-authored coursework. Visible participants require consent review; open governance item. |

### Duplicate fix and poster provenance (MULTIMEDIA-PROJECTS-001)

- The former `/assets/video/music-video.mp4` was **visually identical** to `/assets/video/MMW-23-B1-05.mp4` (frame fingerprints matched at 10 s, 60 s and 120 s despite different encodings), so two cards showed the same footage.
- The “Music Video” card now uses `/assets/video/MMW-23-B1-05-MOV.mp4`: an H.264 / AAC 1280×720 30 fps MP4 transcoded from the exact developer-specified source `D:\UOVT\SEMESTER-3\vedio\MMW-23-B1-05\MMW-23-B1-05.MOV` (281 MB HEVC, 1920×1080, 3:35). The 281 MB source is **not** committed (GitHub 100 MB file limit) and HEVC is not reliably browser-playable. The old duplicate file was removed once unreferenced.
- All three final videos were re-verified as distinct by frame fingerprint comparison (non-zero pairwise differences at 10 s, 60 s and 120 s).
- Each poster is a single real frame from **its own** video, extracted with ffmpeg: `poster-care-film.jpg` at 45 s (104 KB), `poster-music-video.jpg` at 25 s (65 KB), `poster-behind-scenes.jpg` at 45 s (67 KB). All are 1280×720 JPEG (16:9, matching the video aspect ratio), unique by SHA-256, and contain no AI-generated or stock imagery.

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

- `VideoCard.jsx` renders the three Video Production assets with native controls and an optional per-video `poster` image.
- `CreativeWorkCard.jsx` renders Digital Art, 2D/3D & VFX, and UI/UX assets.
- `ImageLightbox.jsx` displays all non-VideoCard images/video expansions with keyboard and focus handling.
- `CaseStudyCard.jsx` renders the diagram thumbnails and opens the same lightbox.
- Skills tags in **Multimedia & Creative**: **Adobe Photoshop**, **Krita** and **3ds Max** only. Unsupported, duplicative or discipline-only tags were removed from that group.
