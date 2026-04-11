# Early Return Defaults

Distilled from the project's early-return and readability guidance.

- Prefer early returns and guard clauses to reduce nesting and keep the happy
  path linear.
- Validate inputs and preconditions early; return or exit immediately on
  invalid or exceptional states.
- For simple guard mappings with no side effects, prefer a ternary return or
  assignment.
- In guard-style ternaries, keep the exceptional case first:
  `condition ? exceptional : happy`.
- Treat cleanup, transaction, audit, and similar mandatory side effects as the
  main caveats before introducing new exits.
