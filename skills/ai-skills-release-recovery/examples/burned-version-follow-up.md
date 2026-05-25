# Example Burned-Version Follow-Up

- attempted version: `1.8.3`
- tag `v1.8.3`: exists and points at the true published source commit
- GitHub Release: draft exists and reflects the partial publication
- Maven Central: published successfully
- Gradle Plugin Portal: failed after Maven Central was already public
- any public artifact visible: yes
- classification: burned-version follow-up
- preserved history: keep `v1.8.3` and the GitHub Release draft or historical
  partial-release record as the truthful record of the partial public release
- next action: fix the failure cause and cut a new version, such as `1.8.4`,
  through the normal release workflow
