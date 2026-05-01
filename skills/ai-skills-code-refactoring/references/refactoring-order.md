# Refactoring Order

Behavior-preserving refactoring follows this order:

1. Scope the rules to the actual functions or methods being refactored.
2. Raise scoped coverage to `100%` with the strongest available coverage metric.
3. Avoid or reduce duplication in the scoped implementation.
4. Reduce cognitive complexity to `<= 15`.
5. Reduce CRAP score to `<= 8` when CRAP evidence exists.
6. Apply project code conventions.

The order matters because later cleanup is less reliable when current behavior
is not characterized first. Convention fixes come last so formatting or style
churn does not hide behavior-risk work.

Scope means the named functions, methods, or smallest coherent module boundary
needed for the requested refactor. Do not expand the scope because nearby code
looks messy unless the user agrees or a gate cannot be evaluated without that
larger boundary.

For every gate, prefer tool evidence over estimates. If a metric is unavailable,
state which tool or report is missing and use the strongest available substitute
without inventing an exact number.
