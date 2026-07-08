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
  - stages/02_planning/output/outline.md
  - stages/02_planning/output/structure_plan.md
  - stages/02_planning/output/trackers/
  - stages/02_planning/output/beats/
---

# Stage 02: Planning Beat Sheets

## Process
1. Initialize the outline on the chassis of the filled genre bible's beat sheet (`stages/01_onboarding/output/bible/genre_bible.md`); fall back to a generic structure (Three-Act, Save the Cat) only if no genre bible exists.
2. Generate outline beat structures inside `stages/02_planning/output/outline.md`.
3. **Trope Delivery Pass** — schedule the reader contract:
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
5. Create individual scene beat files in `stages/02_planning/output/beats/` outlining:
   - Story Grid 5 Commandments (Inciting Incident, Turning Point, Crisis, Climax, Resolution).
   - 4-Step Narrative Addiction Loop (Stakes, Big Question, Head Fake, Rehook).
   - Camera zoom levels (High, Medium, Low Viscosity) — varied across scenes, per the escalation contour.
   - The structural dials from `structure_plan.md` that apply to this scene (anachrony, subplot touchpoints, emotion-mode emphasis), plus any obligatory-scene ledger entry scheduled here.

## Verification
- `structure_plan.md` exists, contains the obligatory-scene ledger (step 3), and answers every bullet in step 4.
- Reject any outline where a ledgered obligatory scene is unscheduled, all arcs resolve the same way, no subplot exists, or the escalation contour is monotonic.
