# Copilot Review Trigger

Use this reference when strict GitHub Copilot review is the configured
automated review mechanism.

After every fix push, first inspect whether the current PR head already has a
fresh submitted review or a visible pending review request. Do not use PR
comments or `@copilot` mentions.

Use `gh api graphql` to inspect the current PR `headRefOid`, submitted reviews
with `commit.oid`, and timeline evidence needed to detect a pending request for
that same head, including `PullRequestCommit`, `ReviewRequestedEvent`, and
`ReviewRequestRemovedEvent`. Do not rely on `latestReviews` alone as proof that
no fresh review is pending.

Decide the current head state in this order:

1. If a submitted automated review is tied to the current `headRefOid`, treat
   the head as `review-submitted`.
2. Otherwise, if a `ReviewRequestedEvent` is visible for the current
   `headRefOid` after the latest push and no newer
   `ReviewRequestRemovedEvent` cancels it, treat the head as
   `review-request-pending`.
3. Otherwise, if fewer than 5 minutes have elapsed since `last-push-at`, treat
   the head as `awaiting-automatic-review-signal`.
4. Otherwise, treat the head as `manual-review-request-eligible`.

Only when the head is `manual-review-request-eligible` may the loop send an
explicit manual request through the approved `gh` CLI / GitHub GraphQL flow.

1. Capture the raw pull request node id:

   ```sh
   PR_ID="$(gh pr view <PR_NUMBER> --json id --jq .id)"
   ```

2. Request review from the Copilot review bot with the mutation supplied
   inline:

   ```sh
   gh api graphql \
     -f query='mutation RequestCopilotReview($pr: ID!, $bots: String!) {
       requestReviewsByLogin(
         input: { pullRequestId: $pr, botLogins: [$bots], union: true }
       ) {
         clientMutationId
       }
     }' \
     -f pr="$PR_ID" \
     -f bots="copilot-pull-request-reviewer"
   ```

3. Record `last-review-requested-at` and `last-review-requested-head-oid` for
   the explicit manual request, then return the PR to the queue.
4. Verify a new review request or submitted review appears for the latest head
   commit before treating the PR as reviewed.
5. Do not send a second explicit manual request for the same head unless the
   head changed or a `ReviewRequestRemovedEvent` proves the pending request was
   removed.

Treat this flow as the authoritative trigger procedure whenever the main skill
requires strict GitHub Copilot review re-triggering.
