---
name: quality-crap
description: Enforce a hard CRAP-score threshold of at most 8 for the bounded change set.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Evaluate the bounded change set against a hard CRAP-score threshold so methods
with excessive combined complexity and weak coverage are rejected before merge.

# When to Use

- use when the repository or delivery flow exposes a CRAP metric or equivalent
  combined complexity-and-coverage score
- use when reviewing or refactoring methods touched by the current change
- use `references/crap-threshold.md` for the hard threshold, evidence order,
  and reduction levers
- use `examples/crap-review-finding.md` when reporting a failing method in
  review or gate output

# Inputs

- the changed files, methods, or bounded diff under review
- the strongest available CRAP evidence, such as CI output or a local
  `crap-java-check` report
- available tests or coverage-improvement options for the bounded scope
- `references/crap-threshold.md`

# Workflow

1. Collect the strongest available CRAP evidence for the changed scope from CI,
   local tooling, or an equivalent report.
2. Treat every relevant method with CRAP score greater than `8` as a failing
   result.
3. If the score is unavailable for the relevant scope, surface missing evidence
   instead of inventing an exact CRAP value.
4. Reduce failing scores by simplifying control flow, extracting cohesive
   methods, or adding focused tests that cover the risky branches.
5. Re-run the metric after changes and record the final worst score for the
   bounded scope.
6. Use `examples/crap-review-finding.md` when communicating the remaining
   finding or the final pass result.

# Outputs

- a pass or fail result for the bounded scope against the `<= 8` threshold
- method-level findings with metric evidence when the threshold is violated
- explicit note when evidence is missing and the gate cannot be confirmed

# Guardrails

- do not treat a score above `8` as advisory
- do not guess an exact CRAP number when tool evidence is unavailable
- do not mask a high score with unrelated cleanup outside the bounded change
- do not claim the gate passed unless the metric evidence supports that result

# Exit Checks

- every relevant method is backed by CRAP evidence or an explicit missing
  evidence note
- no relevant method exceeds CRAP score `8` without a failing result
- any refactor or test addition preserves behavior and stays bounded to the
  identified risk
