---
name: ai-skills-release-github
description: >-
  Publish a repository release on GitHub using a consistent tagged-release
  flow. Use when a version must be selected, changelog or release notes aligned,
  and a GitHub Release created from the release commit.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Publish a clean GitHub release that keeps version selection, changelog updates,
annotated tags, and GitHub release notes aligned.

# When to Use

- use when a repository needs a new GitHub release from its default branch
- use when the parent release workflow intentionally requires an isolated
  release branch created from the latest released tag so unrelated unreleased
  default-branch work stays out of the release
- use when a version must be chosen explicitly or inferred from merged
  user-visible changes since the latest tag
- use when changelog content, tags, and GitHub release notes must describe the
  same release
- use skill `ai-skills-version-dependency-selection` when framework,
  build-tool, or dependency choices in the release scope still need explicit
  version selection
- use skill `ai-skills-version-support-policy` when the release also changes
  the officially supported runtime or platform matrix
- use `references/version-selection.md` for semantic version bump selection
- use `references/github-release-flow.md` for the tagged-release sequence and
  GitHub-specific checks
- use `examples/github-release-notes.md` when shaping concise release notes

# Inputs

- the repository default branch with all release-bound changes already merged,
  or an intentionally isolated release branch created from the latest released
  tag when the parent release workflow explicitly requires that narrower source
- confirmation that no open release-bound PRs remain
- the latest reachable release tag and the merged changes since that tag
- any explicit target version provided by the user or repository policy
- any framework, build-tool, dependency, or support-policy changes in the
  release scope that affect compatibility claims
- the changelog or strongest release-notes source for the repository
- GitHub access capable of pushing tags and creating releases
- `references/version-selection.md`
- `references/github-release-flow.md`

# Workflow

1. Treat the default branch as the normal release source. Only use an isolated
   release branch when the parent release workflow explicitly requires it;
   create that branch from the latest released tag so unrelated unreleased
   default-branch work is excluded.
2. Ensure the chosen release source is current for its intended scope, all
   release-bound PRs for that scope are merged or intentionally recreated on
   the isolated branch, and no open release-bound PRs remain; do not release
   from a feature branch.
3. If the release scope includes framework, build-tool, or dependency choices
   that are not fixed yet, apply skill `ai-skills-version-dependency-selection`
   before finalizing release timing or compatibility notes.
4. If the release changes officially supported runtimes or platforms and the
   support policy is not explicit yet, apply skill `ai-skills-version-support-policy`
   before finalizing compatibility claims.
5. Determine the target version: use an explicit version when provided;
   otherwise classify the changes since the latest tag and select the smallest
   valid semantic-version bump that fits the strongest user-visible change.
6. Stop if there are no meaningful release changes instead of creating an empty
   tag.
7. Verify the chosen release source contains only the intended scoped release
   change set by inspecting the commits or file diff from the latest released
   tag to that source. Stop until the source is narrowed if unrelated
   unreleased work would be included.
8. Update the changelog or release-notes source with the selected version, the
   release date, and a concise summary of user-visible changes.
9. Run `git grep -F "<previous-tag>"` before creating the release commit,
   replacing `<previous-tag>` with the actual latest released version tag, for
   example `v1.2.3`. Update every versioned release example or documentation
   reference found so it points at the new tag.
10. Stage the changelog or release-notes source and all versioned-example
   updates together.
11. Commit the release-preparation changes on the chosen release source,
   create an annotated tag for the release commit, and push both branch and
   tag.
12. Create the GitHub Release from the pushed tag using notes that stay aligned
   with the changelog or release-notes source. If both exist, treat the
   changelog as authoritative unless repository policy explicitly says
   otherwise.
13. Verify that the tag and release page exist and point at the intended commit.

# Outputs

- the selected release version and release commit
- the release source used, including whether it was the default branch or an
  intentionally isolated branch from the latest released tag
- aligned changelog or release notes for that version
- a pushed annotated tag and a published GitHub Release
- a concise release summary or release URL for follow-up communication

# Guardrails

- do not release from a feature branch or dirty branch state
- do not use an isolated release branch unless the parent release workflow
  explicitly requires it
- do not release while open release-bound PRs remain
- do not guess a version bump without checking the merged change set
- do not create a release when there are no meaningful release changes
- do not include unrelated unreleased default-branch work in the chosen release
  source
- do not skip the previous-tag `git grep` scan before the release-preparation
  commit
- do not let GitHub release notes drift from the authoritative changelog or
  release-notes source

# Exit Checks

- the target version is explicit and justified
- the chosen release source is explicit and justified, and isolated-branch use
  is backed by a parent release workflow requirement
- the default branch or isolated release source includes all release-bound work
  for the intended scope and no open release-bound PRs remain
- changelog or release notes, tag, and GitHub Release all reference the same
  release
- `git grep -F "<previous-tag>"` was run with the actual latest released tag and
  every relevant versioned example or documentation reference was updated or
  explicitly ruled out
- all changelog/release-notes and versioned-example updates were staged in the
  release-preparation commit before tagging
- the release was created from the intended default-branch commit or justified
  isolated release-branch commit
- unrelated unreleased work was excluded from the chosen release source
- the published result is specific enough for downstream consumers to use
