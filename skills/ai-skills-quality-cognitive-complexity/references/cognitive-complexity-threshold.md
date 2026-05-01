# Cognitive Complexity Threshold Notes

Distilled from the project's cognitive-complexity guidance and the
`ai-skills-quality-cognitive-complexity` issue contract.

- Enforced limit for new methods: cognitive complexity must be `<= 15`.
- Encouraged limit for altered existing methods: cognitive complexity should be
  `<= 15`.
- Temporary tolerance for altered legacy methods: complexity up to `20` is
  acceptable only when behavior risk is high and the PR includes a documented
  reduction plan.
- Legacy method means a method that already existed before the current change
  and had cognitive complexity above the encouraged target at change start.
- Classify legacy status from the strongest available baseline evidence:
  pre-change revision on the target branch, prior CI or static-analysis report
  for that revision, or an explicitly labeled estimate when no tool evidence
  exists.
- If an altered legacy method remains above `20`, create or link a follow-up
  issue with an explicit reduction plan.
- Prefer evidence in this order:
  CI or Sonar-like report, IDE/static-analysis result, then conservative
  estimate when no tool result exists.
- Strong reduction levers include early returns, named extracted methods with a
  single responsibility, and separating orchestration from detailed decision
  logic.
- Do not use legacy tolerance for newly introduced methods.
- Do not use legacy tolerance for altered methods without behavior-risk
  evidence and a concrete reduction plan.
