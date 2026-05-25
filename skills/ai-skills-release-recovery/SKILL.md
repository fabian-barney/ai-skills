---
name: ai-skills-release-recovery
description: >-
  Classify and stabilize an already-failed or already-partial release so the
  real public state, tag history, and next recovery action are explicit before
  any retry or follow-up release work begins.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Audit an already-failed or already-partial release so the actual public state
is known, the historical tag and GitHub Release state stay accurate, and the
next recovery action is chosen explicitly instead of guessed mid-retry.

# When to Use

- use when a release attempt already created a tag, a GitHub Release record,
  or publication activity and the outcome is failed, blocked, ambiguous, or
  partial
- use when deciding whether the same version may be recovered safely or must be
  treated as burned because a required public target already exposed artifacts
- use when a release tag or GitHub Release record may need preservation as a
  historical source pointer before any follow-up work continues
- use `references/recovery-state.md` for the compact state-to-action map
- use `examples/same-version-recovery.md` and
  `examples/burned-version-follow-up.md` when a concrete outcome shape helps

# Inputs

- the intended or attempted release version and tag
- the repository default branch, the attempted release source commit, and any
  evidence that the release source may already have moved
- the current tag state, GitHub Release state, and publication status for each
  repository-relevant target
- repository-specific release policy, especially around same-version retry,
  historical release records, and target applicability
- evidence for whether any artifact for the attempted version became public
- the likely failure point or remaining blocker when known
- `references/recovery-state.md`

# Workflow

1. Confirm this is a recovery case by checking whether the attempted version or
   tag already has a tag, a GitHub Release record, target-publication activity,
   or another concrete failed-release artifact. If none exist, stop and use the
   normal release workflow instead.
2. Inspect the real release state for the attempted version across every
   repository-relevant target and record the current facts: tag presence and
   target commit, GitHub Release presence and state, per-target publication
   result, and whether any artifact is already public.
3. Verify whether the existing tag already points at the true published source
   commit. If it does, preserve it. If it was incorrectly moved away earlier,
   allow only a one-time correction that restores it to that true historical
   source pointer.
4. Classify the recovery state using `references/recovery-state.md`: no-public
   same-version recovery candidate, partial public release with a burned
   version, or metadata-only repair on an otherwise complete public release.
5. For a no-public same-version recovery candidate, record the blocker to fix,
   preserve any existing draft or release metadata that still reflects reality,
   and define the next action as resuming the normal release workflow only
   after the blocker is fixed and the no-public state is reverified.
6. For a burned-version case, preserve the historical tag and GitHub Release
   record as they actually occurred, record the partially published targets,
   and define the next action as a fresh follow-up release under a new version
   after the root cause is fixed.
7. For a metadata-only repair case, keep the already-published version and
   release source intact, define the smallest in-place metadata repair allowed
   by repository policy, and do not invent a new release version solely for
   notes or GitHub Release state.
8. Return a concrete next-action outcome that names the verified state, the
   recovery classification, what must remain historically true, and what the
   next normal release or repair workflow must do next.

# Outputs

- a verified recovery-state summary for the attempted version and tag
- an explicit classification: same-version recovery candidate, burned-version
  follow-up, or metadata-only repair
- the preserved historical tag and GitHub Release expectations for that case
- a concrete next-action handoff describing the required repair or follow-up
  release path

# Guardrails

- do not treat an already-failed or already-partial release as a fresh normal
  release attempt
- do not move a failed release tag away from the true published source commit,
  except for a one-time correction that restores an already-moved tag to that
  true historical source pointer
- do not declare a version burned before confirming that at least one artifact
  for that version became public in a required public target
- do not retry a burned public version under the same version number
- do not discard an existing GitHub Release draft or historical partial-release
  record when it is the truthful record of what happened
- do not broaden this skill into the full normal release workflow after the
  recovery classification is known

# Exit Checks

- the attempted version, tag, and release source are explicit
- the per-target public state is explicit
- the recovery classification is explicit and evidence-based
- the historical tag and GitHub Release preservation rules are explicit
- the next action is concrete enough for a later normal release or metadata
  repair workflow to continue without guessing
