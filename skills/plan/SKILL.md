---
name: plan
description: >-
  Create a decision-complete implementation plan before work starts and
  update the plan when new answers materially change it.
---

# Purpose

Produce a decision-complete plan for implementation work so execution can
proceed without leaving important design, scope, or verification choices
implicit.

<!-- markdownlint-disable MD025 -->

# When to Use

- use before implementation for multi-step or high-risk work
- use when the user explicitly asks for a plan
- use when questions or discovered constraints can materially change the
  implementation path
- use `references/decision-complete-plan.md` to make sure the plan is
  decision-complete
- use `references/decision-complete-planning.md` for planning behavior and
  refresh rules
- use `references/workflow-order.md` when the execution sequence matters
- use `examples/implementation-plan.md` when a concrete plan shape with
  verification details helps
- use `targets/codex.md` only when Codex-specific additive notes apply

# Inputs

- the user request and success criteria
- relevant repository context, constraints, and existing implementation shape
- unresolved product or technical tradeoffs
- any user answers that materially affect the plan
- `references/decision-complete-plan.md`,
  `references/decision-complete-planning.md`, and
  `references/workflow-order.md`
- `examples/implementation-plan.md` when the output needs a concrete example
  shape
- any applicable target-specific note such as `targets/codex.md`

# Workflow

1. Explore the repository and surrounding context before asking questions that
   could be answered by inspection.
2. State the implementation goal, success criteria, key constraints, and
   important assumptions.
3. Ask only the questions that materially change the plan or lock important
   tradeoffs.
4. Produce a decision-complete plan covering approach, dependencies, edge
   cases, verification, and acceptance signals.
5. If a user answer has significant impact on the plan, present the altered
   plan before starting implementation instead of switching directly into
   coding.
6. Use `references/decision-complete-plan.md` to confirm scope, decisions, and
   verification are explicit.
7. Use `references/decision-complete-planning.md` and
   `references/workflow-order.md` to refine planning behavior and sequencing.
8. Use `examples/implementation-plan.md` when a concrete output shape or
   verification section is helpful.
9. Apply any target-specific note such as `targets/codex.md` only after the
   canonical plan is stable.

# Outputs

- a decision-complete implementation plan
- explicit assumptions and chosen defaults
- a concrete verification strategy and acceptance criteria
- an updated plan when later user input materially changes the intended
  implementation path
- optional reuse of `examples/implementation-plan.md` as a concrete shape
- optional target-specific planning note when a bundled target file applies

# Guardrails

- do not start implementation when important plan decisions are still open
- do not ask questions that can be resolved by repository exploration
- do not leave critical behavior, interfaces, or test strategy implicit
- do not treat a materially changed plan as unchanged after new answers arrive

# Exit Checks

- the plan is implementation-ready and leaves no critical decisions open
- important assumptions are explicit
- verification steps and acceptance signals are concrete
- any answer that materially changed the approach is reflected in the latest
  plan
