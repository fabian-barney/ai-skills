---
name: conventions-java
description: >-
  Apply the default Java conventions by orchestrating the Java-specific leaf
  skills and the remaining Java baseline rules.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Apply the default Java conventions for a bounded Java change by orchestrating
the existing Java convention skills and the remaining Java-only defaults that
are still kept in this bundle.

# When to Use

- use when implementing or reviewing Java code and a single umbrella skill is
  preferred over invoking multiple Java convention skills manually
- use when the bounded Java change touches null contracts, control flow,
  boilerplate, or string construction
- use `../conventions-null/SKILL.md` when null contracts and collection
  semantics need focused enforcement
- use `../conventions-lombok/SKILL.md` when Java boilerplate can be removed
  safely with Lombok
- use `../conventions-early-return/SKILL.md` and
  `../conventions-ternary/SKILL.md` when Java control flow or expression-shaped
  branching should be simplified
- use `references/java-convention-defaults.md` for the remaining Java defaults
  that are not split into separate leaf skills
- use `examples/java-string-format.md` when showing the expected string-format
  refactor shape

# Inputs

- the bounded Java files, tests, and build configuration in scope
- whether Lombok is already available, would need to be added, or is forbidden
- whether public APIs, collection semantics, or nullness tooling are in scope
- whether control-flow blocks or ternary candidates need simplification
- whether string construction uses literal templates with variable data
- `references/java-convention-defaults.md`

# Workflow

1. Confirm that the bounded change is primarily Java and identify which Java
   convention areas are relevant.
2. When null contracts, collections, or Java nullness tooling are in scope,
   apply `../conventions-null/SKILL.md`.
3. When the change contains Java boilerplate that Lombok would remove safely,
   apply `../conventions-lombok/SKILL.md`; only add Lombok when it materially
   improves the bounded change and there is no explicit instruction or project
   rule against it.
4. When Java control flow is overly nested, apply
   `../conventions-early-return/SKILL.md` and
   `../conventions-ternary/SKILL.md` as appropriate.
5. Apply the remaining Java defaults from
   `references/java-convention-defaults.md`, especially:
   prefer `String.format(...)` over literal-template `+` concatenation, prefer
   `StringBuilder` in hot loops or append-heavy paths, and keep `Optional`
   restricted to meaningful Java return-value absence.
6. Aggregate the resulting refactors or findings into one Java-convention
   result without duplicating the child-skill guardrails.
7. Use `examples/java-string-format.md` when communicating the expected
   Java-specific string-format refactor.

# Outputs

- a bounded Java convention result covering the relevant Java convention areas
- child-skill findings or refactors for null, Lombok, early-return, and
  ternary usage when applicable
- Java-specific findings or refactors for string construction and `Optional`
  usage that are not already covered by the child skills

# Guardrails

- do not weaken or override the guardrails of `conventions-null`,
  `conventions-lombok`, `conventions-early-return`, or `conventions-ternary`
- do not add Lombok when the user or project explicitly forbids it, or when
  the bounded Java change does not materially benefit from it
- do not use `Optional` for Java fields, parameters, or serialization models
  without an explicit bounded justification
- do not keep literal-template string concatenation with `+` when
  `String.format(...)` is the clearer Java default
- do not replace hot-loop or append-heavy string construction with
  `String.format(...)` when `StringBuilder` is the better Java choice

# Exit Checks

- every relevant Java convention area was either handled through a child skill
  or explicitly skipped as not applicable
- any Lombok addition or omission is explicitly justified for the bounded Java
  change
- Java literal-template strings use `String.format(...)` unless a hot-loop or
  append-heavy exception justifies `StringBuilder`
- `Optional` usage stays limited to meaningful Java return-value absence unless
  an explicit bounded exception was required
- the final result preserves the child-skill guardrails rather than replacing
  them
