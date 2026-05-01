# Publication Targets

Evaluate publication targets explicitly:

- Maven Central
- Gradle Plugin Portal
- private artifactory or repository-specific package registry

For each target:

1. determine whether the repository actually publishes there
2. publish only after the tag exists and the GitHub Release was created
3. verify the published artifact version and availability
4. record `not applicable` when the repository does not use that target

Do not treat optional targets as mandatory, but do not silently skip required
targets either.
