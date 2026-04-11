---
name: pr-merge
description: >-
  Merge a PR only after the latest push has a completed review pass, all
  review conversations are resolved, and all merge gates are green. Use when
  deciding or executing a PR merge in a gated review workflow.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Enforce the final merge gate so a PR is merged only after the latest push is
fully reviewed, all conversations are resolved, and required checks are green.

# When to Use

- use when deciding whether a PR is merge-ready
- use when executing a merge in a GitHub-based review workflow
- use as the merge child skill under `pr-review`
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
- `references/merge-gate.md` and `references/post-push-review.md`

# Workflow

1. Read the latest push state, review state, thread state, and required checks
   for the current PR head.
2. Verify that a completed review exists after the latest push, not only before
   it.
3. Verify that all required checks are green for the current head commit.
4. Verify that no required review conversations remain unresolved.
5. Verify that the merge method respects repository policy and never requires a
   force or admin bypass.
6. Merge only when every gate in `references/merge-gate.md` is satisfied in the
   same evaluation round.
7. Use `examples/merge-decision.md` when a concrete decision summary helps.

# Outputs

- an explicit merge-ready or not-ready decision
- a merged PR when policy, permission, and all gates allow it
- a concrete list of blocking gate failures when merge is not yet allowed

# Guardrails

- do not merge without a review pass after the latest push
- do not merge while review conversations remain unresolved
- do not merge with failing or missing required checks
- do not force or bypass a merge gate
- do not broaden this skill into full review-response orchestration

# Exit Checks

- the latest push is covered by a completed review pass
- required checks are green on the current head
- review threads are resolved according to repository policy
- the merge decision is explicit and auditable
