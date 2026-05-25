# GitHub Release Flow

Keep these release artifacts aligned:

- changelog or authoritative release-notes source
- versioned release examples and documentation references
- annotated Git tag
- GitHub Release state (draft vs published)

Preferred sequence:

1. treat the default branch as the normal release source
2. verify the remote default-branch head before version selection and stop
   until the local source is refreshed or clarified if it is stale or
   ambiguous relative to that remote head
3. if skill `ai-skills-release` explicitly passes an isolated release branch
   requirement into this flow, create that branch from the latest released tag
   and keep it limited to the scoped release change
4. if the same intended version or tag already has failed-release,
   partial-release, or other recovery-state evidence from a prior run, stop
   this normal flow and classify the recovery path first with skill `ai-skills-release-recovery`
5. verify the chosen release source is correct for its intended scope and
   identify any release-bound PRs that still must land for that scope
6. if release work still depends on release-bound PRs, advance them through
   skill `ai-skills-pr-review-loop` until each required PR is freshly reviewed
   and merged or explicitly removed from scope
7. inspect the commits or file diff from the latest released tag to the chosen
   release source and stop if unrelated unreleased default-branch work would be
   included
8. update release-notes source
9. run `git grep -F "<previous-tag>"`, replacing `<previous-tag>` with the
   actual latest released tag, for example `v1.2.3`
10. update every relevant versioned example or documentation reference to the
    new tag
11. re-check the remote default-branch head immediately before tagging; if it
    moved, stop and recompute the intended scope and version before creating
    the release-preparation commit or tag
12. apply skill `ai-skills-tooling-git-write` so known release messages use
    non-interactive git write commands
13. create the release-preparation commit with `git commit -m "..."` for a
    single-line message or `git commit -F <temp-file>` for a multi-line message
14. create the annotated tag on that commit with
    `git tag -a <tag> -m "..."` for a single-line tag message or
    `git tag -a <tag> -F <temp-file>` for a multi-line tag message
15. push branch and tag
16. create the GitHub Release draft from the pushed tag
17. if the broader release workflow has additional required public targets,
    publish those targets next; if any public artifact becomes public and a
    later required public target fails, burn the version, keep the tag as the
    historical source pointer, and retain the draft or an explicitly labeled
    historical partial-release record
18. after all required public targets succeed, publish or promote the GitHub
    Release from draft to final; if GitHub is the only required public target,
    repository policy may allow immediate publication after draft creation
19. verify the tag exists and that the GitHub Release page points at the same
    commit and is in the intended draft or published state

When repository policy defines a release-note heading or formatting template,
honor that policy rather than inventing a new layout during release.

If a repository has both a changelog and a separate release-notes source, decide
which source is authoritative before creating the GitHub Release draft and keep
the other one aligned or explicitly out of scope.

If publication fails before any public artifact becomes public, do not
automatically assume the version is burned; same-version recovery remains a
repository-policy decision.

Do not treat a merely closed or stale-reviewed release-bound PR as sufficient
release evidence. When release preparation depends on PRs, the shared PR review
loop must converge on the latest head before tagging proceeds.

An isolated release branch is an exception path for intentionally scoped
releases. It is not a substitute for a dirty or lagging default branch and
should only be used when skill `ai-skills-release` passes an explicit isolated
source requirement into this flow so unrelated unreleased work stays out.
