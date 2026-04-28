# Claude Code Rule — Starter Templates

Templates for Claude Code project instructions and scoped rules.

---

## Project instructions (`CLAUDE.md` or `.claude/CLAUDE.md`)

No frontmatter needed. Write plain markdown. Target under 200 lines.

```markdown
# Project Instructions

## Language and runtime

- 

## Code style

- 

## Architecture

- 

## Testing

- 

## Error handling

- 

## Build and run

- 

## Security

- 
```

You can import additional files using `@path` syntax:

```markdown
See @README.md for project overview and @package.json for available scripts.

# Additional Instructions
- Git workflow: @docs/git-instructions.md
```

---

## Path-scoped rule (`.claude/rules/<name>.md`)

```markdown
---
paths:
  - "<glob-pattern>"
---

# <Rule title>

- 
- 
- 
```

Multiple patterns and brace expansion are supported:

```markdown
---
paths:
  - "src/**/*.{ts,tsx}"
  - "lib/**/*.ts"
---

# <Rule title>

- 
- 
- 
```

---

## Unconditional rule (`.claude/rules/<name>.md`)

Omit `paths` to make the rule load every session:

```markdown
# <Rule title>

- 
- 
- 
```
