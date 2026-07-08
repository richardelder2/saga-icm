---
type: StageContract
stage_id: "01_onboarding"
name: Project Kickoff & Context Compilation
inputs:
  - setup/comfort_scifi_blueprint.md
  - setup/genre_bibles/INDEX.md
outputs:
  - stages/01_onboarding/output/preferences.json
  - stages/01_onboarding/output/bible/
  - stages/01_onboarding/output/bible/genre_bible.md
---

# Stage 01: Onboarding Context

## Process
1. Execute the Onboarding Wizard script (`node scripts/saga.js wizard onboard`).
2. Guide the user step-by-step through the active questionnaire blueprint questions.
3. **Trope discovery** (agent-led, after the questionnaire):
   - Open `setup/genre_bibles/INDEX.md` and select the genre bible matching the project (or the nearest chassis, adapted).
   - Confirm the **trope stack** with the user — [dynamic] + [situation] + [flavor] — or assemble a custom stack in that format.
   - Fill the bible's SERIES BIBLE section with the user, every `[FIELD]`. Apply the bibles' own gate: *if a field is hard to fill, the concept isn't ready* — loop back rather than leaving blanks.
   - Save the filled template to `stages/01_onboarding/output/bible/genre_bible.md`; record the chosen stack and bible path in `preferences.json`.
4. Save the serialized responses, character seeds, and world rules to `stages/01_onboarding/output/`.
