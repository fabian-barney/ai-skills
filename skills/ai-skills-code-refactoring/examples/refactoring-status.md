# Example Refactoring Status

Scoped functions:

- `InvoiceService.calculateTotals`
- `InvoiceService.applyDiscounts`

Behavior protection:

- Added characterization tests for tax, discount, rounding, and zero-line cases.
- Scoped branch coverage is `100%`.

Quality gates:

- Duplication removed from discount branching.
- Cognitive complexity: `calculateTotals` `18 -> 11`, `applyDiscounts` `13 -> 9`.
- CRAP score: worst scoped method `6`.
- Formatter, lint, and unit tests pass.

Residual risk:

- No persistent storage behavior changed.
- No public API signatures changed.
