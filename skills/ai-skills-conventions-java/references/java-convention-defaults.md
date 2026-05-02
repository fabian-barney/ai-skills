# Java Convention Defaults

Distilled from issue `#13` plus the shared Java baseline in `ai-rules`.

- Default to the focused Java leaf skills first:
  skill `ai-skills-conventions-null`, skill `ai-skills-conventions-lombok`,
  skill `ai-skills-conventions-early-return`, and
  skill `ai-skills-conventions-ternary`.
- When building a string from a literal template plus variables in Java,
  prefer `String.format(...)` over `+` concatenation.
- In tight loops or append-heavy Java paths, prefer `StringBuilder` over
  `String.format(...)`.
- Use `Optional<T>` only when return-value absence is semantically meaningful;
  do not use `Optional` for fields, method parameters, or serialization models
  unless there is a strong documented reason.
- When Lombok would materially reduce bounded Java boilerplate and no explicit
  project or user rule forbids it, prefer applying skill `ai-skills-conventions-lombok`
  instead of keeping handwritten constructors, accessors, or loggers.

These defaults are additive to the child skills. They should not be used to
weaken the child-skill guardrails.
