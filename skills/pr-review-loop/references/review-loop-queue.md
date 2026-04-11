# Review Queue Behavior

Use round-robin progression across active PRs:

1. inspect the next item
2. push fixes if needed
3. request fresh automated review when the latest push has no post-push review
4. skip items with running checks or active review generation
5. continue with the next item instead of waiting

This keeps multiple PRs moving in parallel while preserving the rule that each
push needs its own fresh review state before merge.

If a PR cannot proceed because of missing permissions, missing branch updates,
or missing review infrastructure, keep it in the queue with an explicit blocker
instead of silently dropping it.
