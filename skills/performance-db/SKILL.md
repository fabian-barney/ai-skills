---
name: performance-db
description: >-
  Review explicit or framework-generated database statements for bounded-scope
  performance risk. Use when JDBC, JPA, jOOQ, or similar data-access changes
  may affect query shape, index usage, cardinality, or avoidable round trips.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Prevent the bounded change set from introducing slow, unbounded, or avoidably
expensive database statements.

# When to Use

- use when a change adds or modifies SQL, JDBC, JPA, jOOQ, repository logic,
  fetch plans, or query-building code
- use when a framework-generated database statement may change even though no
  raw SQL file was edited directly
- use when a statement's performance depends on index coverage, join shape,
  pagination, or query count
- use `references/db-statement-review-checklist.md` for evidence order and
  statement-shape review
- use `references/index-and-access-path.md` for index, filtering, ordering, and
  access-path guidance
- use `examples/db-performance-finding.md` when reporting a remaining
  performance risk

# Inputs

- the bounded diff and the changed code that creates or triggers the database
  statement
- the strongest available statement evidence, such as raw SQL, generated SQL,
  ORM query description, SQL logs, or an execution plan
- the expected access pattern, cardinality, and hot-path context for the query
- the relevant schema information, especially indexes, join keys, and ordering
  columns
- `references/db-statement-review-checklist.md`
- `references/index-and-access-path.md`

# Workflow

1. Identify the concrete database statement or strongest available generated
   representation for the bounded change; treat implicit ORM statements as
   first-class statements.
2. Check whether the current statement shape matches the required result with
   minimal columns, bounded row count, intentional joins, and stable ordering
   where pagination or determinism matters.
3. Look for avoidable performance regressions such as N+1 access, per-row
   follow-up queries, broad projections, unbounded scans, or work that could be
   collapsed into a more efficient statement.
4. Evaluate whether the filter, join, and ordering predicates are supported by
   appropriate indexes for the stated access pattern instead of assuming the
   database will optimize the statement automatically.
5. For hot or high-cardinality paths, prefer plan or SQL-log evidence over
   intuition, and state any evidence gap explicitly when a confident decision is
   not possible.
6. Use `examples/db-performance-finding.md` when reporting a remaining
   statement-level performance risk or required follow-up.

# Outputs

- a pass or fail result for the bounded database-statement change
- explicit findings for statement-shape, query-count, or index/access-path
  risks that remain
- a concise next step such as narrowing the query, batching, adding a justified
  index, or validating the plan on realistic data

# Guardrails

- do not review database performance only at the ORM API surface when stronger
  statement evidence is available
- do not treat a functionally correct query as performant by default
- do not invent index recommendations without tying them to concrete filter,
  join, or ordering predicates
- do not broaden this skill into full schema design or infrastructure tuning

# Exit Checks

- the bounded statement or strongest available generated representation was
  inspected directly
- avoidable N+1, broad projection, unbounded scan, and pagination risks were
  considered
- index and access-path suitability were checked against real predicates or an
  explicit evidence gap was recorded
- the final result is specific enough to drive a code-review or gate decision
