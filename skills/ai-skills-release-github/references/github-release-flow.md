# GitHub Release Flow

Keep these release artifacts aligned:

- changelog or authoritative release-notes source
- versioned release examples and documentation references
- annotated Git tag
- GitHub Release page

Preferred sequence:

1. verify the default branch is current and no release-bound PRs remain open
2. update release-notes source
3. run `git grep -F "<previous-tag>"`, replacing `<previous-tag>` with the
   actual latest released tag, for example `v1.2.3`
4. update every relevant versioned example or documentation reference to the new
   tag
5. commit the release-preparation change
6. create the annotated tag on that commit
7. push branch and tag
8. create the GitHub Release from the pushed tag
9. verify the tag and release page point at the same commit

When repository policy defines a release-note heading or formatting template,
honor that policy rather than inventing a new layout during release.

If a repository has both a changelog and a separate release-notes source, decide
which source is authoritative before creating the GitHub Release and keep the
other one aligned or explicitly out of scope.
