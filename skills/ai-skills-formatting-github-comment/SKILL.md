---
name: ai-skills-formatting-github-comment
description: Format GitHub comments and descriptions into concise, readable Markdown suitable for collaborative work.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Turn raw review notes, implementation summaries, issue descriptions, or status
updates into clear GitHub-flavored Markdown comments that are easy to scan and
act on.

# When to Use

- use when writing GitHub issue descriptions, PR summaries, review replies, or
  follow-up comments
- use when another skill needs help shaping its output into a clean GitHub
  comment
- use when raw notes need to be normalized into concise Markdown before
  posting
- use `references/markdown-comment-formatting.md` for general Markdown comment
  structure and formatting decisions
- use `examples/github-comment.md` when shaping a full issue, PR, or status
  comment
- use `examples/review-thread-reply.md` when shaping a short review-thread
  reply

# Inputs

- the communication goal
- the intended audience and context
- the raw points, findings, or status details to include
- the GitHub artifact type, especially whether the output is an issue body, PR
  description, review reply, or status comment
- whether the Markdown will be published through GitHub CLI or another API
- any formatting constraints such as brevity, required headings, or code blocks
- PR description fields already selected by the caller, especially from
  skill `ai-skills-pr-write-description` or
  skill `ai-skills-pr-write-description` when the
  target artifact is a PR summary or description
- optional use of `references/markdown-comment-formatting.md` and the example
  files when the target artifact already matches one of those shapes

# Workflow

1. Identify the main outcome the comment must communicate.
2. Remove repetition, filler, and low-signal detail that does not help the
   reader act.
3. Choose a simple structure such as a short summary paragraph, a flat bullet
   list, or a short verification section.
4. Use Markdown features only when they improve readability, such as short
   headings, flat lists, inline code, fenced code blocks, and links.
5. Keep line wrapping, spacing, and code spans consistent so the comment reads
   cleanly in GitHub: wrap Markdown source lines at 120 characters or less, end
   the file with one trailing newline, and keep content UTF-8 without BOM.
6. If publishing through GitHub CLI, write the body as raw UTF-8 Markdown and
   use `--body-file <path>` rather than escaped inline strings. Preflight the
   body for literal `\n` markers before publishing.
7. For PR descriptions and summaries, preserve and clearly format any PR fields
   or sections already provided by the input, draft, or
   skill `ai-skills-pr-write-description`; defer
   required-field selection to skill `ai-skills-pr-write-description`.
8. Reuse `references/markdown-comment-formatting.md` for general formatting,
   `examples/github-comment.md` for full comments, and
   `examples/review-thread-reply.md` for short thread replies when they fit the
   target artifact type.

# Outputs

- a concise GitHub-ready Markdown comment, description, or reply
- optional short sections when structure materially improves readability
- optional fenced code blocks or file references when the content needs them
- optional reuse of the bundled example shapes for review replies or summaries

# Guardrails

- do not add content that was not supported by the input
- do not over-format simple messages with unnecessary headings or nesting
- do not hide the main action behind long narrative prose
- do not rely on formatting that is fragile or hard to edit later
- do not exceed 120 characters per Markdown source line; wrap long list items
- do not omit the single trailing newline from Markdown files
- do not save Markdown as UTF-8 with BOM
- do not leave raw angle-bracket placeholders such as &lt;id&gt; in prose
  without backticks; wrap placeholders in code spans like `<id>` or fenced code
  blocks
- do not leave multiple consecutive blank lines after bulk edits
- do not emit literal `\n` escape sequences in Markdown meant for GitHub
- do not publish GitHub CLI bodies with escaped inline strings when a raw
  UTF-8 `--body-file` flow is available
- do not mention `@copilot` in PR comments

# Exit Checks

- the main point is understandable in one pass
- the Markdown uses only flat, readable structure
- code spans and code blocks are syntactically correct
- lines are wrapped to 120 characters or less
- Markdown has exactly one trailing newline and no UTF-8 BOM
- placeholder tokens are code-formatted instead of raw angle-bracket prose
- no literal `\n` markers or accidental multi-blank-line runs remain
- PR descriptions preserve applicable fields from the provided draft or
  skill `ai-skills-pr-write-description`
- the result is concise enough for GitHub discussion flow
- the output shape matches the intended GitHub artifact
