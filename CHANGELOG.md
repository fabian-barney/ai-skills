# Changelog

## 0.1.0 - 2026-05-01

Initial public release of `@barney-media/ai-skills`.

### Added

- Published the canonical AI skills catalog as an npm package with the public `ai-skills` CLI.
- Added global installation through `npm install -g @barney-media/ai-skills`.
- Added `ai-skills install` and `ai-skills update` commands.
- Installed the complete packaged skill set into the current user's Codex, Claude Code, and GitHub Copilot skill
  directories.
- Added cross-platform package verification for Windows, macOS, and Linux.
- Added internal catalog validation for build, package, and release verification.

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
