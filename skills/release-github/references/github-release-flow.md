# GitHub Release Flow

Keep these release artifacts aligned:

- changelog or authoritative release-notes source
- annotated Git tag
- GitHub Release page

Preferred sequence:

1. update release notes source
2. commit the release-preparation change
3. create the annotated tag on that commit
4. push branch and tag
5. create the GitHub Release from the pushed tag
6. verify the tag and release page point at the same commit

When repository policy defines a release-note heading or formatting template,
honor that policy rather than inventing a new layout during release.
