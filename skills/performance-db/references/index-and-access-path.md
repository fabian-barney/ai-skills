# Index And Access-Path Guidance

Check index suitability against the real statement shape:

- filter predicates
- join predicates
- ordering columns
- pagination strategy

Useful signals:

- frequent equality or range filters without supporting indexes
- joins on large tables where the join keys are not indexed appropriately
- `ORDER BY` clauses that force sorting because the access path cannot support
  the requested order
- broad scans on hot paths that should be selective

Index review is not only about "does an index exist". It is about whether the
existing index actually supports the query's filter, join, and ordering
behavior for the expected cardinality.

When the statement is hot or high-cardinality, validate the access path with an
execution plan or the strongest available production-like evidence.
