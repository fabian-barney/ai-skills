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
- supporting evidence, such as failing behavior, missing tests, or policy gaps
- the impacted file or location
- `references/finding-shape.md` and `references/severity-order.md`

# Workflow

1. Confirm the finding is concrete enough to point to a specific file, path, or
   reviewable scope.
2. Classify the severity using the priority direction from
   `references/severity-order.md`.
3. Write the finding with the canonical shape from
   `references/finding-shape.md`: severity, impacted location, concrete issue,
   why it matters, and actionable remediation.
4. Keep the wording factual and decision-useful instead of vague or rhetorical.
5. Use `examples/review-finding.md` when a concrete review comment shape helps.
6. Hand the final wording to `formatting-github-comment` when GitHub Markdown
   normalization is still needed.

# Outputs

- a reviewer-facing finding anchored to a concrete location or scope
- explicit severity and risk rationale
- actionable remediation guidance for the implementer

# Guardrails

- do not spend review effort on style nits before higher-risk issues
- do not write vague findings without a concrete problem statement
- do not omit why the issue matters
- do not broaden this skill into response handling, fixes, or merge decisions

# Exit Checks

- the finding is concrete and severity-ranked
- the risk and remediation are explicit
- the wording is concise enough for PR review flow
- the comment is ready for GitHub or MR review posting
