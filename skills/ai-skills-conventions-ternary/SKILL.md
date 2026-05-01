---
name: ai-skills-conventions-ternary
description: >-
  Prefer simple ternary expressions over verbose if-else blocks when the
  choice is expression-shaped and side-effect-free.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Use ternary expressions for simple expression-shaped choices so assignments and
returns stay concise, while rejecting nested or side-effect-heavy ternary usage.

# When to Use

- use when a value assignment or return currently uses a trivial `if-else`
  structure
- use when a boolean-result ternary can be simplified to a direct boolean
  expression
- use `references/ternary-defaults.md` for the allowed shape, simplification
  rules, and nesting guardrails
- use `examples/ternary-simplification.md` when showing the expected refactor

# Inputs

- the affected assignment, return statement, or expression tree
- whether either branch has side effects or multiple statements
- whether the ternary would become nested or embedded inside another
  expression-heavy context
- `references/ternary-defaults.md`

# Workflow

1. Identify whether the current `if-else` block is really a two-branch
   expression with no side effects.
2. Replace appropriate return or assignment `if-else` blocks with a single
   ternary expression.
3. If the ternary would be nested, embedded inside another ternary, or buried
   as a complex argument expression, extract the result into a local variable or
   keep explicit control flow instead.
4. Simplify boolean-literal ternaries into direct boolean expressions when at
   least one branch is a literal boolean outcome.
5. Keep guard-style ternaries readable and aligned with
   `ai-skills-conventions-early-return`, including exceptional-case-first ordering when
   the ternary represents guard mapping.
6. Use `examples/ternary-simplification.md` when communicating the expected
   transformation.

# Outputs

- a simple side-effect-free ternary for an assignment or return when
  appropriate
- a simplified direct boolean expression when a ternary is unnecessary
- a review finding when ternary nesting or statement-heavy ternary use remains

# Guardrails

- do not nest ternary operators
- do not bury ternary operators inside other ternary expressions or dense
  method-call arguments
- do not use ternaries for branches with multiple statements or side effects
- do not keep boolean-literal ternaries when a direct boolean expression is
  clearer

# Exit Checks

- every introduced ternary is a single-level, side-effect-free expression
- nested ternary behavior has been extracted or rewritten
- boolean-outcome ternaries are simplified where possible
- readability is improved rather than compressed into dense clever code
