---
type: StageContract
stage_id: "04_diagnostics_edits"
name: Diagnostic Audits & Copy-Editing Revisions
inputs:
  - stages/03_drafting/output/chapters/
  - stages/02_planning/output/structure_plan.md
  - stages/02_planning/output/trackers/
  - stages/02_planning/output/canon.md
  - stages/02_planning/output/voice_exemplars.md
  - manuscript.json
  - _config/narrative_authenticity.md
  - _config/narrative_audit_rubric.md
---

# Stage 04: Diagnostics & Copy-Edits

## Process
1. **Mechanical scan**: run `node scripts/saga.js audit` (wraps `scripts/narrative_audit.js`). It writes per-chapter reports to `stages/04_diagnostics_edits/output/reports/` covering emotion-mode balance, olfactory density, dialogue ratio, sentence/paragraph rhythm variance, lexical tells, triad stacking, em-dash rate, and end-of-chapter moralizing — and records each chapter's verdict as `last_audit` in `manuscript.json`.
2. **Continuity check**:
   - Run `node scripts/saga.js continuity` (near-duplicate and orphaned proper nouns → `reports/continuity_names.md`).
   - Verify the chapter against `canon.md`: every `[unverified chN]` tag is checked against prior canon — on conflict the DRAFT loses unless the change is a deliberate amendment logged in canon's Amendments table. Untag verified facts and bump `last_verified_chapter`.
3. **Judgment audit**: score the manuscript against `_config/narrative_audit_rubric.md` (the structural features no scanner can count). Cross-check intentional loose ends against the `structure_plan.md` ledger so they are not "fixed."
4. **Trope delivery audit**: walk the obligatory-scene ledger in `structure_plan.md` — every promised beat delivered on page, at roughly the genre bible's percentage position, at full strength. Run the bible's own audits from `stages/02_planning/output/trackers/` (fair-play accounting, comfort-contract check, heat-ladder progression, lore-debt due dates). A missing or weakened obligatory scene is a **structural failure** — route to Stage 02/03, and never accept "we subverted it" as a fix for a reader-contract beat.
5. Execute legacy diagnostics (prose rhythm standard deviations, dialogue heat register analysis, character timeline resource tracking) and merge findings into the reports.
6. Generate developmental editorial reports inside `stages/04_diagnostics_edits/output/reports/`.
7. Create actionable editing playbooks inside `stages/04_diagnostics_edits/output/playbooks/` and execute them:
   - **Prose failures** → targeted line edits / Stage 03 redraft of flagged passages.
   - **Structural failures** (theme explained, no subplots, all-linear time, uniform resolutions) → route BACK to Stage 02 for re-planning. Do not attempt to fix structural tells with line edits; research shows style editing does not remove them.
8. **Bookkeeping**: set the chapter's `status` in `manuscript.json` — `audited` while findings are open, `passed` when the gate clears. On pass, consider harvesting one standout passage into `voice_exemplars.md` (keep 2–3 per POV, rotate stale ones out).

## Gate
A chapter passes to Stage 05 only when: mechanical scan shows no red flags, canon check is clean (no remaining `[unverified]` tags for it), the rubric verdict is `PASS`, and its obligatory-scene ledger entries are delivered. Then and only then set `status: passed`.
