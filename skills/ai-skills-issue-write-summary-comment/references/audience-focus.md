# Audience Focus

Write the issue summary for cross-functional readers.

Prefer:

- plain delivery language over commit-by-commit detail
- validation signals that QA or reviewers can trust quickly
- validation evidence that distinguishes tests run, manual checks, happy-path
  coverage, and error/negative-path coverage
- explicit related PR/MR links when the issue was resolved through review
- explicit follow-ups when work is intentionally deferred

Avoid:

- deep implementation rationale better suited to the PR description
- diff-level technical noise
- vague validation summaries that hide untested happy paths or error paths
- vague status phrases such as "done" with no validation context
