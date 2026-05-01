# Comparable Consistency

Distilled from the Java `Comparable` expectation plus the issue requirement.

- If a Java type implements `Comparable`, check whether `compareTo(...) == 0`
  matches `equals(...)`.
- The default safe expectation is that ordering equality and object equality are
  consistent.
- If `compareTo(...) == 0` can hold for objects that are not equal, treat that
  as a high-risk deviation and require an explicit bounded rationale.
- Review sorted collections and maps carefully when equality and ordering can
  diverge, because duplicates or lookup behavior may become surprising.

This skill only verifies the equality-consistency aspect. Broader ordering
correctness belongs in `ai-skills-correctness-comparable`.
