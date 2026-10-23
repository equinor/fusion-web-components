# Fusion app monorepo release and deployment

Use [`app-monorepo-deploy.yml.hbs`](../assets/workflows/app-monorepo-deploy.yml.hbs)
`1.0.0` when one workspace uses Changesets to release multiple app packages.
Shared action, prerequisites and CLI caveat: [app deployment](app-deployment.md).

## Source pattern

Based on `equinor/fusion-core-apps` commit
`87b653b7c002dbe5327f4f8d7f5f828b5a78398b`:

- [CI](https://github.com/equinor/fusion-core-apps/blob/87b653b7c002dbe5327f4f8d7f5f828b5a78398b/.github/workflows/ci.yml):
  Changesets creates version PR or releases, using repository version/release scripts.
- [Release entry](https://github.com/equinor/fusion-core-apps/blob/87b653b7c002dbe5327f4f8d7f5f828b5a78398b/.github/workflows/on-release.yml):
  published package release selects deployment.
- [Deployment](https://github.com/equinor/fusion-core-apps/blob/87b653b7c002dbe5327f4f8d7f5f828b5a78398b/.github/workflows/deploy.yml):
  workspace-root install, app-directory pack and environment-protected deploy.

Kept from Core Apps: per-package release triggers deployment, build once, sequential
environment matrix, newer release supersedes older. Adaptations: one workflow file
instead of three, maintained Fusion publish action instead of token export/direct
publish, full package-name allowlist including scopes, SHA-pinned actions.

## Inputs and prerequisites

Root frozen lockfile, Changesets CLI compatible with `changesets/action@v2`, app
workspaces and root CLI dependency. Existing root scripts version packages, update
lockfile and tag releases. App-only monorepos follow Core Apps' `changeset git-tag`
release script; template supplies no npm publication or registry credentials.

All fields required; example `.tmp/app-monorepo-deploy.raw.json`:

```json
{
  "defaultBranch": "main",
  "packageManager": "pnpm",
  "packageManagerVersion": "10.15.1",
  "nodeVersion": "24.14.1",
  "environments": ["ci", "fqa", "fprd", "tr"],
  "tag": "latest",
  "prereleaseTag": "preview",
  "releaseTokenSecret": "APP_RELEASE_TOKEN",
  "versionScript": "changeset:version",
  "releaseScript": "changeset:release",
  "azureClientIdVariable": "AZURE_CLIENT_ID",
  "azureTenantIdVariable": "AZURE_TENANT_ID",
  "azureResourceIdVariable": "FUSION_RESOURCE_ID",
  "apps": [
    {
      "packageName": "@example/first",
      "workingDirectory": "apps/first",
      "appKey": "first",
      "publishConfig": true
    },
    {
      "packageName": "second",
      "workingDirectory": "apps/second",
      "appKey": "second",
      "publishConfig": false
    }
  ]
}
```

`defaultBranch` must match repository default. `versionScript`/`releaseScript`
are existing root script **names**, not shell commands. `apps` is nonempty;
full package names, app directories and registered app keys must each be unique.
Shared path/tag/environment/identity rules apply. `tag` selects stable releases;
`prereleaseTag` selects GitHub prereleases, not inferred branch names.

`releaseTokenSecret` names existing GitHub App or PAT credential authorized for version
PRs, contents/tags and releases. Releases created with `github.token` do **not**
trigger downstream `release: published` (workflows cannot trigger workflows); no
fallback, so missing credential blocks release management. Core Apps uses scoped PAT
`APP_RELEASE_TOKEN`; prefer short-lived GitHub App credential when available, provisioned
through approved processes; never request or paste its value. Deployment uses separate Azure OIDC.

Fill [template](../assets/workflows/app-monorepo-deploy.yml.hbs) per
[fill rules](common-workflows.md#fill-rules) into new
`.tmp/app-monorepo-deploy.candidate.yml`. Slot `appsJson` is `apps` as compact
single-line JSON; sidecar keeps `apps` array.

Review candidate for `.github/workflows/app-monorepo-deploy.yml` and record
source pin/inputs in `.github/workflows/app-monorepo-deploy.inputs.json`.
Discover existing release/deploy workflows first: do not install duplicate
Changesets managers or deployment triggers. Adopt/merge existing flows through
[reviewed provenance/update process](common-workflows.md#provenance-and-upgrades).

## Runtime contract

1. Push to configured default branch installs frozen root dependencies and runs
   `changesets/action` (SHA-pinned `v2.1.2`). Version PR stays draft; release creation follows existing
   root scripts. This job has contents/PR write, **not** Azure OIDC permission.
2. Published release: `jq` splits Changesets tag `<packageName>@<version>` and matches
   allowlisted full `packageName`. Non-app/library releases report no deployment.
3. Build job once, at release-event commit: root frozen install, root-local CLI packs
   app workspace, verify packed app key, upload bundle. Newer build of same app cancels older.
4. Deploy matrix, one environment at a time in listed order; each protected environment
   gates its job and a failure stops later ones. Config apps check out, install and
   generate environment JSON inside environment job. Fusion publish action receives
   downloaded artifact, config, identity, environment and stable/prerelease tag.
   Newer release of same app cancels older one per environment.

No default-branch ancestry check, like Core Apps: a release on any commit deploys.
Restrict each environment's deployment branches/tags and who may publish releases.
No untrusted PR deployment, token export, snapshot guessing, duplicate-version
recovery or automatic merge. Config generation precedes
action login; authenticated callbacks require reviewed adaptation.

Real release-event propagation, Changesets behavior and Azure authorization remain
unverified until approved consumer execution.
