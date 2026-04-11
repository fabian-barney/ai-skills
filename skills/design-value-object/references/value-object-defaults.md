# Value Object Defaults

Distilled from the project's conventions, Clean Code, Effective Java, JPA, and
TypeScript guidance.

- Prefer value objects or named domain types over raw `String`, `int`,
  `Number`, and similar generic types when the data has domain meaning.
- Promote data to a named type when it crosses boundaries, is reused, carries
  invariants, or needs normalization or behavior.
- Keep value objects immutable.
- Keep persistence or transport representations explicit at the boundary.
- Avoid introducing value objects for tiny local mechanical data with no
  semantic weight.
