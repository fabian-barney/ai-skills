# Skill Structure For Caching

Distilled from the canonical `SKILL.md` contract in `spec.md`, viewed
through the lens of prompt-prefix caching.

- The canonical SKILL.md section order — Purpose, When to Use, Inputs,
  Workflow, Outputs, Guardrails, Exit Checks — already produces a long
  stable prefix; preserve that order so the cached prefix stays valid
  across invocations.
- Treat files under the reference, example, and template directories as
  immutable between releases. They are part of the cached prefix when
  loaded; per-request edits invalidate the cache for every consumer of
  the skill.
- Per-task variable content (the user request, the current diff, the
  target file path) must arrive in the prompt after the bundle's static
  blocks, never woven into the reference or example files.
- Render skill inputs as appended user-message content rather than as
  patched references; the reference text stays byte-stable and the input
  stays trailing.
- When a skill needs alternative behavior for a target platform, put the
  variation in the per-target notes file instead of editing the shared
  bundle; the shared bundle remains byte-stable across targets and stays
  cacheable.
- For composite skills, prefer referencing child skills by their canonical
  skill id form rather than inlining their text; the inlined text would
  duplicate bytes across many bundles and fragment the cache.
- When a SKILL.md section unavoidably needs per-release evolution, edit
  in a single release-prep commit rather than ad-hoc edits across
  unrelated work, so the cached prefix flips once per release rather than
  drifting continuously.
