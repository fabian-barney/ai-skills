# Dependency Selection Boundaries

This skill chooses concrete framework, build-tool, and dependency versions
inside known project constraints.

## Positive Examples

- choose the latest stable `Spring Boot 3.x` minor compatible with the
  project's supported Java version and plugin ecosystem
- choose `pnpm 11.x` because the repository policy and toolchain support it,
  while `12.x` is not yet approved by project policy or CI/toolchain
  constraints
- choose `eslint 9.x` and compatible plugins because the current framework and
  runtime constraints allow that toolchain set

## Non-Examples

- deciding that `Node.js 24.x` is officially supported: hand off to skill `ai-skills-version-support-policy`
- deciding whether the project should use Next.js, Spring Boot, or another
  framework as its initial baseline: hand off to skill `ai-skills-bootstrap-framework-setup`
- deciding whether the release should be `1.4.0` or `2.0.0`: hand off to
  skill `ai-skills-release-github` for GitHub release/version-selection work,
  or skill `ai-skills-release` when broader publication planning is also in
  scope

## Handoff Reminder

When adjacent work is still open, keep this skill focused on the concrete
version choice and hand the neighboring concern to the owning skill instead of
blending them together.
