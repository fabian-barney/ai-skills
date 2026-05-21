---
name: ai-skills-bootstrap-project
description: >-
  Orchestrate the initial project bootstrap by sequencing repository,
  instruction-layer, framework, CI, and documentation setup in dependency
  order.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Run a clean project bootstrap sequence so the new project starts with a
repository home, downstream instruction wiring, framework baseline, CI, and
documentation that fit together.

# When to Use

- use when a new project must be bootstrapped end to end rather than through a
  single setup concern
- use when repository, ai-instructions, framework, CI, and documentation work
  must be sequenced safely
- use when later setup choices depend on earlier bootstrap outputs
- use `references/bootstrap-surface-status.md` when the composed bootstrap
  result must distinguish full completion from partial completion with named
  gaps

# Inputs

- the project goal, team, hosting constraints, and delivery expectations
- repository, framework, runtime, CI, and documentation preferences or
  constraints
- whether version-selection decisions for dependencies or support policy are
  already explicit
- which bootstrap surfaces are in or out of scope for the current project
- known blockers or partial-delivery expectations for any bootstrap surface
- `references/bootstrap-surface-status.md`

# Workflow

## Composed Skills

This is a composite skill. It orchestrates these children in dependency order:

- skill `ai-skills-bootstrap-repository`
- skill `ai-skills-bootstrap-ai-instructions`
- skill `ai-skills-bootstrap-framework-setup`
- skill `ai-skills-bootstrap-ci-pipeline`
- skill `ai-skills-bootstrap-documentation`

## Bootstrap Sequence

1. Confirm the project really needs a multi-surface bootstrap rather than a
   single leaf setup task.
2. Before running child skills, classify each bootstrap surface as in scope or
   `out-of-scope`. Use `out-of-scope` only for intentionally excluded
   surfaces. If an in-scope surface is intentionally not run, its final status
   must be `skipped` with an explicit reason. Then track final child results
   using only `completed`, `blocked`, `skipped`, or `out-of-scope` according
   to `references/bootstrap-surface-status.md`.
3. Apply skill `ai-skills-bootstrap-repository` to establish the hosted
   project home and repository-level policy decisions.
4. Record the repository child result using the required per-surface fields
   from `references/bootstrap-surface-status.md`, including the final status,
   the child skill used, the handoff output or explicit `none`, and any
   blocker, skip reason, or named gap when the status is not `completed`.
5. Apply skill `ai-skills-bootstrap-ai-instructions` so the downstream
   instruction layer is wired before project-specific implementation patterns
   spread.
6. Record the ai-instructions child result using the same required
   per-surface fields, including the handoff output or explicit `none`, plus
   any blocker, skip reason, or named gap when applicable.
7. Apply skill `ai-skills-bootstrap-framework-setup` to establish the working
   framework, runtime, and toolchain baseline.
8. Record the framework child result using the same required per-surface
   fields, including the handoff output or explicit `none`, plus any blocker,
   skip reason, or named gap when applicable.
9. Apply skill `ai-skills-bootstrap-ci-pipeline` so the project baseline is
   checked continuously.
10. Record the CI child result using the same required per-surface fields,
    including the handoff output or explicit `none`, plus any blocker, skip
    reason, or named gap when applicable.
11. Apply skill `ai-skills-bootstrap-documentation` last so the initial docs
   reflect the actual repository, framework, and CI decisions already made.
12. Record the documentation child result using the same required
    per-surface fields, including the handoff output or explicit `none`, plus
    any blocker, skip reason, or named gap when applicable.
13. Distinguish a full bootstrap from a partial bootstrap. Full bootstrap
    means every in-scope child finished as `completed` and every excluded
    surface is explicitly `out-of-scope`; partial bootstrap means one or more
    in-scope children are `blocked` or `skipped`, and each gap must be named
    explicitly.

# Outputs

- an ordered project-bootstrap decision record
- all in-scope bootstrap surfaces delegated to the correct child skills
- a per-child status record using only `completed`, `blocked`, `skipped`, or
  `out-of-scope`
- explicit child handoff outputs and named remaining gaps when the bootstrap is
  partial
- a coherent starting project baseline across repository, instructions,
  framework, CI, and documentation

# Guardrails

- do not inline child-skill behavior when a child skill already owns it
- do not reorder the bootstrap sequence without an explicit dependency reason
- do not broaden this skill into release, maintenance, or long-term governance
- do not treat a skipped bootstrap surface as implicitly complete
- do not report the composite bootstrap as complete without a per-child status
  and handoff record
- do not describe a partial bootstrap as a full bootstrap

# Exit Checks

- each in-scope bootstrap surface was handled by the correct child skill
- the execution order preserved repository before framework and CI before final
  documentation
- every child surface has one explicit status from `completed`, `blocked`,
  `skipped`, or `out-of-scope`
- child handoff outputs and remaining blockers or gaps are explicit
- skipped, blocked, or out-of-scope child surfaces are explicit
- the result is labeled full or partial bootstrap correctly
- the result is a coherent starting point rather than disconnected setup steps
