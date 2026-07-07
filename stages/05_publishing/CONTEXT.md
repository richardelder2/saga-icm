---
type: StageContract
stage_id: "05_publishing"
name: Serial Manuscript Compilation & eBook Rendering
inputs:
  - stages/03_drafting/output/chapters/  # Validated in stage 04
outputs:
  - stages/05_publishing/output/manuscript.html
  - stages/05_publishing/output/manuscript.epub
---

# Stage 05: Publishing Compiled Outputs

## Process
1. Compile the validated drafts from `stages/03_drafting/output/chapters/` into a single print-serif HTML file.
2. Run Pandoc container export pipelines to build the target eBook `.epub` files inside `stages/05_publishing/output/`.
