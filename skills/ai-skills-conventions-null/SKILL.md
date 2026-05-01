---
name: ai-skills-conventions-null
description: Enforce explicit null contracts, non-null collections by default, and fail-fast handling for illegal nulls.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Make nullability explicit, keep collections non-null by default, and fail fast
on illegal nulls instead of swallowing programming errors.

# When to Use

- use when designing or reviewing fields, parameters, return values, and public
  APIs
- use when handling collections, boundary mapping, de-/serialization, or
  un-/marshalling
- use `references/null-contracts.md` for the default null and collection rules
- use `references/java-nullness-strategy.md` when Java-style nullness tooling,
  annotations, or validation frameworks apply
- use `examples/java-null-contract.md` when showing the expected contract and
  boundary shape

# Inputs

- the affected API surface, fields, parameters, return values, and collection
  semantics
- whether `null` and empty carry different meaning at a boundary
- available nullness tooling, annotations, or validation frameworks
- `references/null-contracts.md`
- `references/java-nullness-strategy.md` when Java-specific nullness tooling is
  relevant

# Workflow

1. Decide and state the null contract for every public-facing parameter, return
   value, and field in scope.
2. Default collections to non-null and prefer empty collections over `null`
   when absence is not semantically distinct.
3. Treat unexpected null collections as programming errors and fail fast rather
   than swallowing them with null-safe helpers.
4. Allow null collections only at the minimal boundary scope where absent and
   empty must remain distinguishable.
5. Use the strongest available contract mechanism:
   nullness framework first, then validation or explicit annotations, then
   documentation only as a last resort.
6. When Java-specific tooling applies, use
   `references/java-nullness-strategy.md` to prefer JSpecify-style contracts
   and stronger enforcement before fallback annotations.
7. Use `examples/java-null-contract.md` when communicating the expected API and
   boundary shape.

# Outputs

- explicit null contracts for the bounded public-facing scope
- non-null collection handling by default
- minimal documented exceptions where boundary semantics require nullable
  collections
- fail-fast findings for swallowed illegal nulls

# Guardrails

- do not return or store null collections in normal domain code
- do not use null-safe helpers such as `CollectionUtils.isEmpty(...)` to hide
  illegal null collections
- do not leave public-facing null contracts implicit
- do not let boundary-specific nullable collection exceptions leak into normal
  domain flow
- do not choose fallback nullness annotations when stronger framework or tool
  support is available

# Exit Checks

- every public-facing parameter, return value, and field in scope has an
  explicit null contract
- collections are non-null by default outside minimal boundary exceptions
- illegal null collections fail fast instead of being swallowed
- the chosen nullness tooling or annotation strategy is internally consistent
