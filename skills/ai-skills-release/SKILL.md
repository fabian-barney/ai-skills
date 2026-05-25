---
name: ai-skills-release
description: >-
  Execute the full repository release workflow from final verification through
  GitHub Release drafting/finalization and artifact publication. Use when a
  repository needs the complete release sequence, not only the GitHub
  tag-and-release step. This is portable release orchestration;
  repository-specific release policy must be supplied as input rather than
  copied between projects.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Run the full release workflow so the final build/test pass, version selection,
documentation updates, changelog, GitHub Release state, and registry
publications stay aligned.

This skill is intentionally portable across repositories. Treat any
repository-specific release rules as local policy inputs for that repository,
not as rules to copy into downstream projects.

# When to Use

- use when a repository needs its full release process executed end to end
- use when artifact publication may target Maven Central, the Gradle Plugin
  Portal, a private artifactory, or another repository-specific release target
- use when a public release must ship a narrowly scoped dependency,
  framework, or build-tool change without also shipping unrelated unreleased
  default-branch work
- use when skill `ai-skills-release-github` is necessary but not sufficient on its own
- use skill `ai-skills-pr-review-loop` when the release creates, recreates, or
  depends on release-bound PRs before tagging or publication can continue
- use skill `ai-skills-version-dependency-selection` when dependency,
  framework, or build-tool choices are still open in the release scope
- use skill `ai-skills-version-support-policy` when the release changes the
  officially supported runtime or platform policy
- use skill `ai-skills-release-github` for the full GitHub Release workflow,
  including version selection, docs/changelog alignment, the release-prep
  commit and push, tag creation, and GitHub Release drafting/finalization
- rely on skill `ai-skills-tooling-git-write` through
  skill `ai-skills-release-github` so release-prep commits and known tag
  messages do not depend on an interactive editor
- use `references/release-preconditions.md` for the final verification and
  release input requirements
- use `references/isolated-public-release.md` when public publication may need
  an intentionally isolated release branch from the latest released tag
- use `references/publication-targets.md` for target-registry decisions and
  skip rules
- use `examples/release-checklist.md` when reporting the full release run

# Inputs

- the repository default branch, the latest released tag, and the exact scoped
  release change when a public release may need isolation from unrelated
  unreleased work
- any release-bound PRs that must be created, recreated, or advanced through
  review before tagging or publication can continue
- repository-specific release policy, versioning rules, and publication rules
- the strongest available final build and test commands or CI evidence
- the delta since the latest release
- any dependency, framework, build-tool, or support-policy changes in the
  release scope that affect the published artifact or support claims
- documentation, changelog, and versioned example locations that must be
  updated
- the artifact publication targets actually used by the repository
- skill `ai-skills-pr-review-loop`
- skill `ai-skills-release-github`
- `references/release-preconditions.md`
- `references/isolated-public-release.md`
- `references/publication-targets.md`

# Workflow

1. Confirm the default branch is current, the release scope is identified, and
   the repository is in releasable state.
2. Run or confirm the final build and test pass for the release candidate; do
   not continue if the final verification is red or missing.
3. Apply the repository-specific release policy as an input, without copying
   policy text into downstream projects.
4. If dependency, framework, or build-tool choices in the release scope are
   still open, apply skill `ai-skills-version-dependency-selection` before
   finalizing the release candidate.
5. If support-policy decisions in the release scope are still open, apply
   skill `ai-skills-version-support-policy` before finalizing the release
   candidate.
6. Detect the applicable publication targets from
   `references/publication-targets.md`. If a public registry release would ship
   unrelated unreleased default-branch work, switch to the isolated-release
   path in `references/isolated-public-release.md` and create the release
   source from the latest released tag.
7. On the isolated-release path, recreate or cherry-pick only the scoped
   release change onto the isolated branch; stop if unrelated unreleased work
   is still present and do not proceed until the isolated branch contains only
   the scoped release change.
8. If the chosen release path creates, recreates, or depends on release-bound
   PRs before publication can continue, apply skill `ai-skills-pr-review-loop`
   to those PRs and do not proceed until each PR either completed a clean
   review loop and merged or was explicitly removed from the release scope.
9. Confirm versioned release examples and documentation references are known so
   the release can update them to the new tag.
10. Apply skill `ai-skills-release-github` to perform the GitHub Release workflow,
    including version selection, changelog/docs alignment, release-prep
    commit, versioned-example updates, tag creation, push, and GitHub Release
    draft creation. Complete the deferred final GitHub Release publication
    later in step 13, after all required public targets succeed or immediately
    when GitHub is the only required public target, using the default branch
    by default or the isolated release branch when the isolated path was
    required.
