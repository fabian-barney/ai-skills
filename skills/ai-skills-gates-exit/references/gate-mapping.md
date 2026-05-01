# Gate Mapping

Map the mandatory gates to the strongest available skills and evidence. Child
skills are conditional composition points; use them when they materially apply
to the bounded scope.

- Build-Gate: repository build command, CI build job, or equivalent local build
  evidence
- Test-Gate: repository test command, focused test selection, or strongest CI
  test evidence for the bounded scope
- Correctness-Gate:
  `../../ai-skills-correctness-equals-hashcode/SKILL.md`,
  `../../ai-skills-correctness-comparable/SKILL.md`,
  `../../ai-skills-correctness-jpa/SKILL.md`
- Design-Gate:
  `../../ai-skills-design-validation/SKILL.md`,
  `../../ai-skills-design-value-object/SKILL.md`
- Performance-Gate:
  `../../ai-skills-performance-db/SKILL.md`
- Convention-Gate:
  `../../ai-skills-conventions-java/SKILL.md`,
  `../../ai-skills-conventions-typescript/SKILL.md`,
  and their relevant leaf convention skills
- Quality-Gate:
  `../../ai-skills-quality-crap/SKILL.md`,
  `../../ai-skills-quality-cognitive-complexity/SKILL.md`,
  `../../ai-skills-quality-sonar/SKILL.md`

Not every child skill applies to every change. The gate runner should select
only the relevant skills for the bounded scope and explain when a gate is
not-applicable because the affected surface is absent.

For Test-Gate, every behavior change must map to an added or updated automated
test. If the mapping is missing and cannot be added in the bounded scope, mark
Test-Gate failed or blocked with an explicit risk rationale.

Report failed and blocked findings in this severity order:

1. correctness and regression risk
2. security, privacy, and compliance
3. data integrity and error handling
4. architecture and boundary violations
5. performance and scalability risks
6. observability and operational readiness
7. maintainability, readability, and test adequacy
