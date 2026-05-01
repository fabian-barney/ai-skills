---
name: pr-review
description: >-
  Define the family-root responsibility boundaries for handling PR review
  findings and review conversations safely.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Define the canonical PR review responsibility boundary for classifying findings,
handling review conversations, and deciding whether a thread may be resolved.

# When to Use

- use when a PR or merge request (MR) review workflow is active
- use when review comments or conversations need ownership or closure
  decisions
- use as the family-root skill for later `pr-review-write`,
  `pr-review-respond`, `pr-review-loop`, and `pr-merge` skills
- use `references/review-family-guardrails.md` for shared review-family
  guardrails
- use `references/review-boundary.md` for the root-versus-child boundary
- use `references/pr-review-loop-source.md` for review-loop-derived closure
  conditions
- use `examples/thread-resolution.md` and `examples/resolution-comment.md`
  when a thread-handling example is helpful

# Inputs

- the PR or MR diff and current review state
- active review comments and threads
- evidence that the applicable review ruleset-read gate has been satisfied
- repository or session rules about who may resolve conversations
- relevant tests, checks, and changed files
- `references/review-family-guardrails.md`,
  `references/review-boundary.md`, and
  `references/pr-review-loop-source.md`

# Workflow

1. Verify that the applicable review ruleset-read gate has been satisfied
   before classifying or resolving findings. If evidence is missing, read the
   applicable review rules before continuing or stop with an explicit
   unresolved precondition.
2. Read the review state, changed scope, and active conversations.
3. Determine whether the current actor is responsible for handling or resolving
   each thread.
4. If conversation-resolution rules are missing or unclear, ask the
   user or maintainer whether the current actor may resolve review
   conversations and keep the thread open until that authority is clarified.
5. Classify each finding as valid, invalid, or unresolved.
6. Inherit severity ranking from the active child review skill when findings
   include severity, and aggregate those severities without redefining them in
   this root skill.
7. Ensure each resolved thread has a final explanatory reply describing how it
   was handled or why it was not addressed.
8. Delegate detailed finding-writing, response, loop, or merge behavior to the
   specialized child skills when those are available.
9. Use `references/review-family-guardrails.md` and
   `references/review-boundary.md` to keep the root skill scoped correctly.
10. Use `references/pr-review-loop-source.md` only for closure semantics that
   belong in the root skill.
11. Reuse `examples/thread-resolution.md` and
   `examples/resolution-comment.md` when they fit the current thread shape.

# Outputs

- a classified review state for the active findings
- inherited child-skill severity ranking when severity-bearing findings are
  present
- concise thread responses or closure decisions
- an explicit list of unresolved items when ownership or evidence is missing

# Guardrails

- do not resolve review conversations unless responsibility is clear
- do not classify review findings before the applicable review ruleset-read gate
  is satisfied
- do not resolve review conversations when closure authority is unknown
- do not redefine the severity model when a child review skill already owns it
- do not close a thread without a final comment explaining the outcome
- do not broaden this skill into full merge-loop orchestration
- do not duplicate detailed finding-writing or fix-response behavior that
  belongs in child skills

# Exit Checks

- every handled thread has a classification
- the applicable review ruleset-read gate was satisfied before review
  classification
- severity-bearing findings preserve the child skill's severity model
- every resolved thread has a final rationale comment
- unclear ownership or unresolved responsibility are surfaced explicitly
- missing closure authority is surfaced explicitly and leaves the thread open
- no merge-loop or implementation behavior was silently inlined here
