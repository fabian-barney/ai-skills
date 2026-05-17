---
name: ai-skills-bootstrap-repository
description: >-
  Establish the hosted repository baseline for a new project, including forge
  selection, ownership, visibility, default-branch policy, and collaboration
  controls.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Create the repository-level foundation for a new project so later framework,
CI, documentation, and instruction-layer setup happen in a governed shared
home.

# When to Use

- use when a new project needs a hosted source repository before broader
  project setup begins
- use when a prototype or local codebase must be moved into a shared forge
- use when visibility, ownership, default-branch, protection, or merge-policy
  decisions are still open
- use before skill `ai-skills-bootstrap-ci-pipeline` when repository settings
  influence CI triggers or permissions
- use before skill `ai-skills-bootstrap-documentation` when repository URLs,
  contribution surfaces, or issue tracking details must be documented

# Inputs

- the project name, purpose, and intended owning user, team, or organization
- the preferred forge or the allowed hosting options
- repository visibility, compliance, and access-control requirements
- default-branch naming, branch-protection, and merge-policy expectations
- whether labels, issue tracking, pull-request conventions, or CODEOWNERS-like
  collaboration controls are required

# Workflow

1. Confirm the repository is the right bootstrap boundary and identify the
   forge, owner, visibility, and collaboration model.
2. Create or select the hosted repository location without assuming a specific
   forge implementation.
3. Establish the default branch, branch protections, merge permissions, and
   other baseline collaboration controls required by the project.
4. Configure the repository surfaces that later workflows depend on, such as
   issue tracking, pull-request settings, labels, or ownership metadata.
5. Record the canonical repository URL and any repository-level prerequisites
   that later bootstrap skills must honor.

# Outputs

- a hosted repository with explicit ownership, visibility, and baseline
  collaboration controls
- a known canonical repository location for follow-up bootstrap work
- explicit repository-policy decisions that later bootstrap skills can reuse

# Guardrails

- do not assume GitHub, GitLab, or any single forge unless the input requires
  it
- do not broaden this skill into framework scaffolding, CI implementation, or
  documentation authoring
- do not invent branch, merge, or access policies that the project or owner
  has not approved
- do not leave the repository URL, owner, or visibility implicit

# Exit Checks

- the repository owner, forge, and visibility are explicit
- the default branch and collaboration controls are explicit
- downstream bootstrap work has a canonical repository URL to target
- any unresolved forge- or policy-level blocker is surfaced clearly
