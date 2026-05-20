# Isolated Public Release

Use this path only when a repository-relevant public publication target would
otherwise ship unrelated unreleased default-branch work.

Sequence:

1. identify the exact scoped release change that must ship now
2. start the isolated release branch from the latest released tag, not from the
   current default-branch tip
3. recreate or cherry-pick only the scoped release change onto that branch
4. stop if unrelated unreleased work is still present
5. run the normal release workflow on the isolated branch, including skill `ai-skills-release-github`
6. publish only to the repository-relevant targets
7. verify the released version, tag, release notes, and target artifacts all
   match
8. merge back the same scoped release change cleanly to the default branch or
   confirm the default branch already contains an equivalent change set

This path is primarily for intentionally scoped public releases such as a
dependency-bump publication. It is not a substitute for skipping validation or
for releasing from an arbitrary branch.
