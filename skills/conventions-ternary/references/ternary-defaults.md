# Ternary Defaults

Distilled from the issue contract plus the project's readability and
early-return guidance.

- Prefer ternary expressions over verbose `if-else` blocks for simple
  assignments and returns.
- Never nest ternary operators.
- Do not hide ternary expressions inside other ternary expressions or dense
  argument lists; extract them when needed.
- Simplify boolean-literal ternaries when possible:
  `condition ? true : false` -> `condition`,
  `condition ? false : true` -> `!condition`.
- For guard-style mappings, keep the exceptional case first:
  `condition ? exceptional : happy`.
