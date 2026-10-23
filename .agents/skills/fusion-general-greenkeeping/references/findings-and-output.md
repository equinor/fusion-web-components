# Findings and output

## Finding fields

| Field | Rule |
| --- | --- |
| ID | Stable, lane-prefixed kebab-case (`docs-cmd-lint`, `codemap-api-v1`). Same drift → same ID on rerun, so maintainers can select, defer, dedupe |
| Lane | `docs`, `codemap`, `ownership`, `config`, `references` |
| Priority | See below |
| Class | `confirmed`, `suggestion`, `unknown` (respected conventions listed separately) |
| Evidence | Both sides: path + line or quote, plus contradicting source or missing target |
| Impact | Who is affected and how, one sentence |
| Fix | Smallest change; name alternatives when ambiguous |

## Priority

- `high`: blocks or misleads contributors now (documented setup/test command fails, promised security
  contact missing, ownership routes reviews to nobody).
- `medium`: misleads navigation or maintenance (CODEMAP path gone, conflicting duplicate config, dead
  internal link in contributor docs).
- `low`: cosmetic or rare (dead anchor in old doc, stale config comment).

Suggestions max `low` unless maintainer asked for ideas. No scores, grades or rankings.

## Report shape

```markdown
**Scope:** <repo> @ <commit> (<clean|dirty>) · lanes: <list> · mode: report

**Respected local conventions:** <convention — source>, ...

| ID | Lane | Priority | Class | Evidence | Impact | Fix |
| --- | --- | --- | --- | --- | --- | --- |
| docs-cmd-lint | docs | high | confirmed | `CONTRIBUTING.md:8` `pnpm lint`; `package.json` scripts: `check`, `build` | Pre-PR check fails for contributors | `pnpm check` |
| codemap-api-v1 | codemap | medium | confirmed | `CODEMAP.md:5` lists `api/v1/`; path absent, handlers now in `api/` | Misleads navigation | Point entry to `api/` |

**Unknowns:** <what could not be verified and how to verify>
**Handoffs:** <companion skill and why>
**Changed:** nothing
```

## Selected-fix report

- Fixed findings, diff per file.
- Unselected/deferred findings, unchanged.
- Validation: static checks done; repo command only if maintainer approved that exact command, with
  outcome; else `not run` + reason. Static path checks ≠ builds or tests.
- Remote state unchanged; commit/push/PR await confirmation.

## Issue drafts

One per root cause. Title: greenkeeping marker + local title format. Body: outcome, evidence rows,
scope, acceptance criteria, validation. Show draft; publish only after confirmation.
