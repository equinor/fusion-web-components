# Copilot setup steps

Prepare Copilot cloud agent's environment so it can build and test; Copilot code
review reuses same file. [`copilot-setup-steps.yml.hbs`](../assets/workflows/copilot-setup-steps.yml.hbs)
`1.0.0` installs Node and/or restores .NET dependencies; audit existing setup and instructions with
[readiness check](copilot-readiness.md).

## Platform rules

Verified 2026-10-20 against
[GitHub: configure the development environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment):

- Path `.github/workflows/copilot-setup-steps.yml`; one job named `copilot-setup-steps`.
- Honored job keys only: `steps`, `permissions`, `runs-on`, `services`, `snapshot`,
  `timeout-minutes` (max `59`). Other keys (job `env`, `defaults`, `if`) are ignored;
  put values at step level.
- Takes effect only from default branch. Checkout `fetch-depth` is overridden.
- Failed step: Copilot skips remaining steps and **continues silently** with partial
  environment. Template therefore runs itself as normal check when file changes.
- Code review reuses this file unless `.github/workflows/copilot-code-review.yml` exists.

## Prerequisites

Select Node, .NET or both (e.g. .NET service with frontend).

- **Node:** committed `package.json` and lockfile in install root (npm
  `package-lock.json`, pnpm `pnpm-lock.yaml`, Bun `bun.lock`/`bun.lockb`); exact Node
  matching `engines`; exact pnpm/Bun version matching `packageManager`.
- **.NET:** SDK pinned by `global.json` in the .NET working directory (preferred) or
  exact SDK version; explicit `.sln`/`.slnx`/`.csproj` restore targets relative to that
  directory (repositories often hold several solutions); `--locked-mode` only when every
  target commits `packages.lock.json`; tool restore when `.config/dotnet-tools.json`
  exists. Restore uses repository `nuget.config`.

SDK selection: without an applicable `global.json`, .NET uses the newest installed SDK,
including runner preinstalls, so installing a version alone does not select it, and a
nested `global.json` does not govern commands run from repository root. Template writes
the pin to `global.json` above the checkout (outside git, so Copilot never commits it),
which governs every repository directory during setup and the later Copilot session;
closer repository pins still win. It then verifies `dotnet --version` in the .NET
working directory and repository root before restore; mismatched repository pins fail.

Missing lockfile or SDK pin blocks setup: fix repository first, never fall back to
unpinned install. Feeds checked 2026-10-20: nuget.org, Fusion-Public and Equinor TIE
indexes answered anonymously. Authenticated feeds, private registries, extra tools,
services and Copilot environment secrets are reviewed local additions, never template inputs.

## Inputs

Sidecar raw inputs; set `node` or `dotnet` to `null` when unused. Example
`.tmp/copilot-setup-steps.raw.json` for a .NET service with a pnpm frontend:

```json
{
  "node": {
    "workingDirectory": "frontend",
    "packageManager": "pnpm",
    "packageManagerVersion": "10.15.1",
    "nodeVersion": "24.14.1"
  },
  "dotnet": {
    "workingDirectory": ".",
    "useGlobalJson": true,
    "sdkVersion": "",
    "restoreTargets": ["src/Fusion.Api.sln"],
    "lockedMode": false,
    "toolRestore": true
  }
}
```

Derive slots: `useNode`/`useDotnet` from non-null objects; `isNpm`/`isPnpm`/`isBun`
from `packageManager`; `dotnetWorkingDirectory` from `workingDirectory`;
`dotnetRestoreTargets` joins `restoreTargets` with spaces; use exactly one of
`useGlobalJson` or `sdkVersion`; unused string slots empty, booleans false.
Fill [template](../assets/workflows/copilot-setup-steps.yml.hbs) per
[fill rules](common-workflows.md#fill-rules) into new `.tmp/copilot-setup-steps.candidate.yml`.
Follow [reviewed lifecycle](workflow-greenkeeping.md); sidecar
`.github/workflows/copilot-setup-steps.inputs.json`.

After approval and merge to default branch, confirm the workflow run passed. A passing
run proves install/restore works, not that Copilot tools, firewall or registries are reachable.

## Separate code review environment

Keep one file by default. Add `.github/workflows/copilot-code-review.yml` only when
review needs a different environment, e.g. lighter install, different services or
runner, or the cloud agent needs tools review must not get. It replaces setup steps
for review entirely and is maintained separately. GitHub says to structure it the same
way as setup steps but does not document its job name here; verify current docs
before adding. No template ships; adapt filled setup file as local customization.

Out of scope: organization Copilot policies, runner/firewall/MCP configuration and
secret provisioning.
