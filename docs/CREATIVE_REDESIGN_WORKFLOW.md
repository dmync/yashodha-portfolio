# Creative Redesign Workflow

**Status:** Architecture approved and implemented (`ARCHITECTURE-CREATIVE-TEAM-001`). No redesign has been started.

This document defines the human-in-the-loop workflow for a FUTURE original visual redesign of the portfolio. The current portfolio implementation is COMPLETE and FROZEN. This workflow is additive: it does not change the approved 10-section structure, design tokens, palette, assets, multimedia content, or any existing agent responsibility.

## Purpose

Two new read-only specialist agents extend the existing OpenCode V2 multi-agent architecture:

- `creative-director` — brand discovery, creative direction, visual identity, art direction, typography/colour direction, editorial/Swiss/brutalist exploration, visual storytelling, reference analysis, and three genuinely different visual concepts. Produces direction only; never implements production frontend code.
- `ui-ux-designer` — UX research, information architecture, user journeys, wireframes, page layouts, responsive design, hierarchy, grid/spacing, component specs, interaction design, accessibility, design systems, visual prototypes, and Figma handoff. Follows the approved Creative Director direction; never implements production frontend code.

All eight existing agents (cto, frontend, backend, database, project-manager, qa, reviewer, security) keep their original responsibilities.

## Workflow (gates enforced)

| # | Owner | Action | Gate |
|---|---|---|---|
| 1 | CTO | Coordinate the task; keep the existing site unchanged | — |
| 2 | `creative-director` | Read-only investigation of the portfolio; develop three different creative directions | No code, no file writes |
| 3 | **Developer** | Select a direction | **Human gate** — no step 4 until selected |
| 4 | `ui-ux-designer` | Wireframes and visual prototypes following the approved direction | No code, no file writes; no Figma writes |
| 5 | **Developer** | Approve the design | **Human gate** — no step 6 until approved |
| 6 | `frontend` | Implement the approved design under normal edit approvals | Only after step 5 |
| 7 | `qa` | Functional and responsive testing | — |
| 8 | `reviewer` | Check implementation against the approved visual design | Load `web-design-guidelines` |
| 9 | CTO | Final verification, documentation updates, logging | — |

Steps 3 and 5 cannot be skipped. The developer is the final decision-maker.

## Permission boundaries

- Both new agents are `mode: subagent` with resolved permissions that DENY `edit` (edit/write/patch), `shell`, `subagent`, and all `figma_*` MCP actions. They can READ documentation and LOAD approved skills.
- Global configuration is unchanged: `default_agent: cto`, `subagent_depth: 1`, `edit: ask`, `shell: ask`. `opencode.jsonc` and global config were not modified.
- Existing permission rules for all eight existing agents are unchanged (apart from the additive CTO orchestration text).

## Figma boundary (future — NOT approved)

Figma MCP write-capable tools are UNAVAILABLE. No Figma MCP is configured, no Figma skills are installed, and no Figma file may be created or modified without a separate explicit developer approval. All `figma_*` actions are denied for the two new agents.

When Figma is separately approved, the required skill prerequisites are:
1. `figma-use` — MANDATORY before every `use_figma` call (pass `skillNames: "figma-use"`).
2. `figma-generate-design` — required alongside `figma-use` for full pages/screens, reusing the published design system via `search_design_system`.

Note: `figma-use-motion` could not be verified in the `openai/skills` curated catalog during investigation and must not be relied upon until its source and prerequisites are confirmed.

## Skills mapping

| Agent | Primary | Supporting | Excluded |
|---|---|---|---|
| `creative-director` | `documentation-first` | `frontend-design`, `web-design-guidelines`, `development-workflow`, `logging` | `webapp-testing`, Figma skills, implementation |
| `ui-ux-designer` | `documentation-first`, `frontend-design`, `web-design-guidelines` | `development-workflow`, `logging`; gated Figma skills | `webapp-testing` |

Superpowers was evaluated and is NOT installed: its auto-triggering `brainstorming` / `writing-plans` / `subagent-driven-development` workflows conflict with this project's human-in-the-loop gates, and `using-git-worktrees` is inapplicable because this project is not a Git repository.

## Deferred / out of scope

- No redesign started; no frontend implementation from this workflow.
- No Figma file creation or modification; no Figma MCP or skill installation.
- No Superpowers installation; no installation of any additional skill.
- No change to portfolio source code, design tokens, assets, multimedia content, or other documentation.
- No deployment or publishing.
