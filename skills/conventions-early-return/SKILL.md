---
name: conventions-early-return
description: Prefer early returns and guard clauses to keep exceptional paths explicit and the happy path linear.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Apply early-return and guard-clause defaults so exceptional paths exit early
and the happy path remains linear and easy to read.

# When to Use

- use when implementing or reviewing conditional logic, validation, or error
  handling
- use when nested branching can be flattened without skipping mandatory
  side effects
- use `references/early-return-defaults.md` for the default pattern, ternary
  ordering rule, and caveats
- use `examples/guard-clause-refactor.md` when showing the expected before/after
  shape

# Inputs

- the affected method or control-flow block
- required cleanup, transaction, logging, or consistency side effects
- tests or behavior expectations for the changed branches
- `references/early-return-defaults.md`

# Workflow

1. Identify exceptional states, invalid inputs, or preconditions that can exit
   before the happy path begins.
2. Convert those exceptional states into clear guard clauses when doing so does
   not bypass mandatory cleanup or consistency behavior.
3. Keep the happy path linear and avoid burying it inside nested `if` blocks.
4. For simple two-branch value selection with no side effects, prefer a single
   ternary return or assignment instead of a verbose guard `if`.
5. In ternary guard mappings, keep the exceptional case first:
   `condition ? exceptional : happy`.
6. Reject code that keeps avoidable nesting when an early return or guard-style
   ternary would make the flow clearer.
7. Use `examples/guard-clause-refactor.md` when communicating the expected
   refactor shape.

# Outputs

- flatter control flow with explicit guard clauses or guard-style ternaries
- a review finding when avoidable nesting remains
- updated tests for changed control-flow paths when behavior was refactored

# Guardrails

- do not bypass mandatory cleanup, transaction, audit, or logging behavior
- do not scatter unrelated return points with duplicated side effects
- do not use happy-path-first ternaries for guard mappings
- do not replace simple readable flow with cascading ternary expressions

# Exit Checks

- exceptional paths exit early and are easy to identify
- the happy path is readable in one pass
- mandatory side effects still occur on every required path
- changed control-flow branches are covered by focused tests
