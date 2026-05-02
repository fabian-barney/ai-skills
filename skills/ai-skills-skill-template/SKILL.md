---
name: ai-skills-skill-template
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
- use when skill `ai-skills-skill-new` or skill `ai-skills-skill-improve` needs a normalized template before
  publishing a backlog entry
- use `templates/skill-backlog-entry.md` for the canonical Markdown rendering
  of the shared content model
- use `targets/github-issue.md` when rendering the backlog entry as a GitHub
  issue
- use `targets/local-backlog-entry.md` when rendering the same model as a
  local Markdown record
- use `examples/new-skill-example.md`, `examples/improve-skill-example.md`, and
  `examples/new-skill.md` as examples of the canonical field set and its
  rendered output

# Inputs

- canonical backlog-entry fields, mapped exactly to the contract:
  - `title`: concise backlog title
  - `change-type`: `new` or `improve`
  - `skill-id-or-name`: proposed skill id or working name
  - `problem-or-motivation`: problem the skill should solve
  - `reusability-rationale`: why the shared catalog should own it
  - `when-to-use`: rough trigger or activation conditions
  - `workflow-or-responsibilities`: expected behavior, checks, or duties
  - `related-skills-or-dependencies`: neighboring skills or dependencies
  - `source-context-or-notes`: originating task context or constraints
  - `status`: `idea`, `draft`, `triaged`, or `implemented`
- optional use of `templates/skill-backlog-entry.md`,
  `targets/github-issue.md`, and `targets/local-backlog-entry.md` when a
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
   `targets/github-issue.md` as the GitHub issue rendering, and
   `targets/local-backlog-entry.md` as the local Markdown rendering of the
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
- do not create hybrid entries that mix `new` and `improve` semantics in one
  record
- do not broaden into general AI-agent-private skill maintenance

# Exit Checks

- all 10 canonical backlog-entry fields are present and populated
- `new` and `improve` are clearly distinguished
- GitHub and local Markdown are represented as renderings of the same model
- no implementation behavior is embedded in the template
