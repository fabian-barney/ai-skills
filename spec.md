# ai-skills Specification

## Purpose

`ai-skills` is the canonical repository for reusable, tool-agnostic AI
behavior.

A skill is a reusable instruction bundle for a focused capability, convention,
check, workflow, or review lens. Skills are lighter than full agents: they
package portable behavior and optional supporting resources without prescribing
a full runtime identity.

This repository exists to:

- define the canonical source format for reusable AI behavior
- centralize behavior that should not be duplicated in downstream repositories
- keep skill authoring rules explicit and versioned
- organize future skills under a stable taxonomy
- make the same skill concept usable across Codex, Claude, and Copilot

## Relationship to Other Repositories

`ai-skills`, `ai-agents`, `ai-instructions`, and `ai-rules` solve related but
different problems.

- `ai-agents` defines agent identities, worker boundaries, and orchestration
- `ai-skills` defines reusable behavior that agents or assistants can apply
- `ai-instructions` defines the tiny downstream installation and context layer
- `ai-rules` is legacy baseline material retained temporarily for migration and
  compatibility

The unit of reuse differs across these repositories:

- an agent is a named worker with responsibility boundaries
- a skill is a reusable behavior bundle
- an instruction layer is a minimal downstream wiring layer

Example:

- a downstream repository may install `ai-instructions` to point at a default
  composite skill such as `quality-gate`
- the `quality-gate` behavior itself belongs in `ai-skills`
- the agent identity that invokes the skill belongs in `ai-agents`

`ai-skills` does not replace `ai-instructions`. It centralizes reusable
behavior so downstream repositories can remain small and mostly project-owned.

## Canonical Skill Unit

The canonical unit is one directory per skill:

```text
skills/<skill-id>/
```

`<skill-id>` must be lowercase kebab-case and must match the directory name.

Example:

```text
skills/quality-gate/
```

## Skill Taxonomy

Every canonical skill belongs to exactly one of these behavioral forms:

### Leaf Skills

A leaf skill is a narrow reusable capability, convention, check, or review
lens.

Typical examples include:

- `conventions-null`
- `conventions-lombok`
- `correctness-equals-hashcode`
- `security-secrets`
- `formatting-github-comment`

Leaf skills may use supporting files, but they do not orchestrate other skills
as part of their canonical contract.

### Composite Skills

A composite skill orchestrates one or more other skills.

Composite skills may depend on:

- one or more leaf skills
- one or more other composite skills
- any combination of leaf and composite skills

Typical examples include:

- `quality-gate`
- `pr-review`
- `release`

Composite skills are explicitly multi-level. A composite skill may orchestrate
other composite skills as long as the overall dependency graph remains acyclic.

### Capture Skills

A capture skill records canonical backlog entries for future skills or skill
improvements without implementing those skills.

Typical examples include:

- `skill-new`
- `skill-improve`
- `skill-template`

Capture skills exist so useful skill ideas can be recorded during normal work,
even when immediate implementation is out of scope.

## Composition Rules

Skill composition is allowed and intended.

The canonical rules are:

- composite skills may be multi-level
- composition must be acyclic
- a composed skill must preserve the called skill's purpose, workflow
  boundaries, guardrails, and exit checks
- a composite skill may sequence, select, or aggregate child skills, but it
  must not silently redefine the meaning of a child skill
- target-specific notes remain additive and must not change canonical
  composition semantics

This specification does not define a runtime orchestration engine in v1. It
defines the canonical meaning of composable skill bundles so future tooling can
invoke or render them consistently.

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

Only `SKILL.md` is required in v1. All other files and directories are
optional.

Optional content has these intended roles:

- `examples/` contains example inputs or outputs
- `references/` contains supporting documentation or domain material
- `scripts/` contains executable helpers used by the skill
- `templates/` contains reusable output or prompt templates
- `targets/*.md` contains target-specific additive notes

Supporting files are never implicit. If a skill uses them, `SKILL.md` must
reference them explicitly and explain when they matter.

