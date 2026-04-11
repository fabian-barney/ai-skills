# Programming Error vs Invalid Data

Distilled from the issue contract and the project's Java and logging guidance.

- Programmer mistakes are contract or invariant violations inside the code and
  should fail fast with an appropriate runtime exception or error type.
- Normal invalid data is part of expected runtime flow and should use the
  standard validation mechanism for the boundary or framework.
- Keep the two paths separate so callers, reviewers, and logs can distinguish
  misuse from ordinary validation failure.
- For programmer mistakes, log enough context to make the fault diagnosable.
