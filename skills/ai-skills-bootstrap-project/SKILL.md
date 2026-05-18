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

# Inputs

- the project goal, team, hosting constraints, and delivery expectations
- repository, framework, runtime, CI, and documentation preferences or
  constraints
- whether version-selection decisions for dependencies or support policy are
  already explicit
- which bootstrap surfaces are in or out of scope for the current project

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
2. Apply skill `ai-skills-bootstrap-repository` to establish the hosted
   project home and repository-level policy decisions.
3. Apply skill `ai-skills-bootstrap-ai-instructions` so the downstream
   instruction layer is wired before project-specific implementation patterns
   spread.
4. Apply skill `ai-skills-bootstrap-framework-setup` to establish the working
   framework, runtime, and toolchain baseline.
5. Apply skill `ai-skills-bootstrap-ci-pipeline` so the project baseline is
   checked continuously.
6. Apply skill `ai-skills-bootstrap-documentation` last so the initial docs
   reflect the actual repository, framework, and CI decisions already made.
7. Surface any skipped child as intentionally out of scope rather than quietly
   omitting it.

# Outputs

- an ordered project-bootstrap decision record
- all in-scope bootstrap surfaces delegated to the correct child skills
- a coherent starting project baseline across repository, instructions,
  framework, CI, and documentation

# Guardrails

- do not inline child-skill behavior when a child skill already owns it
- do not reorder the bootstrap sequence without an explicit dependency reason
- do not broaden this skill into release, maintenance, or long-term governance
- do not treat a skipped bootstrap surface as implicitly complete

# Exit Checks

- each in-scope bootstrap surface was handled by the correct child skill
- the execution order preserved repository before framework and CI before final
  documentation
- skipped or blocked child surfaces are explicit
- the result is a coherent starting point rather than disconnected setup steps
