---
name: release-github
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
- use when a version must be chosen explicitly or inferred from merged
  user-visible changes since the latest tag
- use when changelog content, tags, and GitHub release notes must describe the
  same release
- use `references/version-selection.md` for semantic version bump selection
- use `references/github-release-flow.md` for the tagged-release sequence and
  GitHub-specific checks
- use `examples/github-release-notes.md` when shaping concise release notes

# Inputs

- the repository default branch with all release-bound changes already merged
- the latest reachable release tag and the merged changes since that tag
- any explicit target version provided by the user or repository policy
- the changelog or strongest release-notes source for the repository
- GitHub access capable of pushing tags and creating releases
- `references/version-selection.md`
- `references/github-release-flow.md`

# Workflow

1. Ensure the default branch is current and that the changes intended for the
   release are already merged instead of releasing from a feature branch.
2. Determine the target version: use an explicit version when provided;
   otherwise classify the changes since the latest tag and select the smallest
   valid semantic-version bump that fits the strongest user-visible change.
3. Stop if there are no meaningful release changes instead of creating an empty
   tag.
4. Update the changelog or release-notes source with the selected version, the
   release date, and a concise summary of user-visible changes.
5. Update any versioned release examples or docs that must point at the new
   tag.
6. Commit the release-preparation changes on the default branch, create an
   annotated tag for the release commit, and push both branch and tag.
7. Create the GitHub Release from the pushed tag using notes that stay aligned
   with the changelog or release-notes source.
8. Verify that the tag and release page exist and point at the intended commit.

# Outputs

- the selected release version and release commit
- aligned changelog or release notes for that version
- a pushed annotated tag and a published GitHub Release
- a concise release summary or release URL for follow-up communication

# Guardrails

- do not release from a feature branch or dirty branch state
- do not guess a version bump without checking the merged change set
- do not create a release when there are no meaningful release changes
- do not let GitHub release notes drift from the authoritative changelog or
  release-notes source

# Exit Checks

- the target version is explicit and justified
- changelog or release notes, tag, and GitHub Release all reference the same
  release
- the release was created from the intended default-branch commit
- the published result is specific enough for downstream consumers to use
