# PR Review Loop Source Notes

Relevant ideas distilled from the repository review loop guidance:

- every review item should be handled on its own branch and PR
- review state must be re-evaluated after each push
- missing ownership or unclear state should block conversation resolution
- a clean merge gate requires green checks, no unresolved valid findings, and
  no open review threads

The root `pr-review` skill uses these ideas only for responsibility and closure
semantics. The detailed loop orchestration belongs in `pr-review-loop`.
