# Publication Targets

Evaluate publication targets explicitly:

- Maven Central
- Gradle Plugin Portal
- private artifactory or repository-specific package registry

For each target:

1. determine whether the repository actually publishes there
2. determine whether the target is public enough that unrelated unreleased
   default-branch work must be excluded before publication; treat a target as
   public enough when publishing would immediately expose artifacts to the
   general public, such as Maven Central or the Gradle Plugin Portal, and do
   not treat private or access-controlled registries as public enough unless
   repository policy says they should follow the same isolation rule
3. publish only after the tag exists and the GitHub Release was created
4. verify the published artifact version and availability
5. record `not applicable` when the repository does not use that target

Do not treat optional targets as mandatory, but do not silently skip required
targets either.