The same bundle structure applies to leaf skills, composite skills, and capture
skills. What changes is the meaning of the workflow and outputs.

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
name: quality-gate
description: Run a multi-step quality gate by orchestrating multiple reusable skills.
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
- `Guardrails` defines forbidden shortcuts, quality constraints, and
  boundaries
- `Exit Checks` defines the final self-verification before completion

### Behavioral Expectations by Skill Type

The canonical section semantics remain stable across all skill types:

- a leaf skill uses `Workflow` to describe the direct capability or check
- a composite skill uses `Workflow` to describe orchestration and aggregation
- a capture skill uses `Workflow` to describe how backlog records are
  normalized and rendered

Capture skills must never claim to implement the proposed skill as part of
their normal contract. Their outputs stop at canonical recording and optional
rendering.

## Capture Skill Contract

Capture skills standardize how future skill work is recorded during normal use.

The canonical capture behaviors are:

- `skill-new` records a new canonical skill idea
- `skill-improve` records an improvement proposal for an existing canonical
  skill
- `skill-template` defines the canonical backlog-entry shape used by those
  capture flows

Capture skills may render the same canonical backlog entry to different storage
targets, but the underlying content model remains the same.

Capture skills must stop after recording or rendering the backlog entry.
Ad-hoc implementation for the current task remains part of normal agent
workflow and is out of scope for capture skills.

## Canonical Backlog Entry Contract

The canonical backlog entry is the normalized content model used by capture
skills.

The canonical entry must contain:

- `title`
- `change-type`
- `skill-id-or-name`
- `problem-or-motivation`
- `reusability-rationale`
- `when-to-use`
- `workflow-or-responsibilities`
- `related-skills-or-dependencies`
- `source-context-or-notes`
- `status`

The meaning of these fields is:

- `title`: concise human title for the backlog item
- `change-type`: either `new` or `improve`
- `skill-id-or-name`: the proposed canonical skill id or a working name if the
  final id is not yet stable
- `problem-or-motivation`: what problem the skill should solve
- `reusability-rationale`: why this belongs in the shared catalog rather than
  only in the originating task or repository
- `when-to-use`: rough trigger or activation conditions
- `workflow-or-responsibilities`: rough expected behavior, checks, or
  responsibilities of the future skill
- `related-skills-or-dependencies`: neighboring skills, likely composition
  points, or expected dependencies when known
- `source-context-or-notes`: contextual notes from the originating task
- `status`: backlog state such as `idea`, `draft`, `triaged`, or
  `implemented`

This contract defines the canonical semantics, not a single storage syntax.
Renderers may adapt the format to the target platform while preserving the same
meaning.

### Rendering Targets for Backlog Entries

The preferred rendering target is a GitHub issue in `ai-skills` when GitHub
access is available.

The fallback rendering target is a local Markdown record when GitHub access is
not available.

These are secondary representations of the same canonical backlog-entry model.
The canonical idea does not depend on one storage target.

## Authoring Rules

Skills in this repository must follow these rules:

- keep canonical instructions portable and tool-agnostic
- centralize reusable behavior here instead of duplicating it in downstream
  repositories
- prefer small composable skills over large end-to-end monoliths
- define composition explicitly when a skill orchestrates other skills
- keep capture skills focused on recording, not implementing
- put target-specific behavior only in `targets/*.md`
- do not rely on undeclared supporting files
- do not encode downstream repo-specific runtime assumptions into the canonical
  contract

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
- the canonical meaning of composition

v1 deliberately does not add a separate metadata file such as `skill.yaml`.
`SKILL.md` is the canonical source of truth.

## Initial Taxonomy

The current repository direction includes at least these families:

- conventions
- correctness
- security
- formatting
- review
- release
- gates
- design
- performance
- backlog capture and skill maintenance

These are organizational guidance, not yet committed directory names. Future
skills may refine the taxonomy with ADRs when the catalog starts to grow.

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
- fallback packaging must preserve the canonical purpose, workflow, guardrails,
  and exit checks

