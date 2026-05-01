# Review Queue Behavior

Use round-robin progression across active PRs:

1. inspect the next item
2. push fixes if needed
3. request fresh automated review when the latest push has no post-push review
4. skip items with running checks or active review generation
5. continue with the next item instead of waiting

This keeps multiple PRs moving in parallel while preserving the rule that each
push needs its own fresh review state before merge.

Treat review generation latency as operational state, not a fixed timer. Do
not merge because an arbitrary wait elapsed; merge only from explicit
review/check/thread state.

For strict GitHub Copilot review loops, re-trigger review through the platform
API described in `copilot-review-trigger.md` after every fix push. Do not use
PR comments or `@copilot` mentions as the trigger.

If a PR cannot proceed because of missing permissions, missing branch updates,
or missing review infrastructure, keep it in the queue with an explicit blocker
instead of silently dropping it.
