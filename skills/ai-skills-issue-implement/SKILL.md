---
name: ai-skills-issue-implement
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
- use `../ai-skills-plan/SKILL.md` to produce the implementation plan
- use `../ai-skills-gates-exit/SKILL.md` to verify the final implementation result
- use `../ai-skills-issue-write-summary-comment/SKILL.md` when the issue needs a concise
  delivery summary after implementation
- use `references/implementation-boundary.md` to keep the work bounded to the
  issue
- use `examples/issue-implementation-status.md` when a concrete completion
  status shape helps

# Inputs

- the issue title, description, acceptance criteria, and relevant follow-up
  comments
- the bounded repository context needed to implement the issue
- evidence that the applicable ruleset-read gate and final conformance plan
  checks are satisfied, usually through `../ai-skills-plan/SKILL.md`
- the repository build/test commands and any gate-relevant evidence sources
- any applicable child skills needed for the issue's domain-specific work
- `../ai-skills-plan/SKILL.md`
- `../ai-skills-gates-exit/SKILL.md`
- `../ai-skills-issue-write-summary-comment/SKILL.md`
- `references/implementation-boundary.md`

# Workflow

## Composed Skills

This is a composite skill. It orchestrates:

- `../ai-skills-plan/SKILL.md` for the decision-complete plan, ruleset-read gate, and
  final conformance re-read
- `../ai-skills-gates-exit/SKILL.md` for mandatory exit-gate verification after the
  bounded implementation
- `../ai-skills-issue-write-summary-comment/SKILL.md` for the issue-level delivery or
  blocked-status summary

## Implementation Flow

1. Read the issue carefully and restate the bounded goal, acceptance criteria,
   and explicit non-goals for the implementation.
2. Verify that a decision-complete implementation plan exists and that it
   satisfies the applicable ruleset-read and final conformance-read contract
   from `../ai-skills-plan/SKILL.md`.
3. Apply `../ai-skills-plan/SKILL.md` before coding when the plan is missing, incomplete,
   or lacks ruleset-read/conformance evidence. If the precondition cannot be
   established, stop with `BLOCKED: <reason>`.
4. Implement the issue using the relevant domain-specific skills and repository
   context while keeping the change set bounded to the issue goal.
5. Apply `../ai-skills-gates-exit/SKILL.md` to evaluate the mandatory exit gates before
   declaring the issue complete, including that skill's ruleset, build/test,
   test-coverage mapping, and child-skill composition contract.
6. If any exit gate fails or is blocked, fix only the bounded implementation
   findings and rerun the full exit-gate sequence from the beginning.
7. When the implementation is conformant, use
   `../ai-skills-issue-write-summary-comment/SKILL.md` to prepare the issue-level delivery
   summary, validation status, QA notes, and open follow-ups if any remain.
8. If a precondition or exit gate cannot be satisfied, use
   `../ai-skills-issue-write-summary-comment/SKILL.md` to report `BLOCKED: <reason>` with
   the concrete missing precondition, failed gate, or unavailable dependency.
9. Use `examples/issue-implementation-status.md` when communicating the final
   implemented or still-blocked state.

# Outputs

- a bounded implementation result for the issue
- explicit exit-gate evidence showing whether the issue is conformant
- `BLOCKED: <reason>` when mandatory preconditions or exit gates cannot be
  satisfied
- a concise issue summary comment describing delivery, validation, and open
  follow-ups

# Guardrails

- do not broaden the scope beyond the issue's goal just to clean unrelated
  code
- do not start implementation without a decision-complete plan that satisfies
  the applicable ruleset-read gate
- do not skip exit gates and still claim the issue is implemented
- do not treat a partially fixed or gate-blocked result as complete
- do not close out the issue without a concise delivery summary or explicit
  blocker

# Exit Checks

- the plan and ruleset-read/conformance-read preconditions are satisfied or the
  result is explicitly `BLOCKED`
- the implemented result stays within the issue boundary
- `../ai-skills-gates-exit/SKILL.md` passed for the final implementation state
- any remaining blocker is explicit rather than hidden behind vague progress
  language
- the issue summary is ready to communicate what changed and how it was
  verified
