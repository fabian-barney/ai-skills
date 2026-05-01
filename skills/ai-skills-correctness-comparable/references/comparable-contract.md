# Comparable Contract

Distilled from the Java `Comparable` contract and the issue requirement.

- `x.compareTo(y)` and `y.compareTo(x)` must have opposite signs when both are
  valid to compare.
- The ordering must be transitive.
- If `x.compareTo(y) == 0`, then comparisons against a third value must behave
  consistently with that zero-result.
- The default safe expectation is that `x.compareTo(y) == 0` implies
  `x.equals(y)`.
- If a Java type intentionally diverges from that equality expectation, treat
  it as a high-risk bounded exception and review every sorted collection or map
  use carefully.
- Ordering fields should be semantically stable and should not make
  `Comparable` behavior surprising or inconsistent during normal use.

This skill is focused on ordering correctness. Use
`ai-skills-correctness-equals-hashcode` when the bounded change also needs a full
equality-contract review.
