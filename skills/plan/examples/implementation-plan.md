# Example Plan Shape

## Summary

- add a new canonical skill bundle under `skills/`
- keep supporting files explicit and referenced
- preserve the current repository contract

## Key Changes

- first task reads the complete applicable rulesets before planning work
- create `SKILL.md` with required frontmatter and sections
- add a small reference note and one example file
- update only files required for the issue
- final task re-reads the applicable rulesets and verifies conformance

## Test Plan

- `./gradlew qualityGate`
- `npx --yes markdownlint-cli2 "**/*.md" "!**/node_modules/**" --config .markdownlint.json`

## Assumptions

- no new target-specific notes are required for v1
- the skill remains tool-agnostic
