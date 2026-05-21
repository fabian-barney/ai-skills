# Non-Interactive Git Write Defaults

Use these defaults whenever a git write workflow already knows the message it
should use, or when Git's generated message should be accepted as-is without
manual editing.

- `git commit -m "..."`: use for a fully known single-line commit message.
- `git commit -F <temp-file>`: use for a fully known multi-line commit message
  with a subject and body already prepared.
- `git tag -a <tag> -m "..."`: use for an annotated tag whose message is
  already known.
- `git merge --no-edit`, `git revert --no-edit`, and
  `git cherry-pick --no-edit`: use when Git's generated message should be kept
  without opening an editor.
- Avoid bare `git commit`, bare `git tag -a <tag>`, or editor-driven
  merge/revert/cherry-pick commands in unattended workflows.
- If a workflow truly requires manual message authoring, make that interactive
  intent explicit instead of letting a bare git write command decide by default.
- Staging policy, branch naming, push behavior, pull-request creation, and
  GitHub CLI usage are out of scope for this skill.
