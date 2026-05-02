# Contributions

## Repository Development

Use Corepack-managed pnpm for repository development:

```bash
corepack pnpm install
corepack pnpm validate
corepack pnpm build
corepack pnpm test
corepack pnpm pack:dry-run
```

The npm package is configured to publish the compiled CLI, canonical `skills/`
catalog, `README.md`, `spec.md`, and `LICENSE`.

`pnpm validate` is an internal catalog gate for build and release verification;
it is not exposed as a public `ai-skills` command.
