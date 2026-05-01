---
name: ai-skills-code-refactoring
description: >-
  Refactor code while preserving behavior through scoped coverage, duplication,
  complexity, CRAP-score, and convention gates.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Refactor code only after the affected behavior is protected, then improve the
bounded implementation without changing externally observable behavior.

# When to Use

- use when a user asks to refactor, simplify, clean up, or restructure existing
  code while preserving current behavior
- use when a change primarily improves internal code quality rather than adding
  new product behavior
- use `references/refactoring-order.md` for the mandatory refactoring sequence
  and evidence expectations
- use `references/coverage-before-refactor.md` for the coverage-first rule and
  acceptable justification when `100%` coverage is impossible
- use `examples/refactoring-status.md` when reporting scope, evidence, and
  residual risks
- coordinate with `../ai-skills-quality-cognitive-complexity/references/cognitive-complexity-threshold.md`
  when measuring or reducing cognitive complexity
- coordinate with `../ai-skills-quality-crap/references/crap-threshold.md` when
  CRAP evidence exists

# Inputs

- the exact files, functions, methods, or modules requested for refactoring
- current behavior expectations, tests, fixtures, snapshots, or production
  compatibility constraints
- strongest available coverage evidence for the scoped functions
- strongest available duplication, cognitive-complexity, CRAP, and convention
  evidence for the scoped functions
- project-specific conventions, linters, formatters, and quality gates
- `references/refactoring-order.md`
- `references/coverage-before-refactor.md`

# Workflow

1. Identify the exact functions or methods being refactored and keep all rules
   scoped to that bounded set.
2. Characterize current behavior from tests, fixtures, callers, contracts,
   observed outputs, or user-provided examples before editing implementation.
3. Raise coverage for the scoped functions to `100%` using the strongest
   available coverage metric before refactoring behavior-preserving code.
4. If `100%` scoped coverage is impossible, document the objective blocker and
   the strongest substitute evidence before changing implementation.
5. Remove or reduce duplication in the scoped implementation without extracting
   helpers that obscure domain intent.
6. Reduce cognitive complexity for each scoped function to `<= 15`, using
   `../ai-skills-quality-cognitive-complexity/references/cognitive-complexity-threshold.md`
   for evidence order and reduction tactics.
7. Reduce CRAP score for each scoped function to `<= 8` when CRAP evidence is
   available, using `../ai-skills-quality-crap/references/crap-threshold.md`.
8. Apply the repository's code conventions, formatter, linter, and local helper
   patterns after the structural refactor is complete.
9. Re-run the relevant tests and quality gates, then compare behavior evidence
   before and after the refactor.
10. Use `examples/refactoring-status.md` when summarizing what changed, which
    gates passed, and which objective constraints remain.

# Outputs

- behavior-preserving refactor changes scoped to the identified functions
- focused tests or documented equivalent evidence protecting current behavior
- reduced duplication, cognitive complexity `<= 15`, and CRAP score `<= 8`
  where the relevant evidence is available
- final status that names the scoped functions, validation commands, metric
  evidence, and any justified coverage or metric gaps

# Guardrails

- do not refactor unscoped functions as opportunistic cleanup
- do not change externally observable behavior unless the user explicitly
  expands the task beyond refactoring
- do not reduce coverage, remove behavior assertions, or weaken tests to make a
  refactor pass
- do not claim `100%` coverage, cognitive complexity, or CRAP results without
  tool evidence or an explicit estimate label
- do not hide complexity in vague helpers, broad boolean flags, or duplicated
  orchestration spread across new methods
- do not let formatting churn or unrelated convention cleanup dominate the diff

# Exit Checks

- the refactored functions are explicitly scoped and no unrelated behavior was
  changed
- scoped behavior is protected by `100%` coverage or a documented objective
  exception with strongest available substitute evidence
- duplication in the scoped implementation was removed or an objective reason
  for retaining it is documented
- every scoped function is at cognitive complexity `<= 15` or has a failing
  result with evidence
- every scoped function with CRAP evidence is at CRAP score `<= 8` or has a
  failing result with evidence
- project conventions and quality gates have been applied after the structural
  refactor
