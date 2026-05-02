# Issue Create Boundary

This skill owns publication of an issue artifact, or rendering a ready-to-post
issue title and body when direct publication is not permitted.

The artifact is GitHub-only. Requests to create GitLab issues, Jira tickets,
Confluence pages, or other tracker artifacts are out of scope for this skill.

It may compose:

- skill `ai-skills-issue-write-description` for issue-body drafting
- skill `ai-skills-formatting-github-comment` for final Markdown normalization

It does not own:

- implementing the issue
- posting delivery/status summary comments after implementation
- full issue-to-PR orchestration
- creating non-GitHub tracker artifacts
- creating or editing Confluence pages
