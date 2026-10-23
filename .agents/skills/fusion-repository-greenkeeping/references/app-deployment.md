# Fusion app deployment workflows

Both app templates delegate OIDC and publication to maintained Fusion action; no
custom authentication or publication code.

| Repository | Template | Trigger |
| --- | --- | --- |
| Single app | [`app-deploy.yml.hbs`](../assets/workflows/app-deploy.yml.hbs) `1.0.0` | Manual dispatch on default branch |
| App monorepo with Changesets | [`app-monorepo-deploy.yml.hbs`](../assets/workflows/app-monorepo-deploy.yml.hbs) `1.0.0` | Default-branch Changesets; published app releases |

Monorepo inputs and release credential: [monorepo guide](app-monorepo-deployment.md).

## Shared action

[`equinor/fusion-action-app-publish` v2.2.2](https://github.com/equinor/fusion-action-app-publish/blob/c88d76012b79e374d0447915e84ba31e7b65d543/action.yml),
pinned to commit `c88d76012b79e374d0447915e84ba31e7b65d543`, owns artifact/config
validation, Azure OIDC login, publication and metadata. Deployment job grants only
`id-token: write` and `contents: read`. Never add token export or separate Azure login.

- Action runs Node 24. Normal publication invokes CLI **`@latest`**, not app's locked
  CLI. Pinning action does not pin that CLI; never claim strict CLI pinning.
- Keep `allow-existing-version: "false"`: recovery re-tags existing content instead of
  publishing supplied ZIP.

## Prerequisites

- App registered in selected Fusion environment; deployment principal has publishing
  access. Setup creates no registration or access grant.
- Committed app manifest, package manifest, compatible local
  `@equinor/fusion-framework-cli` and frozen lockfile. Single app installs and resolves
  CLI in app root; monorepo in workspace root. Workspace builds must already resolve
  internal dependencies.
- Exact even Node release `>=24`. Exact pnpm/Bun version matching repository metadata,
  or `""` for npm bundled with Node. Lockfiles: npm `package-lock.json`, pnpm
  `pnpm-lock.yaml`, Bun `bun.lock`/`bun.lockb`.
- One protected GitHub environment per listed Fusion environment, same name (GitHub
  names are case-insensitive, so `FPRD` serves `fprd`), with reviewer/branch rules and
  Entra federated credential matching `repo:<owner>/<repo>:environment:<environment>`.
  A missing environment is auto-created **unprotected** on first run: create it first. Named Actions variables hold
  client ID, tenant ID and Fusion resource/audience. Never collect values, client
  secrets or bearer tokens.
- Config opt-in needs `app.config.<environment>.ts/js/json` or `app.config.ts/js/json`.
  JSON generation runs in each environment job, so environment-scoped variables apply,
  and **before action login**; callbacks needing live authentication
  need reviewed repository adaptation, never added token acquisition. Never log or
  upload generated config.

## Single-app inputs

All fields required; example `.tmp/app-deploy.raw.json`:

```json
{
  "workingDirectory": ".",
  "appKey": "example-app",
  "packageManager": "pnpm",
  "packageManagerVersion": "10.15.1",
  "nodeVersion": "24.14.1",
  "environments": ["ci", "fqa", "fprd", "tr"],
  "tag": "preview",
  "publishConfig": false,
  "azureClientIdVariable": "AZURE_CLIENT_ID",
  "azureTenantIdVariable": "AZURE_TENANT_ID",
  "azureResourceIdVariable": "FUSION_RESOURCE_ID"
}
```

- `appKey`: 1-128 letters, digits, dots, underscores, hyphens. `tag`: 1-128 letters,
  digits, dots, hyphens; **no underscores**. Both start alphanumeric.
- `environments`: ordered, unique, lowercase subset of `ci`, `fqa`, `fprd`, `tr`, `next`
  (publish action's allowed list). Deploy order follows list; Fusion Core apps use
  `ci, fqa, fprd, tr`.
- Variable names exclude reserved `GITHUB_`/`RUNNER_` prefixes. `workingDirectory` is
  portable repository-relative path without traversal.

Fill [`app-deploy.yml.hbs`](../assets/workflows/app-deploy.yml.hbs) per
[fill rules](common-workflows.md#fill-rules) into new `.tmp/app-deploy.candidate.yml`;
derive `isNpm`/`isPnpm`/`isBun` from `packageManager`. Record pin/inputs in
`.github/workflows/app-deploy.inputs.json` and follow
[provenance/update contract](common-workflows.md#provenance-and-upgrades).
Apply only after approval.

## Runtime contract

1. Manual dispatch from default branch only; input `environment` is `all` (default) or
   one listed environment. Newer run of same app cancels running or waiting one.
2. Build job once: frozen install, pack `app-bundle.zip` with locked local CLI, compare
   `metadata.json.appKey` with expected key, upload bundle artifact.
3. Deploy matrix, one environment at a time in listed order; each job's protected
   environment gates it, and a failure stops later environments.
4. Opt-in config per environment job: checkout, frozen install, then
   `app config <config-source> --env <environment> --output app-config.generated.json`.
   Explicit source prevents CLI's missing-default-config fallback.
5. Action receives working directory, downloaded artifact, optional config, environment,
   tag and identity variable references. Template never calls `app publish` or `app pack --output`.
6. Every action is pinned to a full commit SHA with version comment.

Publication is nontransactional: config, service or metadata failures can follow
upload/tagging. Workflow trusts repository code and reviewed dependencies; it does not
isolate malicious build/install hooks. Maintainer verifies federation, permissions and
branch/environment protections separately.

## Sources

Verified 2026-10-20:

- [App Template publish](https://github.com/equinor/fusion-app-template/blob/0a8985994db1b123baf25050baece9b84b036e17/.github/workflows/publish.yml):
  action receives built ZIP/config and OIDC identity references.
- [App Template build](https://github.com/equinor/fusion-app-template/blob/0a8985994db1b123baf25050baece9b84b036e17/.github/workflows/build.yml):
  pack and environment-specific config precede publication.
- [Action publish script](https://github.com/equinor/fusion-action-app-publish/blob/c88d76012b79e374d0447915e84ba31e7b65d543/scripts/publish-app.sh):
  normal CLI `@latest`, explicit env/tag/config, recovery disabled by default.
- [CLI pack/config](https://github.com/equinor/fusion-framework/tree/68f4bc1ca820f0ddf75b8179b548e0df044612d0/packages/cli/src/cli/commands/app):
  archive naming, metadata identity, environment-aware JSON. `pack --output` not forwarded.

Source checks and offline fixtures do not prove consumer permissions, tenant policy or
live deployment.
