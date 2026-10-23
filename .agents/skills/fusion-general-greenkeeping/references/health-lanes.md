# Health lanes

Per-lane checks, evidence and false-positive traps. Inspect in-scope lanes only.

## Local conventions

Record before lanes. Deliberate when any holds:

- repo instructions, `AGENTS.md`, contributor docs or ADR state it;
- config or code comment explains it;
- applied consistently, nothing in repo contradicts it.

Rules:

- Missing never-adopted file (`CODEMAP.md`, `CODEOWNERS`, `SECURITY.md`, `CONTRIBUTING.md`,
  changesets, linters) is not a finding. Report only when repo's own text references it or maintainer asks.
- Differs from Fusion default ≠ drift. Drift = repo contradicts itself or points at something missing.
- Conflicting local statements (e.g. `AGENTS.md` says pnpm, lockfile is npm): confirmed finding quoting
  both sides; maintainer decides.
- List respected conventions in output so maintainer sees them noticed, not missed.

## Docs vs executable config

Sources: `README.md`, contributor/maintainer docs, repo instructions, `AGENTS.md`.
Compare: manifest scripts (`package.json`, `Makefile`, `justfile`, `*.csproj`, `pyproject.toml`),
lockfile type, version files (`.nvmrc`, `.node-version`, `global.json`, `engines`), CI steps.

Check:

- documented command exists as script/target/tool;
- documented package manager matches lockfile;
- documented runtime/tool versions match version files or CI;
- documented paths and env var names exist (names only; never read secret values).

Trap: wrapper commands (`make test` → `npm test`) are valid.
Trap: commands for tooling doc labels optional aren't stale because tool absent locally.

## CODEMAP accuracy

Only when `CODEMAP.md` (or repo's named equivalent) exists.

Check:

- every listed path exists;
- entry points and boundaries still match (moved/renamed dirs);
- missing major top-level areas, only when map claims completeness.

Keep map structural; no file-level inventories. No CODEMAP: suggest only if asked and complexity justifies.

## Ownership and security policy

Sources: `CODEOWNERS` (root, `.github/`, `docs/`), ownership docs repo names, `SECURITY.md`,
README security section, skill/package metadata owners.

Check:

- `CODEOWNERS` syntax; patterns match existing paths;
- owners resolvable (team/user format); unverified → unknown unless checked read-only;
- uncovered paths only when repo states full coverage intended;
- security contact/policy present where docs reference it.

Owners and security contacts are governance decisions: change only when explicitly selected.

## Stale or duplicated config

Check:

- config for tools absent from manifests/CI (e.g. `.eslintrc` after Biome, `jest.config.*` without jest);
- duplicate config for one tool (`.prettierrc` plus `prettier` key in `package.json`);
- conflicting values between duplicates;
- committed files `.gitignore` excludes; generated output not marked/ignored where repo claims it is.

Trap: documented in-progress migration (ADR, issue, note) isn't stale; report status only.

## Dead references

Check relative Markdown links and anchors, paths in docs/instructions/config, scripts referenced by
scripts or CI, `applyTo`/glob patterns matching nothing.

External URLs: unknown unless network checks approved; never fetch by default.

## Handoffs

| Signal | Companion |
| --- | --- |
| Workflow template drift, APM sync, deployment, Copilot setup/readiness | `fusion-repository-greenkeeping` |
| Dependency update or upgrade decision | `fusion-dependency-review` |
| Fusion app code, tests, routing, app-local context | `fusion-app-greenkeeping` |
| Issue drafts from findings | `fusion-issue-authoring` |
