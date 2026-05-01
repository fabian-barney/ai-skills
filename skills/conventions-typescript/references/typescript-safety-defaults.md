# TypeScript Safety Defaults

Use these defaults when implementing or reviewing TypeScript changes.

## Compiler and CI

- Keep `strict` enabled.
- Treat type errors as merge-blocking in CI.
- Keep `noImplicitOverride`, `noUncheckedIndexedAccess`, and
  `exactOptionalPropertyTypes` enabled unless a documented project constraint
  prevents it.
- Keep `skipLibCheck` disabled by default; enable it only with explicit
  rationale.

## Type Strategy

- Prefer precise domain types over broad primitives and ad-hoc objects.
- Use named types for exported signatures, cross-module contracts, DTOs, event
  payloads, persistence models, and reused test fixtures.
- Keep ad-hoc objects local, short-lived, and mechanical.
- Promote ad-hoc objects when they are reused, exported, shared, nested, or
  domain-semantic.
- Avoid `any`; when unavoidable at a boundary, isolate and narrow immediately.
- Prefer `unknown` for untrusted inputs and narrow with type guards.
- Model state variants with discriminated unions instead of boolean flags.
- Use `readonly` for immutable APIs and value objects.

## Runtime Boundaries

- TypeScript types do not validate runtime data.
- Validate HTTP, queue, environment, filesystem, and other external payloads at
  boundaries.
- Convert validated payloads into internal domain types before deeper logic.
- Do not expose transport DTOs as internal domain models by default.

## Nullability and Optionality

- Keep `null` and `undefined` handling explicit.
- Avoid non-null assertions unless a documented invariant exists.
- Prefer control-flow narrowing and guard functions over assertions.
- Use optional properties intentionally; avoid optional fields for required
  lifecycle states.

## Naming, Enums, and Errors

- Use `camelCase` for variables, parameters, properties, functions, and local
  runtime constants.
- Use `PascalCase` for types, interfaces, classes, enums, namespaces, and enum
  members.
- Use `UPPER_SNAKE_CASE` only for shared true constants.
- Prefer literal unions when no runtime enum object is required.
- Avoid heterogeneous enums.
- Prefer explicit string values for externally persisted or serialized enums.
- Throw `Error` subclasses with actionable context; do not throw raw strings or
  untyped objects.
- Preserve `cause` chains when wrapping errors.
- Ensure rejected promises are observed and handled.

## Decorators and JSDoc

- For decorated classes, place JSDoc immediately above the top-most decorator.
- Keep decorators contiguous and directly above the class declaration.
- Do not place JSDoc between a decorator and the class declaration.
