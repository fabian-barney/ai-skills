# Review Loop State And Review-Readiness Gate

Track each active PR with at least these fields:

- `last-push-at`
- `current-head-oid`
- `last-review-submitted-at`
- `last-review-requested-at`
- `last-review-requested-head-oid`
- `review-signal-state`
- `review-in-progress-after-last-push`
- `open-review-threads`
- `new-valid-findings`
- `required-checks-green`
- `issue-link-present`
- `pr-scope-focused`
- `review-readiness-gate-passed`

Define `review-signal-state` as exactly one of:

- `awaiting-automatic-review-signal`: fewer than 5 minutes have elapsed since
  `last-push-at`, no submitted automated review is visible for
  `current-head-oid`, and no pending review request is visible for that head
- `review-request-pending`: a `ReviewRequestedEvent` is visible for
  `current-head-oid`, no newer `ReviewRequestRemovedEvent` cancels that
  request, and no submitted automated review is visible for that head yet
- `review-submitted`: a submitted automated review is visible for
  `current-head-oid`
- `manual-review-request-eligible`: at least 5 minutes have elapsed since
  `last-push-at`, no submitted automated review is visible for
  `current-head-oid`, and no pending review request is visible for that head

Use `last-review-requested-at` and `last-review-requested-head-oid` to record
the most recent explicit manual review request issued by the loop so duplicate
same-head triggers are prevented. A review request or review tied to an older
head never satisfies `current-head-oid`.

The review-readiness gate passes only when all of these are true in the same
evaluation round:

- `review-signal-state` is `review-submitted`
- a review was submitted after the latest push
- the submitted review covers `current-head-oid`
- no review is still running for the latest push
- no open review threads remain
- no new valid findings remain
- required checks are green
- the PR body links the main issue with an issue-closing link
- the PR scope remains focused on the linked issue without unrelated bundled
  repository changes

Treat missing or ambiguous review/check state as gate failure, not as an
implicit pass.

This gate only proves that the latest push was reviewed cleanly enough to be
considered for merge. Repository merge-method policy and final merge execution
still belong to skill `ai-skills-pr-merge`.
