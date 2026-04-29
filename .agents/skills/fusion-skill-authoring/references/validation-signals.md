# Validation Signals

## Success signals

- The skill is discoverable in the target catalog or inventory view
- The target environment's validation commands pass
- Direct references resolve without depending on files outside the installed skill package
- Representative requests trigger the right behavior and avoid obvious false positives

## Common failure signals

- `name` does not match the folder name or violates naming rules
- `description` is too vague, missing use cues, or contains invalid markup
- `SKILL.md` exceeds 300 lines (warning) or 500 lines (error) — split content into `references/`
- Repository- or catalog-required metadata is missing or inconsistent
- The skill still depends on repo-local docs, sibling skills, or hidden conventions that will not ship with the installed package
- References or structure are inconsistent with the declared role / MCP needs

## Recovery

If validation fails:
- fix the reported metadata or structure error,
- re-run the failed command,
- report the final status instead of stopping at the first failure.
