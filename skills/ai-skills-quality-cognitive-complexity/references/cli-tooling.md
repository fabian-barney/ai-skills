# Cognitive Complexity CLI Tooling

Use the skill-owned helper when the target repository does not already provide
a stronger cognitive-complexity gate.

## Commands

Run from the target repository root:

```bash
node path/to/skills/ai-skills-quality-cognitive-complexity/scripts/run-cognitive-cli.mjs typescript -- --agent --threshold 15 src
node path/to/skills/ai-skills-quality-cognitive-complexity/scripts/run-cognitive-cli.mjs java -- --agent --threshold 15 src/main/java
```

The helper forwards tool arguments after the language. Use `--` as an optional
separator when the first tool argument also starts with a dash. Pass only the
relevant files or directories when the bounded change is narrower than the full
repository.

## Tool Resolution

- TypeScript resolves `@barney-media/cognitive-typescript` from npm.
- Java resolves `media.barney:cognitive-java-cli` from Maven Central.
- The helper stores tools under a user cache directory grouped by this skill id.
- Set `AI_SKILLS_TOOL_CACHE_DIR` to override the base cache location.
- Latest-version metadata is refreshed at most once every seven days.
- If the refresh is unavailable and a cached tool exists, the helper warns and
  uses that cached tool.

## Evidence Expectations

Record the language, CLI version, command arguments, cache status, threshold,
and final worst relevant cognitive-complexity score. If the helper cannot
resolve a tool and no repository-owned gate is available, treat the result as
missing evidence rather than estimating a confirmed score.
