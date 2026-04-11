---
name: pr-review
description: Define the family-root responsibility boundaries for handling PR review findings and review conversations safely.
---

# pr-review

## Purpose

Define the canonical PR review responsibility boundary for classifying findings,
handling review conversations, and deciding whether a thread may be resolved.

## When to Use

- use when a PR or MR review workflow is active
- use when review comments or conversations need ownership or closure
  decisions
- use as the family-root skill for later `pr-review-write`,
  `pr-review-respond`, `pr-review-loop`, and `pr-merge` skills
- use the bundled references and examples when shaping the root family
  contract or thread-handling behavior

## Inputs

- the PR or MR diff and current review state
- active review comments and threads
- repository or session rules about who may resolve conversations
- relevant tests, checks, and changed files
- the bundled references for boundary and loop-derived guardrails

## Workflow

1. Read the review state, changed scope, and active conversations.
2. Determine whether the current actor is responsible for handling or resolving
   each thread.
3. Classify each finding as valid, invalid, or unresolved.
4. Ensure each resolved thread has a final explanatory reply describing how it
   was handled or why it was not addressed.
5. Delegate detailed finding-writing, response, loop, or merge behavior to the
   specialized child skills when those are available.
6. Reuse the bundled example replies when they fit the current thread shape.

## Outputs

- a classified review state for the active findings
- concise thread responses or closure decisions
- an explicit list of unresolved items when ownership or evidence is missing

## Guardrails

- do not resolve review conversations unless responsibility is clear
- do not close a thread without a final comment explaining the outcome
- do not broaden this skill into full merge-loop orchestration
- do not duplicate detailed finding-writing or fix-response behavior that
  belongs in child skills

## Exit Checks

- every handled thread has a classification
- every resolved thread has a final rationale comment
- unclear ownership or unresolved responsibility is surfaced explicitly
- no merge-loop or implementation behavior was silently inlined here
