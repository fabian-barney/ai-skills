# Release Git Write Sequence

This example shows only the git write portion of a larger release workflow.

1. Stage the changelog and versioned documentation updates together.
2. Create the release-preparation commit with `git commit -m "Release v1.2.3"`
   when the message is single-line, or `git commit -F <temp-file>` when the
   release message has a multi-line body.
3. Create the annotated tag with `git tag -a v1.2.3 -m "v1.2.3"` when the tag
   message is already known.
4. Push the branch and the tag after the commit and tag both exist.
5. If a surrounding merge, revert, or cherry-pick step should keep Git's
   generated message, add `--no-edit` instead of opening the configured editor.
