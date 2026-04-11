# Review Loop State And Hard Merge Gate

Track each active PR with at least these fields:

- `last-push-at`
- `last-review-submitted-at`
- `review-in-progress-after-last-push`
- `open-review-threads`
- `new-valid-findings`
- `required-checks-green`
- `merge-gate-passed`

The hard merge gate passes only when all of these are true in the same
evaluation round:

- a review was submitted after the latest push
- no review is still running for the latest push
- no open review threads remain
- no new valid findings remain
- required checks are green

Treat missing or ambiguous review/check state as gate failure, not as an
implicit pass.
