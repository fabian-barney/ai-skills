---
name: ai-skills-version-support-policy
description: >-
  Define which runtime, platform, or ecosystem versions a project officially
  supports, with LTS and EOL status treated as primary decision inputs.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Set a clear support policy for runtimes, platforms, or ecosystem versions so
documentation, CI, and compatibility promises all align.

# When to Use

- use when a project must decide which runtime, platform, or ecosystem versions
  it officially supports
- use when CI matrices, README claims, or compatibility guarantees depend on a
  support statement
- use when adding or removing supported versions for a library, service, CLI,
  or application
- use before skill `ai-skills-version-dependency-selection` when supported
  versions constrain which frameworks, tools, or dependencies remain viable
- use before skill `ai-skills-release` when the release changes the official
  support matrix or deprecates a previously supported line
- use `references/support-policy-boundaries.md` for the boundary between
  official support, tested compatibility only, and unverified versions

# Inputs

- the runtime, platform, or ecosystem surfaces that need official support
  claims
- project-specific compatibility, consumer, or deployment constraints
- upstream vendor support windows, LTS status, and EOL status
- current or intended CI coverage and documentation claims
- any explicit user or maintainer policy about support breadth
- `references/support-policy-boundaries.md`

# Workflow

1. Identify which runtime, platform, or ecosystem versions need an explicit
   support statement.
2. Gather the project constraints, consumer expectations, and upstream support
   windows that limit viable support choices.
3. Exclude EOL versions from official support unless an explicit project policy
   exception exists and the risk is surfaced clearly.
4. When maintained LTS releases exist, default official support to maintained
   LTS lines rather than non-LTS lines unless project policy requires broader
   support.
5. Distinguish official support, tested compatibility only, and unverified
   versions instead of collapsing them into one claim. Use
   `references/support-policy-boundaries.md` for concrete boundary examples.
6. If the project still needs framework, build-tool, or dependency version
   choices within the chosen support window, hand off to skill `ai-skills-version-dependency-selection`
   instead of picking those versions here.
7. If the support-policy change is part of a release, hand off the finalized
   policy to skill `ai-skills-release` so release notes, docs, and publication
   claims stay aligned.
8. Define the minimum CI and documentation obligations needed to make the
   support policy credible.
9. Surface any planned support additions, removals, or deprecations clearly
   enough for downstream consumers to react.

# Outputs

- an explicit supported-version policy for the scoped runtimes or platforms
- explicit classification of versions as officially supported, tested
  compatibility only, or unverified
- aligned expectations for CI coverage and documentation claims
- clear handoff notes when dependency selection or release work must consume
  the support decision
- clear deprecation or exclusion notes when versions are no longer supported

# Guardrails

- do not officially support EOL versions by default
- do not claim broad compatibility without CI or documented testing support
- do not conflate best-effort compatibility with official support
- do not broaden this skill into dependency graph version selection
- do not turn this skill into release semantic-version selection or release-note
  drafting

# Exit Checks

- supported versions are explicit and justified
- EOL and LTS status were considered explicitly
- the boundary between official support, tested compatibility only, and
  unverified versions is explicit
- CI and documentation implications of the support policy are clear
- any dependency-selection or release handoff triggered by the support policy is
  explicit
- removed or unsupported versions are called out concretely
