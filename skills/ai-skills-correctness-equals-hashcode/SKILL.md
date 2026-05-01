---
name: ai-skills-correctness-equals-hashcode
description: >-
  Verify the equals/hashCode contract for touched Java equality code and check
  Comparable consistency when applicable.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Verify that touched Java `equals(...)` and `hashCode()` implementations still
satisfy the official equality contract and remain consistent with
`Comparable` when the type implements it.

# When to Use

- use when a Java `equals(...)` and/or `hashCode()` implementation was added,
  changed, or regenerated
- use when Lombok, records, IDE generation, or field selection changes affect
  Java equality semantics
- use when the Java type implements `Comparable` and equality changes could
  break the "consistent with equals" expectation
- use `references/equals-hashcode-contract.md` for the equality contract and
  field-selection checks
- use `references/comparable-consistency.md` when `Comparable` is implemented
- use `examples/equality-review-finding.md` when reporting a contract failure

# Inputs

- the touched Java type and its current `equals(...)`, `hashCode()`, or
  generated-equality configuration
- the fields that define the type's semantic identity
- whether the type implements `Comparable`
- relevant tests or callers that rely on equality, hashing, or sorted
  collections
- `references/equals-hashcode-contract.md`
- `references/comparable-consistency.md` when `Comparable` is implemented

# Workflow

1. Identify whether the bounded Java change touched `equals(...)`,
   `hashCode()`, or the field/configuration set that drives generated equality.
2. Verify the equality contract from
   `references/equals-hashcode-contract.md`:
   reflexive, symmetric, transitive, consistent, and `false` for `null`.
3. Verify that equal objects always produce the same hash code and that
   `hashCode()` uses the same semantic field set as `equals(...)`.
4. Review the selected equality fields for type semantics:
   include the fields that define identity, exclude fields that would make
   equality unstable or semantically misleading.
5. If the type implements `Comparable`, apply
   `references/comparable-consistency.md` and verify that
   `compareTo(...) == 0` stays consistent with `equals(...)`, or that any
   intentional deviation is explicit and safe for the bounded use case.
6. Use `examples/equality-review-finding.md` when communicating a failing
   contract or missing test coverage.

# Outputs

- a pass or fail result for the touched equality implementation
- concrete findings for violated equals/hashCode or Comparable consistency
  rules
- a concise remediation direction when the Java equality contract is broken

# Guardrails

- do not treat matching hash codes as proof that `equals(...)` is correct
- do not accept `equals(...)` and `hashCode()` using different semantic field
  sets
- do not ignore `Comparable` consistency when the type implements it
- do not keep equality definitions that depend on unstable or semantically
  irrelevant fields without an explicit bounded rationale

# Exit Checks

- the touched Java equality implementation satisfies the equals/hashCode
  contract
- equal objects always have identical hash codes
- the semantic field set is consistent across `equals(...)` and `hashCode()`
- `Comparable` consistency was checked whenever the type implements it
- any remaining failure is reported with a concrete contract violation and next
  step
