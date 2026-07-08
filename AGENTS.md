# SAGA-ICM — Agent Instructions (canonical)

This file is the canonical instruction set for ANY coding/writing agent operating in this workspace (Claude Code, Codex, Antigravity, Gemini CLI, Hermes, Pi, …). `CLAUDE.md` and `GEMINI.md` are thin pointers to this file.

SAGA-ICM is a portable novel-engineering system built on the Interpretable Context Methodology: plain-markdown stage contracts, mechanical Node.js scripts, and **you — the agent — as the primary executor**. External model APIs are an optional secondary executor for headless/batch runs; nothing requires them when an agent is present.

## How to execute the pipeline

Five stages, each with a `CONTEXT.md` contract declaring inputs, outputs, and process:

| Stage | Purpose |
|---|---|
| `stages/01_onboarding/` | Interview the author; produce preferences, world bible, characters, filled genre bible + trope stack |
| `stages/02_planning/` | Foolscap page → outline → structure plan (obligatory-scene ledger + authenticity dials) → scene beats |
| `stages/03_drafting/` | Draft chapters against beats, voice guide, and authenticity prose rules |
| `stages/04_diagnostics_edits/` | Mechanical + judgment audits; revision playbooks; route failures back |
| `stages/05_publishing/` | Compile manuscript (HTML/EPUB) |

To run a stage: `node scripts/saga.js run-stage <id>` prints a **stage packet** — the contract plus every declared input file — as a single context block. Consume it, execute the contract's Process section, and write outputs to the declared paths, using the matching template in `_config/templates/` where one exists. Or simply read the contract and input files yourself; the packet is a convenience, not a requirement.

## Agent-led onboarding (no API key needed)

When the user asks to start a new novel/project, DO NOT tell them to run the terminal wizard — run the interview yourself in chat, per `stages/01_onboarding/CONTEXT.md` Path A: ask the blueprint questions one at a time, play the encouraging domain-expert coach between answers, then perform trope discovery from `setup/genre_bibles/INDEX.md` and write the exact output artifacts the contract specifies. The terminal wizard (`node scripts/saga.js wizard onboard`) is the fallback for users working outside an agent harness.

## Non-negotiable craft rules

1. **`_config/narrative_authenticity.md` governs all planning and prose.** Structural AI tells (explained themes, no subplots, linear time, uniform resolutions) must be prevented at Stage 02 — they cannot be edited out later. Prose tells are governed at Stage 03 and scanned at Stage 04 (`node scripts/saga.js audit`). Every rule is a dial, not a switch; uniform application is itself an AI fingerprint.
2. **Tropes outrank dials.** If `stages/01_onboarding/output/bible/genre_bible.md` exists, its trope stack and obligatory-scene ledger are a reader contract: never delete, weaken, or "subvert" a ledgered beat. Authenticity rules govern the connective tissue around those beats. See `setup/genre_bibles/INDEX.md`.
3. **Templates fix conventions.** Outputs named in a contract that have a template in `_config/templates/` must follow that template's structure, so any agent can resume any project.
4. **The narrator never states the theme.** (Worth repeating outside the config file — it is the single strongest AI marker.)

## CLI reference (mechanical, no AI calls except the wizard)

- `node scripts/saga.js init` — scaffold a clean project elsewhere (run from the empty target folder)
- `node scripts/saga.js status` — per-stage pipeline status
- `node scripts/saga.js run-stage <id>` — print the compiled stage packet
- `node scripts/saga.js audit [path ...]` — scan chapters for AI prose tells → reports in `stages/04_diagnostics_edits/output/reports/`
- `node scripts/saga.js wizard onboard [--blueprint=<name>]` — terminal onboarding (needs a model backend in `.env`; agents use Path A instead)

## Layout

- `_config/` — style + authenticity rules, audit rubric, `templates/` output skeletons
- `setup/` — questionnaires/blueprints; `genre_bibles/` trope-stack series templates + INDEX
- `stages/01–05/` — contracts (`CONTEXT.md`) and working artifacts (`output/`)
- `scripts/` — `saga.js` CLI, wizards, `narrative_audit.js`, model helper, Claude Code launchers
- `.claude/skills/` — Claude Code skill wrappers (content lives in `_config/`; other agents just read those files directly)

## Model backends (optional — only for the terminal wizard / headless scripts)

Configure `.env` per `LOCAL_SETUP.md`: local Ollama/llama.cpp, OpenRouter, or Gemini. Agents executing stages natively need none of this.
