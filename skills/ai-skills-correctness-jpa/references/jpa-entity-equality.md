# JPA Entity Equality Defaults

Distilled from issue `#22` plus the shared JPA identity baseline.

- JPA entity equality must remain identity-safe.
- Unsaved entities with `null` primary keys must not compare equal to any other
  entity instance except their own Java instance identity.
- Equality logic must handle `null` primary keys explicitly.
- Do not rely on a nullable primary key alone in a way that makes multiple
  different unsaved entities appear equal.
- Review the hash-code strategy together with the equality strategy so JPA
  lifecycle transitions do not create surprising behavior in sets or maps.

Use skill `ai-skills-correctness-equals-hashcode` for the general contract and this reference
for the JPA-specific identity rules.
