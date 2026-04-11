---
name: issue-write-summary-comment
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
- use `formatting-github-comment` after the content is decided and needs final
  GitHub Markdown normalization

# Inputs

- what was delivered or changed
- acceptance criteria or scope status
- validation status, executed tests, and manual checks
- QA notes, test focus, and open risks or follow-ups
- `references/issue-summary-template.md` and
  `references/audience-focus.md`

# Workflow

1. State what was delivered in plain language instead of repeating commit
   history.
2. Summarize acceptance or scope status at the level relevant to the issue.
3. Record validation status, including tests run and important manual checks.
4. Add QA focus and open risks only when they help downstream readers act.
5. Use `references/issue-summary-template.md` to keep the comment short and
   structured.
6. Use `references/audience-focus.md` when deciding whether a detail belongs in
   the issue summary or in a more technical PR discussion.
7. Use `examples/issue-summary-comment.md` when a concrete GitHub-ready shape
   helps.
8. Hand the final draft to `formatting-github-comment` when Markdown
   normalization is still needed before posting.

# Outputs

- a short GitHub issue comment describing delivery status, validation, QA
  focus, and open follow-ups
- a comment shape suitable for product owners, reviewers, and QA readers

# Guardrails

- do not turn the issue comment into a second PR description
- do not omit validation status when delivery is claimed
- do not hide open risks or follow-ups behind vague status language
- do not emit literal `\n` escape sequences in Markdown meant for GitHub
- do not broaden this skill into issue creation or PR review handling

# Exit Checks

- the comment states what was delivered and how it was validated
- QA focus and follow-up items are explicit when they exist
- the summary stays concise enough for issue discussion flow
- the result is ready for GitHub posting after formatting