## Install and Update Contract

The 0.1.0 release defines a stable install and update contract before the
installer implementation exists. This contract is intentionally conservative:
install and update are allowed to manage only the package-owned `ai-skills-*`
namespace, and user-owned skill directories outside that namespace must remain
untouched.

### Package and Tooling

The first supported delivery method is npmjs.com.

The public package name is:

```text
@barney-media/ai-skills
```

The user-facing global installation command is:

```bash
npm install -g @barney-media/ai-skills
```

Repository development may use `pnpm` for dependency management, scripts, CI,
and release verification. User-facing install documentation must still use npm
unless a later release explicitly adds another public installation channel.

The 0.1.0 public CLI surface is limited to:

- `ai-skills install`
- `ai-skills update`

No public `ai-skills validate` command is part of 0.1.0. Catalog validation is
still required as an internal build, package, and release verification step.

### Managed Skill Namespace

Every canonical skill id in this repository must start with `ai-skills-`.

Examples:

```text
skills/ai-skills-pr-review/
skills/ai-skills-release/
```

The skill directory name and the `name` field in `SKILL.md` frontmatter must
match exactly.

The `ai-skills-` prefix is reserved for this package in every supported target
skill directory. Any existing directory whose name starts with `ai-skills-` is
treated as package-owned and replaceable by `ai-skills install` or
`ai-skills update`.

User-created skills that do not start with `ai-skills-` are user-owned. The
installer must never modify, move, or delete non-prefixed skill directories.

Users should not create personal skills with the `ai-skills-` prefix unless
they accept that this package may remove and replace those directories during
install or update.

### Supported Target Directories

The 0.1.0 installer manages all supported targets. It does not support
installing only one target.

Target directories are resolved from the current user's home directory through
the implementation runtime. The installer must not rely on shell expansion of a
literal `~`, because that behavior is not portable across supported operating
systems.

The supported target directories are:

```text
<home>/.codex/skills
<home>/.claude/skills
<home>/.copilot/skills
```

The Codex target is always `<home>/.codex/skills` in 0.1.0. `$CODEX_HOME` is
not supported by this contract.

If a supported target directory does not exist, install and update may create
it. Creating the target directory must not create or modify unrelated
non-prefixed skill directories.

### Install and Update Behavior

`ai-skills install` and `ai-skills update` are semantically separate commands
so future versions can give them different behavior. In 0.1.0 they must call
the same reset-and-install flow and produce the same final filesystem state
for the same package version.

For each supported target directory, install and update must:

1. Resolve the target path from the current user's home directory.
2. Inspect only direct child directories whose names start with `ai-skills-`.
3. Warn that all existing `ai-skills-*` skills in the supported target
   directories will be deleted and replaced by the current packaged skill set.
4. Warn that non-prefixed user skills will be preserved.
5. Require interactive confirmation before making changes, unless
   `--assume-yes` is passed.
6. Remove all existing direct child directories matching `ai-skills-*`.
7. Install the complete current packaged set of `ai-skills-*` skill
   directories.

The unattended confirmation flag is:

```bash
--assume-yes
```

If confirmation is not provided, install and update must exit without changing
any supported target directory.

The installer must not support per-skill selection in 0.1.0. Each successful
install or update installs the complete packaged `ai-skills-*` catalog.

### Reset Robustness

The reset-and-install flow is the permanent namespace-management contract for
0.1.0 and must be implemented carefully.

The implementation should avoid leaving a target directory with a mixed old and
new `ai-skills-*` set where practical. A future implementation is expected to
use staging or another robust filesystem strategy before replacing the target
set.

If one supported target fails, the command must report which target failed and
why. Successful targets do not need to be rolled back globally because 0.1.0
manages each supported target independently.

No persistent backups are required by this contract. Rollback or staging data
used during an operation should be cleaned up after the operation succeeds or
after best-effort failure handling completes.

