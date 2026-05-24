# Example Release Checklist

## Complete Public Release

- final build: pass
- final tests: pass
- delta to previous release: reviewed
- semantic version: `1.8.0`
- release tag: `v1.8.0`
- release source: isolated branch from `v1.7.3`
- release-bound PR review loop: not needed
- docs/examples updated: yes
- changelog updated: yes
- GitHub Release draft: created after tag push
- artifact publication ordering: after tag and GitHub Release draft
- Maven Central: published
- Gradle Plugin Portal: not applicable
- private artifactory: published
- GitHub Release final state: published
- merge-back to default branch: completed cleanly

Overall result: release completed successfully for all repository-relevant
targets.

## Partial Public Release

- final build: pass
- final tests: pass
- delta to previous release: reviewed
- semantic version: `1.8.1`
- release tag: `v1.8.1`
- release source: default branch
- release-bound PR review loop: not needed
- docs/examples updated: yes
- changelog updated: yes
- GitHub Release draft: created after tag push
- artifact publication ordering: after tag and GitHub Release draft
- Maven Central: published
- Gradle Plugin Portal: failed
- private artifactory: not applicable
- version burned: yes, because a public artifact was already published
- release tag state: kept at the true published source commit
- GitHub Release final state: retained as draft or historical partial-release
  record per repository policy

Overall result: release partially completed. Roll forward with a new version
for any later complete public release.
