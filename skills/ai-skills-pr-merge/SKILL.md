---
name: ai-skills-pr-merge
description: >-
  Merge a PR only after the latest push has a completed review pass, all
  review conversations are resolved, and all merge gates are green. Use when
  deciding or executing a PR merge in a gated review workflow.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Enforce the final merge gate so a PR is merged only after the latest push is
fully reviewed, all conversations are resolved, required checks are green, and
merge authority is explicit.

# When to Use

- use when deciding whether a PR is merge-ready
- use when executing a merge in a GitHub-based review workflow
- use as the merge child skill under `ai-skills-pr-review`
- use `references/merge-gate.md` for the hard gate checklist
- use `references/post-push-review.md` for the requirement that review must
  exist after the latest push
- use `examples/merge-decision.md` when a concrete merge-ready or not-ready
  decision shape helps

# Inputs

- the current PR head commit and latest push timestamp
- the latest review submission state after that push
- unresolved review threads or conversations
- required status checks for the current head commit
- repository merge permissions and policies
- PR creator, intended merger, and explicit user merge instruction
- linked main issue evidence such as `Closes #<id>` in the PR body
- `references/merge-gate.md` and `references/post-push-review.md`

# Workflow

1. Read the latest push state, review state, thread state, and required checks
   for the current PR head.
2. Verify protected-branch discipline: the PR targets the protected branch from
   a feature branch and does not require direct protected-branch pushes.
3. Verify merge authority before evaluating readiness: identify the PR creator,
   intended merger, explicit user merge instruction, and any owner-confirmed
   self-merge exception.
4. Block self-merge when the intended merger created or substantially authored
   the PR. Treat the actor as substantially authoring the PR when they created
   the implementation branch, authored the main implementation commit, or
   authored most commits in the PR. Allow the exception only when the user
   explicitly instructs the merge and confirms in the current session that they
   are a repository owner authorizing it.
5. Verify that the PR body links the main issue before merge, such as with
   `Closes #<id>`.
6. Verify that a completed review exists after the latest push, not only before
   it.
7. Verify that all required checks are green for the current head commit.
8. Verify that no required review conversations remain unresolved.
9. Verify that the merge method respects repository policy and never requires a
   force, admin-bypass, or skipped required gate.
10. Merge only when every gate in `references/merge-gate.md` is satisfied in the
   same evaluation round.
11. Use `examples/merge-decision.md` when a concrete decision summary helps.

# Outputs

- an explicit merge-ready or not-ready decision
- a merged PR when policy, permission, and all gates allow it
- a concrete list of blocking gate failures when merge is not yet allowed
- explicit merge-authority evidence when the decision is merge-ready

# Guardrails

- do not merge without a review pass after the latest push
- do not merge without explicit user merge instruction
- do not merge a PR you created or substantially authored unless the user gives
  the specific merge instruction and explicitly confirms repository owner
  authorization for the self-merge exception in the current session
- do not merge while review conversations remain unresolved
- do not merge with failing or missing required checks
- do not force, admin-bypass, or otherwise bypass a merge gate
- do not merge before the PR body links the main issue
- do not broaden this skill into full review-response orchestration

# Exit Checks

- protected-branch discipline is satisfied by a feature branch and PR
- merge authority is explicit and any self-merge exception has owner
  confirmation
- the PR body links the main issue
- the latest push is covered by a completed review pass
- required checks are green on the current head
- review threads are resolved according to repository policy
- the merge decision is explicit and auditable
