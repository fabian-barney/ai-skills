---
name: pr-review-loop
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
- use `../pr-review/SKILL.md` for family-root classification and closure
  boundaries
- use `../pr-review-respond/SKILL.md` for thread replies and finding
  classification handling
- use `../pr-merge/SKILL.md` for final merge gating and merge execution
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
- the latest push time, automated-review state, review threads, and required
  checks for each PR
- repository preferences about whether clean PRs should be merged
- access to the PR platform APIs needed to request or inspect automated review
- the main linked issue for each PR and whether the PR body contains an
  issue-closing link
- the intended bounded scope for each PR, used to detect unrelated bundled
  changes
- `../pr-review/SKILL.md`
- `../pr-review-respond/SKILL.md`
- `../pr-merge/SKILL.md`
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
   previous pass assumptions, inspect required checks, inspect unresolved
   threads, and determine whether a post-push automated review already exists.
6. If the latest push does not yet have a submitted automated review, request
   one through the platform API or configured review mechanism, then move on to
   the next item without blocking. For strict GitHub Copilot review loops, use
   `references/copilot-review-trigger.md`.
7. If checks are still running or a review is still in progress for the latest
   push, keep the PR active and continue with the next item.
8. When the latest push has completed review results, apply
   `../pr-review/SKILL.md` and `../pr-review-respond/SKILL.md` to classify
   findings, reply to each thread, fix valid issues, and resolve only the
   threads that were actually handled.
9. If fixes were pushed, restart the same post-push review cycle for that PR
   instead of treating earlier review results as sufficient, and explicitly
   re-trigger automated review for the new head commit.
10. If no fixes were needed, verify the PR remains focused on the linked issue
   and the PR body contains the issue-closing link, then evaluate the
   review-readiness gate from `references/review-loop-state.md`.
11. When the review-readiness gate passes and
   `MERGE_AFTER_CLEAN_LOOP=true`, hand the PR to `../pr-merge/SKILL.md` for
   the remaining merge-policy checks and merge execution; otherwise report the
   blocking gate conditions or clean-but-unmerged status.
12. Use `examples/review-loop-status.md` when communicating queue state,
   remaining blockers, or clean completion.

# Outputs

- a per-PR status showing review state, remaining blockers, and merge
  readiness
- captured session preferences or explicit note that the loop was skipped
- handled review threads with explicit valid, invalid, or unresolved treatment
- issue-link and focused-scope status for each PR
- merged PRs only when post-push review readiness is satisfied and
  `../pr-merge/SKILL.md` allows merge execution

# Guardrails

- do not ask session entry preference questions more than once per session
- do not bundle unrelated repository changes into a PR being advanced through
  the loop
- do not treat a review that predates the latest push as sufficient for merge
- do not wait idly on one PR when other active items can progress
- do not use fixed wait timers as merge gates; use review/check/timeline state
- do not merge while review is still running, checks are incomplete, or threads
  remain unresolved
- do not trigger automated review through ad-hoc PR comments when the platform
  provides a proper API or workflow trigger
- do not mention `@copilot` in PR comments
- do not delete review comments to make threads disappear; resolve handled
  threads and preserve the history
- do not resolve invalid findings without leaving a concise rationale first
- do not merge a PR that lacks the required issue-closing link

# Exit Checks

- every active PR has an explicit current-state summary
- session entry preferences were captured once or were already supplied by the
  user prompt
- no PR is marked merge-ready without a completed post-push review for its
  latest head commit
- each merge-ready PR is focused on its linked issue and has an issue-closing
  link in the PR body
- remaining blockers are concrete, not generic
- merged PRs passed the review-readiness gate in the same evaluation round,
  and `../pr-merge/SKILL.md` then allowed merge execution
