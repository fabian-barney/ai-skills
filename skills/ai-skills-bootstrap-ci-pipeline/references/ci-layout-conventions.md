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
- keep job names unique across workflows when required checks are used so
  branch-protection rules stay stable

Apply the layout to the repository's real commands rather than placeholder
commands.
