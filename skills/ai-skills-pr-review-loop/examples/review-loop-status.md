# Example Review Loop Status

- `#71` skill `ai-skills-compliance-dependency`: checks green, issue link present, focused scope,
  no valid findings, no open review threads, `review-submitted`,
  suppressed-finding audit `not-applicable`, waiting only for merge execution
- `#72` skill `ai-skills-performance-db`: review submitted for the latest
  head, one exposed low-confidence non-thread finding was explained and one
  valid finding was fixed, suppressed-finding audit `completed`, new push
  happened 2 minutes ago, no submitted review or pending request visible yet,
  `awaiting-automatic-review-signal`, loop moved on to the next item instead
  of re-triggering
- `#73` skill `ai-skills-release-github`: no review submitted yet for the
  latest push, a pending automatic review request is visible for the current
  head in GraphQL timeline state, `review-request-pending`, checks still
  running
- `#74` skill `ai-skills-bootstrap-ci-pipeline`: latest push is 9 minutes old,
  no submitted review or pending request is visible for the current head,
  `manual-review-request-eligible`, suppressed-finding audit `unavailable`
  until a fresh review is exposed for the current head, PR node id captured with
  `gh pr view 74 --json id --jq .id`, Copilot review manually requested once
  via `gh api graphql`, loop moved on to the next item
