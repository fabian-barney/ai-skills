# equals/hashCode Contract

Distilled from the Java equality contract plus the issue requirements.

- `equals(...)` must be reflexive:
  `x.equals(x)` must be `true`.
- `equals(...)` must be symmetric:
  if `x.equals(y)` is `true`, then `y.equals(x)` must also be `true`.
- `equals(...)` must be transitive:
  if `x.equals(y)` and `y.equals(z)` are `true`, then `x.equals(z)` must also
  be `true`.
- `equals(...)` must be consistent for an unchanged object state.
- `x.equals(null)` must return `false`.
- If two objects are equal, they must produce the same hash code.
- `equals(...)` and `hashCode()` must use the same semantic field set.
- Review the chosen field set explicitly:
  include the fields that define the type's semantic identity and exclude
  fields that would make equality unstable or semantically misleading.

These checks apply whether equality is handwritten, record-derived, or
generated through tooling such as Lombok or an IDE.
