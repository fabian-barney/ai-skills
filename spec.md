# ai-skills Specification

## Purpose

`ai-skills` is the canonical repository for tool-agnostic AI skills.

A skill is a reusable instruction bundle for a focused task, workflow,
convention, or review lens. Skills are lighter than full agents: they package
portable instructions and optional supporting resources without prescribing a
full runtime identity or orchestration model.

This repository exists to:

- define a canonical, portable skill format
- keep skill authoring rules explicit and versioned
- organize future skills under a stable taxonomy
- make the same skill concept usable across Codex, Claude, and Copilot

## Relationship to `ai-agents`

`ai-agents` and `ai-skills` solve related but different problems.

- `ai-agents` is a catalog of tool-agnostic agents with canonical definitions
  and renderer logic.
- `ai-skills` is a catalog of tool-agnostic skill bundles with portable
  instruction content and optional supporting assets.

The main difference is the unit of reuse:

- an agent is a named worker persona with responsibility boundaries
- a skill is a reusable capability or playbook that can be loaded, invoked, or
  applied by an agent or assistant

This repository does not define runtime orchestration in v1. It defines the
portable source format that future tooling can validate, package, and render.

## Canonical Skill Unit

The canonical unit is one directory per skill:

```text
skills/<skill-id>/
```

`<skill-id>` must be lowercase kebab-case and must match the directory name.

Example:

```text
skills/quality-crap/
```

## Skill Bundle Structure

Each canonical skill bundle must use this structure:

```text
skills/<skill-id>/
|-- SKILL.md
|-- examples/
|-- references/
|-- scripts/
|-- targets/
|   |-- claude.md
|   |-- codex.md
|   `-- copilot.md
`-- templates/
```

Only `SKILL.md` is required in v1. All other files and directories are optional.

Optional content has these intended roles:

- `examples/` contains example inputs or outputs
- `references/` contains supporting documentation or domain material
- `scripts/` contains executable helpers used by the skill
- `templates/` contains reusable output or prompt templates
- `targets/*.md` contains target-specific additive notes

Supporting files are never implicit. If a skill uses them, `SKILL.md` must
reference them explicitly and explain when they matter.

## `SKILL.md` Contract

Each skill entrypoint is a Markdown document with YAML frontmatter followed by
structured Markdown sections.

### Required Frontmatter

The YAML frontmatter must contain:

- `name`
- `description`

Example:

```md
---
name: quality-crap
description: Evaluate changed code for CRAP score violations and propose fixes.
---
```

No other frontmatter keys are canonical in v1.

Tool-specific metadata belongs in `targets/*.md`, not in the canonical
frontmatter.

### Required Sections

The Markdown body must include these sections in this order:

1. `Purpose`
2. `When to Use`
3. `Inputs`
4. `Workflow`
5. `Outputs`
6. `Guardrails`
7. `Exit Checks`

Each section defines a distinct part of the skill contract:

- `Purpose` explains the job to be done
- `When to Use` defines activation criteria and intended scope
- `Inputs` describes the context, files, arguments, or evidence required
- `Workflow` lists the concrete steps the model should follow
- `Outputs` defines the expected result shape
- `Guardrails` defines forbidden shortcuts, quality constraints, and boundaries
- `Exit Checks` defines the final self-verification before completion

## Authoring Rules

Skills in this repository must follow these rules:

- one skill bundle per concern
- prefer small composable skills over large end-to-end monoliths
- keep canonical instructions portable and tool-agnostic
- put target-specific behavior only in `targets/*.md`
- do not rely on undeclared supporting files
- do not encode repo-specific runtime assumptions into the canonical contract

Target-specific notes may refine:

- invocation style
- tool availability assumptions
- file placement for a given platform
- formatting details required by that platform

Target-specific notes may not change:

- the core purpose of the skill
- the meaning of inputs and outputs
- the required workflow steps
- the guardrails or exit checks

