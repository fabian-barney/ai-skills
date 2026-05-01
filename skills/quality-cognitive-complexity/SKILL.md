---
name: quality-cognitive-complexity
description: Apply tiered cognitive-complexity thresholds for new, changed, and legacy methods.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Keep new and changed methods understandable and reviewable by applying the
project's tiered cognitive-complexity thresholds, including the documented
legacy-method tolerance when behavior risk makes immediate reduction unsafe.

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
2. Classify every relevant method as new, altered existing, or altered legacy
   using `references/cognitive-complexity-threshold.md`.
3. Treat new methods above `15` as failing results.
4. Treat altered existing methods that do not qualify as legacy as failing
   results when they exceed `15`.
5. When an altered legacy method remains between `16` and `20`, require
   behavior-risk evidence and a documented reduction plan.
6. When an altered legacy method remains above `20`, require a created or
   linked follow-up issue with an explicit reduction plan; treat non-legacy
   methods above `20` as failing results.
7. When no tool result is available, make a conservative estimate and label it
   explicitly as an estimate.
8. Reduce complexity by flattening nested control flow, extracting cohesive
   helpers, and separating orchestration from decision logic.
9. Re-measure after each refactor until the bounded scope satisfies the
   applicable threshold or the legacy-tolerance documentation is complete.
10. Use `examples/cognitive-complexity-review-finding.md` when reporting the
   remaining finding or final result.

# Outputs

- a pass or fail result for the bounded scope against the applicable tiered
  threshold
- method-level findings with evidence or explicitly labeled estimates
- a concise reduction direction when the threshold is violated
- a documented reduction plan when relying on the altered-legacy tolerance

# Guardrails

- do not introduce new methods above cognitive complexity `15`
- do not treat altered legacy scores above `15` as acceptable without behavior
  risk evidence and a documented reduction plan
- do not leave altered legacy methods above `20` without a failing result or a
  linked follow-up issue with an explicit reduction plan
- do not split code mechanically without improving cohesion or readability
- do not hide complexity in helper names, boolean flags, or branch-heavy
  parameter behavior
- do not report an estimate as if it were tool-confirmed evidence

# Exit Checks

- every relevant method is supported by tool evidence or an explicitly labeled
  estimate
- every relevant method is classified as new, altered existing, or altered
  legacy
- no new method exceeds cognitive complexity `15`
- no altered existing method that fails legacy classification exceeds cognitive
  complexity `15`
- every altered legacy method above `15` has the required tolerance or
  follow-up documentation, or a failing result
- refactors preserve behavior and improve readability rather than only moving
  branches elsewhere