### Internal Validation

Although there is no public validation command in 0.1.0, catalog validation is
required before publishing a release artifact and should run during normal CI.

Internal validation must verify at least:

- every canonical skill directory starts with `ai-skills-`
- every skill directory contains `SKILL.md`
- every `SKILL.md` contains required frontmatter
- the frontmatter `name` matches the directory name
- required canonical sections exist in the required order
- statically detectable local supporting-file references point to existing
  files

Invalid catalog state must fail build, package, or release verification before
the npm package is published.

## Repository Conventions

The repository-level conventions are:

- `skills/` is reserved for canonical skill bundles
- `spec.md` is the authoritative contract until ADRs supersede parts of it
- `ai/PROJECT/DECISIONS/` is reserved for repository ADRs when needed
- downstream repositories should keep their local context in their own
  project-owned files and use `ai-instructions` as the tiny installable layer

This means the repository is the source of reusable behavior, while
downstream-specific ADRs, lessons learned, and local exceptions remain outside
the canonical skill catalog.

## Example Bundles

The following examples are illustrative only. They demonstrate meaning and
structure, but they are not committed repository skills.

### Example Composite Skill

```text
skills/quality-gate/
|-- SKILL.md
|-- references/
|   `-- gate-policy.md
`-- targets/
    |-- claude.md
    |-- codex.md
    `-- copilot.md
```

Example `SKILL.md`:

```md
---
name: quality-gate
description: Run a multi-step quality gate by orchestrating reusable checks and conventions.
---

# Purpose

Apply a reusable quality gate to a bounded change set by orchestrating relevant
leaf and composite skills.

# When to Use

- use when implementation work must pass shared quality expectations
- use when a downstream repository selects this skill as a default gate

# Inputs

- the changed files or diff
- relevant tests, docs, and configuration
- any downstream repository context supplied through ai-instructions

# Workflow

1. Determine which child skills are relevant for the changed scope.
2. Invoke the relevant checks in a stable order.
3. Aggregate findings without broadening the task into unrelated cleanup.
4. Return the final gate result and unresolved findings.

# Outputs

- pass or fail outcome for the bounded scope
- concrete findings or residual risks
- child-skill evidence when relevant

# Guardrails

- do not redefine the guardrails of child skills
- do not create cyclic orchestration
- do not broaden the implementation scope just to satisfy unrelated checks

# Exit Checks

- every failing result names the violated behavior
- every aggregated finding remains traceable to evidence
- no called skill was silently skipped without explanation
```

### Example Capture Skill

Example backlog-entry renderings for `skill-new` may target:

- a GitHub issue in `ai-skills`
- a local Markdown file when GitHub access is unavailable

In both cases, the entry still represents the same canonical backlog-entry
contract defined above.

## Optional Future Improvements

The following review-derived items are intentionally not implemented in 0.1.0.

- Source issue #100, `correctness-comparable`: consider adding a brief
  `SKILL.md` guardrail note that `TreeMap` and `TreeSet` containers can behave
  incorrectly when `compareTo` and `equals` diverge. This item needs future
  review and triage before implementation.
- Source issue #101, `correctness-equals-hashcode`: consider requiring a
  regression-test step when equality or hash-code behavior changes. This item
  needs future review and triage before implementation.
- Source issue #102, `correctness-jpa`: consider a sibling skill for broader
  JPA lifecycle or fetch concerns, such as cascade rules, lazy loading,
  transaction scope, or entity leakage across API boundaries. This item needs
  future review and triage before implementation.

## Non-Goals for v1

v1 does not include:

- a full runtime orchestration engine
- a separate knowledge repository
- a public validation CLI
- a generated target artifact pipeline
- per-skill or per-target install selection
- an uninstall command
- local edit preservation inside `ai-skills-*` directories
- persistent install backups
- `$CODEX_HOME` support
- a requirement that capture skills implement the proposed skills

Those may follow later once the canonical format and repository boundaries have
proven stable.
