---
name: conventions-lombok
description: Prefer Lombok for applicable Java boilerplate while keeping risky annotations and config choices explicit.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Use Lombok wherever it materially reduces low-value Java boilerplate, while
keeping risky annotations, identity semantics, and build configuration under
explicit control.

# When to Use

- use when the changed Java code can replace trivial constructors, accessors,
  loggers, builders, or utility boilerplate with Lombok
- use when Spring-style constructor injection should default to
  `@RequiredArgsConstructor`
- use `references/lombok-defaults.md` for the preferred annotations and
  forbidden shortcuts
- use `references/lombok-config.md` when `lombok.config` or copyable
  annotations matter
- use `examples/spring-constructor-di.md` for the expected class and config
  shape

# Inputs

- the changed Java classes and their current handwritten boilerplate
- whether Lombok is already available in the build or would need to be added
- framework context such as Spring Boot constructor DI or JPA entities
- active nullness strategy and available annotations
- `references/lombok-defaults.md`
- `references/lombok-config.md`

# Workflow

1. Determine whether Lombok is available; if not and it materially reduces the
   current Java boilerplate, consider adding it as a dependency and enabling
   annotation processing.
2. Replace trivial constructors, getters, setters, loggers, builders, and
   utility-class boilerplate with the appropriate Lombok annotations.
3. Default Spring-style constructor injection to `@RequiredArgsConstructor`.
4. Prefer `@Builder` for complex construction and `@UtilityClass` for true
   utility classes.
5. Avoid risky annotations such as `@Data`, `@SneakyThrows`, and broad
   equality-generation shortcuts unless the specific use is justified and safe.
6. Never use `@EqualsAndHashCode` for JPA entities, and review identity/null
   semantics carefully before using it anywhere else.
7. Use `references/lombok-config.md` to keep `lombok.config`,
   `lombok.copyableAnnotations`, and generated-annotation settings explicit.
8. Use `examples/spring-constructor-di.md` when communicating the expected
   annotation and config shape.

# Outputs

- Lombok-based boilerplate reduction for the bounded Java change
- explicit review findings when handwritten boilerplate or risky Lombok usage
  remains
- `lombok.config` guidance when framework annotations or generated markers must
  be preserved

# Guardrails

- do not keep handwritten constructors, ordinary getters/setters, or logger
  fields when Lombok is appropriate and available
- do not use `@Data`, experimental features, `val`, `var`, or `@Cleanup` as
  the default shortcut
- do not use `@SneakyThrows` without an explicit safety comment and bounded
  rationale
- do not use `@EqualsAndHashCode` on JPA entities
- do not choose Lombok nullness annotations when a stronger nullness framework
  such as JSpecify is available

# Exit Checks

- applicable boilerplate is Lombok-generated instead of hand-written
- risky annotations are absent or explicitly justified
- Spring constructor DI uses `@RequiredArgsConstructor` by default when
  applicable
- `lombok.config` requirements are explicit when framework propagation or
  generated markers matter
