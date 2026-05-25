# Isolated Public Release

Use this path only when a repository-relevant public publication target would
otherwise ship unrelated unreleased default-branch work.

Sequence:

1. identify the exact scoped release change that must ship now
2. verify the remote default-branch head and stop until the local release
   source is reconciled if the default branch is stale or ambiguous
3. start the isolated release branch from the latest released tag, not from the
   current default-branch tip
4. recreate or cherry-pick only the scoped release change onto that branch
5. stop if unrelated unreleased work is still present
6. run the normal release workflow on the isolated branch, including any
   required release-bound PR review loop and skill `ai-skills-release-github`
7. publish only to the repository-relevant targets
8. verify the released version, tag, release notes, and target artifacts all
   match
9. merge back the same scoped release change cleanly to the default branch or
   confirm the default branch already contains an equivalent change set

This path is primarily for intentionally scoped public releases such as a
dependency-bump publication. It is not a substitute for skipping validation or
for releasing from an arbitrary branch.
