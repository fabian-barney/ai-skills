# Example GitHub Actions Bootstrap CI

Use one stable workflow category such as `CI` and keep the first required-check
set small and durable.

Replace each `REPLACE_WITH_REAL_*_COMMAND` token before running the example.

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - <default-branch>

jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: REPLACE_WITH_REAL_BUILD_OR_INSTALL_COMMAND

  test-unit:
    name: test / unit
    needs:
      - build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: REPLACE_WITH_REAL_UNIT_TEST_COMMAND

  package:
    name: package
    needs:
      - test-unit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: REPLACE_WITH_REAL_PACKAGE_COMMAND

  verify-policy:
    name: verify / policy
    needs:
      - package
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: REPLACE_WITH_REAL_VERIFY_POLICY_COMMAND
```

Treat `CI / build`, `CI / test / unit`, `CI / package`, and
`CI / verify / policy` as candidate required-check contexts. Add more jobs
later by staying inside the same stage families instead of renaming the
baseline workflow or job names.
