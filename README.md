# ai-skills

`ai-skills` is a Gradle and Java 25 project for defining tool-agnostic AI
skills. It is the skill-focused sibling of `ai-agents`: this repository is
about reusable instruction bundles, not about full agent catalogs and renderers.

## Source of Truth

The v1 specification lives in `spec.md`.

It defines:

- the canonical skill bundle structure
- authoring rules for portable skills
- the initial taxonomy for future skills
- how the canonical format maps to Codex, Claude, and Copilot

## Repository Layout

- `skills/` is reserved for canonical skill bundles
- `spec.md` defines the v1 contract for those bundles
- `src/main/java/` contains the bootstrap application skeleton
- `ai/PROJECT/DECISIONS/` is reserved for future ADRs

## Build

Use the Gradle wrapper:

```bash
./gradlew check
./gradlew crap-java-check
./gradlew qualityGate
```

`qualityGate` is the repo-local convenience task that runs `check` plus
`crap-java-check`.