v1 deliberately does not add a separate metadata file such as `skill.yaml`.
`SKILL.md` is the canonical source of truth.

## Initial Taxonomy

The existing issue set shows the intended direction for this repository. The
v1 taxonomy is therefore:

- workflow
- PR and issue authoring
- release
- conventions
- design
- correctness
- quality
- performance
- security
- formatting

These categories are organizational guidance, not yet committed directory
names. Future skill bundles may refine the taxonomy with ADRs when the catalog
starts to grow.

## Target Mapping

The canonical format is designed to map cleanly onto the first supported target
set:

- Codex
- Claude
- Copilot

### Codex

For Codex, the canonical `SKILL.md` bundle is the source artifact.

Mapping rules:

- `skills/<skill-id>/SKILL.md` remains the entrypoint
- optional supporting files stay next to it inside the skill directory
- `targets/codex.md` may add Codex-specific invocation or environment notes
- `targets/codex.md` is additive only and must not redefine canonical behavior

### Claude

Claude project skills use the same directory-first concept with `SKILL.md` as
the entrypoint and optional supporting files beside it.

Mapping rules:

- canonical bundles can be copied into a Claude skill directory unchanged
- `targets/claude.md` may capture Claude-specific notes such as invocation
  expectations, allowed tools, or automatic versus manual use
- Claude-only controls stay out of the canonical frontmatter in v1

### Copilot

Copilot supports two relevant integration shapes:

- agent skills loaded from `SKILL.md` directories
- repository custom instructions and prompt files for broader always-on or
  prompt-template scenarios

Mapping rules:

- the canonical bundle maps first to Copilot agent skills
- `targets/copilot.md` may describe the preferred Copilot packaging for the
  skill
- when a skill cannot map directly to Copilot agent skills, the target note may
  define a fallback packaging using Copilot custom instructions or prompt files
- fallback packaging must preserve the canonical purpose, workflow, and exit
  checks

## Repository Conventions

The repository-level conventions are:

- `skills/` is reserved for canonical skill bundles
- v1 does not commit real skills yet
- `spec.md` is the authoritative contract until ADRs supersede parts of it
- `ai/PROJECT/DECISIONS/` is reserved for future ADRs

This means the current round sets up the infrastructure and the format, but it
does not implement the open `skill:` issues as concrete skill bundles yet.

## Example Skill Bundle

The following example is illustrative only. It demonstrates structure and
contract, but it is not a committed repository skill.

```text
skills/example-review-skill/
|-- SKILL.md
|-- examples/
|   `-- review-comment.md
|-- scripts/
|   `-- collect-findings.sh
`-- targets/
    |-- claude.md
    |-- codex.md
    `-- copilot.md
```

Example `SKILL.md`:

```md
---
name: example-review-skill
description: Review a change set for correctness and summarize actionable findings.
---

# Purpose

Review a bounded change set for correctness issues and return only concrete,
actionable findings.

# When to Use

- use when a user asks for a review of a PR, patch, or diff
- use when correctness risk matters more than stylistic polish

# Inputs

- the changed files or diff
- relevant tests, docs, and configuration
- any known scope constraints from the user

# Workflow

1. Read the changed code and identify the affected behavior.
2. Check for correctness regressions and contract violations.
3. Ignore unrelated style issues unless they hide a real bug.
4. Summarize only findings that are specific and defensible.

# Outputs

- a concise list of findings ordered by severity
- file and line references when available
- a short residual-risk note if no findings are confirmed

# Guardrails

- do not invent behavior that is not supported by the diff
- do not broaden the review into unrelated repository cleanup
- do not report purely stylistic feedback as a defect

# Exit Checks

- every finding names the impacted behavior
- every finding is tied to evidence in the change set
- no duplicate or speculative findings remain
```

## Non-Goals for v1

v1 does not include:

- a skill loader
- a skill renderer
- a validation CLI
- a generated target artifact pipeline
- concrete implementations of the open `skill:` issues

Those may follow once the canonical format has proven stable.
