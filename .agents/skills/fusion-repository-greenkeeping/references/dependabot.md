# Dependabot configuration

Workflow templates pin every action to a full commit SHA; nothing moves those pins
without a version-update bot. [`dependabot.yml.hbs`](../assets/config/dependabot.yml.hbs)
`1.0.0` keeps `github-actions` plus detected npm/pnpm/Yarn, Bun and NuGet dependencies
current. Dependency PR review stays with `fusion-dependency-review`; no auto-merge.

## Detect existing bots first

Read-only inventory before offering template:

- Dependabot: `.github/dependabot.yml` or `.github/dependabot.yaml`.
- Renovate: `renovate.json`, `renovate.json5`, `.renovaterc`, `.renovaterc.json`,
  `.renovaterc.json5`, `.github/renovate.json`, `.github/renovate.json5`,
  `.gitlab/renovate.json`, `.gitlab/renovate.json5`, or `renovate` key in root `package.json`.

| Finding | Result |
| --- | --- |
| Neither found | Offer template. Renovate app installed without repo config stays undetectable locally: ask maintainer. |
| Renovate config | Report path and whether `github-actions` manager runs (default on unless `enabledManagers` omits it or it is disabled). Never add Dependabot beside it: two bots open competing PRs. |
| Dependabot with `fusion-workflow-template: dependabot` and sidecar | [Reviewed lifecycle](workflow-greenkeeping.md#repeat-setup-and-versioned-updates): no change or three-way update. |
| Dependabot without provenance | Unknown provenance. Report gaps (missing `github-actions` entry, undetected ecosystems or directories, no cooldown) as findings; offer reviewed adoption, never overwrite. |

## Detect ecosystems and directories

List committed files only (`git ls-files`), ignoring `node_modules`, build output and
vendored copies. Record every directory as `/` or `/<path>` from repository root.

| Template list | Directory holds | Notes |
| --- | --- | --- |
| `githubActionsDirectories` | Always `/` (covers `.github/workflows` and root `action.yml`); plus each local composite action `action.yml`/`action.yaml` directory | Dependabot scans only listed directories. |
| `npmDirectories` | `package.json` with `package-lock.json`, `pnpm-lock.yaml` or `yarn.lock` | npm ecosystem covers pnpm and Yarn. Workspace monorepo: lockfile root only, not each member. |
| `bunDirectories` | `package.json` with text `bun.lock` | Binary `bun.lockb` unsupported: remedy `bun install --save-text-lockfile`, or omit Bun with maintainer agreement. |
| `nugetDirectories` | `.sln`, `.slnx`, `.csproj` or `Directory.Packages.props` | One directory per solution or `Directory.Packages.props` root; add each `.csproj` directory not beneath such a root (standalone project). |

Ecosystem with no detected directory: empty list, block omitted. Never add an ecosystem
or directory "just in case". Undetected ecosystems (Docker, Python, Go, Terraform,
`dotnet-sdk` for `global.json`) are findings for maintainer, added later as reviewed
local customizations. Private registries need top-level `registries` with secret names:
reviewed local addition, never a template input.

## Defaults and reasoning

| Choice | Default | Why |
| --- | --- | --- |
| `interval` | `weekly` | One predictable review batch; daily floods review, monthly lets pins and CVE fixes drift. Security updates run independently of schedule. |
| `cooldownDays` | `7` | Dependabot default is 3 days. Compromised or broken releases are usually yanked within a week; 7 days lowers supply-chain risk at small freshness cost. Security updates skip cooldown. |
| Actions grouping | Not grouped: one PR per action | Matches `fusion-app-template`; each pin bump reviewed, merged or reverted on its own. |
| Family groups (npm, Bun) | `fusion-framework` (`@equinor/fusion-framework`, `@equinor/fusion-framework-*`), `fusion-react` (`@equinor/fusion-react-*`), `react` (`react`, `react-dom`, their `@types`), `eds` (`@equinor/eds-*`); all update types | Packages released together must move together; split PRs leave mixed versions that fail install or runtime. Matches [`fusion-app-template`](https://github.com/equinor/fusion-app-template/blob/main/.github/dependabot.yml). Groups matching nothing open no PR. |
| Other packages | Not grouped: one PR per dependency | Focused review and rollback; one bad bump never blocks unrelated updates. |
| `open-pull-requests-limit` | `50` on every entry | Limit counts open version-update PRs per ecosystem entry; a grouped PR counts once. Ungrouped dependencies and actions would stall behind default 5. Matches `fusion-app-template`. Security updates keep separate fixed limit 10. |
| Security updates | Not grouped | One fix per PR, merged fast without waiting on unrelated bumps. |

Labels, reviewers, commit prefixes, ignores, extra groups and changed PR limits are local
customizations: review separately and preserve on update.

## Inputs

Sidecar raw inputs; example `.tmp/dependabot.raw.json` for a .NET service with a pnpm
frontend and one composite action:

```json
{
  "interval": "weekly",
  "cooldownDays": 7,
  "githubActionsDirectories": ["/", "/.github/actions/setup"],
  "npmDirectories": ["/frontend"],
  "bunDirectories": [],
  "nugetDirectories": ["/"]
}
```

Raw inputs map one-to-one to slots. Fill [template](../assets/config/dependabot.yml.hbs)
per [fill rules](common-workflows.md#fill-rules) into new `.tmp/dependabot.candidate.yml`;
`actionlint` does not apply, YAML parse and header-rule checks do. Destination
`.github/dependabot.yml`; sidecar `.github/dependabot.inputs.json`. Follow
[reviewed lifecycle](workflow-greenkeeping.md) for adoption, updates and conflicts.

After approval and merge to default branch, confirm repository **Insights → Dependency
graph → Dependabot** shows no configuration error. Parsed config proves nothing about
registry access or PR volume.

Verified 2026-10-27 against
[Dependabot options reference](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference).
