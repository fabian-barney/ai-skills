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
2. child skill used, or the surface's assigned child skill when the child was
   not run
3. final status
4. handoff output for downstream bootstrap work, or `none` when the status did
   not yield one
5. reason or rationale when the status is not `completed`, such as a blocker,
   skip reason, out-of-scope rationale, or named gap

Use these canonical surface names and record each exactly once:

- `repository`
- `ai-instructions`
- `framework`
- `ci`
- `documentation`

Use these canonical child-skill assignments for the record, even when a
surface is `out-of-scope` or `skipped` and the child did not run:

- `repository` -> skill `ai-skills-bootstrap-repository`
- `ai-instructions` -> skill `ai-skills-bootstrap-ai-instructions`
- `framework` -> skill `ai-skills-bootstrap-framework-setup`
- `ci` -> skill `ai-skills-bootstrap-ci-pipeline`
- `documentation` -> skill `ai-skills-bootstrap-documentation`

Composite classification:

- full bootstrap: every in-scope child surface is `completed` and every
  excluded surface is explicitly `out-of-scope`
- partial bootstrap: one or more in-scope child surfaces are `blocked` or
  `skipped`

Do not use `out-of-scope` as a substitute for skipping an in-scope surface.
When the broader bootstrap still includes a surface but the child was not run,
record it as `skipped` with a reason.

Do not describe a bootstrap as complete unless the child-status record shows a
full bootstrap.
