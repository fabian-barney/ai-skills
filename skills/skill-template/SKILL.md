---
name: skill-template
description: Define the canonical backlog-entry template for proposing new or improved ai-skills catalog items.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Standardize how canonical `ai-skills` backlog items are described so later
capture skills can render the same content model as GitHub issues or local
Markdown records.

# When to Use

- use when defining the canonical structure for a new reusable skill idea
- use when defining the canonical structure for an improvement proposal to an
  existing skill
- use when `skill-new` or `skill-improve` needs a normalized template before
  publishing a backlog entry
- use `templates/skill-backlog-entry.md` for the canonical Markdown rendering
  of the shared content model
- use `templates/github-issue.md` when rendering the backlog entry as a GitHub
  issue
- use `templates/local-backlog-entry.md` when rendering the same model as a
  local Markdown record
- use `examples/new-skill-example.md`, `examples/improve-skill-example.md`, and
  `examples/new-skill.md` as examples of the canonical field set and its
  rendered output

# Inputs

- `title`
- `change-type` as `new` or `improve`
- `skill-id-or-name`
- `problem-or-motivation`
- `reusability-rationale`
- `when-to-use`
- `workflow-or-responsibilities`
- `related-skills-or-dependencies`
- `source-context-or-notes`
- `status`
- optional use of `templates/skill-backlog-entry.md`,
  `templates/github-issue.md`, and `templates/local-backlog-entry.md` when a
  concrete rendering is needed

# Workflow

1. Classify the backlog record as `new` or `improve`.
2. Normalize the input into the canonical backlog-entry fields.
3. Keep the template focused on canonical `ai-skills` backlog items rather than
   the AI agent's private skill maintenance.
4. Provide renderable template shapes for both GitHub issues and local
   Markdown files.
5. Stop after producing the canonical record shape and its renderable
   templates.
6. Use `templates/skill-backlog-entry.md` as the canonical Markdown rendering,
   `templates/github-issue.md` as the GitHub issue rendering, and
   `templates/local-backlog-entry.md` as the local Markdown rendering of the
   same model.
7. Use `examples/new-skill-example.md`, `examples/improve-skill-example.md`,
   and `examples/new-skill.md` only as demonstrations of the shared content
   model, not as different semantics.

# Outputs

- the canonical backlog-entry field set for `ai-skills`
- a GitHub issue template rendering of that model
- a local Markdown backlog-entry rendering of that model
- short examples for `new` and `improve` records

# Guardrails

- do not implement the proposed skill
- do not make GitHub the only supported storage target
- do not change the canonical backlog-entry semantics between renderings
- do not broaden into general AI-agent-private skill maintenance

# Exit Checks

- the template contains all canonical backlog-entry fields
- `new` and `improve` are clearly distinguished
- GitHub and local Markdown are represented as renderings of the same model
- no implementation behavior is embedded in the template
