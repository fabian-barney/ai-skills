---
name: ai-skills-version-dependency-selection
description: >-
  Choose framework, build-tool, and dependency versions with a
  compatibility-first strategy that still prefers the newest stable viable
  option.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Select framework, build-tool, and dependency versions in a way that preserves
compatibility, respects project policy, and still moves the stack as far
forward as safely possible.

# When to Use

- use when bootstrapping or upgrading a project requires explicit version
  choices for frameworks, build tools, or dependencies
- use when compatibility constraints, peer dependencies, or runtime support
  limits make version choice non-trivial
- use skill `ai-skills-version-support-policy` when the supported runtime or
  platform matrix is still open and constrains viable versions
- use skill `ai-skills-bootstrap-framework-setup` when the project still needs
  the initial framework, runtime, or toolchain baseline chosen beyond version
  numbers alone
- use skill `ai-skills-compliance-dependency` when dependency governance,
  license, or stewardship risk materially affects the choice
- use skill `ai-skills-release-github` when the work also needs GitHub release
  version selection, release notes, or tagging
- use skill `ai-skills-release` when the work also needs broader publication
  planning beyond the GitHub release step
- use `references/dependency-selection-boundaries.md` for positive examples and
  non-examples of what this skill owns

# Inputs

- the components whose versions must be chosen, added, or upgraded
- compatibility constraints from runtimes, frameworks, peer dependencies, and
  repository policy
- candidate versions, release channels, LTS tracks, and stability information
- security, compliance, or maintenance constraints that affect selection
- whether the selection applies to bootstrap, routine maintenance, or a release
  scope

# Workflow

1. Identify the components whose versions must be selected and the dependency
   surfaces they constrain. Use
   `references/dependency-selection-boundaries.md` when the boundary between
   version choice and adjacent work is unclear.
2. Gather the hard compatibility constraints from runtimes, frameworks,
   toolchains, peer dependencies, and repository policy.
3. If the supported runtime or platform matrix is still undecided, apply
   skill `ai-skills-version-support-policy` before locking incompatible
   choices.
4. If the initial framework, runtime, or toolchain baseline itself is still
   undecided, hand off to skill `ai-skills-bootstrap-framework-setup` before
   finalizing detailed dependency versions.
5. Prefer explicit project policy when it already constrains a version.
6. Otherwise prefer the newest stable compatible version, favoring maintained
   LTS lines when they materially improve runtime or toolchain stability.
7. Sequence framework and build-tool choices before ordinary dependency
   upgrades because they constrain the rest of the stack; treat runtime or
   platform versions as input constraints from support policy or repository
   policy rather than outputs owned by this skill.
8. If the same change also needs GitHub release version selection, GitHub
   release notes, or tagging, hand off to skill `ai-skills-release-github`.
   If broader publication planning is also in scope, hand off to
   skill `ai-skills-release` instead of expanding this skill into release
   workflow ownership.
9. Apply skill `ai-skills-compliance-dependency` when governance, license, or
   stewardship risk matters to the decision.
10. Record the selected versions, rejected candidates, and the concrete reason
   each rejected candidate did not fit.

# Outputs

- explicit version choices for the scoped frameworks, tools, or dependencies
- a compatibility rationale for the selected versions
- clear handoff notes when support-policy, framework-bootstrap, compliance, or
  release workflows must consume the decision
- surfaced blockers when no acceptable compatible version exists

# Guardrails

- do not choose the latest version when it is incompatible with the actual
  stack constraints
- do not skip peer, runtime, framework, or build-tool compatibility checks
- do not treat prerelease, unstable, or EOL versions as default choices
- do not broaden this skill into semantic release-version bump selection or
  runtime or platform support-policy ownership
- do not treat initial framework-stack selection as a pure dependency-version
  choice when broader bootstrap setup is still open

# Exit Checks

- every selected version satisfies the known compatibility constraints
- the newest stable viable option was preferred unless project policy says
  otherwise
- framework and build-tool constraints were resolved before ordinary
  dependency choices, and runtime or platform policy constraints were
  respected
- any support-policy, framework-bootstrap, or release-workflow handoff is
  explicit
- compliance or stewardship concerns were surfaced when they mattered
