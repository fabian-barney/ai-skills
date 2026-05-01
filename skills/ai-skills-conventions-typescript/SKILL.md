---
name: ai-skills-conventions-typescript
description: >-
  Apply TypeScript type-safety, naming, runtime-boundary, and layout
  conventions for implementation and review work.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Apply the default TypeScript conventions for strict configuration, type
strategy, runtime boundaries, naming, error handling, decorators, module design,
and multiline layout.

# When to Use

- use when implementing or reviewing TypeScript code that introduces or edits
  types, APIs, runtime boundary handling, async/error handling, naming, module
  structure, or comma-separated layout
- use when reviewing `tsconfig` or CI type-checking defaults
- use when a TypeScript structure reaches four or more elements and the layout
  should switch to the multiline default
- use `references/typescript-safety-defaults.md` for strict compiler, typing,
  boundary, naming, enum, error, and decorator defaults
- use `references/typescript-layout-defaults.md` for the exact multiline and
  trailing-comma rules
- use `examples/multiline-arguments.md` when showing the expected TypeScript
  layout shape

# Inputs

- the changed TypeScript files, compiler settings, public APIs, and affected
  comma-separated structures
- whether strict compiler options and CI type checking are enabled
- domain types, ad-hoc object shapes, boundary payloads, casts, and `any` or
  `unknown` usage in the changed scope
- naming, enum/literal-union, error-handling, async, decorator, and JSDoc
  decisions in the changed scope
- whether the structure has reached four or more elements
- whether the surrounding project formatter or linter already enforces the same
  TypeScript layout
- `references/typescript-safety-defaults.md`
- `references/typescript-layout-defaults.md`

# Workflow

1. Verify strict TypeScript configuration and CI type-checking expectations
   using `references/typescript-safety-defaults.md`.
2. Review changed types and public signatures for precise domain types, named
   boundary contracts, and local-only ad-hoc objects.
3. Reject broad `any` usage except at isolated boundaries that immediately
   narrow to safe types; prefer `unknown` for untrusted input.
4. Verify runtime validation for untrusted external data before domain use.
5. Check explicit nullability, safe optionality, and justified non-null
   assertions.
6. Check TypeScript naming, enum/literal-union choices, async error handling,
   and decorator/JSDoc ordering.
7. Identify every changed TypeScript argument list, parameter list, or other
   comma-separated structure in scope.
8. If the structure has four or more elements, switch it to multiline layout
   with one element per line.
9. In multiline mode, put the opening and closing delimiters on their own lines
   rather than sharing a line with the first or last element.
10. In multiline mode, keep a trailing comma after the last element whenever the
   TypeScript syntax supports it.
11. If the project formatter or linter already enforces the same TypeScript
   layout, align the change with that tooling rather than hand-formatting
   against it.
12. Use `examples/multiline-arguments.md` when communicating the expected
   TypeScript layout.

# Outputs

- strict TypeScript configuration and CI type checking preserved or explicit
  blockers surfaced
- precise domain types, safe narrowing, explicit runtime boundary validation,
  and safe nullability decisions
- TypeScript naming, enum/literal-union, async error-handling, and decorator
  ordering that follow the shared defaults
- TypeScript comma-separated structures that follow the multiline layout
  default for four or more elements
- trailing commas on multiline TypeScript structures where supported
- review findings when the TypeScript layout remains inconsistent with the
  stated default

# Guardrails

- do not weaken `strict` type checking or required TypeScript compiler defaults
  without documenting the project constraint
- do not allow broad `any` leakage; isolate unavoidable `any` at boundaries and
  narrow immediately
- do not trust runtime payloads because TypeScript types exist
- do not leave non-null assertions, unsafe casts, or optional lifecycle fields
  unjustified
- do not let shared or domain-shaped ad-hoc objects remain unnamed contracts
- do not use heterogeneous enums or serialized enums without explicit string
  values
- do not keep four-or-more-element TypeScript structures on one line when the
  multiline default should apply
- do not place the first or last multiline element on the same line as the
  opening or closing delimiter
- do not omit the trailing comma from a multiline TypeScript structure when the
  syntax supports it
- do not fight an existing TypeScript formatter or linter that already enforces
  the same rule

# Exit Checks

- strict compiler and CI type-checking defaults are preserved or blockers are
  explicit
- untrusted data is validated at runtime boundaries before domain use
- public APIs and shared domain data use named, precise types
- `any`, casts, assertions, and optional fields are justified and narrowed
- naming, enum/literal-union, async error-handling, and decorator/JSDoc ordering
  follow TypeScript defaults
- every relevant TypeScript structure with four or more elements uses one
  element per line
- multiline TypeScript delimiters are on their own lines
- multiline TypeScript structures keep their trailing commas where supported
- the final layout is consistent with any active TypeScript formatter or linter
