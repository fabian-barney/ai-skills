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
3. create the GitHub Release draft after the tag exists and before publishing
   public targets
4. if the target is public enough and any artifact becomes public, treat that
   version as burned for retry purposes if later required public targets fail,
   and keep the tag as the historical source pointer
5. after all required public targets succeed, publish or promote the GitHub
   Release from draft to final and verify the published artifact version and
   availability
6. if publication fails before any public artifact becomes public, defer
   same-version recovery to repository policy instead of automatically treating
   the version as burned
7. record `not applicable` when the repository does not use that target

Do not treat optional targets as mandatory, but do not silently skip required
targets either.
