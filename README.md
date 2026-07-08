# SAGA-ICM — Novel Engineering Workspace

A portable, token-efficient system for writing novels with AI co-authors, built on the Interpretable Context Methodology (ICM): plain markdown contracts, staged folders, and mechanical CLI tools. No framework lock-in — any agent (Claude Code, Antigravity, etc.) that can read files can run the pipeline.

## The pipeline

| Stage | Folder | Produces |
|---|---|---|
| 1. Onboarding | `stages/01_onboarding/` | preferences, world bible, character seeds, **filled genre bible + trope stack** |
| 2. Planning | `stages/02_planning/` | **foolscap page**, outline, **structure plan** (incl. obligatory-scene ledger), continuity trackers, scene beats |
| 3. Drafting | `stages/03_drafting/` | chapter prose |
| 4. Diagnostics & Edits | `stages/04_diagnostics_edits/` | audit reports, revision playbooks |
| 5. Publishing | `stages/05_publishing/` | HTML / EPUB manuscript |

Each stage has a `CONTEXT.md` contract declaring its inputs, outputs, and process, with output skeletons in `_config/templates/` so every executor produces identical artifacts. Planning starts from a **foolscap page** (Story Grid / Pressfield): the whole book on one sheet before any outline exists.

## Built for agent harnesses

This system is designed to be driven by a high-level coding agent — Claude Code, Codex, Antigravity, Gemini CLI, Hermes, Pi, or similar. **`AGENTS.md` is the canonical instruction set** (`CLAUDE.md`/`GEMINI.md` are pointers to it); point your agent at the repo and it knows the rules. The agent IS the model: it runs the onboarding interview in chat, plans, drafts, and audits directly — **no API key required**. Two conveniences:

- `node scripts/saga.js run-stage <id>` compiles a **stage packet** — the contract plus every declared input and template in one block — for the agent (or an API pipeline) to consume.
- The mechanical tools (`audit`, `status`, `init`) never call a model at all.

External model APIs (local Ollama, OpenRouter, Gemini — see `LOCAL_SETUP.md`) remain available as a secondary executor for the terminal wizard and headless/batch runs.

## Quick start

```bash
# scaffold a fresh project in an empty folder
node "path/to/saga-icm/scripts/saga.js" init
npm install
```

Then, **with an agent**: say *"read AGENTS.md and onboard me for a new novel"* — it interviews you in chat, fills the genre bible, and the pipeline proceeds stage by stage (*"run stage 02"*, etc.).

**Without an agent** (terminal + API backend in `.env`):
```bash
node scripts/saga.js wizard onboard --blueprint=comfort-scifi
node scripts/saga.js status        # progress anytime
node scripts/saga.js audit         # scan drafts for AI prose tells
```

## The authenticity system (what makes this different)

Most "make it sound less AI" advice targets word choice. Research on AI fiction detection (StoryScope, arXiv:2604.03136) shows that's only half the problem: AI stories remain detectable at ~94% accuracy from **narrative structure alone** — explained themes, tidy single-track plots, linear time, uniform resolutions — even after professional style editing. Structure has to be fixed where it's created: at the outline.

SAGA-ICM therefore defends both layers:

- **Planning time (Stage 02)** — a mandatory Structural Authenticity Pass forces human-typical choices (subplots, nonlinear disclosure, resolution variety, moral ambivalence, escalation contour) and records them in `structure_plan.md`.
- **Drafting time (Stage 03)** — prose rules govern emotion-mode rotation, sensory budgets, character introductions, and lexical anti-slop.
- **Edit time (Stage 04)** — `node scripts/saga.js audit` mechanically counts prose tells; `_config/narrative_audit_rubric.md` scores the structural features no scanner can count. Structural failures route back to planning, because line edits can't fix them.

The full rule set lives in `_config/narrative_authenticity.md`. Everything is a dial, not a switch: the rules are statistical tendencies of human fiction, and applying them uniformly would create its own machine fingerprint.

Two Claude Code skills ship with the repo (`.claude/skills/`): **narrative-authenticity** (applies the rules during planning/drafting/review) and **structure-humanize** (diagnoses and repairs structural tells in existing drafts).

## The trope system

`setup/genre_bibles/` holds fill-in series templates for five commercial genre clusters (romance/romantasy, rom-com, cozy, thriller/mystery, fantasy/SF/horror). Each defines a flagship **trope stack**, a chapter-level beat sheet with obligatory scenes, and continuity trackers. Stage 01 selects and fills a bible with the author; Stage 02 schedules every promised beat in an **obligatory-scene ledger**; Stage 04 audits delivery. Tropes and authenticity coexist by altitude: the trope stack is the reader contract and is never subverted — the authenticity dials roughen the connective tissue around it, which is where AI tells actually live. See `setup/genre_bibles/INDEX.md`.

## Layout

- `_config/` — global style + authenticity rules (Layer 3 context)
- `setup/` — onboarding questionnaires/blueprints; `genre_bibles/` trope-stack templates
- `stages/01–05/` — stage contracts and working artifacts
- `scripts/` — mechanical Node.js CLI (`saga.js`, wizards, `narrative_audit.js`)
- `.claude/skills/` — portable agent skills

License: MIT
