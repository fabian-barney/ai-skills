---
name: ai-skills-bootstrap-ci-pipeline
description: >-
  Establish the initial CI pipeline for a project so build, lint, test, and
  policy checks run consistently from the start.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Create a safe initial CI baseline that executes the project's real quality
checks with an explicit stage-family layout, without tying the workflow to one
vendor, framework, or deployment path.

# When to Use

- use when a new project needs its first shared build, lint, test, or policy
  automation
- use when a repository exists but CI triggers, jobs, or status checks are not
  established yet
- use when the support matrix or default branch must be reflected in CI
- use when GitLab stage ordering or the GitHub Actions analogue should follow a
  consistent bootstrap layout
- use skill `ai-skills-version-support-policy` when the official runtime or
  platform matrix is still undecided and CI coverage depends on it
- use `references/ci-layout-conventions.md` for the required GitLab stage order
  and the GitHub Actions naming and grouping analogue
- use `examples/github-actions-bootstrap-ci.md` or
  `examples/gitlab-bootstrap-ci.md` when a concrete starter skeleton helps

# Inputs

- the repository location and default-branch workflow
- the language, framework, package-manager, and build-tool commands the
  project actually uses
- the required baseline checks such as build, lint, test, package, or
  validation
- branch, PR, and merge-gate expectations for CI execution
- the target CI surface and any organization policy that constrains it
- any branch-protection or required-check contexts that must stay stable
- secret, token, cache, or artifact needs for the CI environment
- `references/ci-layout-conventions.md`
- `examples/github-actions-bootstrap-ci.md` or
  `examples/gitlab-bootstrap-ci.md` when the output should include a concrete
  starter layout

# Workflow

1. Identify the minimum required automated checks for a healthy project
   baseline.
2. Confirm which runtime or platform versions CI must cover; if the support
   matrix is still open, apply skill `ai-skills-version-support-policy` before
   freezing the CI matrix.
3. Choose the CI execution surface that fits the repository and organization
   policy without assuming a specific vendor.
4. Map the required checks into the shared stage-family layout from
   `references/ci-layout-conventions.md`.
5. If the target platform is GitLab CI, encode the pipeline stages in this
   order: `build`, `test`, `package`, `verify`, `publish`, `tools`.
6. In GitLab CI, use the stage families with these meanings:
   `build` for compile, assemble, dependency installation, or generated
   sources; `test` for unit tests; `package` for artifact creation; `verify`
   for integration tests, security or quality gates, and reports; `publish`
   for registry or artifact publication; `tools` for manual helper jobs.
7. If the target platform is GitHub Actions, group jobs under one workflow
   category such as `CI`, `Release`, or `Nightly`, use job `needs` for
   ordering, and encode the stage family in job names such as `build`,
   `test / unit`, `package`, `verify / integration`, `verify / owasp`,
   `publish`, or `tools / ...`.
8. When GitHub required checks depend on Actions jobs, keep the combined check
   context, usually `<workflow name> / <job name>`, unique and stable so branch
   protection stays unambiguous over time.
9. Prefer a stable required-check contract from the start, for example
   `CI / build`, `CI / test / unit`, `CI / package`, and
   `CI / verify / policy`, instead of renaming workflows or jobs casually after
   branch protection is enabled.
10. Use `examples/github-actions-bootstrap-ci.md` or
    `examples/gitlab-bootstrap-ci.md` when a concrete starter skeleton makes
    the bootstrap output easier to apply.
11. Define the initial triggers, jobs, and status expectations around the real
   project commands rather than placeholder commands.
12. Configure secrets, caches, and artifacts conservatively so CI can run
   safely without overscoping credentials.
13. Record how CI status feeds later bootstrap, merge, or release workflows.

# Outputs

- an explicit CI baseline covering the project's required checks
- a stage-family layout that fits the chosen CI platform
- a defined trigger and status model for branch and PR workflows
- a conservative secret and artifact-handling approach for CI

# Guardrails

- do not assume GitHub Actions, GitLab CI, Jenkins, or any single CI product
- do not add deployment or release automation unless the request includes it
- do not rely on placeholder commands that the repository cannot actually run
- do not collapse the pipeline into unnamed generic jobs when stage-family
  intent should stay explicit
- do not require broad or long-lived secrets when safer alternatives exist

# Exit Checks

- the CI baseline maps to real build, lint, test, package, or validation
  commands
- the stage-family layout is explicit for the chosen CI platform
- GitLab pipelines use the required stage order, or GitHub Actions workflows
  encode the required analogue with `needs` and unique job names
- required-check contexts are stable enough for branch protection or the
  blocker is surfaced explicitly
- the supported runtime or platform matrix is explicit or an upstream blocker
  is surfaced
- trigger behavior and merge-status expectations are explicit
- secret and artifact handling are narrow enough for initial project setup
