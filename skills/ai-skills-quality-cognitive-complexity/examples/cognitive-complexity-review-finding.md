# Example Cognitive Complexity Legacy Tolerance

The bounded change relies on the altered-legacy tolerance in
`ai-skills-quality-cognitive-complexity`.

- `InvoiceSyncService#synchronizeBatch`: cognitive complexity `19`
- classification: altered legacy method
- applicable threshold: temporary tolerance up to `20` with reduction plan
- evidence source: CI `cognitive-java-check`

Reduction plan: extract the variant-specific reconciliation branches into named
helpers and flatten the nested authorization/error checks with guard clauses
before the next release-bound change to this service.
