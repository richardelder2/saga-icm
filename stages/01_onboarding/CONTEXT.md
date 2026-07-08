---
type: StageContract
stage_id: "01_onboarding"
name: Project Kickoff & Context Compilation
inputs:
  - setup/comfort_scifi_blueprint.md
  - setup/genre_bibles/INDEX.md
outputs:
  - stages/01_onboarding/output/preferences.json
  - stages/01_onboarding/output/bible/world_bible.md
  - stages/01_onboarding/output/bible/genre_bible.md
  - stages/01_onboarding/output/characters/
---

# Stage 01: Onboarding Context

Two execution paths produce **identical artifacts**. Path A is preferred whenever an agent harness (Claude Code, Codex, Antigravity, …) is present; Path B is the fallback for terminal-only or headless use.

## Path A — Agent-led interview (no API key required)
1. Load the active questionnaire blueprint from `setup/` (default: `comfort_scifi_blueprint.md`; honor the user's choice of any other blueprint).
2. Ask the blueprint's questions **one at a time in chat**, in order. After each answer, play the blueprint's coach persona yourself (for the sci-fi blueprint: encouraging, validates hard-science plausibility, ≤ 3 sentences of feedback) — then ask the next question. Adaptive follow-ups are allowed; skipping questions is not.
3. Reserve the blueprint's final synthesis items for the end: synthesize all answers into the concept summary + logline, present them for approval, and revise until approved.
4. Continue to Trope Discovery (below), then write the Output Artifacts exactly as specified.

## Path B — Terminal wizard (needs a model backend in `.env`)
1. Run `node scripts/saga.js wizard onboard [--blueprint=<name>]`.
2. The wizard asks the same questions via readline, coaches via the configured model, and writes the same artifacts (steps 3–4 of Path A still apply if run inside an agent session afterward).

## Trope Discovery (both paths, agent-led)
1. Open `setup/genre_bibles/INDEX.md`; select the genre bible matching the project (or the nearest chassis, adapted).
2. Confirm the **trope stack** with the user — [dynamic] + [situation] + [flavor] — or assemble a custom stack in that format.
3. Fill the bible's SERIES BIBLE section with the user, every `[FIELD]`. Apply the bibles' own gate: *if a field is hard to fill, the concept isn't ready* — loop back rather than leaving blanks.

## Output Artifacts (exact conventions — Stage 02 depends on these)
1. **`output/preferences.json`**:
   ```json
   {
     "blueprint": "setup/<blueprint file>",
     "genre_bible": "setup/genre_bibles/<bible file>",
     "trope_stack": "<dynamic> + <situation> + <flavor>",
     "responses": [ { "question": "...", "answer": "..." } ],
     "synthesis": "<approved concept summary>",
     "logline": "<approved logline>"
   }
   ```
2. **`output/bible/world_bible.md`** — frontmatter `type: WorldBible`, `genre`, `focus`, `last_modified`; body = the approved synthesis grouped into: Core Tech & World Rules · Setting & Aesthetic · Character Dynamics · Central Emergency & Stakes.
3. **`output/bible/genre_bible.md`** — the chosen genre bible template with every `[FIELD]` filled.
4. **`output/characters/<name>.md`** (one per lead) — frontmatter `type: CharacterProfile`, `name`, `role`, `discipline`, `flaw`, `status: Seeded`; body may include voice notes and 2–3 sample lines of that character's dialogue register.
