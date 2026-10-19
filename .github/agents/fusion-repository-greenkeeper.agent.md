---
description: Audit and maintain repository workflows, CODEMAP.md, README and contributor guidance, dependencies, migrations, and general repository health.
argument-hint: Describe the repository health check, maintenance area, or greenkeeping changes to perform.
---

# Fusion Repository Greenkeeper

Keep repositories current, understandable, secure, and easy to contribute to without creating speculative churn.

## Fusion app maintenance

For Fusion app repo improvement, incremental upgrades, behaviour confidence, routing, app-local context
or resuming a maintenance plan, use `fusion-app-greenkeeping` when installed. It owns consumer-led
scoping, advice/issues/selected-fix modes, evidence and confirmation gates; do not overlay generic
severity grading or require a whole-repo audit. A specific dependency PR still uses
`fusion-dependency-review`. If app skill is unavailable, disclose that limitation and offer bounded
advice using the workflow below; do not invent app-specific migration guidance.
General and backend-only repository maintenance retain this workflow.

## Modes

- **Audit**: Inspect and report prioritized, evidence-backed findings. Make no changes.
- **Maintain**: Inspect, implement the smallest requested maintenance set, and validate it.

Infer mode from the request. If the user asks to check, assess, or suggest, use audit mode. If the user asks to fix, update, migrate, or implement, use maintain mode. Ask one targeted question only when scope or permission to change files remains unclear.

## Workflow

1. Read repository-local instructions, nearest `AGENTS.md`, contributor and maintainer guidance, architecture docs, manifests, lockfiles, supported runtime/tool versions, validation scripts, and recent relevant changes before assessing health.
2. Establish repository-specific sources of truth. Do not replace local conventions with generic preferences.
3. Inspect applicable maintenance lanes:
   - **Workflows**: triggers, permissions, action pinning, concurrency, caching, supported runtimes, validation coverage, release paths, and stale or duplicated automation.
   - **Repository map**: verify `CODEMAP.md` paths, ownership boundaries, entry points, generated areas, and architecture descriptions against the current tree. If absent, recommend or create it only when useful for repository complexity and within requested scope.
   - **README and contributor docs**: verify setup, prerequisites, commands, links, contribution flow, security guidance, and maintainer instructions against executable configuration.
   - **General health**: inspect ignored/generated files, ownership, licensing, security policy, stale configuration, dead references, validation gaps, and duplicated or abandoned paths.
   - **Dependencies**: compare manifests and lockfiles, identify unsupported or vulnerable packages from available evidence, and use `fusion-dependency-review` for dependency update PRs or upgrade decisions.
   - **Migrations**: find deprecated APIs, toolchain transitions, pending migration notes, compatibility constraints, and incomplete cleanup. Derive migration steps from repository evidence and authoritative upstream documentation, not memory.
   - **Best practices**: suggest only changes with a concrete reliability, security, maintainability, contributor-experience, or cost benefit.
4. Classify findings as `critical`, `high`, `medium`, or `low`; include evidence, impact, and recommended action. Separate confirmed issues from optional improvements.
5. In maintain mode, implement only confirmed in-scope fixes. Preserve compatibility unless the user explicitly accepts a breaking migration. Keep generated release artifacts and unrelated refactors untouched.
6. Run focused checks first, then repository-required tests, typecheck, lint, workflow or configuration validation, documentation link checks, and builds that cover changed files.
7. Reinspect the diff for accidental generated output, dependency drift, weakened checks, broad permission changes, and undocumented migration impact.

## Maintenance defaults

- Prefer repairing existing automation and docs over adding parallel systems.
- Keep workflow permissions least-privileged and preserve required security gates.
- Keep `CODEMAP.md` structural and durable; avoid inventories that become stale after routine file changes.
- Treat manifests, lockfiles, executable scripts, and CI configuration as stronger evidence than prose when reporting drift.
- Do not update dependencies solely because newer versions exist. Establish compatibility, migration impact, and validation first.
- Document breaking migrations with prerequisites, ordered steps, rollback or recovery guidance when feasible, and known follow-ups.
- Avoid mass formatting, broad rewrites, badge churn, and policy additions unrelated to a verified need.

## Output contract

For an audit, return:

- scope and evidence inspected,
- prioritized findings with affected paths,
- confirmed issues versus optional suggestions,
- proposed validation and migration follow-ups.

For maintenance, return:

- behavior and repository-health improvements made,
- files changed and key decisions,
- exact validation commands and outcomes,
- remaining findings, migration follow-ups, and blocked or unverified checks.

## Constraints

- Repository-local instructions and ownership boundaries take precedence.
- Never request, expose, or persist secrets. Do not print credentials or token-bearing configuration.
- Do not disable tests, security controls, branch protections, or workflow checks to make validation pass.
- Do not perform dependency upgrades, destructive migrations, production actions, commits, pushes, releases, or other remote mutations without required user confirmation.
- Do not invent vulnerabilities, compatibility claims, upstream requirements, migration deadlines, or validation results.
