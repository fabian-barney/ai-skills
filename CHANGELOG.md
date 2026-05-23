<!-- markdownlint-configure-file { "MD024": { "siblings_only": true } } -->

# Changelog

## 0.2.2 - 2026-05-23

### Changed

- Reworked the GitHub Actions CI workflow into staged build, unit-test,
  markdownlint, link-check, package, catalog-validation, cognitive-complexity,
  and CRAP-gate jobs with shared artifacts instead of a single mixed test job.
- Switched the repository quality gates from the Vitest wrappers to the
  `@barney-media/*-typescript-core` analyzers and made the standard test run
  produce the coverage artifact consumed by the CRAP gate.

## 0.2.1 - 2026-05-22

### Changed

- Tightened `ai-skills-version-dependency-selection` to require each direct
  dependency's published runtime-version metadata to be cross-checked, the
  runtime-floor intersection to be verified against the project floor with
  explicit remediation when empty, and a recorded blocking reason when any
  dependency lags registry `latest`; broadened the exit checks to cover both.
- Tightened the PR review response closure contract across
  `ai-skills-pr-review`, `ai-skills-pr-review-respond`, and
  `ai-skills-pr-review-loop` so handled findings end only as `valid` or
  `invalid`, every handled review comment receives a reply, every valid
  finding is fixed before completion, and handled threads are resolved at
  the end of the response cycle.
- Added head-aware pending-review signal states to
  `ai-skills-pr-review-loop`, required at least 5 minutes after the last
  push before any manual review request, and preserved round-robin parallel
  progress while waiting for automatic review signals.
- Added a file-local markdownlint configuration to `CHANGELOG.md` so
  repeated release section headings (e.g. `### Added`) remain valid.

## 0.2.0 - 2026-05-21

### Added

- Added the `ai-skills-tooling-git-write` skill for non-interactive git
  write commands across release and review flows.

### Changed

- Raised the minimum supported Node.js version to `>=22.12.0`
  (Node 20 reached end of life on 2026-04-30).
- Switched the release workflow to OIDC trusted publishing.
- Refined guidance across bootstrap, release, PR review, PR merge,
  plan, and version-policy skills (wording, guardrails, exit checks).

### Removed

- Dropped Node.js 20 support.

## 0.1.0 - 2026-05-19

Initial public release of `@barney-media/ai-skills`.

### Added

- Published the canonical AI skills catalog as an npm package with the public `ai-skills` CLI.
- Added global installation through `npm install -g @barney-media/ai-skills`.
- Added `ai-skills install` and `ai-skills update` commands.
- Installed the complete packaged skill set into the current user's Codex, Claude Code, and GitHub Copilot skill
  directories.
- Added cross-platform package verification for Windows, macOS, and Linux.
- Added internal catalog validation for build, package, and release verification.
- Added the `ai-skills-conventions-prompt-caching` skill capturing Anthropic prompt-prefix caching conventions for
  authoring stable, cacheable skill bundles.

### Install and Update Behavior

- `install` and `update` intentionally use the same reset/install flow in 0.1.0.
- The `ai-skills-` prefix is reserved for this package in supported target directories.
- Existing `ai-skills-*` directories are deleted and replaced by the packaged catalog during install or update.
- Non-prefixed user skills are never modified, moved, or deleted.
- Interactive confirmation is required unless `--assume-yes` is passed.

### Supported Targets

- Codex: `<home>/.codex/skills`
- Claude Code: `<home>/.claude/skills`
- GitHub Copilot: `<home>/.copilot/skills`

The CLI resolves the current user's home directory through the Node.js runtime and does not rely on shell `~`
expansion.
