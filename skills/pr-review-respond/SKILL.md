---
name: pr-review-respond
description: >-
  Respond to PR or MR review findings by classifying each finding, fixing
  valid findings when appropriate, and replying to every thread with concise
  rationale. Use when addressing review comments after a review pass.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Handle review findings consistently so each thread gets a clear classification,
an explicit response, and an appropriate fix or rationale.

# When to Use

- use when a PR or MR review produced actionable findings or questions
- use when every review thread needs an explicit valid or invalid
  classification
- use when valid findings should be fixed on the branch with focused tests when
  appropriate
- use as the response-handling child skill under `pr-review`
- use `references/finding-classification.md` for valid versus invalid
  classification rules
- use `references/regression-test-expectations.md` for fix and regression-test
  expectations
- use `examples/valid-finding-response.md` and
  `examples/invalid-finding-response.md` when a concrete thread reply helps

# Inputs

- the review findings and active review threads
- the changed scope and relevant evidence
- repository or session rules for resolving conversations
- available tests or focused reproduction steps
- `references/finding-classification.md` and
  `references/regression-test-expectations.md`

# Workflow

1. Classify each finding as valid, invalid, or unresolved based on the current
   code, rules, and evidence.
2. For valid findings, apply a bounded fix when appropriate and prefer adding a
   focused regression test or proof of behavior.
3. For invalid findings, explain the concrete rationale instead of dismissing
   the concern vaguely.
4. Reply to every thread with the classification and concise outcome.
5. Resolve handled threads only when repository or session rules allow the
   current actor to resolve them.
6. Use `references/regression-test-expectations.md` to keep fixes and tests
   proportional to the finding.
7. Use the bundled examples when a valid or invalid response shape helps.

# Outputs

- a classification for each handled review finding
- bounded fixes and regression evidence for valid findings when appropriate
- concise replies on every addressed review thread

# Guardrails

- do not leave actionable review comments unanswered
- do not classify a finding as invalid without concrete rationale
- do not skip regression evidence when a valid finding changes behavior
- do not broaden this skill into the full review loop or final merge decision

# Exit Checks

- every handled thread has an explicit classification
- valid findings have a fix, a justified deferral, or clear blocking reason
- invalid findings have a factual rationale
- replies are concise and suitable for PR review flow
