---
name: ai-skills-release-github
description: >-
  Publish a repository release on GitHub using a consistent tagged-release
  flow. Use when a version must be selected, changelog or release notes aligned,
  and a GitHub Release draft or final publication managed from the release
  commit.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Publish a clean GitHub Release record that keeps version selection, changelog
updates, annotated tags, and GitHub Release notes aligned across draft and
final states.

# When to Use

- use when a repository needs a new GitHub Release from its default branch
- use when skill `ai-skills-release` intentionally requires an isolated
  release branch created from the latest released tag so unrelated unreleased
  default-branch work stays out of the release
- use when a version must be chosen explicitly or inferred from merged
  user-visible changes since the latest released tag
- use when changelog content, tags, and GitHub Release notes must describe the
  same release
- use skill `ai-skills-pr-review-loop` when release work is intentionally
  delivered through PRs before the release-preparation commit can be created
- use skill `ai-skills-tooling-git-write` when the release flow will create a
  release-preparation commit or annotated tag whose message is already known
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

- the repository default branch, or an intentionally isolated release branch
  created from the latest released tag when skill `ai-skills-release`
  explicitly requires that narrower source as an input to this skill
- confirmation that all required release-bound PRs are merged or explicitly
  removed from scope for the chosen release source and intended release scope,
  or the release-bound PR list that must complete the shared review loop
  before this skill may continue
- the latest released tag and the merged changes since that tag
- any explicit target version provided by the user or repository policy
- any framework, build-tool, dependency, or support-policy changes in the
  release scope that affect compatibility claims
- the changelog or strongest release-notes source for the repository
- GitHub access capable of pushing tags and creating releases
- skill `ai-skills-pr-review-loop`
- skill `ai-skills-tooling-git-write`
- `references/version-selection.md`
- `references/github-release-flow.md`

# Workflow

1. Treat the default branch as the normal release source. Only use an isolated
   release branch when skill `ai-skills-release` explicitly requires it and
   passes that requirement into this skill; create that branch from the latest
   released tag so unrelated unreleased default-branch work is excluded.
2. Ensure the chosen release source is correct for its intended scope,
   identify any release-bound PRs that still must land for that scope, and do
   not release from a feature branch.
3. If the chosen release source still depends on release-bound PRs, apply
   skill `ai-skills-pr-review-loop` to those PRs and do not continue until
   each one completed a clean review loop and merged, or was explicitly
   removed from the release scope.
4. If the release scope includes framework, build-tool, or dependency choices
   that are not fixed yet, apply skill `ai-skills-version-dependency-selection`
   before finalizing release timing or compatibility notes.
5. If the release changes officially supported runtimes or platforms and the
   support policy is not explicit yet, apply skill `ai-skills-version-support-policy`
   before finalizing compatibility claims.
6. Determine the target version: use an explicit version when provided;
   otherwise classify the changes since the latest released tag and select the
   smallest valid semantic-version bump that fits the strongest user-visible
   change.
7. Stop if there are no meaningful release changes instead of creating an empty
   tag.
8. Verify the chosen release source contains only the intended scoped release
   change set by inspecting the commits or file diff from the latest released
   tag to that source. Stop until the source is narrowed if unrelated
   unreleased work would be included.
9. Update the changelog or release-notes source with the selected version, the
   release date, and a concise summary of user-visible changes.
10. Run `git grep -F "<previous-tag>"` before creating the release commit,
   replacing `<previous-tag>` with the actual latest released version tag, for
   example `v1.2.3`. Update every versioned release example or documentation
   reference found so it points at the new tag.
11. Stage the changelog or release-notes source and all versioned-example
    updates together.
12. Apply skill `ai-skills-tooling-git-write` so the release-preparation
    commit and annotated tag use non-interactive git write commands when their
    messages are already known.
13. Commit the release-preparation changes on the chosen release source,
    create an annotated tag for the release commit, and push both branch and
    tag.
14. Create the GitHub Release draft from the pushed tag using notes that stay
    aligned with the changelog or release-notes source. If both exist, treat
    the changelog as authoritative unless repository policy explicitly says
    otherwise.
15. If repository policy or skill `ai-skills-release` says GitHub is the only
    required public target, publish the draft immediately after creation.
    Otherwise keep the draft in place until the broader release workflow
    confirms all required public targets succeeded, then publish or promote it
    to final.
16. If a required public target later fails after any public artifact becomes
    public, retain the draft or convert it into an explicitly labeled
    historical partial-release record per repository policy instead of
    pretending the release completed successfully.
17. Verify that the tag exists and that the GitHub Release page points at the
    intended commit and is in the intended state.

# Outputs

- the selected release version and release commit
- the release source used, including whether it was the default branch or an
  intentionally isolated release branch from the latest released tag
- release-bound PR review-loop status when PR-based release preparation was
  required
- aligned changelog or release notes for that version
- a pushed annotated tag and a GitHub Release record: published as final after
  all required public targets succeed, or immediately when GitHub is the only
  required public target, otherwise retained as a draft / explicitly labeled
  historical partial-release record when a required public target fails after
  any public artifact becomes public
- a concise release summary or release URL for follow-up communication

# Guardrails

- do not release from a feature branch or dirty branch state
- do not use an isolated release branch unless skill `ai-skills-release`
  explicitly requires it
- do not release while a required release-bound PR for the chosen release
  source and intended release scope lacks a completed shared review loop for
  its latest head or remains unmerged
- do not treat a merely closed or stale-reviewed release-bound PR as sufficient
  release evidence
- do not guess a version bump without checking the merged change set
- do not create a release when there are no meaningful release changes
- do not include unrelated unreleased default-branch work in the chosen release
  source
- do not replace the shared PR review and merge skills with release-specific
  PR handling when release preparation depends on PRs
- do not skip the previous-tag `git grep` scan before the release-preparation
  commit
- do not let the release-preparation commit or known tag message depend on an
  interactive editor
- do not publish the final GitHub Release before required public targets
  succeed when the release depends on non-GitHub public publication targets
- do not discard GitHub Release notes for a half-published public release;
  retain them through a draft or explicitly labeled historical partial-release
  record
- do not let GitHub Release notes drift from the authoritative changelog or
  release-notes source

# Exit Checks

- the target version is explicit and justified
- the chosen release source is explicit and justified, and isolated release
  branch use is backed by an explicit skill `ai-skills-release` requirement
- if release-bound PRs were needed for the intended scope, skill `ai-skills-pr-review-loop`
  was applied and each required PR completed the shared review loop and merged
  or was explicitly removed from scope before tagging
- the default branch or isolated release branch includes all release-bound work
  for the intended scope and no open release-bound PRs remain
- changelog or release notes, tag, and GitHub Release state all reference the
  same release
- `git grep -F "<previous-tag>"` was run with the actual latest released tag and
  every relevant versioned example or documentation reference was updated or
  explicitly ruled out
- skill `ai-skills-tooling-git-write` was applied when the release-preparation
  commit or annotated tag message was already known
- all changelog/release-notes and versioned-example updates were staged in the
  release-preparation commit before tagging
- the release was created from the intended default-branch commit or justified
  isolated release branch commit
- the GitHub Release was drafted after tag push and then either published only
  after all required public targets succeeded, or immediately when GitHub was
  the only required public target, otherwise retained as a draft / explicitly
  labeled historical partial-release record when a required public target
  failed after any public artifact becomes public
- unrelated unreleased work was excluded from the chosen release source
- the published result is specific enough for downstream consumers to use
