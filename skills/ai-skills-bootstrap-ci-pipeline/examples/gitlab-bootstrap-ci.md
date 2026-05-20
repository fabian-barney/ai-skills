# Example GitLab Bootstrap CI

Use the required stage order even when the first bootstrap pipeline only uses a
subset of the stages.

```yaml
stages:
  - build
  - test
  - package
  - verify
  - publish
  - tools

build:
  stage: build
  script:
    - <real build or install command>

test:unit:
  stage: test
  script:
    - <real unit-test command>

package:
  stage: package
  script:
    - <real package command>

verify:policy:
  stage: verify
  script:
    - <real quality, security, or policy command>

tools:debug:
  stage: tools
  when: manual
  script:
    - <optional helper command>
```

Keep manual helper jobs in `tools` and add later jobs by extending the existing
stage families instead of inventing a second stage order.
