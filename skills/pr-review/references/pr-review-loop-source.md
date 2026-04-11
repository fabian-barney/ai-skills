# PR Review Loop Source Notes

Relevant review-loop heuristics used by this skill:

- handling each review item on its own branch and PR often works best
- review state should generally be re-evaluated after each push
- missing ownership or unclear state should usually block conversation
  resolution
- a clean merge gate typically includes green checks, no unresolved valid
  findings, and
  no open review threads

The root `pr-review` skill uses these ideas only for responsibility and closure
semantics. The detailed loop orchestration belongs in `pr-review-loop`.
