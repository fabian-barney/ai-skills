---
name: ai-skills-pr-review-respond
description: >-
  Respond to PR or MR review findings by classifying each handled finding as
  valid or invalid, fixing valid findings, replying to every handled thread,
  and resolving handled review comments cleanly. Use when addressing review
  comments after a review pass.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Handle review findings consistently so each thread gets a clear classification,
an explicit response, and either a completed fix path or a blocked precondition
that stops completion.

# When to Use

- use when a PR or MR review produced actionable findings or questions
- use when every handled review thread needs an explicit valid or invalid
  classification
- use when valid findings must be fixed on the branch with focused tests or
  proof of behavior before review handling is complete
- use when handled review comments must receive both a reply and final
  resolution
- use as the response-handling child skill under skill `ai-skills-pr-review`
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
- skill `ai-skills-plan` for ruleset-read gate evidence when a parent workflow has
  not already supplied it
- skill `ai-skills-compliance-dependency` for dependency license and transitive
  impact evidence
- `references/finding-classification.md` and
  `references/regression-test-expectations.md`

# Workflow

1. Verify that the applicable review ruleset-read gate has been satisfied
   before classifying findings or replying to threads, using parent workflow
   evidence or skill `ai-skills-plan`. If evidence is missing, stop with an
   explicit blocked precondition.
2. Classify each handled finding as valid or invalid based on the current
   code, rules, and evidence, using this priority order when triaging:
   correctness, security, compliance, data integrity, architecture,
   performance, observability, then maintainability. Interpret this consistently
   with skill `ai-skills-pr-review-write`.
3. For dependency-related findings, verify the dependency need, security risk,
   license compatibility, and relevant transitive impact through
   skill `ai-skills-compliance-dependency` before classifying.
4. For valid findings, apply a bounded fix before completion and prefer adding
   a focused regression test or proof of behavior.
5. For invalid findings, explain the concrete rationale instead of dismissing
   the concern vaguely.
6. If missing evidence, missing ruleset-read confirmation, or missing closure
   authority prevents confident handling, stop with an explicit blocked
   precondition instead of treating the finding as handled.
7. Reply to every handled thread with the classification, concise outcome,
   checks run, and anything that remains unverified.
8. Resolve every handled thread at the end of the response cycle. If
   repository or session rules do not allow the current actor to resolve the
   thread, stop with an explicit blocked precondition instead of treating the
   response cycle as complete.
9. Use `references/regression-test-expectations.md` to keep fixes and tests
   proportional to the finding.
10. Use the bundled examples when a valid or invalid response shape helps.

# Outputs

- a classification for each handled review finding
- bounded fixes and regression evidence for every valid finding
- concise replies on every handled review thread
- resolved handled review threads
- checks run and explicit verification gaps for each addressed finding or
  response batch
- explicit blocked-precondition reasons when evidence or closure authority is
  missing

# Guardrails

- do not leave actionable review comments unanswered
- do not leave handled review comments unresolved at completion
- do not classify or reply before the applicable ruleset-read gate is satisfied
- do not delete review comments; resolve or leave threads open according to
  repository rules
- do not classify a finding as invalid without concrete rationale
- do not classify dependency-related findings without checking dependency need,
  security risk, license compatibility, and relevant transitive impact
- do not treat a blocked precondition as a handled finding classification
- do not skip regression evidence when a valid finding changes behavior
- do not omit what was verified and what remains unverified
- do not broaden this skill into the full review loop or final merge decision

# Exit Checks

- the applicable review ruleset-read gate was satisfied before classification
- every handled thread has an explicit valid or invalid classification
- higher-priority findings were triaged in the documented priority order
- every valid finding has a fix with regression evidence or proof of behavior
- invalid findings have a factual rationale
- every handled thread has a reply and is resolved
- any blocked precondition is explicit instead of being modeled as a handled
  finding state
- dependency-related findings include dependency and license/security rationale
- replies state checks run and remaining verification gaps
- replies are concise and suitable for PR review flow
