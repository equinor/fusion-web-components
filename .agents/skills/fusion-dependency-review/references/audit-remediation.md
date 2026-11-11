# Security-audit remediation

For fixing package-audit findings, direct and transitive, across a repository; with or without a PR.
Order below is technique, not permission. Audits contact registries/feeds; installs and lockfile,
manifest or override edits need same approval as any branch change. Host-assigned: host scope decides
which steps apply; steps outside it become held proposals with exact entry and evidence.
Repository-local workflow rules win.

## Contents

- [Evidence first](#evidence-first)
- [Remediation order](#remediation-order)
- [Guardrails](#guardrails)
- [Patched dependencies](#patched-dependencies)
- [Per package manager](#per-package-manager)
- [Report](#report)
- [Sources](#sources)

## Evidence first

- Record package manager, exact installed version and lockfile owner. Check installed `--help` against
  version-matched official docs before using a flag; audit commands change between majors.
- Baseline before any change: audit with JSON output over whole graph (every workspace/project,
  transitive, dev and prod). Per advisory keep ID/URL, severity, package, resolved versions,
  vulnerable range, patched range or none, dependency paths. Narrower scope (prod-only, one workspace,
  severity floor): state it.
- Existing ignore/suppress/exclude entries belong in baseline: list them, they remove findings from totals.
- Failed audit (registry/feed error, unreadable response, skipped registry) is missing evidence, never clean.
- After each lockfile change and at end: same command, same scope. Compare per advisory, not totals.
  Review lockfile delta: only affected packages and necessary transitives may move.

## Remediation order

Apply in order; re-audit between steps; later steps handle only what earlier ones left.

1. **Fix stale overrides first.** Inventory forced versions: `overrides`, `resolutions`, exact pins,
   NuGet transitive `PackageVersion` pins, `VersionOverride`, direct references added for an earlier fix.
   Updates cannot move past them. Entry that holds a vulnerable version or blocks a patched one, and whose
   reason is gone (fix released upstream, parent moved on): remove, or raise within same major.
   Entry with live recorded reason (fork, peer alignment, known regression): keep; if it blocks a fix,
   report under step 4. Unknown reason is not permission to delete: check history, else ask or report.
2. **Update within allowed range.** Package manager's update command for named affected packages, and
   parents whose in-range release drops vulnerable dependency. Declared ranges, catalogs and unrelated
   resolutions stay unchanged. No unqualified update, dedupe, `--latest` or lockfile deletion.
   Check [patched dependencies](#patched-dependencies) before running.
3. **Override on same release line.** Remaining findings with published fix: force vulnerable package to
   patched version on major line each consumer already resolves. Advisories often list one patched version
   per line (e.g. `7.5.10` and `8.17.1`): pick per line, never first or highest.
   - One entry per package and line. No duplicates or overlapping ranges. Prefer version-scoped key
     (`pkg@<vulnerable-range>`) or parent-scoped key, so entry stops applying when consumers move on.
   - Record advisory ID and removal condition beside entry (YAML comment), or in PR text when format has no comments.
   - Direct dependency: change its declared range, not an override.
   - Overrides apply at project root only; consumers of published packages stay exposed. For libraries
     durable fix is parent or range bump: report it.
   - Override is manifest change. Interactive: maintainer approves exact entries. Host-assigned: apply only
     when host authorises overrides, else held proposal.
4. **Report the rest.** Findings needing new major (vulnerable package or parent), without published fix,
   blocked by patch, peer, licence or live override, or outside authority. Per finding: advisory ID/URL,
   severity, package and resolved version, consumers/paths (prod or dev), patched range or `none`,
   reason not fixed, smallest next step, owner. Major upgrade goes through normal review and verdict,
   never forced here. No fix: watch upstream, replace package, or maintainer-accepted risk.

## Guardrails

- **Never hide findings.** No ignore, suppress or exclude entry written unattended; see hide flags per manager.
  They persist in config and remove findings from later audits. Accepted risk is maintainer decision
  per advisory with reason and review date; report existing entries.
- **Registry-error tolerance is informational only.** Flags that exit 0 when registry fails
  (pnpm `--ignore-registry-errors`) make failed audit look clean: never use result as remediation evidence.
- **No forced majors unattended:** `npm audit fix --force`, `bun audit fix --latest`, `pnpm update --latest`.
- **Auto-fix output is proposal.** Dry-run or interactive mode first where available. Review majors crossed,
  number and overlap of overrides, rewritten pins and side settings before keeping any of it.
- **No weakened scope to turn green:** don't raise severity floor, drop dev dependencies, disable audit
  or relax patch checks.
- Don't finish by dropping, downgrading or rewording finding. Not certification: report audit date,
  source, scope and unaudited packages.

## Patched dependencies

List patch mechanisms before step 2: pnpm/Bun `patchedDependencies`, Yarn `patch:` resolutions,
third-party patch tooling. Patch tied to version breaks, or silently stops applying, when version moves.

For each fix that moves patched package:

1. Fixed release already contains patch's change: drop patch, cite release.
2. Otherwise re-create patch against fixed version with manager's patch command; verify it applies and
   run focused checks on patched behaviour.
3. Neither possible in scope: leave that package, exclude it from update selectors, continue with rest,
   report finding as blocked by patch.

Never delete patch or set `allowUnusedPatches: true` to get fix through.

## Per package manager

Verify against installed version; unsupported option stays unsupported. All override fields are root-only.

### pnpm

- **Evidence:** `pnpm audit --json`; `patched_versions: null` means no published fix.
- **Update:** `pnpm update -r <pkg>...` reaches every depth by default (`--depth` takes a number);
  `--no-save` keeps declared ranges. `pnpm update <pkg>@<version>` fails for transitive-only package
  (`ERR_PNPM_UPDATE_VERSION_ON_INDIRECT_DEP`): override case.
- **Auto-fix:** `pnpm audit --fix` (`--fix=override`) writes overrides, can pick patched version in another
  major, and adds `minimumReleaseAgeExclude` entries when `minimumReleaseAge` set. `--fix=update` updates
  lockfile instead; observed failing with `ERR_PNPM_UNUSED_PATCH` once a patch became unused (pnpm 12.4.2).
  `-i` reviews selection. Use as candidate list for steps 2–3.
- **Override:** `overrides` in `pnpm-workspace.yaml`; older setups keep them in root `package.json`.
  Edit where repository keeps them. Keys: `"pkg@<range>"`, `"parent>pkg"`.
- **Hide flags:** `--ignore <GHSA>` and `--ignore-unfixable` save IDs to `audit.ignore`
  (or deprecated `auditConfig.ignoreGhsas`); ignored advisories leave totals.
- **Patches:** unused `patchedDependencies` entry fails install unless `allowUnusedPatches`; re-create with
  `pnpm patch` and `pnpm patch-commit`.

### npm

- **Evidence:** `npm audit --json`; needs lockfile. `--audit-level` changes exit threshold, not report;
  `--omit` drops dependency types.
- **Update:** `npm audit fix --dry-run --json` plans; `npm audit fix` runs full install,
  `--package-lock-only` limits it to lockfile. Stays inside declared ranges. It targets every fixable
  advisory: review delta.
- **Never unattended:** `--force` installs outside declared ranges, semver-major included.
- **Override:** root `package.json` `overrides`; keys nest by parent and may carry version or range.
  Direct dependency cannot be overridden unless specs match (`$name`): change its range.
- **Patches:** none built in; follow repository's patch tooling.

### Yarn

- **Evidence (modern):** `yarn npm audit --all --recursive --json`. Default covers direct dependencies of
  active workspace only: without both flags result looks cleaner than graph.
  `--environment production` and `--severity` narrow.
- **Evidence (Classic 1.x):** `yarn audit --json` (JSON lines). Exit code is severity bitmask; `--level`
  filters output only; `--groups` narrows.
- **Update:** no fix command in either. Modern `yarn up -R <pkg>` keeps manifests and re-resolves every
  matching range. Classic has no verified in-range recipe for transitive-only package: repository-tested
  recipe or report.
- **Override:** root `package.json` `resolutions`; modern key allows one parent level (`parent/pkg`),
  Classic also glob paths (`parent/**/pkg`).
- **Hide flags (modern):** `--ignore`, `--exclude`, `npmAuditIgnoreAdvisories`, `npmAuditExcludePackages`.
- **Patches (modern):** `yarn patch-commit -s` stores patch and adds `patch:` `resolutions` entry;
  that entry is patch and pin together.

### Bun

- **Evidence:** `bun audit --json`: raw registry response, unfiltered; `--audit-level` and `--ignore` change
  exit code only. Registry failure or unreadable response exits 1. Packages from scoped registry without
  advisory endpoint are listed as skipped: report as unaudited.
- **Update:** `bun audit fix --dry-run` plans. `bun audit fix` moves each vulnerable package to lowest
  non-vulnerable version every dependent's range allows, installs, re-audits. May rewrite own exact pins
  (dependency, catalog, override) and downgrade within installed major. `--json` lists `fixes`, `blocked`,
  `unfixable`, `remaining`. Older Bun lacks `audit fix`.
- **Never unattended:** `--latest` rewrites own ranges, catalogs and overrides.
- **Override:** root `package.json` `overrides` (replaces `resolutions` when both exist); version-scoped keys,
  one parent level.
- **Hide flags:** `--ignore <id>`.
- **Patches:** `bun audit fix` upgrades patched dependencies; re-create patch with `bun patch`.

### NuGet / .NET

- **Evidence:** `dotnet package list --vulnerable --include-transitive --format json` (.NET 10 SDK; earlier
  `dotnet list package ...` after restore). Restore warns NU1901–NU1904 by severity. NU1900: source could
  not be read; NU1905: audit source has no vulnerability data. `NuGetAuditMode` defaults to `direct` below
  `net10.0`, so restore misses transitive advisories there. `dotnet nuget why <project> <package>` shows path.
- **Update:** direct package: raise version where it lives (`Directory.Packages.props` or project).
  `dotnet package update --vulnerable` (.NET 10 SDK) picks lowest higher version without known
  vulnerability; not limited to same major, and warnings-as-errors on restore can block it.
  Earlier SDKs have no automatic fix.
- **Transitive:** update closest parent first. Then, where repository already uses central package
  management with `CentralPackageTransitivePinningEnabled`, add or raise `PackageVersion`: override
  equivalent. No downgrades (NU1109); packed projects expose pinned package as explicit dependency.
  Otherwise temporary direct `PackageReference` with removal note. Adopting central management or
  transitive pinning is maintainer decision: propose, don't add.
- **Hide flags:** `NuGetAuditSuppress`, `NoWarn` for NU1901–NU1904, `NuGetAudit=false`. Suppression covers
  every package sharing advisory.
- **Locks:** regenerate adopted `packages.lock.json` by restore; verify with `--locked-mode`.

## Report

- **Before/after** counts by severity, with command, scope, tool version and date.
- **Fixed** per advisory: step used, packages and versions moved.
- **Overrides** removed, raised or added: reason, advisory ID, removal condition.
- **Patches** dropped, re-created or blocking.
- **Remaining** per step 4, plus existing ignore/suppress entries and unaudited packages.
- **Not run** with reason.

Example: "Audit (pnpm 12.4.2, all workspaces): 1 critical/33 high → 0/0; 2 moderate, 1 low remain.
Removed 3 stale overrides, updated 14 packages in range, added 2 same-line overrides (GHSA IDs listed).
Remaining: `<pkg>` needs major 4 → 5 (review pending); `<pkg>` has no fix. Nothing ignored."

## Sources

Checked 2026-11-10: pnpm [audit](https://pnpm.io/cli/audit), [update](https://pnpm.io/cli/update),
[overrides](https://pnpm.io/settings/dependency-resolution#overrides), [patch](https://pnpm.io/cli/patch);
npm [audit](https://docs.npmjs.com/cli/v11/commands/npm-audit),
[overrides](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#overrides);
Yarn [npm audit](https://yarnpkg.com/cli/npm/audit), [up](https://yarnpkg.com/cli/up), [resolutions](https://yarnpkg.com/configuration/manifest#resolutions),
[patch-commit](https://yarnpkg.com/cli/patch-commit), Classic [audit](https://classic.yarnpkg.com/en/docs/cli/audit),
[selective resolutions](https://classic.yarnpkg.com/en/docs/selective-version-resolutions);
Bun [audit](https://bun.com/docs/pm/cli/audit), [overrides](https://bun.com/docs/pm/overrides);
NuGet [auditing](https://learn.microsoft.com/en-us/nuget/concepts/auditing-packages),
[package list](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list),
[package update](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-update),
[nuget why](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-why),
[transitive pinning](https://learn.microsoft.com/en-us/nuget/consume-packages/central-package-management#transitive-pinning).
