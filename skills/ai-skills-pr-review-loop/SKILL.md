---
name: ai-skills-pr-review-loop
description: >-
  Run the post-push pull request review loop until no valid findings remain and
  merge gates are satisfied. Use when one or more active PRs must be driven
  through automated review, fixes, thread handling, and final merge readiness.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Drive active PRs through a repeatable post-push review loop so valid findings
are handled, review threads converge cleanly, and merge decisions are made only
after the latest push has been reviewed.

# When to Use

- use when one or more PRs are already open and should be advanced through
  review to a clean merge gate
- use when the repository relies on an automated PR reviewer, such as GitHub
  Copilot review, after each push
- use when multiple PRs can be progressed round-robin without idle waiting
- use skill `ai-skills-pr-review` for family-root classification and closure
  boundaries
- use skill `ai-skills-pr-review-respond` for thread replies and finding
  classification handling
- use skill `ai-skills-pr-merge` for final merge gating and merge execution
- use `references/review-loop-state.md` for the required per-PR state model and
  review-readiness gate
- use `references/review-loop-queue.md` for round-robin queue behavior
- use `references/copilot-review-trigger.md` when strict GitHub Copilot review
  re-triggering is required
- use `examples/review-loop-status.md` when reporting loop state or completion

# Inputs

- one or more active PRs with their latest head commits
- session entry preferences when already answered:
  `RUN_REVIEW_LOOP`, `IMPLEMENT_AFTER_PLAN`, and `MERGE_AFTER_CLEAN_LOOP`
- the latest push time, current head commit, automated-review state,
  review-request timeline state, review threads, and required checks for each
  PR
- repository preferences about whether clean PRs should be merged
- access to the PR platform APIs needed to request or inspect automated review
- for strict GitHub Copilot review loops, access to
  `gh api graphql` to inspect current head review and timeline state plus
  `gh pr view <PR_NUMBER> --json id --jq .id` for the approved manual
  review-request flow
- the main linked issue for each PR and whether the PR body contains an
  issue-closing link
- the intended bounded scope for each PR, used to detect unrelated bundled
  changes
- skill `ai-skills-pr-review`
- skill `ai-skills-pr-review-respond`
- skill `ai-skills-pr-merge`
- `references/review-loop-state.md`
- `references/review-loop-queue.md`
- `references/copilot-review-trigger.md`

# Workflow

1. Capture session entry preferences once when the user prompt did not already
   answer them: `RUN_REVIEW_LOOP`, `IMPLEMENT_AFTER_PLAN`, and
   `MERGE_AFTER_CLEAN_LOOP`. Do not ask again in the same session.
2. If `RUN_REVIEW_LOOP=false`, report that the loop is intentionally skipped
   for this session and stop before mutating PR state.
3. Build the active PR queue and track the current state for each item using
   the fields in `references/review-loop-state.md`.
4. Process active items in round-robin order instead of waiting idly on a
   single PR.
5. After each push, require fresh review state for that PR head: clear the
   previous pass assumptions, capture the current `headRefOid`, inspect
   required checks, inspect unresolved threads, and inspect both submitted
   automated reviews and review-request timeline evidence for that same head.
6. If the current head already has a submitted automated review, treat that
   head as `review-submitted` and continue with the latest review results.
7. If the current head does not yet have a submitted automated review but a
   visible automatic review request exists for that same head with no newer
   removal event, treat that head as `review-request-pending` and continue with
   the next item without re-triggering review.
8. If the current head has neither a submitted automated review nor a pending
   review request and fewer than 5 minutes have elapsed since `last-push-at`,
   treat that head as `awaiting-automatic-review-signal` and continue with the
   next item without blocking.
9. If at least 5 minutes have elapsed since `last-push-at` and the current
   head still has neither a submitted automated review nor a pending review
   request, treat that head as `manual-review-request-eligible`, request
   automated review once through the platform API or configured review
   mechanism, record `last-review-requested-at` and
   `last-review-requested-head-oid`, then move on to the next item without
   blocking. For strict GitHub Copilot review loops, first capture the PR node
   id with `gh pr view <PR_NUMBER> --json id --jq .id`, then call
   `gh api graphql` using the `requestReviewsByLogin` mutation for
   `copilot-pull-request-reviewer`, and treat
   `references/copilot-review-trigger.md` as the copy-safe source for the exact
   mutation and verification steps.
