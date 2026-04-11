---
name: quality-cognitive-complexity
description: Enforce a hard cognitive-complexity threshold of at most 15 for the bounded change set.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Keep the bounded change set below a hard cognitive-complexity limit so new or
changed methods remain understandable and reviewable.

# When to Use

- use when implementing, refactoring, or reviewing branch-heavy methods
- use when a repository exposes cognitive-complexity reports through CI,
  Sonar-like tools, or local analysis
- use `references/cognitive-complexity-threshold.md` for the threshold,
  evidence order, and reduction heuristics
- use `examples/cognitive-complexity-review-finding.md` when reporting a
  failing method

# Inputs

- the changed files, methods, or bounded diff under review
- the strongest available complexity evidence from CI, Sonar-like tooling,
  IDE/static analysis, or a conservative estimate
- relevant tests for behavior-preserving refactors
- `references/cognitive-complexity-threshold.md`

# Workflow

1. Gather the strongest available cognitive-complexity evidence for the bounded
   scope.
2. Treat every relevant method with cognitive complexity greater than `15` as a
   failing result.
3. When no tool result is available, make a conservative estimate and label it
   explicitly as an estimate.
4. Reduce complexity by flattening nested control flow, extracting cohesive
   helpers, and separating orchestration from decision logic.
5. Re-measure after each refactor until the bounded scope is at or below the
   threshold.
6. Use `examples/cognitive-complexity-review-finding.md` when reporting the
   remaining finding or final result.

# Outputs

- a pass or fail result for the bounded scope against the `<= 15` threshold
- method-level findings with evidence or explicitly labeled estimates
- a concise reduction direction when the threshold is violated

# Guardrails

- do not treat scores above `15` as acceptable for the bounded scope
- do not split code mechanically without improving cohesion or readability
- do not hide complexity in helper names, boolean flags, or branch-heavy
  parameter behavior
- do not report an estimate as if it were tool-confirmed evidence

# Exit Checks

- every relevant method is supported by tool evidence or an explicitly labeled
  estimate
- no relevant method exceeds cognitive complexity `15` without a failing result
- refactors preserve behavior and improve readability rather than only moving
  branches elsewhere
