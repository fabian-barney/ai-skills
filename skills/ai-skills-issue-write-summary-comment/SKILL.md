---
name: ai-skills-issue-write-summary-comment
description: >-
  Write short GitHub issue summary comments for product owners, reviewers,
  and QA. Use when reporting delivered scope, validation status, QA notes,
  and follow-ups on an issue.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Write a concise issue comment that summarizes what was delivered, how it was
validated, and what follow-up attention remains for non-implementer readers.

# When to Use

- use when posting a delivery or status summary on a linked GitHub issue
- use when product owners, reviewers, or QA need a short implementation outcome
  comment
- use when a PR landed and the issue needs a concise summary of scope,
  validation, and open risks
- use `references/issue-summary-template.md` for the canonical summary-comment
  shape
- use `references/audience-focus.md` when deciding what matters to PO, reviewer,
  and QA audiences
- use `examples/issue-summary-comment.md` when a concrete GitHub-ready example
  helps
- use skill `ai-skills-formatting-github-comment` after the content is decided and needs final
  GitHub Markdown normalization

# Inputs

- what was delivered or changed
- linked PRs/MRs or an explicit note that no PR/MR is linked
- acceptance criteria or scope status
- validation status, executed tests, manual checks, happy-path coverage, and
  error/negative-path coverage
- QA notes and open risks
- `references/issue-summary-template.md` and
  `references/audience-focus.md`

# Workflow

1. State what was delivered in plain language instead of repeating commit
   history.
2. List the related PRs/MRs explicitly, or state that no PR/MR is linked when
   the issue outcome did not use one.
3. Summarize acceptance or scope status at the level relevant to the issue.
4. Record validation status, including tests run, important manual checks, and
   happy-path plus error/negative-path coverage.
5. Add QA notes and open risks only when they help downstream readers act.
6. Use `references/issue-summary-template.md` to keep the comment short and
   structured.
7. Use `references/audience-focus.md` when deciding whether a detail belongs in
   the issue summary or in a more technical PR discussion.
8. Use `examples/issue-summary-comment.md` when a concrete GitHub-ready shape
   helps.
9. Hand the final draft to skill `ai-skills-formatting-github-comment` when Markdown
   normalization is still needed before posting.

# Outputs

- a short GitHub issue comment describing delivery status, validation, QA
  notes, and open risks
- explicit related PR/MR links or an explicit no-linked-PR/MR note
- a comment shape suitable for product owners, reviewers, and QA readers

# Guardrails

- do not turn the issue comment into a second PR description
- do not omit the related PR/MR list when delivery is tied to code review or
  merge work
- do not omit validation status when delivery is claimed
- do not omit tests run, manual checks, or open risks; write `none` only when
  that is accurate and not misleading
- do not hide open risks behind vague status language
- do not emit literal `\n` escape sequences in Markdown meant for GitHub
- do not broaden this skill into issue creation or PR review handling

# Exit Checks

- the comment states what was delivered, which PRs/MRs are related, and how it
  was validated
- validation evidence distinguishes tests, manual checks, and happy-path plus
  error/negative-path coverage when relevant
- QA focus and follow-up items are explicit when they exist
- the summary stays concise enough for issue discussion flow
- the result is ready for GitHub posting after formatting
