# Markdown Code Conventions

Markdown conventions: docs, READMEs, changelogs, skill files.

> **Applicability:** Org-wide baseline. Repo policy (`CONTRIBUTING.md`, ADRs) and tooling (`.editorconfig`, `.markdownlint.json`) take precedence on explicit override. See skill **Precedence and applicability** for resolution order.

Reference: [CommonMark spec](https://spec.commonmark.org/) · [GitHub Flavored Markdown spec](https://github.github.com/gfm/)

---

## Frontmatter

- Valid YAML: no malformed keys, unquoted special chars, broken indentation.
- `---` on first line, closing `---` before body.
- Quote values containing `:`, `#`, `{`, `}`, `[`, `]`, or leading/trailing spaces.
- `null` for explicitly empty values; omit key if not applicable.

## Document structure

- One `#` (H1) per document — the document title.
- Do not skip heading levels (`##` → `####` is invalid).
- No duplicate heading text at the same nesting level within a section.
- Blank line before/after headings, fenced code blocks, block quotes.
- Anchors auto-generated: lowercase, spaces→`-`, punctuation removed. Update `[text](#anchor)` links on heading changes.

## Links

- Relative links for same-repo files — survive clones/forks.
- Internal anchor links must target existing heading.
- No bare URLs — wrap in `<>` or `[label](url)`.

## Code blocks

Every fenced block needs language ID. Common: `ts`, `tsx`, `js`, `bash`, `sh`, `yaml`, `json`, `csharp`, `md`, `text`.

````markdown
```ts
const x = 1;
```
````

Use single backticks for inline code and commands: `` `git status` ``.

## Lists

- `-` for unordered; consistent within doc (`*` and `+` valid but mixing hurts readability)
- Ordered: start at `1`
- Nest by aligning marker under first char of parent text

## Emphasis

| Intent | Syntax |
|---|---|
| Bold | `**text**` |
| Italic | `*text*` |
| Bold + italic | `***text***` |

Do not mix `**`/`__` or `*`/`_` styles within the same document.

## Images

Descriptive alt text: `![alt text](url)`. Relative paths for repo images.

## Callouts

Portable callout (any renderer):

```markdown
> **Note:** Informational note.

> **Warning:** Urgent issue requiring attention.
```

On GitHub: use native alert syntax (see [GitHub-specific → Alerts](#alerts)).

## Formatting

- Spaces (not tabs) for indentation in lists and code blocks
- No trailing whitespace
- Prose <120 chars for diff readability; code blocks may exceed

---

## GitHub-specific

Rules for GitHub (GFM) render target.
Reference: [GitHub basic syntax guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

### Alerts

GFM alert syntax instead of plain blockquotes — GitHub renders with icons and colours.

```markdown
> [!NOTE]
> Informational note.

> [!TIP]
> Optional helpful advice.

> [!IMPORTANT]
> Key information required to succeed.

> [!WARNING]
> Urgent issue requiring immediate attention.

> [!CAUTION]
> Risk or negative consequence of an action.
```

Limit to one or two alerts per document. Do not nest them.

### Strikethrough

`~~text~~` = strikethrough. GFM-only, not in CommonMark.

### Task lists

```markdown
- [x] Completed item
- [ ] Incomplete item
```

### Mentions and references

- Mention a person or team with `@username` or `@org/team`.
- Reference an issue or PR with `#123` or a full URL.
- In a PR body or commit message, a closing keyword (`closes #123`, `fixes #123`, `resolves #123`) closes the issue on merge, while `refs #123` links it without closing. Close when the change completes the issue; reference parent, multi-PR, or cross-repository tracking issues.
- Agents ask the developer which to use for each issue, recommending the more logical choice; when the developer is unavailable, they apply that recommendation.

