# Review Queue Behavior

Use round-robin progression across active PRs:

1. inspect the next item
2. push fixes if needed
3. classify the current head as `review-submitted`,
   `review-request-pending`, `awaiting-automatic-review-signal`, or
   `manual-review-request-eligible`
4. request fresh automated review only when the current head is
   `manual-review-request-eligible`
5. skip items with running checks, active review generation, or a visible
   pending request for the current head
6. continue with the next item instead of waiting

This keeps multiple PRs moving in parallel while preserving the rule that each
push needs its own fresh review state before merge.

Treat `awaiting-automatic-review-signal` and `review-request-pending` as
operational queue states, not as instructions to block. Revisit those PRs on
later passes while progressing other items.

Treat the 5-minute minimum from `last-push-at` as a trigger-eligibility rule,
not as a fixed wait timer for merge or review completion. Do not merge because
an arbitrary wait elapsed; merge only from explicit review/check/thread state.

For strict GitHub Copilot review loops, after every fix push first inspect the
current head state described in `copilot-review-trigger.md` under this skill's
`references` directory. Use the approved `gh pr view <PR_NUMBER> --json id
--jq .id` plus `gh api graphql` flow only when the current head is
`manual-review-request-eligible`. Do not use PR comments or `@copilot`
mentions as the trigger.

Do not send a second explicit manual request for the same head while a pending
request remains visible. If a `ReviewRequestRemovedEvent` appears for the
current head before a submitted review arrives, the PR can become
`manual-review-request-eligible` again on a later pass.

If a PR cannot proceed because of missing permissions, missing branch updates,
or missing review infrastructure, keep it in the queue with an explicit blocker
instead of silently dropping it.
