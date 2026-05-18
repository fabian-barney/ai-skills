---
name: ai-skills-bootstrap-documentation
description: >-
  Establish the initial project documentation baseline so setup, contribution,
  and operating expectations are explicit from the start.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Create the first documentation baseline for a project so maintainers and
contributors can understand setup, workflow, and expectations without reverse
engineering them from code.

# When to Use

- use when a new project needs its first README, setup notes, contribution
  guidance, or architectural orientation
- use when repository, framework, or CI decisions are already known and must
  be reflected in docs
- use skill `ai-skills-version-support-policy` when documentation would
  otherwise make unsupported runtime or platform claims

# Inputs

- the project audience, purpose, and baseline workflow
- repository URL, framework/toolchain baseline, and CI expectations
- required setup, contribution, architecture, or operating docs
- any support-policy or environment claims the docs must make accurately

# Workflow

1. Identify the minimum documentation surfaces the project needs immediately,
   such as onboarding, local setup, contribution flow, or architecture notes.
2. Gather the repository, framework, CI, and support-policy decisions that the
   docs must reflect accurately.
3. Draft the smallest useful initial documentation baseline around the real
   project workflows instead of placeholder prose.
4. Separate required setup or contribution steps from optional future
   documentation so the first docs stay maintainable.
5. Record any deferred documentation surfaces explicitly rather than implying
   they already exist.

# Outputs

- an initial documentation baseline aligned to the real project setup
- explicit setup, contribution, or operating guidance for the intended
  audience
- a clear list of deferred documentation work when the first pass stays narrow

# Guardrails

- do not publish placeholder documentation that contradicts the real project
  workflow
- do not claim unsupported runtimes, platforms, or operating expectations
- do not broaden this skill into ongoing docs-program ownership
- do not hide deferred documentation debt by pretending the baseline is
  complete

# Exit Checks

- the initial documentation reflects the actual repository, framework, and CI
  state
- runtime or platform claims are explicit and supportable
- the audience and required documentation surfaces are clear
- deferred documentation work is surfaced explicitly
