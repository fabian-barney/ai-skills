# Example Release Checklist

## Complete Public Release

- final build: pass
- final tests: pass
- delta to previous release: reviewed
- semantic version: `1.8.0`
- release tag: `v1.8.0`
- remote default-branch head before version selection: `abc1234`
- remote default-branch head before tagging: unchanged at `abc1234`
- release source: isolated branch from `v1.7.3`
- release-bound PR review loop: not needed
- recovery handoff: not needed
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
- remote default-branch head before version selection: `def5678`
- remote default-branch head before tagging: unchanged at `def5678`
- release source: default branch
- release-bound PR review loop: not needed
- recovery handoff after failure: skill `ai-skills-release-recovery`
- docs/examples updated: yes
- changelog updated: yes
- GitHub Release draft: created after tag push
- artifact publication ordering: after tag and GitHub Release draft
- Maven Central: published
- Gradle Plugin Portal: failed
- private artifactory: not applicable
- version burned: yes, because a public artifact became public
- release tag state: kept at the true published source commit
- GitHub Release final state: retained as draft or historical partial-release
  record per repository policy

Overall result: release partially completed. Roll forward with a new version
for any later complete public release.
