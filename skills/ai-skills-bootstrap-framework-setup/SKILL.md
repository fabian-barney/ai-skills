---
name: ai-skills-bootstrap-framework-setup
description: >-
  Establish the initial framework, runtime, and toolchain baseline for a new
  project without hard-coding one stack or generator.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Set up the project's first working framework and toolchain baseline so the
repository can build, test, and evolve on an explicit stack.

# When to Use

- use when a new project needs its initial language, framework, runtime, or
  build-tool baseline
- use when framework generators or starter templates are available but version
  decisions and retained defaults must still be reviewed
- use skill `ai-skills-version-dependency-selection` when framework,
  build-tool, or dependency versions are still open
- use skill `ai-skills-version-support-policy` when official runtime or
  platform support must be decided before the stack is frozen

# Inputs

- the product type and intended language, framework, runtime, and build stack
- repository constraints, organization defaults, and deployment targets
- explicit or candidate versions for frameworks, runtimes, and tooling
- whether starter templates, generators, or scaffolds are acceptable
- required local development, build, and test entrypoints

# Workflow

1. Confirm the target stack and the project constraints that limit framework,
   runtime, or toolchain choices.
2. If framework, build-tool, or dependency versions are not fixed yet, apply
   skill `ai-skills-version-dependency-selection` before finalizing the stack.
3. If official runtime or platform support is still unclear, apply skill `ai-skills-version-support-policy`
   before finalizing supported versions.
4. Choose the minimal working scaffold, template, or manual setup approach
   that fits the project rather than adopting generator defaults blindly.
5. Establish the baseline project structure and the commands needed for local
   development, build, and test workflows.
6. Record which generated defaults were accepted, overridden, or intentionally
   deferred.

# Outputs

- an explicit framework, runtime, and toolchain baseline
- a working project structure with known local build and test entrypoints
- recorded version and scaffold decisions for later maintainers

# Guardrails

- do not hard-code one framework, starter, or language ecosystem as the only
  valid path
- do not freeze framework or runtime versions without explicit compatibility
  reasoning
- do not keep generator defaults that conflict with project policy just because
  the template emitted them
- do not broaden this skill into repository hosting, CI publication, or
  release workflow ownership

# Exit Checks

- the framework, runtime, and toolchain choices are explicit
- unresolved version-selection questions are settled or surfaced clearly
- the baseline includes real development, build, and test entrypoints
- accepted and overridden scaffold defaults are documented clearly enough for
  follow-up work
