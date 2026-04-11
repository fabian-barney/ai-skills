# Java Nullness Strategy

Distilled from the project's Java and Lombok guidance plus the current build
tooling shape.

- If a dedicated nullness framework such as JSpecify is available, use it as
  the primary contract mechanism.
- Prefer tool-enforced contracts when available, such as static analysis that
  checks annotated packages.
- Validation frameworks may enforce public boundary contracts when they express
  the needed null policy clearly.
- Lombok or Jakarta nullness annotations are fallback only when the stronger
  nullness framework is unavailable.
- When absence is part of API semantics, prefer an explicit result shape such
  as `Optional<T>` over returning `null`.
