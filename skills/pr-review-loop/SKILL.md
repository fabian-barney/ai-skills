---
name: pr-review-loop
description: >-
  Run the post-push pull-request review loop until no valid findings remain and
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
  merge gate
- use `references/review-loop-queue.md` for round-robin queue behavior
- use `examples/review-loop-status.md` when reporting loop state or completion

# Inputs

- one or more active PRs with their latest head commits
- the latest push time, automated-review state, review threads, and required
  checks for each PR
- repository preferences about whether clean PRs should be merged
- access to the PR platform APIs needed to request or inspect automated review
- `../pr-review/SKILL.md`
- `../pr-review-respond/SKILL.md`
- `../pr-merge/SKILL.md`
- `references/review-loop-state.md`
- `references/review-loop-queue.md`

# Workflow

1. Build the active PR queue and track the current state for each item using
   the fields in `references/review-loop-state.md`.
2. Process active items in round-robin order instead of waiting idly on a
   single PR.
3. After each push, require fresh review state for that PR head: clear the
   previous pass assumptions, inspect required checks, inspect unresolved
   threads, and determine whether a post-push automated review already exists.
4. If the latest push does not yet have a submitted automated review, request
   one through the platform API or configured review mechanism, then move on to
   the next item without blocking.
5. If checks are still running or a review is still in progress for the latest
   push, keep the PR active and continue with the next item.
6. When the latest push has completed review results, apply
   `../pr-review/SKILL.md` and `../pr-review-respond/SKILL.md` to classify
   findings, reply to each thread, fix valid issues, and resolve only the
   threads that were actually handled.
7. If fixes were pushed, restart the same post-push review cycle for that PR
   instead of treating earlier review results as sufficient.
8. If no fixes were needed, evaluate the hard merge gate from
   `references/review-loop-state.md`. When merge is allowed, hand the PR to
   `../pr-merge/SKILL.md`; otherwise report the blocking gate conditions.
9. Use `examples/review-loop-status.md` when communicating queue state,
   remaining blockers, or clean completion.

# Outputs

- a per-PR status showing review state, remaining blockers, and merge
  readiness
- handled review threads with explicit valid, invalid, or unresolved treatment
- merged PRs only when the post-push merge gate is satisfied

# Guardrails

- do not treat a review that predates the latest push as sufficient for merge
- do not wait idly on one PR when other active items can progress
- do not merge while review is still running, checks are incomplete, or threads
  remain unresolved
- do not trigger automated review through ad-hoc PR comments when the platform
  provides a proper API or workflow trigger
- do not resolve invalid findings without leaving a concise rationale first

# Exit Checks

- every active PR has an explicit current-state summary
- no PR is marked merge-ready without a completed post-push review for its
  latest head commit
- remaining blockers are concrete, not generic
- merged PRs passed the hard gate in the same evaluation round
