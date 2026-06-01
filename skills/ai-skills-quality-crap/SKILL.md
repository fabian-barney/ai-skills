---
name: ai-skills-quality-crap
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
- use `scripts/run-crap-cli.mjs` and `references/cli-tooling.md` when no
  stronger repository-owned CRAP gate is already available
- use `references/crap-threshold.md` for the hard threshold, evidence order,
  and reduction levers
- use `examples/crap-review-finding.md` when reporting a failing method in
  review or gate output

# Inputs

- the changed files, methods, or bounded diff under review
- the strongest available CRAP evidence, such as CI output or a local
  `crap-java-check` report
- access to the skill-owned CLI helper or a repository-owned equivalent gate
- the applicable language, relevant paths, and desired threshold argument for
  the bounded scope
- available tests or coverage-improvement options for the bounded scope
- `scripts/run-crap-cli.mjs`
- `references/cli-tooling.md`
- `references/crap-threshold.md`

# Workflow

1. Collect the strongest available CRAP evidence for the changed scope from CI,
   repository-owned tooling, the skill-owned CLI helper, or an equivalent
   report.
2. When repository-owned tooling is unavailable, run `scripts/run-crap-cli.mjs`
   for the relevant language with `--agent`, the desired `--threshold`, and
   only the files or directories in the bounded scope.
3. Let the helper resolve and cache the latest language-specific CRAP CLI, using
   the cached tool when the weekly metadata refresh is unavailable.
4. Treat every relevant method with CRAP score greater than `8` as a failing
   result.
5. If the score is unavailable for the relevant scope, surface missing evidence
   instead of inventing an exact CRAP value.
6. Reduce failing scores by simplifying control flow, extracting cohesive
   methods, or adding focused tests that cover the risky branches.
7. Re-run the metric after changes and record the final worst score for the
   bounded scope.
8. Use `examples/crap-review-finding.md` when communicating the remaining
   finding or the final pass result.

# Outputs

- a pass or fail result for the bounded scope against the `<= 8` threshold
- method-level findings with metric evidence when the threshold is violated
- CLI command, version, cache status, and threshold used when the skill-owned
  helper supplies the evidence
- explicit note when evidence is missing and the gate cannot be confirmed

# Guardrails

- do not treat a score above `8` as advisory
- do not guess an exact CRAP number when tool evidence is unavailable
- do not mask a high score with unrelated cleanup outside the bounded change
- do not claim the gate passed unless the metric evidence supports that result
- do not analyze the whole repository through the helper when changed paths are
  available and sufficient for the bounded scope

# Exit Checks

- every relevant method is backed by CRAP evidence or an explicit missing
  evidence note
- no relevant method exceeds CRAP score `8` without a failing result
- helper-backed evidence uses `--agent`, the intended threshold, and scoped
  paths, or documents why that was not possible
- any refactor or test addition preserves behavior and stays bounded to the
  identified risk
