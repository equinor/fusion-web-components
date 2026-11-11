# Metadata contract

## Frontmatter

### Metadata and structure constraints

Validate before writing files:
- `name`: 1-64 characters, lowercase letters/numbers/hyphens only, must match the folder name, no leading/trailing hyphen, no consecutive hyphens, no XML tags, and no reserved words
- If the target repository has no prefix or namespace convention, default new skills to `custom-<base-skill-name>`
- `description`: non-empty, <= 1024 chars, third-person, no XML tags, states both what the skill does and when to use it
  - Prefer a single-quoted YAML string with inline `USE FOR:` and `DO NOT USE FOR:` cues
  - Example: `description: 'Drafts release notes from validated repository context. USE FOR: release summaries, changelog preparation. DO NOT USE FOR: publishing releases or editing product code.'`
- `metadata.version`: follow the target catalog's starting-version rule; if no local rule exists, `"0.0.0"` is a safe default for a new skill
- `metadata.owner`: include only when the target catalog requires explicit ownership; use a stable GitHub identity or equivalent team handle
- `metadata.status`: include only when the target catalog tracks lifecycle state; if used, keep it to `active`, `experimental`, `deprecated`, or `archived`
- `metadata.tags`: keep tags relevant, lowercase, and kebab-case
- `metadata`: use simple key/value metadata unless a relationship field explicitly needs a list or map
- `license`: optional top-level field
- `compatibility`: optional top-level field; only include it when the skill has real runtime, network, tool, or product constraints

Repository-specific prefix rules, ownership/lifecycle requirements, release policy, and validation commands belong in repo-local instructions or catalog docs, not in the portable skill package.
