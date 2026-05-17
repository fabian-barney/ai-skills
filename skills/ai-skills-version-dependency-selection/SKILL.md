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
  choices for frameworks, runtimes, build tools, or dependencies
- use when compatibility constraints, peer dependencies, or runtime support
  limits make version choice non-trivial
- use skill `ai-skills-version-support-policy` when the supported runtime or
  platform matrix is still open and constrains viable versions
- use skill `ai-skills-compliance-dependency` when dependency governance,
  license, or stewardship risk materially affects the choice

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
   surfaces they constrain.
2. Gather the hard compatibility constraints from runtimes, frameworks,
   toolchains, peer dependencies, and repository policy.
3. If the supported runtime or platform matrix is still undecided, apply skill `ai-skills-version-support-policy`
   before locking incompatible choices.
4. Prefer explicit project policy when it already constrains a version.
5. Otherwise prefer the newest stable compatible version, favoring maintained
   LTS lines when they materially improve runtime or toolchain stability.
6. Sequence framework, platform, and build-tool choices before ordinary
   dependency upgrades because they constrain the rest of the stack.
7. Apply skill `ai-skills-compliance-dependency` when governance, license, or
   stewardship risk matters to the decision.
8. Record the selected versions, rejected candidates, and the concrete reason
   each rejected candidate did not fit.

# Outputs

- explicit version choices for the scoped frameworks, tools, or dependencies
- a compatibility rationale for the selected versions
- surfaced blockers when no acceptable compatible version exists

# Guardrails

- do not choose the latest version when it is incompatible with the actual
  stack constraints
- do not skip peer, runtime, framework, or build-tool compatibility checks
- do not treat prerelease, unstable, or EOL versions as default choices
- do not broaden this skill into semantic release-version bump selection

# Exit Checks

- every selected version satisfies the known compatibility constraints
- the newest stable viable option was preferred unless project policy says
  otherwise
- framework and build-tool constraints were resolved before ordinary
  dependency choices
- compliance or stewardship concerns were surfaced when they mattered
