# Example GitHub Actions Bootstrap CI

Use one stable workflow category such as `CI` and keep the first required-check
set small and durable.

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
      - run: <real build or install command>

  test-unit:
    name: test / unit
    needs:
      - build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: <real unit-test command>

  package:
    name: package
    needs:
      - test-unit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: <real package command>

  verify-policy:
    name: verify / policy
    needs:
      - package
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: <real quality, security, or policy command>
```

Treat `CI / build`, `CI / test / unit`, `CI / package`, and
`CI / verify / policy` as candidate required-check contexts. Add more jobs
later by staying inside the same stage families instead of renaming the
baseline workflow or job names.
