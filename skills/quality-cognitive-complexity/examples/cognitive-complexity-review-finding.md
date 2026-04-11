# Example Cognitive Complexity Finding

The bounded change still fails `quality-cognitive-complexity`.

- `InvoiceSyncService#synchronizeBatch`: cognitive complexity `19`
- threshold: `<= 15`
- evidence source: CI `cognitive-java-check`

Suggested next step: extract the variant-specific reconciliation branches into
named helpers and flatten the nested authorization/error checks with guard
clauses before re-running the metric.
