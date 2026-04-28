# Scoped Rule — Starter Templates

Templates for path-specific rules. Choose the format matching your editor.

---

## GitHub Copilot (`.github/instructions/<name>.instructions.md`)

```markdown
---
applyTo: "<glob-pattern>"
---

- 
- 
- 
```

Optional: add `excludeAgent: "code-review"` or `excludeAgent: "coding-agent"` to limit which Copilot agent uses the file.

---

## Cursor (`.cursor/rules/<name>.mdc`)

See `assets/cursor-rule-template.mdc` for the full starter template.

```markdown
---
description: "<what this rule covers>"
globs: "<glob-pattern>"
alwaysApply: false
---

- 
- 
- 
```

---

## Claude Code (`.claude/rules/<name>.md`)

See `assets/claude-rule-template.md` for the full starter template.

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

Omit the `paths` frontmatter to make the rule load unconditionally (every session).
