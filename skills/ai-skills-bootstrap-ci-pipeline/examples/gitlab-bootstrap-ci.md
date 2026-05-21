# Example GitLab Bootstrap CI

Use the required stage order even when the first bootstrap pipeline only uses a
subset of the jobs across those stage families.

Replace each `REPLACE_WITH_REAL_*_COMMAND` token before running the example.

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
    - REPLACE_WITH_REAL_BUILD_OR_INSTALL_COMMAND

test:unit:
  stage: test
  script:
    - REPLACE_WITH_REAL_UNIT_TEST_COMMAND

package:
  stage: package
  script:
    - REPLACE_WITH_REAL_PACKAGE_COMMAND

verify:policy:
  stage: verify
  script:
    - REPLACE_WITH_REAL_VERIFY_POLICY_COMMAND

tools:debug:
  stage: tools
  when: manual
  script:
    - REPLACE_WITH_REAL_OPTIONAL_HELPER_COMMAND
```

Keep manual helper jobs in `tools` and add later jobs by extending the existing
stage families instead of inventing a second stage order.
