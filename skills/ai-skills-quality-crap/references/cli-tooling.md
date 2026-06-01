# CRAP CLI Tooling

Use the skill-owned helper when the target repository does not already provide
a stronger CRAP gate.

## Commands

Run from the target repository root:

```bash
node path/to/skills/ai-skills-quality-crap/scripts/run-crap-cli.mjs typescript -- --agent --threshold 8 src
node path/to/skills/ai-skills-quality-crap/scripts/run-crap-cli.mjs java -- --agent --threshold 8 src/main/java
```

The helper forwards all arguments after `--` to the downloaded CLI. Pass only
the relevant files or directories when the bounded change is narrower than the
full repository.

## Tool Resolution

- TypeScript resolves `@barney-media/crap-typescript` from npm.
- Java resolves `media.barney:crap-java-cli` from Maven Central.
- The helper stores tools under a user cache directory grouped by this skill id.
- Set `AI_SKILLS_TOOL_CACHE_DIR` to override the base cache location.
- Latest-version metadata is refreshed at most once every seven days.
- If the refresh is unavailable and a cached tool exists, the helper warns and
  uses that cached tool.

## Evidence Expectations

Record the language, CLI version, command arguments, cache status, threshold,
and final worst relevant CRAP score. If the helper cannot resolve a tool and no
repository-owned gate is available, treat the result as missing evidence rather
than estimating a CRAP score.
