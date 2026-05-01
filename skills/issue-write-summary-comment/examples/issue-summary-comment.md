# Example Issue Summary Comment

- Related PRs/MRs: #42
- Delivered: added `issue-write-summary-comment` with a canonical summary
  template, audience guidance, and one GitHub-ready example
- Acceptance criteria status: issue-summary comments can now reuse one concise
  structure for delivery, validation, and follow-ups
- Validation status: tests run: `./gradlew qualityGate` and markdownlint;
  manual checks: reviewed the rendered Markdown shape; happy-path: delivered
  issue summary; error/negative-path: no blocked-state example yet
- QA notes: verify later workflows keep issue comments shorter than the matching
  PR descriptions
- Open risks: issue creation and PR-to-issue orchestration remain separate
  skills
