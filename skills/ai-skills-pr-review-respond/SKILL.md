---
name: ai-skills-pr-review-respond
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
- use when every review thread needs an explicit valid, invalid, or unresolved
  classification
- use when valid findings should be fixed on the branch with focused tests when
  appropriate
- use as the response-handling child skill under `ai-skills-pr-review`
- use `references/finding-classification.md` for valid versus invalid
  classification rules
- use `references/regression-test-expectations.md` for fix and regression-test
  expectations
- use `examples/valid-finding-response.md` and
  `examples/invalid-finding-response.md` when a concrete thread reply helps

# Inputs

- the review findings and active review threads
- the changed scope and relevant evidence
- evidence that the applicable review ruleset-read gate has been satisfied
- repository or session rules for resolving conversations
- available tests or focused reproduction steps
- `../ai-skills-plan/SKILL.md` for ruleset-read gate evidence when a parent workflow has
  not already supplied it
- `../ai-skills-compliance-dependency/SKILL.md` for dependency license and transitive
  impact evidence
- `references/finding-classification.md` and
  `references/regression-test-expectations.md`

# Workflow

1. Verify that the applicable review ruleset-read gate has been satisfied
   before classifying findings or replying to threads, using parent workflow
   evidence or `../ai-skills-plan/SKILL.md`. If evidence is missing, stop with an explicit
   unresolved precondition.
2. Classify each finding as valid, invalid, or unresolved based on the current
   code, rules, and evidence, using this priority order when triaging:
   correctness, security, compliance, data integrity, architecture,
   performance, observability, then maintainability. Interpret this consistently
   with `../ai-skills-pr-review-write/references/severity-order.md`.
3. For dependency-related findings, verify the dependency need, security risk,
   license compatibility, and relevant transitive impact through
   `../ai-skills-compliance-dependency/SKILL.md` before classifying.
4. For valid findings, apply a bounded fix when appropriate and prefer adding a
   focused regression test or proof of behavior.
5. For invalid findings, explain the concrete rationale instead of dismissing
   the concern vaguely.
6. For unresolved findings, explain what evidence, clarification, or follow-up
   is still needed and keep the thread open until that gap is closed.
7. Reply to every thread with the classification, concise outcome, checks run,
   and anything that remains unverified.
8. Resolve handled threads only when repository or session rules allow the
   current actor to resolve them.
9. Use `references/regression-test-expectations.md` to keep fixes and tests
   proportional to the finding.
10. Use the bundled examples when a valid or invalid response shape helps.

# Outputs

- a classification for each handled review finding
- bounded fixes and regression evidence for valid findings when appropriate
- concise replies on every addressed review thread
- checks run and explicit verification gaps for each addressed finding or
  response batch
- explicit missing-evidence or follow-up requests for unresolved findings

# Guardrails

- do not leave actionable review comments unanswered
- do not classify or reply before the applicable ruleset-read gate is satisfied
- do not delete review comments; resolve or leave threads open according to
  repository rules
- do not classify a finding as invalid without concrete rationale
- do not classify dependency-related findings without checking dependency need,
  security risk, license compatibility, and relevant transitive impact
- do not silently treat unresolved findings as valid or invalid
- do not skip regression evidence when a valid finding changes behavior
- do not omit what was verified and what remains unverified
- do not broaden this skill into the full review loop or final merge decision

# Exit Checks

- the applicable review ruleset-read gate was satisfied before classification
- every handled thread has an explicit classification
- higher-priority findings were triaged in the documented priority order
- valid findings have a fix, a justified deferral, or clear blocking reason
- invalid findings have a factual rationale
- unresolved findings state what is still needed before closure
- dependency-related findings include dependency and license/security rationale
- replies state checks run and remaining verification gaps
- replies are concise and suitable for PR review flow
