# Example Release Checklist

- final build: pass
- final tests: pass
- delta to previous release: reviewed
- semantic version: `1.8.0`
- release tag: `v1.8.0`
- release source: isolated branch from `v1.7.3`
- release-bound PR review loop: not needed
- docs/examples updated: yes
- changelog updated: yes
- GitHub release: published
- artifact publication ordering: after tag and GitHub Release
- Maven Central: published
- Gradle Plugin Portal: not applicable
- private artifactory: published
- merge-back to default branch: completed cleanly

Overall result: release completed successfully for all repository-relevant
targets.
