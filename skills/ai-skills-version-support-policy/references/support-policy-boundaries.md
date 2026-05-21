# Support Policy Boundaries

Use these categories explicitly instead of implying one broad compatibility
claim: officially supported, tested compatibility only, and unverified.

## Officially Supported

Use this when the project commits to the version in docs, CI, and issue triage.

Example:

- `Node.js 24.x` is officially supported because it is a maintained LTS line
  and the project runs CI on it

## Tested Compatibility Only

Use this when the project has some evidence that the version works but does not
commit to full support obligations.

Example:

- `Node.js 22.x` is tested for compatibility in a smoke workflow, but the
  project only triages official support bugs against `24.x`

## Unverified

Use this when the project has not committed to support or even limited testing.

Example:

- `Node.js 25.x` is unverified because the project has not added CI coverage or
  documented support expectations yet

## Boundary Handoffs

- hand off to skill `ai-skills-version-dependency-selection` when frameworks,
  build tools, or dependencies still need concrete version choices inside the
  chosen support window
- hand off to skill `ai-skills-release` when the support-policy change must be
  communicated in release notes, changelog entries, or publication claims
