---
name: release
description: >-
  Execute the full repository release workflow from final verification through
  GitHub release and artifact publication. Use when a repository needs the
  complete release sequence, not only the GitHub tag-and-release step.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Run the full release workflow so the final build/test pass, version selection,
documentation updates, changelog, GitHub release, and registry publications
stay aligned.

# When to Use

- use when a repository needs its full release process executed end to end
- use when artifact publication may target Maven Central, the Gradle Plugin
  Portal, a private artifactory, or another repository-specific release target
- use when `release-github` is necessary but not sufficient on its own
- use `../release-github/SKILL.md` for the GitHub tag-and-release part of the
  flow
- use `references/release-preconditions.md` for the final verification and
  release-input requirements
- use `references/publication-targets.md` for target-registry decisions and
  skip rules
- use `examples/release-checklist.md` when reporting the full release run

# Inputs

- the repository default branch with release-bound changes already merged
- the strongest available final build and test commands or CI evidence
- the latest release tag and the delta since that release
- documentation, changelog, and versioned example locations that must be
  updated
- the artifact publication targets actually used by the repository
- `../release-github/SKILL.md`
- `references/release-preconditions.md`
- `references/publication-targets.md`

# Workflow

1. Confirm the default branch is current, the release scope is merged, and the
   repository is in releasable state.
2. Run or confirm the final build and test pass for the release candidate; do
   not continue if the final verification is red or missing.
3. Determine the delta since the latest release and derive the next semantic
   version from that delta unless the target version is explicit.
4. Update release-facing documentation, examples, and the changelog so they
   all point at the selected version and describe the user-visible delta.
5. Apply `../release-github/SKILL.md` to perform the GitHub release portion of
   the workflow: tag selection, release notes alignment, tag creation, push,
   and GitHub Release creation.
6. Publish release artifacts to each applicable target registry listed in
   `references/publication-targets.md`, such as Maven Central, the Gradle
   Plugin Portal, or a private artifactory, and record any target that is
   intentionally not applicable.
7. Verify the published artifacts and release metadata so version numbers,
   tags, changelog entries, and published packages all match.
8. Use `examples/release-checklist.md` when communicating the completed release
   steps or any blocked publication target.

# Outputs

- a selected release version and final release checklist
- aligned documentation, changelog, GitHub release, and publication artifacts
- explicit publication status for each relevant release target
- a concise release summary with follow-up blockers when publication was only
  partially completed

# Guardrails

- do not skip the final build or test verification before release
- do not publish artifacts whose version, changelog, or tag is out of sync
- do not assume every repository publishes to Maven Central, the Gradle Plugin
  Portal, and private artifactory; treat each target as conditional
- do not declare the release complete while a required publication target is
  failed or unverified

# Exit Checks

- final build and test evidence are green and explicit
- the selected version matches the documented delta from the previous release
- `../release-github/SKILL.md` was applied for the GitHub release portion
- each repository-relevant publication target is either published successfully
  or explicitly marked not applicable
- the final release report is concrete enough for downstream consumers and
  maintainers
