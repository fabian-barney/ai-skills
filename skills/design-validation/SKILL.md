---
name: design-validation
description: Validate contracts as early as possible and distinguish programming mistakes from normal invalid data.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Validate inputs and invariants early so API contracts fail fast, while keeping
programmer errors distinct from normal invalid data in the runtime flow.

# When to Use

- use when defining or reviewing method contracts, API boundaries, DTOs, or
  internal invariants
- use when a framework or platform offers a standard validation API
- use `references/validation-boundaries.md` for the default fail-fast and
  boundary-validation rules
- use `references/programming-error-vs-invalid-data.md` when choosing between
  exceptions and standard validation handling
- use `examples/java-boundary-validation.md` for a concrete validation split

# Inputs

- the affected method, API boundary, DTO, or domain invariant
- whether a contract breach is a programmer mistake or expected invalid input
- available standard validation APIs or framework validation features
- logging and error-mapping expectations for the current environment
- `references/validation-boundaries.md`
- `references/programming-error-vs-invalid-data.md`

# Workflow

1. Make the contract explicit for the method, boundary, or data structure in
   scope.
2. Validate as early as possible, preferably at the external or module
   boundary where invalid data first appears.
3. Distinguish between programmer mistakes and normal invalid data:
   programmer mistakes fail fast with appropriate runtime errors;
   normal invalid input uses the standard validation mechanism where available.
4. Apply validation to all relevant methods, including private methods, when
   local invariants or assumptions must hold.
5. Keep logging actionable for programmer mistakes so debugging evidence is not
   lost.
6. Use `examples/java-boundary-validation.md` when communicating the expected
   split between boundary validation and fail-fast invariants.

# Outputs

- explicit validation points at the earliest appropriate boundary
- a clear distinction between fail-fast programming errors and normal invalid
  data handling
- review findings when contracts remain implicit or validation is delayed

# Guardrails

- do not defer boundary validation deep into core logic without reason
- do not treat programmer mistakes as ordinary recoverable validation flow
- do not leave private-method invariants unchecked when they materially affect
  correctness
- do not swallow contract failures without actionable diagnostics

# Exit Checks

- contracts are explicit for the bounded scope
- validation happens at the earliest appropriate place
- programmer mistakes and normal invalid data use different handling paths
- logging and error handling preserve enough context to debug violations
