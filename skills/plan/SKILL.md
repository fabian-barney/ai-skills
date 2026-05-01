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
- use when repository or downstream rulesets must be read before implementation
  planning can be trusted
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
- applicable repository rulesets, including complete ai-rules and downstream
  extension entrypoints when present
- unresolved product or technical tradeoffs
- any user answers that materially affect the plan
- `references/decision-complete-plan.md`,
  `references/decision-complete-planning.md`, and
  `references/workflow-order.md`
- `examples/implementation-plan.md` when the output needs a concrete example
  shape
- any applicable target-specific note such as `targets/codex.md`

# Workflow

1. Read the complete applicable rulesets before any other planning task,
   including ai-rules and downstream extension rulesets when they govern the
   target repository.
2. Explore the repository, issue history, semantic parent and sibling docs,
   architecture constraints, external dependencies, and blockers before asking
   questions that could be answered by inspection.
3. State the implementation goal, success criteria, key constraints, and
   important assumptions.
4. Ask only the questions that materially change the plan or lock important
   tradeoffs.
5. Produce a decision-complete plan covering approach, dependencies, edge
   cases, verification, and acceptance signals.
6. If a user answer has significant impact on the plan, present the altered
   plan before starting implementation instead of switching directly into
   coding.
7. Use `references/decision-complete-plan.md` to confirm scope, decisions, and
   verification are explicit.
8. Use `references/decision-complete-planning.md` and
   `references/workflow-order.md` to refine planning behavior and sequencing.
9. Use `examples/implementation-plan.md` when a concrete output shape or
   verification section is helpful.
10. Re-read the complete applicable rulesets at the end and verify the plan
    still conforms; if not, update the plan before presenting it as complete.
11. Apply any target-specific note such as `targets/codex.md` only after the
   canonical plan is stable.

# Outputs

- a decision-complete implementation plan
- explicit assumptions and chosen defaults
- a concrete verification strategy and acceptance criteria
- identified external dependencies, blockers, and dependency-first ordering
- an updated plan when later user input materially changes the intended
  implementation path
- optional reuse of `examples/implementation-plan.md` as a concrete shape
- optional target-specific planning note when a bundled target file applies

# Guardrails

- do not start implementation when important plan decisions are still open
- do not omit the first complete-ruleset read when a governing ruleset exists
- do not mark a plan complete before re-reading all applicable rulesets and
  confirming conformance
- do not ask questions that can be resolved by repository exploration
- do not leave critical behavior, interfaces, or test strategy implicit
- do not treat a materially changed plan as unchanged after new answers arrive

# Exit Checks

- the plan is implementation-ready and leaves no critical decisions open
- the first task reads the complete applicable rulesets before other
  planning or implementation tasks
- the final task re-reads the complete applicable rulesets and verifies
  conformance
- important assumptions are explicit
- verification steps and acceptance signals are concrete
- any answer that materially changed the approach is reflected in the latest
  plan
