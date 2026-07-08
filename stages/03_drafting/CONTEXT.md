---
type: StageContract
stage_id: "03_drafting"
name: Sensory Drafting
inputs:
  - stages/02_planning/output/beats/
  - stages/02_planning/output/structure_plan.md
  - stages/02_planning/output/canon.md
  - stages/02_planning/output/voice_exemplars.md
  - manuscript.json
  - _config/voice.md
  - _config/narrative_authenticity.md
outputs:
  - stages/03_drafting/output/chapters/
---

# Stage 03: Drafting Prose

## Process
1. **Load the chapter kit** for the target chapter (the next `status: planned` entry in `manuscript.json`, unless the user names one):
   - Its beat sheet from `stages/02_planning/output/beats/` and its `structure_plan.md` entries (escalation value, anachrony, subplot touchpoints, ledgered obligatory scenes).
   - **Canon** (`stages/02_planning/output/canon.md`): every fact drafted must agree with it — names/spellings, world rules, object states, numbers, timeline, who-knows-what.
   - **Voice kit** (anti-drift, mandatory): `voice_exemplars.md` PLUS the final ~500 words of the previous chapter's draft. Calibrate to these before writing a word; they are targets, not text to copy.
2. Generate active, sensory prose following the beats, the style guide (`_config/voice.md`), and **Layer 2 (prose rules) of `_config/narrative_authenticity.md`**. In particular:
   - Rotate emotion modes: explicit label / behavioral cue / embodied sensation. Embodied carries at most ~2 of 5 emotion beats; plainly naming a feeling is allowed and encouraged.
   - Sensory budget: one or two senses per scene, chosen by POV relevance; smell only when it earns its place.
   - Introduce characters in action or dialogue, not external description.
   - Setting stays mostly indifferent to mood — no reflexive pathetic fallacy.
   - Prefer dialogue over narration when either would work; let characters interrupt and talk past each other.
   - The narrator never states the theme or the lesson.
   - Vary sentence and paragraph length aggressively; ration triads and em-dashes.
3. Apply Layer 3 fingerprint counters (escalation contour, register shifts between chapters, no unplanned epilogue).
4. Save the draft to the `draft_file` path declared in `manuscript.json`.
5. **Bookkeeping** (required before the chapter counts as drafted):
   - Set the chapter's `status` to `drafted` in `manuscript.json`.
   - Append every NEW hard fact the draft establishes (names, numbers, object states, timeline days, knowledge changes) to `canon.md`, each tagged `[unverified chN]` — Stage 04 verifies and untags.
6. Self-check: run `node scripts/saga.js audit` on the new chapter and fix red flags before hand-off to Stage 04.