10. If checks are still running or a review is still in progress for the
   latest push, keep the PR active and continue with the next item.
11. When the latest push has completed review results, apply
   skill `ai-skills-pr-review` and skill `ai-skills-pr-review-respond` to classify
   handled findings as valid or invalid, reply to every handled thread, fix
   every valid finding, and resolve all handled threads before the round is
   complete.
12. If fixes were pushed, restart the same post-push review cycle for that PR
   instead of treating earlier review results as sufficient. Do not send a
   second explicit manual review request for the same head unless the head
   commit changed or review-request timeline evidence shows the pending request
   was removed. For strict GitHub Copilot review loops, repeat the same
   approved `gh` CLI / GraphQL flow instead of using PR comments or `@copilot`
   mentions.
13. If no fixes were needed, verify the PR remains focused on the linked issue
   and the PR body contains the issue-closing link, then evaluate the
   review-readiness gate from `references/review-loop-state.md`.
14. When the review-readiness gate passes and
   `MERGE_AFTER_CLEAN_LOOP=true`, hand the PR to skill `ai-skills-pr-merge` for
   the remaining merge-policy checks and merge execution; otherwise report the
   blocking gate conditions or clean-but-unmerged status.
15. Use `examples/review-loop-status.md` when communicating queue state,
   remaining blockers, or clean completion.

# Outputs

- a per-PR status showing review state, remaining blockers, and merge
  readiness
- explicit note when a current head is `awaiting-automatic-review-signal`,
  `review-request-pending`, `review-submitted`, or
  `manual-review-request-eligible`
- explicit note when strict GitHub Copilot review was manually requested
  through the approved `gh` / GraphQL flow for the latest head commit after
  the 5-minute minimum from `last-push-at`
- captured session preferences or explicit note that the loop was skipped
- handled review threads with explicit valid or invalid classification,
  required replies, and final resolution
- issue-link and focused-scope status for each PR
- merged PRs only when post-push review readiness is satisfied and
  skill `ai-skills-pr-merge` allows merge execution

# Guardrails

- do not ask session entry preference questions more than once per session
- do not bundle unrelated repository changes into a PR being advanced through
  the loop
- do not treat a review that predates the latest push as sufficient for merge
- do not wait idly on one PR when other active items can progress
- do not use fixed wait timers as merge gates; use review/check/timeline state
- do not manually request automated review before 5 minutes have elapsed since
  `last-push-at`
- do not send a second explicit manual review request for the same head while a
  pending request for that head is still visible
- do not merge while review is still running, checks are incomplete, or threads
  remain unresolved
- do not trigger automated review through ad-hoc PR comments when the platform
  provides a proper API or workflow trigger
- do not infer that no fresh review is pending from `latestReviews` alone when
  richer timeline state is available
- do not replace the approved `gh pr view` plus
  `gh api graphql` flow using the `requestReviewsByLogin` mutation with a
  weaker GitHub comment convention when strict GitHub Copilot review is
  required
- do not mention `@copilot` in PR comments
- do not delete review comments to make threads disappear; resolve handled
  threads and preserve the history
- do not declare a review round complete while any handled thread lacks a
  reply, any valid finding remains unfixed, or any handled thread remains open
- do not resolve invalid findings without leaving a concise rationale first
- do not merge a PR that lacks the required issue-closing link

# Exit Checks

- every active PR has an explicit current-state summary
- every active PR state includes the current head commit and review-signal
  state
- session entry preferences were captured once or were already supplied by the
  user prompt
- no PR is marked merge-ready without a completed post-push review for its
  latest head commit
- when strict GitHub Copilot review is required, the latest head commit review
  came from the approved `gh` / GraphQL trigger flow or already-existing fresh
  platform review state, and any manual request honored the 5-minute minimum
  from `last-push-at`
- each merge-ready PR is focused on its linked issue and has an issue-closing
  link in the PR body
- each completed review round classified handled findings as valid or invalid,
  fixed all valid findings, replied to every handled thread, and resolved
  handled threads
- remaining blockers are concrete, not generic
- merged PRs passed the review-readiness gate in the same evaluation round,
  and skill `ai-skills-pr-merge` then allowed merge execution
