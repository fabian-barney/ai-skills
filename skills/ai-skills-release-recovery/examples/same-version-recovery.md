# Example Same-Version Recovery

- attempted version: `1.8.2`
- tag `v1.8.2`: exists and points at the intended release commit
- GitHub Release: draft exists
- Maven Central: failed before publication
- Gradle Plugin Portal: not attempted
- any public artifact visible: no
- classification: same-version recovery candidate
- preserved history: keep the tag and draft aligned with the intended release
  source; no burned-version record is needed
- next action: fix the publication blocker, re-check that no public target has
  exposed `1.8.2`, then resume the normal release workflow for `1.8.2`
