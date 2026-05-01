---
name: ai-skills-design-value-object
description: >-
  Prefer value objects or named domain types over generic primitives and
  strings when the data has real semantics.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Replace semantically rich primitive or string data with value objects or named
domain types so contracts, invariants, and intent stay explicit.

# When to Use

- use when primitive or string parameters, fields, or return values carry
  domain meaning
- use when data has invariants, normalization rules, or repeated cross-module
  usage
- use `references/value-object-defaults.md` for the promotion rules and
  exceptions
- use `examples/value-object-replacement.md` for a concrete before-and-after
  shape

# Inputs

- the affected primitive or string-based contract
- whether the data crosses boundaries, repeats across call sites, or carries
  invariants
- persistence or transport boundaries that may still require primitive/string
  representations
- `references/value-object-defaults.md`

# Workflow

1. Identify primitives or strings that represent real domain concepts rather
   than temporary mechanical locals.
2. Promote those concepts to a value object or named domain type when they are
   reused, cross boundaries, or carry invariants or behavior.
3. Keep the value object immutable and validate or normalize its invariants at
   construction time.
4. Keep conversions at persistence, transport, or serialization boundaries
   explicit instead of leaking raw types back into domain code.
5. Leave truly local, trivial, mechanical data as primitives or strings when a
   value object would add ceremony without meaning.
6. Use `examples/value-object-replacement.md` when communicating the expected
   refactor shape.

# Outputs

- a value object or named domain type where generic primitives or strings were
  previously carrying domain meaning
- explicit boundary conversion points when raw representations are still
  required
- a review finding when primitive obsession remains in a domain-shaped contract

# Guardrails

- do not introduce wrapper types with no semantic meaning or invariants
- do not keep raw primitive or string contracts in domain APIs once a value
  object is justified
- do not make value objects mutable
- do not confuse value-object semantics with entity identity semantics

# Exit Checks

- semantically rich data no longer relies on generic primitives or strings
- value objects are immutable and validate their own invariants
- boundary conversions are explicit
- remaining primitive or string usage is local, trivial, or boundary-driven
