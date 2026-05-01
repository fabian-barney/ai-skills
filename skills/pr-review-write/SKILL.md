---
name: pr-review-write
description: >-
  Write precise PR or MR review findings with severity, affected location,
  risk, and remediation guidance. Use when leaving new reviewer-facing
  findings on code or documentation changes.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Write reviewer-facing findings that are concrete, severity-ranked, and easy for
an implementer to act on.

# When to Use

- use when leaving new findings on a PR or MR review
- use when a review workflow needs precise line-level or file-level comments
- use as the finding-writing child skill under `pr-review`
- use `references/finding-shape.md` for the canonical review-finding contract
- use `references/severity-order.md` for severity-first prioritization
- use `examples/review-finding.md` when a concrete finding example helps
- use `formatting-github-comment` when the finding text still needs final
  GitHub Markdown normalization

# Inputs

- the changed files or diff under review
- the concrete issue being reported
- evidence that the applicable review ruleset-read gate has been satisfied
- supporting evidence, such as failing behavior, missing tests, or policy gaps
- the impacted file or location
- `references/finding-shape.md` and `references/severity-order.md`

# Workflow

1. Verify that the applicable review ruleset-read gate has been satisfied
   before writing a reviewer-facing finding.
2. Confirm the finding is concrete enough to point to a specific file, path, or
   reviewable scope.
3. Classify the severity using the priority direction from
   `references/severity-order.md`.
4. Confirm the orchestrating review workflow owns full-review coverage across
   top-risk categories, semantic parent-rule violations, dependency/tooling
   additions, test or verification gaps, and concise output.
5. For dependency or tooling additions, include dependency need, overlap with
   existing tools, license compatibility, and security or transitive-risk
   considerations in the finding.
6. Write the finding with the canonical shape from
   `references/finding-shape.md`: severity, impacted location, concrete issue,
   why it matters, and actionable remediation.
7. Keep the wording factual and decision-useful instead of vague or rhetorical.
8. Use `examples/review-finding.md` when a concrete review comment shape helps.
9. Hand the final wording to `formatting-github-comment` when GitHub Markdown
   normalization is still needed.

# Outputs

- a reviewer-facing finding anchored to a concrete location or scope
- explicit severity and risk rationale
- dependency/tooling rationale when the finding concerns new dependencies or
  tools
- actionable remediation guidance for the implementer

# Guardrails

- do not spend review effort on style nits before higher-risk issues
- do not write findings before the applicable review ruleset-read gate is
  satisfied
- do not let this leaf skill replace the orchestrator's full-review coverage
  checklist
- do not write vague findings without a concrete problem statement
- do not report dependency/tooling findings without dependency need, overlap,
  license, and security or transitive-risk rationale
- do not omit why the issue matters
- do not blur critical risk and low-impact nits into the same priority
- do not broaden this skill into response handling, fixes, or merge decisions

# Exit Checks

- the applicable review ruleset-read gate was satisfied before writing
- the finding is concrete and severity-ranked
- full-review coverage remains owned by the orchestrating review workflow
- dependency/tooling findings include need, overlap, license, and security or
  transitive-risk rationale
- the risk and remediation are explicit
- the wording is concise enough for PR review flow
- the comment is ready for GitHub or MR review posting
