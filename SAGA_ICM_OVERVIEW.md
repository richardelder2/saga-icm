# SAGA-ICM — Novel Engineering Guide
## Welcome to Your AI-Collaborative Writing Workspace

Writing a novel is a deeply personal, messy, and creative process. Standard software engineering processes are too rigid, while standard AI text generators are too formless—often leading to repetitive plots, flat characters, and style drift.

**SAGA-ICM** (Interpretable Context Methodology) is designed to solve this. It is a portable, lightweight framework that transforms your AI coding agent (like Antigravity, Claude Code, or Codex) into a highly disciplined, encouraging writing partner. 

This guide explains how the system works, how your agent supports you, and how the architecture is built to protect and adapt to your creative flow.

---

## 1. How the System Works (The 5 Stages)

SAGA-ICM divides the journey from raw idea to published book into five distinct stages. Each stage has a clear contract (`CONTEXT.md`) that defines the inputs needed and the outputs produced.

```mermaid
graph TD
    S1[Stage 1: Onboarding] -->|Character & Genre Bibles| S2[Stage 2: Planning]
    S2 -->|Foolscap & Scene Beats| S3[Stage 3: Drafting]
    S3 -->|Raw Drafts| S4[Stage 4: Diagnostics & Edits]
    S4 -->|Passed Gate| S5[Stage 5: Publishing]
    S4 -->|Fails Audit| S3
```

| Stage | Folder | What Happens | What it Produces |
| :--- | :--- | :--- | :--- |
| **01. Onboarding** | `stages/01_onboarding/` | Your agent interviews you to map out your world, characters, and genre tropes. | Preferences, World Bible, Character Seeds, Filled Genre Bible. |
| **02. Planning** | `stages/02_planning/` | You map the book onto a single sheet (**Foolscap**), structure subplots, and write chapter-by-chapter beats. | **manuscript.json** (Ledger), Foolscap Page, Scene Beats. |
| **03. Drafting** | `stages/03_drafting/` | You and the agent write the chapter drafts one by one using strict style guidelines. | Chapter Prose (.md files). |
| **04. Diagnostics** | `stages/04_diagnostics_edits/` | The agent audits drafts for continuity and checks for AI tells. | Audit Reports, Continuity Reports. |
| **05. Publishing** | `stages/05_publishing/` | When all chapters pass audits, they compile into a book. | Finished HTML / EPUB manuscript. |

---

## 2. How the Agent Supports You

As a novice user, you don’t need to worry about complex programming, terminal commands, or managing raw configuration files. **Your agent is your interface.**

* **No Terminal Required:** You do not need to run backend setup scripts or manage API configurations. You talk directly to your agent in plain English (e.g., *"Help me draft Chapter 3 beats"* or *"Review my character arcs"*). The agent reads the local contracts, executes the tasks, and updates files for you.
* **Creative Sounding Board:** Your agent acts as an encouraging, expert developmental editor. It will push you to flesh out weak plot points, brainstorm alternate angles, and suggest three-dimensional conflicts.
* **The Mechanical Guarddog:** The agent runs local, instant scripts to find typos, detect name spelling inconsistencies, and check for AI-fingerprint phrasing before you compile the book.

---

## 3. Built for the Creative, Non-Linear Mind

Real authors do not write in a perfect straight line. You get sudden inspirations, change your mind about characters, write out of order, or bring half-finished drafts with you. SAGA-ICM's architecture is built specifically to support and protect this creative flexibility.

### 🗺️ A. The Intake Path (Arriving with Existing Material)
If you aren't starting from scratch, you don't have to go through a repetitive setup wizard. 
* **Path C Intake** allows you to feed your existing synopses, outlines, notes, or even pre-drafted chapters to the agent.
* The agent will automatically reverse-engineer the bibles, build the outline, harvest canon facts, and populate `manuscript.json` to match where you are in the project.

### 🔄 B. Out-of-Order Writing (Jumping Around)
If you want to write the climax (Chapter 25) today, you can. 
* SAGA-ICM treats the stage contracts as **gates, not rails**. 
* The system keeps track of status on a per-chapter basis in `manuscript.json` (e.g. Chapter 1: *passed*, Chapter 25: *drafted*, Chapter 2: *planned*).
* While writing out of order raises the auditing burden (more connections to verify in Stage 04), the pipeline allows it naturally.

### 🎭 C. Trope Stacks vs. Authenticity Dials
To write a successful novel, you must satisfy your reader's expectations (tropes) while keeping the prose feeling organic and unpredictable. SAGA-ICM separates these two elements:
1. **The Trope Stack (The Reader Contract):** Obligatory scenes (like the "first meeting" in a romance or the "clue drop" in a mystery) are logged in `structure_plan.md`. The architecture ensures these are **never deleted or subverted**.
2. **Authenticity Dials (The Connective Tissue):** Around those trope scenes, your agent uses adjustable style dials. They introduce subplots, time jumps, moral gray areas, and sensory budgets to make sure the spaces *between* the big beats feel authentic and human.

### 🛡️ D. Redundant Safety Nets (Context Preservation)
To prevent your agent from "forgetting" details or drifting in style, SAGA-ICM deploys three redundant layers of truth:

```mermaid
graph TD
    M[manuscript.json] -->|Tracks status & chapter targets| C[canon.md]
    C -->|Logs facts, names, and lore| V[voice_exemplars.md]
    V -->|Calibrates prose tone & style| D[Active Drafting]
```

* **The Production Ledger (`manuscript.json`):** A shared, single file that tracks the entire project state. Any agent can read this file and instantly know the exact status, word count, and next action for the book.
* **The Living Fact Bible (`canon.md`):** Every time a chapter is drafted, the agent harvests new facts (e.g., *"[unverified ch2] Mark has a scar on his left shoulder"*). Once the chapter passes Stage 04, the tag is cleared. This ensures facts remain cohesive across the entire book.
* **The Voice Calibration Kit:** AI text generators tend to slide back toward generic prose. To prevent this, drafting matches your specific style by feeding the agent only the last 500 words of the previous chapter and a short list of *voice exemplars*. This keeps your style perfectly anchored without bloating the AI's memory.

---

## 4. Quick Commands to Tell Your Agent

To get started, simply type these prompts in your chat with the agent:
* **To start the project:** *"Read AGENTS.md and onboard me for a new novel using Path A."*
* **To check progress:** *"Run saga status and tell me what chapter needs work next."*
* **To start drafting:** *"Let's build the drafting kit for Chapter [X] and write it."*
* **To review your work:** *"Audit my draft for Chapter [X] and show me the reports."*
