# GitHub Release Flow

Keep these release artifacts aligned:

- changelog or authoritative release-notes source
- versioned release examples and documentation references
- annotated Git tag
- GitHub Release page

Preferred sequence:

1. treat the default branch as the normal release source
2. if the parent release workflow explicitly requires an isolated release
   branch, create it from the latest released tag and keep it limited to the
   scoped release change
3. verify the chosen release source is current for its intended scope and no
   release-bound PRs remain open for that scope
4. inspect the commits or file diff from the latest released tag to the chosen
   release source and stop if unrelated unreleased default-branch work would be
   included
5. update release-notes source
6. run `git grep -F "<previous-tag>"`, replacing `<previous-tag>` with the
   actual latest released tag, for example `v1.2.3`
7. update every relevant versioned example or documentation reference to the new
   tag
8. commit the release-preparation change on the chosen release source
9. create the annotated tag on that commit
10. push branch and tag
11. create the GitHub Release from the pushed tag
12. verify the tag and release page point at the same commit

When repository policy defines a release-note heading or formatting template,
honor that policy rather than inventing a new layout during release.

If a repository has both a changelog and a separate release-notes source, decide
which source is authoritative before creating the GitHub Release and keep the
other one aligned or explicitly out of scope.

An isolated release branch is an exception path for intentionally scoped
releases. It is not a substitute for a dirty or lagging default branch and
should only be used when the parent release workflow requires a release that
excludes unrelated unreleased work.
