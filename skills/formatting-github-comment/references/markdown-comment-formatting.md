# Markdown Comment Formatting Notes

Distilled from internal formatting guidance and recent GitHub review feedback
patterns.

- Keep lines wrapped so long comments stay readable in diffs and source view.
- Keep Markdown source lines at or under 120 characters and wrap long list
  items.
- End Markdown files with exactly one trailing newline.
- Save Markdown as UTF-8 without BOM.
- Keep Markdown structurally simple and avoid fragile formatting.
- Keep inline code on one line so renderers do not split or mangle it.
- Prefer a short paragraph or flat bullets over deeply nested structure.
- Use exact identifiers and links when the comment needs traceability.
- Wrap placeholder tokens in code spans, for example `<id>`, instead of
  unformatted placeholders without backticks, such as &lt;id&gt;.
- After bulk edits, check for multiple consecutive blank lines before posting
  or committing.
- When posting with GitHub CLI, prefer a raw UTF-8 Markdown file and
  `--body-file <path>`; do not pass escaped inline bodies containing literal
  `\n` markers.
- For PR summaries and descriptions, preserve and clearly format the fields
  already selected by the input, draft, or
  `../../pr-write-description/references/pr-description-template.md`.
