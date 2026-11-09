# Health lanes

## Contents

- [Bounded hygiene investigation](#bounded-hygiene-investigation)
- [Local conventions](#local-conventions)
- [Docs vs executable config](#docs-vs-executable-config)
- [CODEMAP accuracy](#codemap-accuracy)
- [Ownership and security policy](#ownership-and-security-policy)
- [Stale or duplicated config](#stale-or-duplicated-config)
- [Dead references](#dead-references)
- [Rule coherence](#rule-coherence)
- [Rule compliance](#rule-compliance)
- [ADR lifecycle](#adr-lifecycle)
- [Docs coverage](#docs-coverage)
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

## Rule coherence

Rule sources: `CONTRIBUTING.md`, `contribute/` or maintainer docs, nearest `AGENTS.md`,
`.github/copilot-instructions.md`, `.github/instructions/`, ADRs. These are repo's constitution; never
suggest new constitution file.

Check:

- same rule stated differently across sources (validation commands, PR rules, naming, issue routing);
- duplicated rule text likely to drift (same rule maintained in several files without pointer);
- unclear precedence: overlapping sources with no stated winner;
- `applyTo` scopes that overlap with conflicting instructions.

Finding names every source with path + line or quote. Contradictions are **decision** findings: ask which
source wins, never pick. Trap: summary pointing to canonical source ("see `contribute/`") isn't duplication.

## Rule compliance

Checks adopted rules against recent practice. Opt-in for large repos or when maintainer asks; otherwise
include in full health check with default sample.

- Default sample: last 10 commits on default branch from local history. Resolve default branch locally
  (`git symbolic-ref refs/remotes/origin/HEAD`, else `init.defaultBranch` or `main`/`master` ref that
  exists); never use current checkout, which may be a feature branch. No fetch.
- Run only after approval of exact read-only commands (ref resolution and
  `git log -n 10 --format='%h %ad %s' --date=short <ref>`). No approval or no local default-branch
  ref: lane "not run", state why. Report sample, ref and source.
- PR bodies, reviews or labels need network (`gh`): only with approval of exact command; else "not run".
- Rules to check: those stated in rule sources (changesets, required tests, commit format, naming, docs
  updates). Convention and ADR checks: use `fusion-code-conventions` when installed; else read rule
  sources directly and disclose.
- Report recurring patterns with counts (`4/10 commits touching skills/ lack changeset`), not every
  violation. One-off misses are not findings.

Trap: rule adopted after sampled commits isn't violated by them; compare commit date with rule's
introduction.

## ADR lifecycle

Only when repo keeps ADRs. Discover: `docs/adr/`, `adr/`, `docs/decisions/`, `decisions/`,
`contribute/decisions/`, directories rule sources name as ADR home, or directories of numbered decision
files (`0001-*.md`, `YYYYMMDD-*.md`). None found: lane not applicable, say so.

Check:

- ADR replaced by later ADR but still marked accepted or lacking superseded link;
- accepted ADR that current code, config or rule sources contradict, quoting both sides;
- ADR index or README listing missing or dead ADR files.

Decisions repeated across PRs with no ADR are **suggestions** only; ADR adoption is maintainer choice.
Trap: ADR status `proposed` or documented in-progress migration isn't drift.

## Docs coverage

Reverse of [Docs vs executable config](#docs-vs-executable-config): practice docs never mention.

Check:

- manifest scripts or `Makefile` targets contributors must run (validate, test, lint, release) that no
  contributor doc describes;
- required CI checks whose local equivalent is undocumented.

Report only contributor-facing gaps; internal helper scripts and generated targets aren't findings.

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
| Convention and ADR compliance in code | `fusion-code-conventions` |

Docs-vs-config lane still reports simple contradictions (docs say pnpm, lockfile is npm) itself;
hand off only deeper stack checks.
