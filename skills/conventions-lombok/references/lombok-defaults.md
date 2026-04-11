# Lombok Defaults

Distilled from the project's Lombok guidance and the `conventions-lombok`
issue contract.

- Use Lombok for constructors, ordinary getters/setters, loggers, builders,
  and utility classes when it removes low-value boilerplate.
- Prefer `@RequiredArgsConstructor` for Spring-style constructor injection.
- Prefer `@Builder` over custom builder boilerplate when builder semantics are
  appropriate.
- Prefer `@UtilityClass` for true utility classes.
- Avoid `@Data`, `@SneakyThrows`, `@EqualsAndHashCode`, `val`, `var`,
  `@Cleanup`, and experimental features by default.
- `@SneakyThrows` requires an explicit safety comment and should stay limited to
  impossible exceptions or awkward interfaces.
- Never use `@EqualsAndHashCode` on JPA entities.
