# Recovery State Map

Use this skill only after a release attempt already left concrete state behind.

- no tag, no GitHub Release, and no publication activity: not a recovery case;
  use the normal release workflow instead
- tag or GitHub Release exists, but no artifact for the attempted version
  became public in any required public target: same-version recovery candidate
  after fixing the blocker and re-verifying the no-public state
- at least one artifact for the attempted version became public in a required
  public target, and a later required public target failed: burned version;
  keep the historical tag and release record, then roll forward with a new
  version after the cause is fixed
- all required public targets succeeded, but GitHub Release metadata or notes
  are inconsistent with reality: metadata-only repair; keep the published
  version and fix the release metadata in place per repository policy
- existing tag does not point at the true published source commit because it
  was moved later: restore it only to that true historical source pointer, then
  continue with the appropriate recovery class above
