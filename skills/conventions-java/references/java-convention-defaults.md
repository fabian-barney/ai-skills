# Java Convention Defaults

Distilled from issue `#13` plus the shared Java baseline in `ai-rules`.

- Default to the focused Java leaf skills first:
  `conventions-null`, `conventions-lombok`, `conventions-early-return`, and
  `conventions-ternary`.
- When building a string from a literal template plus variables in Java,
  prefer `String.format(...)` over `+` concatenation.
- In tight loops or append-heavy Java paths, prefer `StringBuilder` over
  `String.format(...)`.
- Use `Optional<T>` only when return-value absence is semantically meaningful;
  do not default to `Optional` fields, parameters, or serialization models.
- When Lombok would materially reduce bounded Java boilerplate and no explicit
  project or user rule forbids it, prefer applying `conventions-lombok`
  instead of keeping handwritten constructors, accessors, or loggers.

These defaults are additive to the child skills. They should not be used to
weaken the child-skill guardrails.
