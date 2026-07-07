---
type: StageContract
stage_id: "03_drafting"
name: Sensory Drafting
inputs:
  - stages/02_planning/output/beats/
  - stages/02_planning/output/structure_plan.md
  - _config/voice.md
  - _config/narrative_authenticity.md
outputs:
  - stages/03_drafting/output/chapters/
---

# Stage 03: Drafting Prose

## Process
1. Read the beat sheet for the target chapter from `stages/02_planning/output/beats/` AND the chapter's entry in `stages/02_planning/output/structure_plan.md` (escalation value, anachrony assignments, subplot touchpoints).
2. Generate active, sensory prose following the beats, the style guide (`_config/voice.md`), and **Layer 2 (prose rules) of `_config/narrative_authenticity.md`**. In particular:
   - Rotate emotion modes: explicit label / behavioral cue / embodied sensation. Embodied carries at most ~2 of 5 emotion beats; plainly naming a feeling is allowed and encouraged.
   - Sensory budget: one or two senses per scene, chosen by POV relevance; smell only when it earns its place.
   - Introduce characters in action or dialogue, not external description.
   - Setting stays mostly indifferent to mood — no reflexive pathetic fallacy.
   - Prefer dialogue over narration when either would work; let characters interrupt and talk past each other.
   - The narrator never states the theme or the lesson.
   - Vary sentence and paragraph length aggressively; ration triads and em-dashes.
3. Apply Layer 3 fingerprint counters (escalation contour, register shifts between chapters, no unplanned epilogue).
4. Save drafts to `stages/03_drafting/output/chapters/`.
5. Self-check before hand-off: run `node scripts/saga.js audit` on the new chapter and fix red flags before Stage 04.
