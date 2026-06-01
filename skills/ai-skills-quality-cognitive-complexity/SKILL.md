---
name: ai-skills-quality-cognitive-complexity
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
- use `scripts/run-cognitive-cli.mjs` and `references/cli-tooling.md` when no
  stronger repository-owned cognitive-complexity gate is already available
- use `references/cognitive-complexity-threshold.md` for the threshold,
  evidence order, and reduction heuristics
- use `examples/cognitive-complexity-review-finding.md` when reporting a
  failing method

# Inputs

- the changed files, methods, or bounded diff under review
- the strongest available complexity evidence from CI, Sonar-like tooling,
  IDE/static analysis, or a conservative estimate
- access to the skill-owned CLI helper or a repository-owned equivalent gate
- the applicable language, relevant paths, and desired threshold argument for
  the bounded scope
- relevant tests for behavior-preserving refactors
- `scripts/run-cognitive-cli.mjs`
- `references/cli-tooling.md`
- `references/cognitive-complexity-threshold.md`

# Workflow

1. Gather the strongest available cognitive-complexity evidence for the bounded
   scope from CI, repository-owned tooling, the skill-owned CLI helper, or an
   equivalent report.
2. When repository-owned tooling is unavailable, run
   `scripts/run-cognitive-cli.mjs` for the relevant language with `--agent`, the
   desired `--threshold`, and only the files or directories in the bounded
   scope.
3. Let the helper resolve and cache the latest language-specific cognitive CLI,
   using the cached tool when the weekly metadata refresh is unavailable.
4. Classify every relevant method as new, altered existing, or altered legacy
   using `references/cognitive-complexity-threshold.md`.
5. Treat new methods above `15` as failing results.
6. Treat altered existing methods that do not qualify as legacy as failing
   results when they exceed `15`.
7. When an altered legacy method remains between `16` and `20`, require
   behavior-risk evidence and a documented reduction plan.
8. When an altered legacy method remains above `20`, require a created or
   linked follow-up issue with an explicit reduction plan; treat non-legacy
   methods above `20` as failing results.
9. When no tool result is available, make a conservative estimate and label it
   explicitly as an estimate.
10. Reduce complexity by flattening nested control flow, extracting cohesive
   helpers, and separating orchestration from decision logic.
11. Re-measure after each refactor until the bounded scope satisfies the
   applicable threshold or the legacy-tolerance documentation is complete.
12. Use `examples/cognitive-complexity-review-finding.md` when reporting the
   remaining finding or final result.

# Outputs

- a pass or fail result for the bounded scope against the applicable tiered
  threshold
- method-level findings with evidence or explicitly labeled estimates
- a concise reduction direction when the threshold is violated
- a documented reduction plan when relying on the altered-legacy tolerance
- CLI command, version, cache status, and threshold used when the skill-owned
  helper supplies the evidence

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
- do not analyze the whole repository through the helper when changed paths are
  available and sufficient for the bounded scope

# Exit Checks

- every relevant method is supported by tool evidence or an explicitly labeled
  estimate
- helper-backed evidence uses `--agent`, the intended threshold, and scoped
  paths, or documents why that was not possible
- every relevant method is classified as new, altered existing, or altered
  legacy
- no new method exceeds cognitive complexity `15`
- no altered existing method that fails legacy classification exceeds cognitive
  complexity `15`
- every altered legacy method above `15` has the required tolerance or
  follow-up documentation, or a failing result
- refactors preserve behavior and improve readability rather than only moving
  branches elsewhere
