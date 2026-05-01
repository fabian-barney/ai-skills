# Example Issue Create Flow

1. Draft the issue body with `issue-write-description`.
2. Normalize the Markdown with `formatting-github-comment` before publishing.
3. Create the issue with `gh issue create --body-file <path>`.
4. If GitHub access is missing, keep the title and body as the fallback output.

Out-of-scope target:

- request: create a Jira ticket or Confluence page
- result: stop and report that `issue-create` only prepares or publishes
  GitHub issues
