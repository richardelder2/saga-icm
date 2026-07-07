---
type: StageContract
stage_id: "04_diagnostics_edits"
name: Diagnostic Audits & Copy-Editing Revisions
inputs:
  - stages/03_drafting/output/chapters/
  - stages/02_planning/output/structure_plan.md
  - _config/narrative_authenticity.md
  - _config/narrative_audit_rubric.md
outputs:
  - stages/04_diagnostics_edits/output/reports/
  - stages/04_diagnostics_edits/output/playbooks/
---

# Stage 04: Diagnostics & Copy-Edits

## Process
1. **Mechanical scan**: run `node scripts/saga.js audit` (wraps `scripts/narrative_audit.js`). It writes per-chapter reports to `stages/04_diagnostics_edits/output/reports/` covering emotion-mode balance, olfactory density, dialogue ratio, sentence/paragraph rhythm variance, lexical tells, triad stacking, em-dash rate, and end-of-chapter moralizing.
2. **Judgment audit**: score the manuscript against `_config/narrative_audit_rubric.md` (the structural features no scanner can count). Cross-check intentional loose ends against the `structure_plan.md` ledger so they are not "fixed."
3. Execute legacy diagnostics (prose rhythm standard deviations, dialogue heat register analysis, character timeline resource tracking) and merge findings into the reports.
4. Generate developmental editorial reports inside `stages/04_diagnostics_edits/output/reports/`.
5. Create actionable editing playbooks inside `stages/04_diagnostics_edits/output/playbooks/` and execute them:
   - **Prose failures** → targeted line edits / Stage 03 redraft of flagged passages.
   - **Structural failures** (theme explained, no subplots, all-linear time, uniform resolutions) → route BACK to Stage 02 for re-planning. Do not attempt to fix structural tells with line edits; research shows style editing does not remove them.

## Gate
A chapter passes to Stage 05 only when the mechanical scan shows no red flags AND the rubric verdict is `PASS`.
