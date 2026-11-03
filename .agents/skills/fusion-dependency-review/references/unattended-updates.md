# Unattended dependency updates

For a calling host that supplies update scope and owns confirmation gates. Recommendations are
not permission to commit, publish, approve or merge. Repository-local workflow rules win.
Interactive live-PR checkpoint and verdict comments apply only when host requires and authorises them.
Keep host paths, machine contracts, resource limits and publication policy outside this reference.

## Contents

- [Repository-notes warm-up](#repository-notes-warm-up)
- [Targeted regeneration](#targeted-regeneration)
- [Compare resolutions, not line counts](#compare-resolutions-not-line-counts)
- [Bounded consumer discovery](#bounded-consumer-discovery)
- [Research the installed interval](#research-the-installed-interval)
- [GitHub Actions updates](#github-actions-updates)
- [Docker base-image updates](#docker-base-image-updates)
- [Licence and terms changes](#licence-and-terms-changes)
- [Verdict and validation](#verdict-and-validation)
- [Release artifacts](#release-artifacts)
- [Maintainer summary](#maintainer-summary)

## Repository-notes warm-up

Read repository instructions, contributor docs, maps, manifests, CI and release policy once.
Record facts with source paths and command evidence; later workers reuse notes and read only
update-specific files or changed guidance. Notes are not authority to expand scope.

- Package manager and exact installed version; Node/runtime or .NET SDK pin and relevant config.
  For Yarn distinguish Classic (1.x) from modern Yarn. Record workspace root and lockfile ownership.
- Repository's locked install/restore command, prerequisites, exit code and duration if actually run.
  Warm-up applies no update and changes no tracked files; unexpected generated drift is a setup failure.
- Targeted regeneration recipe, selectors, scope and side effects. Check installed tool's command help
  against official version-matched docs before recording flags. Unsupported options stay unsupported;
  never infer equivalent flags across managers. Verify recipe in an isolated fixture when needed.
- How to find direct/transitive consumers without searching installed trees or the entire graph.
- Lightest checks that exercise affected consumers: named typecheck, build or unit-test commands,
  their workspace/project filters and expected prerequisites. Browser tests only for relevant runtime
  or browser-tooling changes when lighter checks cannot establish behaviour.
- Changeset/release-artifact policy: whether adopted, affected published units, bump rules,
  generated files that must not be edited and existing batch entries to reuse.
- Known default-branch failures, with exact command, revision and reproduced result or dated CI evidence.
  Unverified reports remain unknown; don't relabel a new failure as pre-existing without comparison.

Installs/restores may contact configured registries/feeds and run repository hooks. Use only host-authorised
commands and network scope; never export credentials, private manifests or feed payloads to public services.

## Targeted regeneration

Start with current accepted base's lockfiles and intended source/manifest changes. Never copy a stale bot
lockfile, hand-edit resolved versions/integrity hashes, delete the lockfile or run broad update/dedupe.
Select only named packages and requested versions, one selector per member of a grouped update.
Preserve unrelated resolutions; necessary transitive/peer changes require evidence, not blind acceptance.

For lockfile-only requests, preserve final manifest ranges, aliases, catalogs, overrides and dependency
sections. Target must satisfy effective consumer constraints. Never silently pin a manifest or override
to force an incompatible version. If no safe recipe exists, return explicit execution limitation.

### pnpm

After verifying every option in installed `pnpm update --help`, workspace example:

```bash
pnpm update -r --depth 100 --no-save --lockfile-only <pkg>@<ver>
```

`-r` selects workspaces; finite depth includes transitive consumers; `--no-save` preserves ranges;
`--lockfile-only` avoids updating installed trees. Use repository's narrower workspace filter when
applicable; depth 100 is a bound, not proof every possible consumer was included.
See official [update options](https://pnpm.io/cli/update). Verify resolved target and unchanged manifests;
catalog/override constraints or multiple consumer ranges can require a different approved recipe.

### npm

Official [install docs](https://docs.npmjs.com/cli/v11/commands/npm-install) support exact package selectors
and `--package-lock-only`, but **`--no-save` also prevents lockfile writes**. Do not combine those flags
and report success. [Update](https://docs.npmjs.com/cli/v11/commands/npm-update) accepts package names,
not an exact-version selector equivalent to pnpm.

For an existing **direct dependency**, when temporary manifest edits are allowed:

1. Record original range and dependency section in each selected workspace.
2. Run `npm install --package-lock-only <pkg>@<ver>` in that package's scope. For workspaces use
   installed-help-verified `--workspace <name>`; don't add a root dependency accidentally.
3. Restore only the selected manifest fields to their original ranges/sections using structured edits.
   Preserve all unrelated and already accepted edits; never restore an entire stale manifest.
4. Run `npm install --package-lock-only` in the same scope to reconcile root lockfile metadata.
   This is install from the existing lock, not an unqualified update. Docs explain that a locked
   version satisfying the manifest range is retained. Verify target survived and all ranges match.

These steps preserve **final** manifests, not tracked-file immutability during execution.
For a transitive-only update, disallowed temporary edits or a target outside original ranges,
there is no general verified exact lockfile-only equivalent here. Use a repository-tested recipe or
report unsupported regeneration; don't add a direct dependency or override as a workaround.

### Yarn Classic (1.x)

Official [upgrade docs](https://classic.yarnpkg.com/en/docs/cli/upgrade) support
`yarn upgrade <pkg>@<ver>`, but this changes the manifest reference and installs dependencies;
it is **not** a lockfile-only/no-save recipe.

For a manifest-changing request, run exact selector in selected workspace and verify only intended
manifest fields changed. For lockfile-only requests, no general manifest-preserving exact recipe
is established here: restoring old range after upgrade can introduce a different lock descriptor,
causing install to select a newer version instead of requested one.
[Classic install docs](https://classic.yarnpkg.com/en/docs/cli/install) promise retention only when
existing lock satisfies manifests. Use repository-tested staging only if final range, requested resolution
and unrelated resolutions are verified; otherwise report unsupported regeneration.
Don't delete/recreate the whole lock, use `--latest`, ignore engines or guess a no-save flag.

### Modern Yarn

Official [resolution-table command](https://yarnpkg.com/cli/set/resolution) selects an exact version
per existing descriptor, but **runs a full project install**: resolve, fetch, link and enabled build
scripts ([command source](https://github.com/yarnpkg/berry/blob/master/packages/plugin-essentials/sources/commands/set/resolution.ts)
calls `project.installWithNewReport`). A later `--mode=update-lockfile` cannot undo those side effects.
Use it only when host authorises full install, including installed-tree changes and script execution:

```bash
yarn set resolution '<pkg>@npm:<existing-range>' 'npm:<ver>'
```

Use actual lockfile descriptors, including aliases/protocols; the example applies to npm descriptors only.
It changes current resolution table, not manifest `resolutions`; it is not a permanent override.
Yarn does not validate that supplied resolution is valid for descriptor: check range/peer compatibility
first, then verify lock and run repository's immutable install before focused checks.
Respect repository's immutable policy; if it prohibits regeneration, obtain host-authorised update
configuration rather than silently disabling the gate.
When only lockfile regeneration is authorised, use a repository-tested lockfile-only recipe or report
unsupported regeneration; [`--mode=update-lockfile`](https://yarnpkg.com/cli/install) alone does not select a version.

[`yarn up -R <pkg>`](https://yarnpkg.com/cli/up) preserves manifests but re-resolves all matching ranges,
often to highest available versions, not a guaranteed requested version. Recursive mode disallows
other switches: never invent `yarn up -R --mode=update-lockfile <pkg>@<ver>` as an equivalent.

### NuGet / .NET

Locate effective `PackageReference` version or imported MSBuild property. With
[central package management](https://learn.microsoft.com/en-us/nuget/consume-packages/central-package-management),
versions usually live in `Directory.Packages.props` `PackageVersion` entries; projects omit `Version`.
Check nearest props file, explicit parent imports, target-framework conditions and `VersionOverride`.
Do not migrate to central management, enable transitive pinning or add an override just to force an update.

For a **manifest-changing** request, change only specified package's effective version entries to requested
value, retaining repository's version/range style. Restore affected consuming projects, not entire solution:

```bash
dotnet restore <consumer.csproj>
dotnet restore <consumer.csproj> --locked-mode
```

First command regenerates existing `packages.lock.json` when dependencies changed; second verifies consistency.
Use repository's documented update-mode configuration if it defaults to locked restore; don't disable CI gates.
NuGet version `1.2.3` is normally a minimum, whereas `[1.2.3]` is exact: report actual resolution, not just
requested value. Library locks do not dictate downstream applications' graphs; check relevant app/test consumers.

For existing floating ranges, `dotnet restore <consumer.csproj> --force-evaluate` can refresh locks
without changing manifests, but re-evaluates **all** dependencies in that project and has no package/version
selector. It cannot guarantee requested version or unchanged unrelated resolutions. Use only when repository
permits it and semantic comparison proves scope; otherwise report limitation, not a targeted equivalent.
`--force` only invalidates assets; `--locked-mode` cannot regenerate locks.

See official [restore options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-restore) and
[PackageReference lock behaviour and ranges](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files).
Only use `--use-lock-file` when repository already adopts locks; don't introduce `packages.lock.json`
into projects that intentionally omit it. NuGet has no general pnpm-style exact lockfile-only/no-save recipe.

## Compare resolutions, not line counts

Compare old/new named package versions against **current accepted base**, including earlier batch updates,
not bot title or stale source-PR lock. Report requested version and every relevant resolved version separately.
If resolved beyond request, explain constraints and research additional releases.

Peer-qualified keys, repeated snapshots, OS/CPU bindings and target-framework/runtime sections can multiply
one update. Distinguish metadata/key churn from actual version changes and necessary transitive changes.
Never dismiss unrelated upgrades as noise solely because a lockfile is generated.
If unrelated versions changed, narrow selector/project/descriptor scope and regenerate **once** from current
base with intended edits preserved. If scope still cannot be restored, stop and report exact delta and cause:
tooling limitation is failed execution; demonstrated incompatible constraints are a compatibility blocker.

## Bounded consumer discovery

Start with manifests and a bounded, installed-help-verified package-manager query for named package.
Node: workspace manifests, aliases, catalogs, overrides and peer constraints.
.NET: project `PackageReference`/`ProjectReference`, imported props and relevant target frameworks.
Expand only to consumers whose behaviour can change; inspect their source and nearest tests.
Exclude `node_modules`, `bin`, `obj`, generated output and lockfiles from **consumer searches**;
locks are read separately for resolution evidence. No Git-history search or unbounded recursive graph dump.

## Research the installed interval

Read supplied PR discussion and prior research first. Reuse verified URLs, excerpts, release versions and
consumer facts when still applicable; a previous MERGE/HOLD alone is not evidence.
Fetch only missing evidence that could change verdict or migration. Read official changelog/releases for
full old-resolved to new-resolved interval, including releases beyond bot request; attribute facts to releases.
Connect changed APIs, defaults, runtime/SDK/peer requirements and security advisories to actual consumers.
Check upstream licence/terms over the same interval, not only API compatibility or target metadata;
apply [licence and terms gate](#licence-and-terms-changes) before any MERGE recommendation.
An unchanged range or passing build alone does not establish runtime compatibility.

Time-box open-ended research to roughly first quarter of available task budget; reserve time for focused
checks and delivery. Stop around 70% working confidence once concrete evidence supports useful bounded
recommendation: heuristic, not measured probability, output score or override of validation/safety gates.
Unknown release notes, missing advisory evidence or untested runtime paths stay explicit; invent no benefits,
security claims or breaking changes. Additional searches require a concrete unanswered question.

## GitHub Actions updates

Review workflow dependencies as executable build/release infrastructure, not application packages.
No package-manager regeneration applies to a `uses:`-only update.

- Resolve old/new tag or full commit SHA to upstream releases; research entire interval. Major tags
  such as `actions/github-script` v8 -> v9 need call-site evidence, not automatic HOLD or MERGE.
- Preserve repository SHA-pinning conventions and version comments; verify new full SHA belongs to
  upstream repository and intended release. Never replace a pinned SHA with a mutable tag.
  Respect adopted workflow dependency lockfiles; regenerate only through repository's documented tooling.
  See GitHub's [secure use guidance](https://docs.github.com/en/actions/reference/security/secure-use#using-third-party-actions).
- Read upstream `action.yml`/`action.yaml` at both refs plus release/migration notes. Compare
  `runs.using`, inputs/defaults, outputs and required token permissions with each caller's `with:`,
  workflow/job `permissions:`, scripts and downstream output consumers. Don't silently broaden permissions.
- Check runner Node runtime and minimum runner version, especially self-hosted runners. Application
  `setup-node` does not change a JavaScript action's embedded Node runtime.
- For job-level reusable-workflow `uses:`, inspect called workflow and relevant nested calls:
  `workflow_call` input types/defaults, secrets, outputs and token permissions against caller.
  See official [reuse workflow contract](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows).
- Local workflow execution is usually unavailable. Evidence is official release notes plus actual
  workflow usage; syntax/lint checks are not an action run. Record **not run**, reason and affected
  jobs; use existing CI only when it exercised those jobs at reviewed revision. Missing compatibility
  evidence is HOLD; unavailable local execution alone is not a demonstrated incompatibility.

Example: [github-script v9 release](https://github.com/actions/github-script/releases/tag/v9.0.0)
breaks `require('@actions/github')` and declarations shadowing injected `getOctokit`. Inspect actual
`script:` content before deciding whether migration is needed.
[v8 release](https://github.com/actions/github-script/releases/tag/v8.0.0) moved to Node 24 and requires
runner v2.327.1 or newer; don't attribute that runtime transition to v9.

**Host-owned publication limitation:** pushing workflow-file changes needs a token with workflow-edit
permission (`workflows` permission; classic PAT/OAuth scope is named `workflow`, fine-grained tokens use
`Workflows: write`). This is separate from workflow `permissions:` for `GITHUB_TOKEN`.
GitHub documents [workflow-file write requirements](https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents).
Report rejected push as failed publication, not technical incompatibility or success.
Host owns credential provisioning, retry and batch handling; never request tokens, widen scopes,
remove workflow changes or bypass host gates as a workaround.

## Docker base-image updates

- Identify registry/repository, old/new tags and digests, selected platforms and every affected `FROM`
  stage. Distinguish build/SDK images from final runtime image and dependent stages.
- Tags are mutable; digests pin content. Preserve adopted tag/digest policy; when both exist verify
  digest matches intended tag/platform, not just updated version comment. Digest-only bumps can include
  OS/security changes even when tag stays unchanged. See Docker's
  [base-image pinning guidance](https://docs.docker.com/build/building/best-practices/#pin-base-image-versions).
- Research official publisher release notes, image manifests and distro/runtime support over old/new
  interval. Inspect Dockerfile usage for distro changes (Alpine/musl vs Debian/glibc), package-manager
  commands, native dependencies, runtime/SDK compatibility, architecture support, users, ports and
  entrypoints. An unchanged application lockfile proves none of these.
- In an unprivileged sandbox without authorised container-build capability, image cannot be built:
  record **research-only evidence**, build/runtime checks **not run**, reason and remaining risk.
  Never mount host Docker socket, request privileged mode or treat application tests as image validation.
  Unavailable build alone is not proof of incompatibility; missing material image/runtime evidence is HOLD.
  Host owns any authorised external build/CI gate; never claim readiness from research alone.

## Licence and terms changes

For every ecosystem, compare official upstream licence files at installed and target refs, release
announcements and terms changes throughout interval (including skipped majors and relevant transitives).
Record old/new licence identifiers or terms, release introducing change, source URLs and affected use.
Registry metadata or absence of a changelog mention alone is insufficient evidence of unchanged terms.

**Any licence/terms change is HOLD pending explicit human decision**, even if API-compatible and checks pass.
Name decision owner (maintainer/legal or procurement owner), changed obligations and smallest next step:
confirm approved licensing option, eligibility and any purchase/key configuration before reconsideration.
Never assume commercial eligibility, grant legal approval, suppress licence warnings or configure keys.
Unverified material licence evidence stays HOLD with research gap; budget/confidence heuristics cannot waive gate.
This is an acceptance-policy blocker, not routine pending PR approval or a compatibility failure.

Example: MediatR 12 -> 14 crosses
[v13.0.0 licensing transition](https://github.com/LuckyPennySoftware/MediatR/releases/tag/v13.0.0).
[v12.5.0 licence](https://github.com/LuckyPennySoftware/MediatR/blob/v12.5.0/LICENSE) is Apache-2.0;
[v14.0.0 terms](https://github.com/LuckyPennySoftware/MediatR/blob/v14.0.0/LICENSE.md) offer RPL-1.5
or commercial licensing. v13 introduced licence-key configuration and dual commercial/OSS licensing,
not commercial-only licensing. HOLD for human assessment of applicable terms; passing NuGet restore,
build or tests cannot authorise adoption.

## Verdict and validation

Keep technical recommendation, execution state, evidence confidence and merge readiness separate.

- Patch/minor: skim full interval; normally recommend **MERGE** absent declared break or contrary evidence.
  Semver is a triage hint, not proof; treat prereleases/0.x and observed regressions according to evidence.
- Major/declared break: inspect affected APIs/consumers. If unused, recommend MERGE with evidence.
  If used, apply documented migration within scope and run focused checks; use
  [upgrade migration contract](upgrade-migration.md), not weakened checks or speculative refactors.
- **HOLD / blocked compatibility**: demonstrated incompatibility after bounded migration, or breaking
  behaviour requiring maintainer judgement. Name exact decision or smallest next step.
- **HOLD / licence decision**: changed licence/terms require explicit human acceptance before MERGE.
  Keep separate from compatibility and routine approval; cite transition and responsible decision owner.
- **HOLD / failed execution**: unrecovered setup/tool failure, timeout, missing regeneration capability
  or incomplete evidence needed to decide. Keep retryable; don't manufacture a compatibility blocker.
  Calling host maps these concepts to its own machine contract.

Run lightest relevant checks within authorised scope and budget; record command, revision, duration,
exit code/outcome and what it proves. Set install/build budgets explicitly when command tool supports them.
Timeout/killed/resource-exhausted process is failed evidence, **never passed**. Retry only a narrower relevant
check or justified budget/concurrency adjustment; retain original failure as diagnostic.
Passing retry supersedes acceptance result, not history. Proven default-branch failures remain diagnostics;
unrecovered update-specific failures still prevent recommendation to merge.
Unrun checks stay not-run with reason. Pending required CI/approval is a readiness gate, not itself
technical HOLD; source-PR CI is not combined-candidate CI, and worker checks are not host acceptance.

## Release artifacts

Only add changesets/release artifacts when target repository adopts and requires them for this update.
Use its affected published units and bump rules; record added/updated/not-needed decision with reason.
No universal changeset mandate for dependency updates, apps, libraries or lockfile-only changes.
For combined updates, reuse existing batch entry for same release unit when repository permits;
dedupe repeated notes and never create competing bumps. Preserve separate-unit scope if local policy requires.
Do not manually edit release-managed changelogs/version files or run release automation without authorisation.

## Maintainer summary

Write for a merge decision, not an execution log:

- **What:** package's role here; old and new installed versions, requested version if different.
- **Why:** relevant upstream changes and effect on discovered consumers; migration and incidental deltas.
- **Validation limits:** focused outcome and what remains untested; distinguish base, source PR and candidate.
- **Risks / next action:** evidence-based MERGE/HOLD, unresolved unknowns and exact maintainer decision or retry.

Keep decision-relevant risks and short validation result visible. Fold command logs, Git checks,
release excerpts and source evidence under details; retain URLs and versions for later reuse.
Final combined summary reuses accepted evidence, preserves maintainer notes, dedupes caveats and
does not redo verdicts or imply missing checks passed. Follow repository's PR template and installed
content-authoring guidance; host owns author identity, issue links and publication.
Shape the combined PR body with `fusion-pr-documentation` → `references/combined-pr.md` when installed:
visible updates table, decisions only in prose, unrun checks as "Before merging" lines, and no
worker, coordinator or candidate jargon in the visible text.

Example: "Library X resolves 2.1.0 -> 2.2.1 (requested 2.2.0). Its new parser default affects
the import job; upstream 2.2.1 fixes that path. Focused parser tests passed on candidate.
Production input replay not run. Recommend MERGE after required candidate CI."
Avoid: "All good; build passed" when runtime behaviour, release interval or candidate CI is unknown.
