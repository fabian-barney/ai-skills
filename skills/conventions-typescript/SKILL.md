---
name: conventions-typescript
description: >-
  Apply the default TypeScript multiline layout and trailing-comma conventions
  for lists, arguments, and parameters.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Apply the default TypeScript formatting conventions for multiline lists,
arguments, parameters, and similar comma-separated structures.

# When to Use

- use when implementing or reviewing TypeScript code that introduces or edits
  argument lists, parameter lists, array literals, object literals, tuple-like
  lists, or similar comma-separated structures
- use when a TypeScript structure reaches four or more elements and the layout
  should switch to the multiline default
- use `references/typescript-layout-defaults.md` for the exact multiline and
  trailing-comma rules
- use `examples/multiline-arguments.md` when showing the expected TypeScript
  layout shape

# Inputs

- the changed TypeScript files and the affected comma-separated structures
- whether the structure has reached four or more elements
- whether the surrounding project formatter or linter already enforces the same
  TypeScript layout
- `references/typescript-layout-defaults.md`

# Workflow

1. Identify every changed TypeScript argument list, parameter list, or other
   comma-separated structure in scope.
2. If the structure has four or more elements, switch it to multiline layout
   with one element per line.
3. In multiline mode, put the opening and closing delimiters on their own lines
   rather than sharing a line with the first or last element.
4. In multiline mode, keep a trailing comma after the last element whenever the
   TypeScript syntax supports it.
5. If the project formatter or linter already enforces the same TypeScript
   layout, align the change with that tooling rather than hand-formatting
   against it.
6. Use `examples/multiline-arguments.md` when communicating the expected
   TypeScript layout.

# Outputs

- TypeScript comma-separated structures that follow the multiline layout
  default for four or more elements
- trailing commas on multiline TypeScript structures where supported
- review findings when the TypeScript layout remains inconsistent with the
  stated default

# Guardrails

- do not keep four-or-more-element TypeScript structures on one line when the
  multiline default should apply
- do not place the first or last multiline element on the same line as the
  opening or closing delimiter
- do not omit the trailing comma from a multiline TypeScript structure when the
  syntax supports it
- do not fight an existing TypeScript formatter or linter that already enforces
  the same rule

# Exit Checks

- every relevant TypeScript structure with four or more elements uses one
  element per line
- multiline TypeScript delimiters are on their own lines
- multiline TypeScript structures keep their trailing commas where supported
- the final layout is consistent with any active TypeScript formatter or linter
