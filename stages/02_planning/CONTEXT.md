---
type: StageContract
stage_id: "02_planning"
name: Beat Sheet Planning & Narrative Structures
inputs:
  - stages/01_onboarding/output/preferences.json
  - stages/01_onboarding/output/bible/
  - stages/01_onboarding/output/bible/genre_bible.md
  - setup/genre_bibles/INDEX.md
  - _config/narrative_authenticity.md
outputs:
  - stages/02_planning/output/foolscap.md
  - stages/02_planning/output/outline.md
  - stages/02_planning/output/structure_plan.md
  - stages/02_planning/output/trackers/
  - stages/02_planning/output/beats/
  - stages/02_planning/output/canon.md
  - stages/02_planning/output/voice_exemplars.md
  - manuscript.json
templates:
  - _config/templates/foolscap.template.md
  - _config/templates/structure_plan.template.md
  - _config/templates/scene_beat.template.md
  - _config/templates/manuscript.template.json
  - _config/templates/canon.template.md
  - _config/templates/voice_exemplars.template.md
---

# Stage 02: Planning Beat Sheets

## Process
1. **Foolscap first** — fill `_config/templates/foolscap.template.md` → `stages/02_planning/output/foolscap.md`: the whole book on one page (genres, trope stack, protagonist engine, controlling idea, three movements × five commandments, promised scenes). If it won't fit on one page, the story isn't understood yet — resolve that with the user before outlining. Every later artifact must agree with the foolscap; when they diverge, update the foolscap deliberately, never silently.
2. Expand the foolscap into outline beat structures inside `stages/02_planning/output/outline.md`, on the chassis of the filled genre bible's beat sheet (`stages/01_onboarding/output/bible/genre_bible.md`); fall back to a generic structure (Three-Act, Save the Cat) only if no genre bible exists.
3. **Trope Delivery Pass** — schedule the reader contract (write `structure_plan.md` from `_config/templates/structure_plan.template.md`):
   - Build the **obligatory-scene ledger** in `structure_plan.md`: every beat the trope stack promises (the genre bible's beat sheet and "obligatory" markers) → scheduled chapter → delivery position vs. the bible's percentage targets. These entries are the reader contract — the authenticity dials in step 4 may roughen everything *around* them but may never delete or invert them (see "Tropes vs. the authenticity directive" in `setup/genre_bibles/INDEX.md`).
   - Instantiate the bible's continuity trackers (lore-debt ledger, heat ladder, fair-play audit, comfort-contract audit — whichever the chosen bible defines) as living files in `stages/02_planning/output/trackers/`.
4. **Structural Authenticity Pass** — apply Layer 1 of `_config/narrative_authenticity.md` to the outline and record every decision in `stages/02_planning/output/structure_plan.md`:
   - **Subplot map**: at least two subplots; note each one's integration mode (thematically parallel / contrasting / loose) — at least one must NOT tightly serve the central theme.
   - **Nonlinearity plan**: where flashbacks, time skips, or achronological ordering land; which key fact each one delays; the one revelation per book that forces re-reading of earlier scenes.
   - **Resolution variety table**: for each arc, how it resolves (protagonist choice / external fate / other characters / unresolved) — they must not all be protagonist-choice; "quiet internal acceptance" closes at most one major arc.
   - **Moral ambivalence beats**: the protagonist decisions a reader could reasonably condemn.
   - **Intertextual anchors**: named works, brands, places, songs (real or invented in-world) the story will cite specifically, and where.
   - **Escalation contour**: per-chapter intensity values (1–5) forming a deliberately uneven line — quiet chapters, spikes, false peaks. No flat or evenly-rising contour.
   - **Loose-end ledger**: threads intentionally left unresolved, so Stage 04 doesn't "fix" them.
   - **Anti-default decisions** (template §10): for every major beat (act turns, midpoint, arc climaxes, endings), generate THREE candidate approaches. Presume the first is the AI default — the choice every model converges on — and discard it unless you can argue it is genuinely the rarest. Log default vs. chosen. This directly attacks the measured convergence of AI stories into a shared narrative region; obligatory-scene ledger entries are exempt (the beat must land, but *how* it lands still gets three candidates).
5. Create individual scene beat files in `stages/02_planning/output/beats/` (one per chapter, from `_config/templates/scene_beat.template.md`) outlining:
   - Story Grid 5 Commandments (Inciting Incident, Turning Point, Crisis, Climax, Resolution).
   - 4-Step Narrative Addiction Loop (Stakes, Big Question, Head Fake, Rehook).
   - Camera zoom levels (High, Medium, Low Viscosity) — varied across scenes, per the escalation contour.
   - The structural dials from `structure_plan.md` that apply to this scene (anachrony, subplot touchpoints, emotion-mode emphasis), plus any obligatory-scene ledger entry scheduled here.

6. **Initialize the production ledger and living reference docs**:
   - `manuscript.json` (project root, from `_config/templates/manuscript.template.json`): one entry per planned chapter — beat file, draft path, POV, escalation (from the contour), target words (from the genre bible), `status: planned`. This ledger drives the per-chapter production loop; `node scripts/saga.js status` reads it.
   - `stages/02_planning/output/canon.md` (from `canon.template.md`): seed with every hard fact already established in the world bible and character files (names/spellings, world rules, starting numbers).
   - `stages/02_planning/output/voice_exemplars.md` (from `voice_exemplars.template.md`): seed each POV's register line and the character files' sample dialogue; real exemplars accumulate as chapters pass Stage 04.

## Verification
- `foolscap.md` exists, fits one page, and agrees with the outline.
- `structure_plan.md` exists, follows its template, contains the obligatory-scene ledger (step 3), and answers every bullet in step 4 — including three logged candidates per major beat.
- `manuscript.json` exists with one entry per beat file; `canon.md` and `voice_exemplars.md` are seeded.
- Reject any outline where a ledgered obligatory scene is unscheduled, all arcs resolve the same way, no subplot exists, or the escalation contour is monotonic.
