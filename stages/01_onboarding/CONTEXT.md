---
type: StageContract
stage_id: "01_onboarding"
name: Project Kickoff & Context Compilation
inputs:
  - setup/comfort_scifi_blueprint.md
outputs:
  - stages/01_onboarding/output/preferences.json
  - stages/01_onboarding/output/bible/
---

# Stage 01: Onboarding Context

## Process
1. Execute the Onboarding Wizard script (`node scripts/saga.js wizard onboard`).
2. Guide the user step-by-step through the active questionnaire blueprint questions.
3. Save the serialized responses, character seeds, and world rules to `stages/01_onboarding/output/`.
