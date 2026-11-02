# Health lanes

## Contents

- [Bounded hygiene investigation](#bounded-hygiene-investigation)
- [Local conventions](#local-conventions)
- [Docs vs executable config](#docs-vs-executable-config)
- [CODEMAP accuracy](#codemap-accuracy)
- [Ownership and security policy](#ownership-and-security-policy)
- [Stale or duplicated config](#stale-or-duplicated-config)
- [Dead references](#dead-references)
- [Handoffs](#handoffs)

Per-lane checks, evidence and false-positive traps. Inspect in-scope lanes only.

## Bounded hygiene investigation

- Time-box open-ended research to roughly first quarter of agreed task budget; reserve time for
  verification and delivery. Without fixed deadline, agree a small research budget.
- Roughly 70% working confidence is a stopping heuristic, not measured probability or finding score.
  Once concrete evidence supports useful bounded recommendation, stop and disclose uncertainty.
  Confidence never overrides scope, approval, integrity or required validation gates.
- Adopted rule or established local pattern plus concrete inconsistency supports a small correction;
  don't survey entire repository to prove universal agreement. Prefer useful findings over cleanup inventory.
- For selected fixes, make smallest evidenced correction and run only approved focused checks.
  Avoid speculative cleanup/unrelated refactors; report failed or unrun checks, never weaken tests.

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
| Existing workflow security/currency (permissions, injection, `pull_request_target`, pins, runners, Node runtimes) | `fusion-repository-greenkeeping` Actions audit |
| APM manifest/lock drift, edited installed copies, floating refs | `fusion-repository-greenkeeping` APM health |
| Competing lockfiles, `packageManager`/Corepack/Node version drift, non-frozen CI installs | `fusion-app-greenkeeping` toolchain lane (any JS workspace) |
| Central package management, NuGet lock files, `nuget.config` feeds, NuGet audit, solution membership | `fusion-service-greenkeeping` build-configuration lane (any .NET solution) |
| Dependency update or upgrade decision | `fusion-dependency-review` |
| Fusion app code, tests, routing, app-local context | `fusion-app-greenkeeping` |
| Issue drafts from findings | `fusion-issue-authoring` |

Docs-vs-config lane still reports simple contradictions (docs say pnpm, lockfile is npm) itself;
hand off only deeper stack checks.
