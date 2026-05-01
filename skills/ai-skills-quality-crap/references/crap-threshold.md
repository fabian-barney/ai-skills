# CRAP Threshold Notes

Distilled from the repository quality-gate expectations and the `ai-skills-quality-crap`
issue contract.

- Hard threshold: relevant methods in the bounded scope must have CRAP score
  `<= 8`.
- Prefer the strongest available evidence source:
  CI gate, local report, or other authoritative tooling output.
- If no report is available for the bounded scope, treat that as missing
  evidence rather than as an automatic pass.
- CRAP combines structural complexity and test coverage risk, so reductions may
  come from either clearer code shape or stronger focused tests.
- Good reduction levers include early-return refactors, extracting cohesive
  branches, and covering previously untested risky paths.
