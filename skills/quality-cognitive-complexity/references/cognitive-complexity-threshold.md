# Cognitive Complexity Threshold Notes

Distilled from the project's cognitive-complexity guidance and the
`quality-cognitive-complexity` issue contract.

- Hard threshold for the bounded scope: cognitive complexity must be `<= 15`.
- Prefer evidence in this order:
  CI or Sonar-like report, IDE/static-analysis result, then conservative
  estimate when no tool result exists.
- Strong reduction levers include early returns, named extracted methods with a
  single responsibility, and separating orchestration from detailed decision
  logic.
- Do not preserve a complexity violation in the bounded scope by calling it
  legacy tolerance; this skill uses a hard gate for the current change.