11. Publish release artifacts only after tag creation and GitHub Release draft
    creation both succeed. Publish to each applicable target registry listed
    in `references/publication-targets.md`, such as Maven Central, the Gradle
    Plugin Portal, or a private artifactory, and record any target that is
    intentionally not applicable.
12. If publication fails before any public artifact is successfully published,
    stop and defer same-version recovery to repository policy instead of
    automatically treating the version as burned. If any public artifact is
    successfully published and later publication fails, treat the version as
    burned, keep the tag as the historical source pointer, and retain GitHub
    Release notes through the draft or an explicitly labeled historical
    partial-release record.
13. After all required public targets succeed, publish or promote the GitHub
    Release from draft to final, following repository policy for any non-public
    targets that remain out of scope.
14. Verify the published artifacts and release metadata so version numbers,
    tags, changelog entries, published packages, and GitHub Release state all
    match. Record the released version, tag, chosen release source, each
    target result, and whether the outcome was complete or partial.
15. If an isolated release branch was used, merge back the same scoped release
    change cleanly to the default branch or confirm the default branch already
    contains an equivalent change set.
16. Use `examples/release-checklist.md` when communicating the completed
    release steps or any blocked publication target.

# Outputs

- a selected release version and final release checklist
- the chosen release source and, when applicable, isolated-branch merge-back
  status
- explicit release-bound PR review-loop status when pre-publish PRs were part
  of the release
- aligned documentation, changelog, GitHub Release state, and publication
  artifacts
- explicit publication status for each relevant release target
- a concise release summary with follow-up blockers when publication was only
  partially completed

# Guardrails

- do not skip the final build or test verification before release
- do not copy repository-specific release rules into downstream projects; use
  local release policy as input
- do not release unrelated unreleased default-branch work to a public registry
- do not create an isolated public-release branch from the default-branch tip;
  create it from the latest released tag
- do not tag, publish, or create a GitHub Release while a required
  release-bound PR lacks a completed shared review loop for its latest head or
  remains unmerged in the intended release scope
- do not skip versioned release example and documentation-reference updates
- do not recreate or cherry-pick more than the scoped release change onto an
  isolated release branch
- do not replace the shared PR review and merge skills with release-specific
  ad-hoc PR handling when pre-publish release-bound PRs exist
- do not publish artifacts whose version, changelog, or tag is out of sync
- do not publish registry artifacts before the tag and GitHub Release draft
  exist
- do not publish the final GitHub Release before all required public targets
  succeed
- do not retry a half-published public release under the same version once any
  public artifact exists
- do not move a failed release tag away from the true published source commit,
  except for a one-time correction that restores an already-moved tag to that
  true source pointer
- do not treat green preflight evidence as proof of tag-triggered publication
  parity unless the same release-only checks are exercised
- do not assume every repository publishes to Maven Central, the Gradle Plugin
  Portal, and private artifactory; treat each target as conditional
- do not declare an isolated public release complete until the same scoped
  change is merged back cleanly or confirmed equivalent on the default branch
- do not declare the release complete while a required publication target is
  failed or unverified

# Exit Checks

- final build and test evidence are green and explicit
- the selected version matches the documented delta from the previous release
- the chosen release source is explicit, and any isolated public-release path
  started from the latest released tag
- any release-bound PRs required before publication were advanced through skill `ai-skills-pr-review-loop`
  and either merged cleanly or explicitly removed from the release scope
- skill `ai-skills-release-github` was applied for the GitHub Release portion
- any isolated public-release branch contains only the scoped release change
  before tagging and publication
- skill `ai-skills-tooling-git-write` was applied indirectly through
  skill `ai-skills-release-github` when known release git-write messages existed
- versioned examples and documentation references were updated to the new tag or
  explicitly ruled out
- tag creation completed before GitHub Release draft creation, GitHub Release
  draft creation completed before artifact publication, and final GitHub
  Release publication happened only after required public targets succeeded
- each repository-relevant publication target is either published successfully
  or explicitly marked not applicable
- if any required public target failed after a public artifact was already
  published, the result was treated as partial, the version was burned, and
  the tag remained the historical source pointer
- the final release report names the released version, tag, chosen release
  source, and each target outcome
- the final release report names the release-bound PR review result or
  explicitly states that no pre-publish release-bound PRs were needed
- any isolated public release was merged back cleanly or confirmed equivalent on
  the default branch
- the final release report is concrete enough for downstream consumers and
  maintainers
