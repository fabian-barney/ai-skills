---
name: ai-skills-bootstrap-ai-instructions
description: >-
  Bootstrap the downstream ai-instructions layer for a repository by following
  the authoritative upstream setup source instead of copying or reinventing it
  locally.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Wire the downstream `ai-instructions` layer into a repository while keeping the
authoritative setup flow in the upstream `ai-instructions` repository and the
project-specific context in the local repository.

# When to Use

- use when a repository should gain its initial `ai-instructions` layer during
  project bootstrap
- use when the project needs local AI entrypoints, extension hooks, or wiring
  to shared skills and agents
- use when the repository should stay project-owned without copying canonical
  `ai-skills` behavior into local instruction files
- use `references/upstream-ai-instructions.md` for the authoritative upstream
  repository URL and the setup-source contract

# Inputs

- the repository context and the AI surfaces the project wants to enable
- the upstream `ai-instructions` repository at
  `https://github.com/fabian-barney/ai-instructions`
- any setup instructions actually present in that upstream repository
- the shared skills, agents, or default workflows the repository should point
  at
- any local extension points, policies, or project-specific notes that belong
  in the downstream layer
- constraints on target assistants or environments that consume the
  instruction layer
- `references/upstream-ai-instructions.md`

# Workflow

1. Confirm the repository should install a downstream `ai-instructions` layer
   rather than embedding shared behavior directly into local files.
2. Treat `https://github.com/fabian-barney/ai-instructions` as the
   authoritative upstream source for `ai-instructions` bootstrap and setup.
3. Inspect the upstream repository for the setup instructions required to
   install or initialize the downstream layer.
4. If the upstream setup instructions are missing, incomplete, or ambiguous,
   stop blocked and report the upstream documentation gap explicitly instead of
   inventing local replacement steps.
5. When upstream setup instructions are present, follow them as the source of
   truth for establishing the downstream layer.
6. After the upstream setup is in place, identify the minimal local instruction
   surfaces the project actually needs.
7. Point the local layer at shared `ai-skills` or agent behavior instead of
   copying those instructions into the repository.
8. Add only the project-owned notes, extensions, and context that belong
   locally.
9. Record how the downstream layer should evolve when the project adds new
   shared skills or local constraints.

# Outputs

- a downstream `ai-instructions` baseline when authoritative upstream setup
  instructions exist
- an explicit blocked result when the upstream repository does not provide
  usable setup instructions
- explicit links between local instruction surfaces and shared catalog
  behavior
- a clear separation between shared and project-owned AI context

# Guardrails

- do not treat any local reconstruction as a substitute for the upstream
  `ai-instructions` setup source
- do not copy canonical skill behavior into downstream instruction files when a
  shared skill should remain the source of truth
- do not broaden this skill into full project bootstrap orchestration
- do not assume one assistant or tool consumes the downstream layer unless the
  project requires it
- do not leave repository-specific extensions undocumented

# Exit Checks

- the authoritative upstream repository URL is explicit
- the workflow either followed upstream setup instructions or reported the
  missing-instructions blocker explicitly
- shared behavior remains centralized in `ai-skills` rather than copied
- local instruction content is limited to project-owned context and extensions
- the intended consumers or target surfaces are explicit enough for follow-up
  work
