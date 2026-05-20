# Bootstrap Surface Status

The composed bootstrap skill should report one status for each child surface:

- `completed`: the child skill ran and produced the expected bootstrap output
- `blocked`: the child skill could not complete because a prerequisite,
  dependency, or external decision is missing
- `skipped`: the child was intentionally not run even though the broader
  bootstrap remains in scope
- `out-of-scope`: the surface is intentionally excluded from the current
  bootstrap request

For each child surface, record:

1. surface name
2. child skill used
3. final status
4. handoff output for downstream bootstrap work
5. blocker, skip reason, or named gap when the status is not `completed`

Composite classification:

- full bootstrap: every in-scope child surface is `completed`
- partial bootstrap: one or more child surfaces are `blocked`, `skipped`, or
  `out-of-scope`

Do not describe a bootstrap as complete unless the child-status record shows a
full bootstrap.
