# Review Loop State And Review-Readiness Gate

Track each active PR with at least these fields:

- `last-push-at`
- `last-review-submitted-at`
- `review-in-progress-after-last-push`
- `open-review-threads`
- `new-valid-findings`
- `required-checks-green`
- `review-readiness-gate-passed`

The review-readiness gate passes only when all of these are true in the same
evaluation round:

- a review was submitted after the latest push
- no review is still running for the latest push
- no open review threads remain
- no new valid findings remain
- required checks are green

Treat missing or ambiguous review/check state as gate failure, not as an
implicit pass.

This gate only proves that the latest push was reviewed cleanly enough to be
considered for merge. Repository merge-method policy and final merge execution
still belong to `../../pr-merge/SKILL.md`.
