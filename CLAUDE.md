# SAGA-ICM Workspace Instructions

Welcome to the SAGA Interpretable Context Methodology (ICM) Workspace. This repository is configured to be a fully portable, modular, and token-efficient novel engineering system.

## Workspace Layout
- `_config/`: Global configurations, style rules, and conventions (Layer 3).
- `setup/`: Questionnaires and blueprints for starting new projects (Layer 3).
- `stages/`: Process-specific folder boundaries (Layer 2 Stage contracts & Layer 4 Working artifacts).
  - `01_onboarding/`: Compiling premise, preferences, and characters.
  - `02_planning/`: Designing outlines, act beats, and scene shifts.
  - `03_drafting/`: Active, sensory chapter drafting.
  - `04_diagnostics_edits/`: Running diagnostic audits and copy-editing revisions.
  - `05_publishing/`: Compiling eBook containers and serial typeset formats.
- `scripts/`: Mechanical Node.js command-line wizards and diagnostics.

## CLI Core Commands (Pure Relative Paths)
- Start onboarding: `node scripts/saga.js wizard onboard --blueprint=comfort-scifi`
- Run stage pipeline: `node scripts/saga.js run-stage <stage_name>`
- Get pipeline status: `node scripts/saga.js status`
- Scan chapters for AI prose tells: `node scripts/saga.js audit [path]`

## Narrative Authenticity System (IMPORTANT — read before planning or drafting)
AI fiction is detectable at two layers; this workspace defends both:
- **Structural tells** (explained themes, no subplots, linear time, uniform resolutions) survive style editing (~94% detection post-edit, StoryScope arXiv:2604.03136). They are prevented at **Stage 02** via the Structural Authenticity Pass → `structure_plan.md`.
- **Prose tells** (embodied-emotion overload, smell overuse, triads, lexical slop, flat rhythm) are governed at **Stage 03** and scanned at **Stage 04** by `node scripts/saga.js audit`.

Rules live in `_config/narrative_authenticity.md` (source of truth) and `_config/narrative_audit_rubric.md` (structural self-check). Treat every rule as a dial, not a switch — uniform application is itself an AI fingerprint. Matching skills: `narrative-authenticity` (planning/drafting/review) and `structure-humanize` (repairing existing drafts).

## Claude Code Dual Profiles
We provide PowerShell launchers to switch between subscriptions cleanly:
- Launch standard Anthropic Claude Code: `powershell -File ./scripts/claude-vanilla.ps1`
- Launch OpenRouter Claude Code (e.g. Sonnet/free model): `powershell -File ./scripts/claude-openrouter.ps1`


## Model Execution Configurations (.env)

The SAGA-ICM system supports three backend execution patterns out-of-the-box:

### 1. Cloud-Hosted Gemini (Default)
Add your Gemini key:
```env
GEMINI_API_KEY=your_gemini_key_here
```

### 2. Local Edge Models (In-House Hosting)
You can run edge models locally without external internet connections:
- **Ollama (Recommended)**: Install Ollama and run `ollama run gemma2` or `ollama run llama3`.
- **llama.cpp / LM Studio**: Run the server locally on port 8080 or 1234.
Add to `.env`:
```env
LOCAL_MODEL=true
LOCAL_MODEL_URL=http://localhost:11434/v1/chat/completions # (Ollama default)
LOCAL_MODEL_NAME=gemma2 # (e.g. gemma2, llama3, etc.)
```

### 3. OpenRouter API (Cloud-Hosted Free Models)
To run models on OpenRouter (including free high-performance instruct models):
Add to `.env`:
```env
USE_OPENROUTER=true
OPENROUTER_API_KEY=your_openrouter_key_here
OPENROUTER_MODEL=meta-llama/llama-3-8b-instruct:free # (Defaults to Llama-3-8B free model)
```


