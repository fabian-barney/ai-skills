---
name: ai-skills-correctness-jpa
description: >-
  Verify JPA entity equality and hashCode behavior, especially for unsaved
  entities with null primary keys.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Verify that touched JPA entities keep identity-safe `equals(...)` and
`hashCode()` behavior, especially when primary-key fields are still `null` on
unsaved entities.

# When to Use

- use when a JPA entity's `equals(...)`, `hashCode()`, or identity field set is
  added, changed, or regenerated
- use when a JPA entity's primary-key handling or persistence lifecycle affects
  equality semantics
- use skill `ai-skills-correctness-equals-hashcode` for the general equality
  contract checks
- use `references/jpa-entity-equality.md` for the JPA-specific unsaved-entity
  and primary-key rules
- use `examples/jpa-equality-review-finding.md` when reporting a failing JPA
  identity implementation

# Inputs

- the touched JPA entity classes and their current `equals(...)` and
  `hashCode()` implementations
- the primary-key fields and when they become non-null
- whether entity equality is handwritten, Lombok-generated, or IDE-generated
- any bounded uses in sets, maps, or persistence-facing comparisons
- `references/jpa-entity-equality.md`
- skill `ai-skills-correctness-equals-hashcode`

# Workflow

1. Identify whether the bounded change touched JPA entity equality, hash-code
   generation, or the primary-key field set.
2. Apply skill `ai-skills-correctness-equals-hashcode` to verify the general
   equals/hashCode contract.
3. Apply `references/jpa-entity-equality.md` to verify the JPA-specific
   identity rules:
   unsaved entities with `null` primary keys must not compare equal to other
   entity instances, and null primary keys must be handled explicitly.
4. Verify that the chosen hash strategy remains identity-safe across the entity
   lifecycle and does not silently treat all unsaved entities as the same
   logical instance.
5. Use `examples/jpa-equality-review-finding.md` when communicating the
   failing JPA identity behavior or missing coverage.

# Outputs

- a pass or fail result for the touched JPA entity identity implementation
- concrete findings for JPA-specific equality or hash-code violations
- a concise remediation direction when unsaved-entity identity handling is
  broken

# Guardrails

- do not treat two different unsaved JPA entity instances as equal just because
  both primary keys are `null`
- do not ignore null primary-key handling in JPA entity equality logic
- do not weaken the general equals/hashCode contract while trying to special
  case JPA lifecycle states
- do not use this skill as a substitute for broader JPA fetch, transaction, or
  query reviews

# Exit Checks

- the touched JPA entity still satisfies the general equals/hashCode contract
- unsaved entities with `null` primary keys are only equal to themselves
- the hash-code strategy remains safe across the JPA entity lifecycle
- any remaining failure is reported with a concrete JPA identity violation and
  next step
