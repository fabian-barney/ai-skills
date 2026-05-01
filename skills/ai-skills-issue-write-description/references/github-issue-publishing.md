# GitHub Issue Publishing

When posting or updating a GitHub issue body from the CLI:

- prefer `gh issue create --body-file <path>` for new issues
- prefer `gh issue edit <id> --body-file <path>` for updates
- block publish if the body still contains literal `\n` escape sequences
- keep Markdown source lines at or below 120 characters before publishing
- ensure the body file ends with exactly one trailing newline
- verify the rendered issue keeps headings, bullets, and code blocks intact

Use raw Markdown with real newlines instead of escaped JSON-style strings.
