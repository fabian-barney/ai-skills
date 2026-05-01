---
name: issue-create
description: >-
  Create GitHub issues from structured intent by composing issue drafting and
  mandatory GitHub-ready formatting. Use when a workflow needs to publish or
  prepare a concise GitHub issue body and title for implementation, backlog, or
  follow-up work. This skill is GitHub-only.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Create a GitHub issue, or a GitHub-ready issue artifact when permissions are
missing, without forcing the caller to manually combine drafting, mandatory
GitHub formatting, and publish steps.

This skill is intentionally scoped to GitHub issues. It does not create GitLab
issues, Jira tickets, Confluence pages, or other tracker artifacts.

# When to Use

- use when a workflow needs to open a GitHub issue for implementation, backlog,
  or follow-up work
- use when the issue body still needs drafting through `issue-write-description`
- always use `formatting-github-comment` for final GitHub Markdown
  normalization before publishing or rendering the issue body
- use when GitHub issue creation is available and the issue should be published
- use `references/github-issue-creation.md` for CLI creation/update mechanics
- use `references/issue-create-boundary.md` to keep this skill scoped to issue
  creation rather than implementation
- use `examples/issue-create-flow.md` when a concrete create-or-render flow
  helps

# Inputs

- the GitHub repository and target issue context
- the issue title or raw title idea
- the problem, intended outcome, scope, and important notes for the issue body
- optional labels, assignees, or other issue metadata
- publication constraints such as missing GitHub access or permission
- `references/github-issue-creation.md` and
  `references/issue-create-boundary.md`

# Workflow

1. Confirm the target concern should exist as a GitHub issue rather than only
   as a local note, PR comment, GitLab issue, Jira ticket, or Confluence page.
2. Draft the issue title and body with `issue-write-description` when the issue
   content is still raw or incomplete.
3. Normalize the final Markdown with `formatting-github-comment` before every
   publication or ready-to-post artifact, even when the draft already appears
   formatted.
4. Create or update the GitHub issue with the strongest available mechanism,
   preferring body-file based publication from
   `references/github-issue-creation.md`.
5. If GitHub publication is unavailable, stop after producing a ready-to-post
   title and body artifact instead of blocking the primary task.
6. Use `references/issue-create-boundary.md` to keep this skill focused on
   creation rather than later issue implementation or orchestration.
7. Use `examples/issue-create-flow.md` when a concrete end-to-end flow helps.

# Outputs

- a created GitHub issue when publication is possible
- a GitHub-ready issue title and body when publication is not possible
- optional issue metadata such as labels or assignees when the caller supplied
  them and tooling allows them

# Guardrails

- do not publish a raw issue body that still needs drafting or formatting
- do not emit literal `\n` escape sequences in Markdown meant for GitHub
- do not create GitLab issues, Jira tickets, Confluence pages, or other
  non-GitHub tracker artifacts
- do not create Confluence pages; Confluence content remains outside this
  skill's write scope
- do not block the primary task solely because GitHub issue creation is
  unavailable
- do not broaden this skill into issue implementation or follow-up comment
  handling

# Exit Checks

- the issue title and body are clear and GitHub-ready
- the final body passed through `formatting-github-comment` before publication
  or ready-to-post output
- the published or rendered issue artifact matches the intended scope
- the creation path respected available permissions and tooling constraints
- the workflow stopped at issue creation or render, not implementation
