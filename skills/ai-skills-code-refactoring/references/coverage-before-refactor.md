# Coverage Before Refactor

Reach `100%` coverage for the scoped functions before changing implementation.
Use the strongest metric available in the repository, preferring branch or
mutation coverage over line coverage when those reports exist.

Focused characterization tests are acceptable when they lock down current
behavior before cleanup. Prefer assertions against externally observable outputs,
state changes, errors, calls, persistence effects, or integration boundaries.

When `100%` scoped coverage is impossible, document the objective blocker before
refactoring. Legitimate blockers include missing test infrastructure, unsafe
external dependencies that cannot be isolated in the current task, nondeterminism
that cannot be controlled without changing production behavior, or a repository
that does not expose the relevant coverage metric.

An exception still needs substitute evidence. Use the strongest feasible
combination of existing tests, focused partial coverage, golden outputs,
contract checks, manual reproduction notes, or caller analysis.
