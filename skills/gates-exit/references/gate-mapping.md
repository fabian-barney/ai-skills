# Gate Mapping

Map the mandatory gates to the strongest available skills and evidence:

- Build-Gate: repository build command, CI build job, or equivalent local build
  evidence
- Test-Gate: repository test command, focused test selection, or strongest CI
  test evidence for the bounded scope
- Correctness-Gate:
  `../correctness-equals-hashcode/SKILL.md`,
  `../correctness-comparable/SKILL.md`,
  `../correctness-jpa/SKILL.md`
- Design-Gate:
  `../design-validation/SKILL.md`,
  `../design-value-object/SKILL.md`
- Performance-Gate:
  `../performance-db/SKILL.md`
- Convention-Gate:
  `../conventions-java/SKILL.md`,
  `../conventions-typescript/SKILL.md`,
  and their relevant leaf convention skills
- Quality-Gate:
  `../quality-crap/SKILL.md`,
  `../quality-cognitive-complexity/SKILL.md`,
  `../quality-sonar/SKILL.md`

Not every child skill applies to every change. The gate runner should select
only the relevant skills for the bounded scope and explain when a gate is
not-applicable because the affected surface is absent.
