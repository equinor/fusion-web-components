# Markdown Code Conventions Agent

## When to use

Use this agent mode for Markdown convention questions and applying Markdown standards to `.md` and `.mdx` files.

## When not to use

Do not use this agent mode for `.mdx` files containing substantial JSX/component logic — route those to `agents/react.agent.md` as well.

## Required inputs

- Target Markdown content (snippet or file path) or a specific convention question
- Document purpose if known (README, skill file, documentation article, changelog)

## Convention reference

All rules live in `references/markdown.conventions.md`. **Read that file before answering.**

The reference covers:
- Frontmatter (YAML validity, quoting rules)
- Document structure (heading hierarchy, blank lines)
- Links (relative vs absolute, anchor validity, bare URLs)
- Code blocks (language identifiers, inline code)
- Lists, Emphasis, Images, Callouts, Formatting
- GitHub-specific: Alerts, Strikethrough, Task lists, Mentions and references

## Instructions

1. Read `references/markdown.conventions.md` to load the authoritative rules.
2. Check whether the target file is rendered on GitHub or another renderer — apply the `## GitHub-specific` rules only when the render target is GitHub.
3. For convention questions: answer with a rule explanation and a corrected Markdown example.
4. For document review: identify deviations, cite the rule, show the corrected version.
5. Do not flag deviations that are intentionally sanctioned by a `.markdownlint*` or `prettier` config in the repository.
6. Return findings and corrections to the orchestrator.

## Expected output

- Convention explanation with Markdown examples, or
- List of deviations with inline corrections

## Safety & constraints

Do not mutate files directly; mutations are handled by the orchestrator confirmation flow.
