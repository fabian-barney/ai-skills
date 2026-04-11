---
name: correctness-comparable
description: >-
  Verify Java Comparable implementations, including ordering semantics and the
  consistent-with-equals expectation.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Verify that a touched Java `Comparable` implementation defines a safe ordering
and does not violate the "consistent with equals" expectation.

# When to Use

- use when a Java type adds, changes, or relies on `Comparable`
- use when `compareTo(...)`, ordering fields, or sorted-collection behavior is
  touched
- use when a Java type implementing `Comparable` also defines custom equality
  and the ordering/equality relationship must be checked explicitly
- use `references/comparable-contract.md` for the ordering and equality
  consistency checks
- use `examples/comparable-review-finding.md` when reporting a failing
  Comparable implementation

# Inputs

- the touched Java type and its `compareTo(...)` implementation
- the fields that define the intended ordering
- whether the Java type also overrides `equals(...)` and `hashCode()`
- any bounded usage in sorted collections, maps, or ordered APIs
- `references/comparable-contract.md`

# Workflow

1. Identify whether the bounded Java change touched `compareTo(...)`, ordering
   fields, or any generated/composed comparison logic.
2. Verify the ordering contract from `references/comparable-contract.md`:
   sign symmetry, transitivity, and stable zero-comparison behavior.
3. Verify that `compareTo(...) == 0` is consistent with `equals(...)`, or treat
   any intentional deviation as a high-risk case that must be explicit and
   safe for the bounded use.
4. Review the selected ordering fields for semantic stability so sorted
   collections or maps do not behave unexpectedly.
5. Use `examples/comparable-review-finding.md` when communicating the failing
   contract or missing coverage.

# Outputs

- a pass or fail result for the touched Java Comparable implementation
- concrete findings for ordering or equality-consistency violations
- a concise remediation direction when the ordering contract is broken

# Guardrails

- do not accept a `Comparable` implementation that violates sign symmetry or
  transitivity
- do not ignore the "consistent with equals" expectation when `compareTo(...)`
  can return `0`
- do not keep ordering based on unstable or semantically irrelevant fields
  without an explicit bounded rationale
- do not use this skill as a substitute for `correctness-equals-hashcode` when
  the bounded change also requires a full equality-contract review

# Exit Checks

- the touched `Comparable` implementation satisfies the ordering contract
- `compareTo(...) == 0` has been checked against `equals(...)`
- sorted-collection or ordered-API behavior remains safe for the bounded case
- any remaining failure is reported with a concrete contract violation and next
  step
