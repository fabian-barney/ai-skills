# Copilot Review Trigger

Use this reference when strict GitHub Copilot review is the configured
automated review mechanism.

After every fix push, explicitly request a fresh Copilot review for the PR head
commit through the GitHub API. Do not use PR comments or `@copilot` mentions.

1. Capture the raw pull request node id:

   ```sh
   PR_ID="$(gh pr view <PR_NUMBER> --json id --jq .id)"
   ```

2. Request review from the Copilot review bot with the mutation supplied inline:

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

3. Verify a new review request or submitted review appears for the latest head
   commit before treating the PR as reviewed.
