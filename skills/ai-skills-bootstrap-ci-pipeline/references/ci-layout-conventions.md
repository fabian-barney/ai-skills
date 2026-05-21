# CI Layout Conventions

Use these conventions when the project wants a portable CI bootstrap layout
that can be expressed in both GitLab CI and GitHub Actions.

## GitLab Stage Order

Use this stage order:

1. `build`
2. `test`
3. `package`
4. `verify`
5. `publish`
6. `tools`

Stage meanings:

- `build`: compile, assemble, dependency installation, generated sources
- `test`: unit tests
- `package`: artifact creation
- `verify`: integration tests, security or quality gates, reports
- `publish`: registry or artifact publication
- `tools`: manual helper jobs

## GitHub Actions Analogue

GitHub Actions has no native stage list, so express the same layout with these
rules:

- use one workflow-level category name such as `CI`, `Release`, or `Nightly`
- order jobs with `needs`
- encode the stage family in job names such as `build`, `test / unit`,
  `package`, `verify / integration`, `verify / owasp`, `publish`, or
  `tools / ...`
- keep the combined required-check context, usually `<workflow name> / <job name>`,
  unique and stable when branch protection depends on it
- pick the required-check contexts early and keep them stable once branch
  protection depends on them; avoid casual renames such as changing
  `CI / verify / policy` to `CI / checks`

## Starter Skeleton Expectations

Concrete bootstrap layouts should keep the stage-family intent obvious even
before the repository adds every optional job.

- GitHub Actions starter skeleton: one workflow category such as `CI`, job
  names like `build`, `test / unit`, `package`, and `verify / policy`, check
  contexts such as `CI / build`, and `needs` edges that reflect the
  stage-family order
- GitLab starter skeleton: explicit `stages:` in the required order, at least
  one job per used stage family, and manual-only helper jobs in `tools`
- required-check contexts should map to the smallest stable review gate set the
  repository actually wants to protect
- expand from the starter skeleton by adding more jobs inside the same stage
  families rather than renaming the existing baseline jobs

Apply the layout to the repository's real commands rather than placeholder
commands.
