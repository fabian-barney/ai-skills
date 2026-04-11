# Validation Boundary Defaults

Distilled from the issue contract plus the project's clean-code, Java, and
Spring boundary guidance.

- Fail as early as possible.
- Validate request and payload boundaries with a standard validation API where
  that exists and fits the environment.
- Keep method contracts explicit, including non-public methods when local
  invariants matter.
- Boundary validation should stop malformed or invalid external input before it
  leaks deeper into core logic.
- Contract violations should remain observable and actionable.
