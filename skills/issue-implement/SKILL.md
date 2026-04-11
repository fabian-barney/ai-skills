---
name: issue-implement
description: >-
  Implement an existing issue through bounded planning, execution, exit-gate
  verification, and issue-level status reporting. Use when an issue should be
  carried from problem statement to conformant implementation outcome.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Execute an issue end to end within a bounded scope so implementation is planned,
completed, verified through exit gates, and summarized back on the issue.

# When to Use

- use when an existing issue already defines the work to be implemented
- use when the implementation needs a bounded plan before coding starts
- use when completion must be verified by exit gates rather than claimed from
  implementation alone
- use `../plan/SKILL.md` to produce the implementation plan
- use `../gates-exit/SKILL.md` to verify the final implementation result
- use `../issue-write-summary-comment/SKILL.md` when the issue needs a concise
  delivery summary after implementation
- use `references/implementation-boundary.md` to keep the work bounded to the
  issue
- use `examples/issue-implementation-status.md` when a concrete completion
  status shape helps

# Inputs

- the issue title, description, acceptance criteria, and relevant follow-up
  comments
- the bounded repository context needed to implement the issue
- the repository build/test commands and any gate-relevant evidence sources
- any applicable child skills needed for the issue's domain-specific work
- `../plan/SKILL.md`
- `../gates-exit/SKILL.md`
- `../issue-write-summary-comment/SKILL.md`
- `references/implementation-boundary.md`

# Workflow

1. Read the issue carefully and restate the bounded goal, acceptance criteria,
   and explicit non-goals for the implementation.
2. Apply `../plan/SKILL.md` when a decision-complete implementation plan is
   still needed before coding starts.
3. Implement the issue using the relevant domain-specific skills and repository
   context while keeping the change set bounded to the issue goal.
4. Apply `../gates-exit/SKILL.md` to evaluate the mandatory exit gates before
   declaring the issue complete.
5. If any exit gate fails or is blocked, fix only the bounded implementation
   findings and rerun the full exit-gate sequence from the beginning.
6. When the implementation is conformant, use
   `../issue-write-summary-comment/SKILL.md` to prepare the issue-level delivery
   summary, validation status, QA notes, and open follow-ups if any remain.
7. Use `examples/issue-implementation-status.md` when communicating the final
   implemented or still-blocked state.

# Outputs

- a bounded implementation result for the issue
- explicit exit-gate evidence showing whether the issue is conformant
- a concise issue summary comment describing delivery, validation, and open
  follow-ups

# Guardrails

- do not broaden the scope beyond the issue's goal just to clean unrelated
  code
- do not skip exit gates and still claim the issue is implemented
- do not treat a partially fixed or gate-blocked result as complete
- do not close out the issue without a concise delivery summary or explicit
  blocker

# Exit Checks

- the implemented result stays within the issue boundary
- `../gates-exit/SKILL.md` passed for the final implementation state
- any remaining blocker is explicit rather than hidden behind vague progress
  language
- the issue summary is ready to communicate what changed and how it was
  verified
