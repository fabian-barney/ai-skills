# TypeScript Layout Defaults

Distilled from issue `#14` plus the shared formatting baseline.

- For TypeScript parameter lists, argument lists, arrays, objects, and similar
  comma-separated structures with four or more elements, switch to multiline
  layout.
- In multiline mode, keep one element per line.
- In multiline mode, keep the opening delimiter on its own line before the
  first element and the closing delimiter on its own line after the last
  element.
- In multiline mode, keep a trailing comma after the last element whenever the
  TypeScript syntax supports it.
- Prefer formatter-compatible TypeScript output; if the project tooling already
  enforces the same rule, align with that tooling rather than hand-formatting
  against it.
