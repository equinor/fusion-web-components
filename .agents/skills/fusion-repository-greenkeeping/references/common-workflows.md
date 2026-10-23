# Common workflow catalogue and contract

Contract version `1`. Owner `@equinor/fusion-core`. Agents fill templates into
repository-owned YAML; not a deployment platform or central reusable workflow.

## Catalogue

| Template | Applies to | Key prerequisites | Destination | Guide |
| --- | --- | --- | --- | --- |
| [`apm-sync-reusable.yml.hbs`](../assets/workflows/apm-sync-reusable.yml.hbs) | Internal/private `equinor` repository using APM | Committed `apm.yml`, lockfile and managed files; access to internal reusable workflow; token secret for internal dependencies | `.github/workflows/apm-sync.yml` | [APM](sync-workflows.md) |
| [`apm-sync.yml.hbs`](../assets/workflows/apm-sync.yml.hbs) | Public or non-`equinor` repository using APM | Committed `apm.yml`, lockfile and managed files; branch/PR write; dependency read access | `.github/workflows/apm-sync.yml` | [APM](sync-workflows.md) |
| [`app-deploy.yml.hbs`](../assets/workflows/app-deploy.yml.hbs) | One registered Fusion Framework app | Frozen app install, local CLI, manifest, OIDC identity, protected GitHub environment per Fusion environment | `.github/workflows/app-deploy.yml` | [Single app](app-deployment.md) |
| [`app-monorepo-deploy.yml.hbs`](../assets/workflows/app-monorepo-deploy.yml.hbs) | App monorepo using Changesets | Root lockfile/CLI, version/release scripts, app allowlist, release-event credential, shared app prerequisites | `.github/workflows/app-monorepo-deploy.yml` | [Monorepo](app-monorepo-deployment.md) |
| [`copilot-setup-steps.yml.hbs`](../assets/workflows/copilot-setup-steps.yml.hbs) | Node and/or .NET repository used with Copilot cloud agent or code review | Node: lockfile, exact Node and package manager; .NET: SDK pin and restore targets | `.github/workflows/copilot-setup-steps.yml` | [Copilot setup](copilot-setup.md) |

Load only selected guide. Setup, repeat and update steps: [reviewed lifecycle](workflow-greenkeeping.md).

## Boundaries

- Public repositories cannot call internal reusable workflows. Fill local YAML with
  public actions; dependency visibility and identity permissions still apply.
- Broader app maintenance stays with `fusion-app-greenkeeping`, which routes workflow work here.
- Unsupported: portal/backend deployment, environment aliases, app registration, non-OIDC credentials, duplicate-version recovery and
  untrusted PR deployment (`pull_request_target` building contributor code with credentials).

## Fill rules

Agent fills templates by hand; no renderer ships. Each template's `{{!-- --}}` header
lists every slot with its allowed values.

1. Collect every slot explicitly; recommendations are not silent defaults. Record
   secret/variable **names** only, never credential values.
2. Check each value against its header rule. Any violation: stop, name field and
   remedy; never sanitize, guess or substitute shell snippets.
3. String values are single-line and exclude `"`, `'`, `\`, `` ` ``, `$`, `{`, `}` and
   control characters. Template supplies quotes; insert value verbatim. Only
   `appsJson` holds JSON; its own string values follow this rule. List slots
   (`environments`) hold such strings.
4. Keep `{{#if slot}}` content only when slot is `true` or non-empty, otherwise its
   `{{else}}` content. Repeat `{{#each list}}` content once per item, in order, with
   `{{this}}` as the item. Drop block markers and header comment.
5. Turn every `$\{{` into `${{`; a slot inside it (`$\{{ secrets.{{apmTokenSecret}} }}`)
   is still filled. Change nothing else: no added steps, triggers,
   permissions or edited expressions.
6. Check output: no `{{`/`}}` outside `${{ ... }}`, no `$\{{`; YAML parses; run
   `actionlint` when available, else report it not run.
7. Write new staging file outside `.github/workflows/`, e.g. `.tmp/<id>.candidate.yml`.
   Show destination and complete diff; apply only after approval. Filling never
   pushes, triggers or deploys.

Example: slot `updateBranch` = `chore/apm-sync`.

```handlebars
env:
  PR_BRANCH: "{{updateBranch}}"
  GH_TOKEN: $\{{ github.token }}
```

```yaml
env:
  PR_BRANCH: "chore/apm-sync"
  GH_TOKEN: ${{ github.token }}
```

Extra triggers or changed template lines are local customizations: review separately
and preserve on update. Templates pin every action to a full commit SHA with a version
comment; bump pins only through the [reviewed lifecycle](workflow-greenkeeping.md).

## Provenance and upgrades

Every template and filled workflow carries:

- `fusion-workflow-template`: `apm-sync`, `apm-sync-reusable`, `app-deploy`, `app-monorepo-deploy` or `copilot-setup-steps`;
- `fusion-workflow-version`: independent template SemVer;
- `fusion-workflow-source`: canonical source URL;
- `fusion-workflow-owner`: `@equinor/fusion-core`.

Sidecar `.github/workflows/<name>.inputs.json` records immutable source pin (release
tag or commit SHA) plus complete non-secret raw inputs; review it with YAML. Pin selects
original template content; refilling it with recorded inputs reproduces old baseline
for three-way updates. Header/version is a claim, not proof
installed YAML is unmodified.

Bump template version when generated behavior changes; major for breaking input or
behavior change. Skill metadata version stays release-managed.

Released predecessors have no provenance: `apm/templates/apm-sync.yml` copies and
workflows calling `equinor/fusion-skills/.github/workflows/apm-sync.yml`. Treat as
unknown provenance; inventory local choices and offer reviewed adoption, never replacement.
