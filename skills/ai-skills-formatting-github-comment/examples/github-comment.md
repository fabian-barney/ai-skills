# Example GitHub Comment

## Summary

- add the new skill `ai-skills-quality-gate` bundle under `skills/`
- document how it composes child skills
- keep the issue limited to canonical skill content

## Verification

- `./gradlew qualityGate`
- `npx --yes markdownlint-cli2 "**/*.md" "!**/node_modules/**" --config .markdownlint.json`
