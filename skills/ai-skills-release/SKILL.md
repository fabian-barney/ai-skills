---
name: ai-skills-release
description: >-
  Execute the full repository release workflow from final verification through
  GitHub release and artifact publication. Use when a repository needs the
  complete release sequence, not only the GitHub tag-and-release step. This is
  portable release orchestration; repository-specific release policy must be
  supplied as input rather than copied between projects.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Run the full release workflow so the final build/test pass, version selection,
documentation updates, changelog, GitHub release, and registry publications
stay aligned.

This skill is intentionally portable across repositories. Treat any
repository-specific release rules as local policy inputs for that repository,
not as rules to copy into downstream projects.

# When to Use

- use when a repository needs its full release process executed end to end
- use when artifact publication may target Maven Central, the Gradle Plugin
  Portal, a private artifactory, or another repository-specific release target
- use when skill `ai-skills-release-github` is necessary but not sufficient on its own
- use skill `ai-skills-version-support-policy` when the release changes the
  officially supported runtime or platform policy
- use skill `ai-skills-release-github` for the full GitHub-release workflow,
  including version selection, docs/changelog alignment, the release-prep
  commit and push, tag creation, and the GitHub Release itself
- use `references/release-preconditions.md` for the final verification and
  release input requirements
- use `references/publication-targets.md` for target-registry decisions and
  skip rules
- use `examples/release-checklist.md` when reporting the full release run

# Inputs

- the repository default branch with release-bound changes already merged
- repository-specific release policy, versioning rules, and publication rules
- the strongest available final build and test commands or CI evidence
- the latest release tag and the delta since that release
- any support-policy changes in the release scope that affect the published
  artifact or compatibility claims
- documentation, changelog, and versioned example locations that must be
  updated
- the artifact publication targets actually used by the repository
- skill `ai-skills-release-github`
- `references/release-preconditions.md`
- `references/publication-targets.md`

# Workflow

1. Confirm the default branch is current, the release scope is merged, and the
   repository is in releasable state.
2. Run or confirm the final build and test pass for the release candidate; do
   not continue if the final verification is red or missing.
3. Apply the repository-specific release policy as an input, without copying
   policy text into downstream projects.
4. If support-policy decisions in the release scope are still open, apply
   skill `ai-skills-version-support-policy` before finalizing the release
   candidate.
5. Confirm versioned release examples and documentation references are known so
   the release can update them to the new tag.
6. Apply skill `ai-skills-release-github` to perform the GitHub-release workflow,
   including version selection, changelog/docs alignment, release-prep commit,
   versioned-example updates, tag creation, push, and GitHub Release creation.
7. Publish release artifacts only after tag creation and GitHub Release
   creation both succeed. Publish to each applicable target registry listed in
   `references/publication-targets.md`, such as Maven Central, the Gradle
   Plugin Portal, or a private artifactory, and record any target that is
   intentionally not applicable.
8. Verify the published artifacts and release metadata so version numbers,
   tags, changelog entries, and published packages all match.
9. Use `examples/release-checklist.md` when communicating the completed release
   steps or any blocked publication target.

# Outputs

- a selected release version and final release checklist
- aligned documentation, changelog, GitHub release, and publication artifacts
- explicit publication status for each relevant release target
- a concise release summary with follow-up blockers when publication was only
  partially completed

# Guardrails

- do not skip the final build or test verification before release
- do not copy repository-specific release rules into downstream projects; use
  local release policy as input
- do not skip versioned release example and documentation-reference updates
- do not publish artifacts whose version, changelog, or tag is out of sync
- do not publish registry artifacts before the tag and GitHub Release exist
- do not assume every repository publishes to Maven Central, the Gradle Plugin
  Portal, and private artifactory; treat each target as conditional
- do not declare the release complete while a required publication target is
  failed or unverified

# Exit Checks

- final build and test evidence are green and explicit
- the selected version matches the documented delta from the previous release
- skill `ai-skills-release-github` was applied for the GitHub release portion
- versioned examples and documentation references were updated to the new tag or
  explicitly ruled out
- tag creation completed before GitHub Release creation, and GitHub Release
  creation completed before artifact publication
- each repository-relevant publication target is either published successfully
  or explicitly marked not applicable
- the final release report is concrete enough for downstream consumers and
  maintainers
