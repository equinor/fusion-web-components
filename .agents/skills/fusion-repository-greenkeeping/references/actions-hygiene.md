# GitHub Actions workflow audit

Read-only audit of **existing** workflows, composite actions and reusable calls, whether
template-owned or hand-written. Report first; change only findings maintainer selects.
Template-owned workflow drift → [reviewed lifecycle](workflow-greenkeeping.md); never
rewrite a template-owned file outside that lifecycle.

## Scope and evidence

- Inventory `git ls-files .github/workflows .github/actions '**/action.yml' '**/action.yaml'`.
  Record triggers, jobs, `permissions`, `uses:` refs, runner labels, secret/variable **names**.
- Record local conventions first (e.g. `AGENTS.md` says tags allowed for `actions/*`,
  org ruleset requires SHA pins). Deliberate choices are respected conventions, not findings.
- Static by default. `actionlint` and `zizmor` run repo-local config and may contact
  network: run only after maintainer approves exact command. Prefer `zizmor --offline`;
  never supply a token for online audits. Report unrun tools as "not run".
- Repository/org settings (default token permissions, rulesets, required checks,
  environment protections, fork-PR approval) need admin read: **unknown** unless
  maintainer supplies evidence. Never read secret values.

## Security checks

| Check | Confirmed when | Priority | Fix |
| --- | --- | --- | --- |
| Untrusted input in `run:` | `${{ github.event.(issue\|pull_request\|comment\|review\|discussion).*.(title\|body) }}`, `github.head_ref`, commit messages or other attacker-controlled context expanded inline in `run:`/`script:` | high | Pass through `env:`, reference quoted `"$VAR"` |
| Privileged trigger runs PR code | `pull_request_target` or `workflow_run` checks out PR head (`ref: ${{ github.event.pull_request.head.sha }}`, `head.ref`, artifact from untrusted run) then builds, installs or runs scripts | high | Split: untrusted build on `pull_request`, privileged step consumes reviewed output only |
| Broad token permissions | `permissions: write-all`, or write scopes on jobs that only read | medium | Workflow-level `contents: read`; grant writes per job |
| No explicit `permissions` | Neither workflow nor job declares it | unknown → medium if org default known write | Declare least privilege; default depends on org/repo setting |
| Mutable third-party ref | `uses: owner/action@main\|master\|<branch>` | medium | Pin to release commit SHA + version comment |
| Tag-pinned third-party action | `@v4` on non-GitHub-owned action | low suggestion; confirmed if local policy requires SHA | Full SHA + `# vX.Y.Z` comment |
| `secrets: inherit` across repos | Reusable workflow from another repo/owner receives all secrets | medium | Pass named secrets only |
| Persisted checkout credentials | `actions/checkout` without `persist-credentials: false` in job that later runs untrusted code or uploads workspace artifacts | low | `persist-credentials: false` unless later step pushes |
| Hard-coded credential | Literal token/password/connection string in YAML | high | Remove, rotate through owners, use secret; never print value |

Trap: expression in `if:`, `env:` or data-only `with:` inputs is not script injection. Executable inputs are:
`actions/github-script` `with.script` and similar eval-style inputs; pass via `env:` and read `process.env.VAR`.
Trap: `pull_request_target` that only labels/comments without checking out PR code is a normal pattern.

## Currency checks

Verify against sources at check date; record date. Never rely on remembered deprecation dates.

| Check | Source | Confirmed when |
| --- | --- | --- |
| Retired runner label | [runner-images Available Images](https://github.com/actions/runner-images#available-images) for standard GitHub-hosted labels | Standard hosted label absent from list. Checked 2026-10-31: `ubuntu-20.04`, `windows-2019`, `macos-13` absent; `macos-14` marked deprecated (planning finding with announcement link). Larger-runner, ARM-partner and self-hosted labels use other inventories: **unknown** unless that inventory is checked |
| Old action runtime | `runs.using` in `action.yml` at pinned ref | `node12`, `node16` or `node20`. Node 20 removed from hosted runners 2026-09-23 ([changelog](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/)); bump to major running `node24`, check its release notes |
| Deprecated workflow commands | [Workflow commands](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands) | `::set-output`, `::save-state` → `$GITHUB_OUTPUT`, `$GITHUB_STATE`; `::set-env`, `::add-path` are disabled → `$GITHUB_ENV`, `$GITHUB_PATH` |
| Opt-out env left behind | Workflow/runner `env` | `ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION` or `ACTIONS_ALLOW_UNSECURE_COMMANDS` set |
| Toolchain version drift | Version files vs `setup-node`/`setup-dotnet`/`pnpm/action-setup` inputs | CI hard-codes version contradicting `.nvmrc`, `packageManager`, `global.json`; prefer `node-version-file`/`global-json-file` |

## Reliability and dead references

- `uses: ./path` composite action or reusable workflow path missing → confirmed, high when on default-branch trigger.
- Job `needs:` naming missing job, `outputs` referencing missing step id, matrix keys unused → confirmed (actionlint finds most).
- Command in `run:` resolves nowhere → confirmed. Trace resolution and effective `working-directory` first:
  `pnpm <name>` also runs dependency binaries (`pnpm tsc`), runner images and earlier setup steps provide tools.
  Only a manifest script name (`pnpm run build:ci`, `npm run build:ci`) absent from that directory's `scripts` is confirmed; else unknown.
- No `timeout-minutes` (default 360) on long or self-hosted jobs → low suggestion.
- Deploy/release jobs without `concurrency` group → medium suggestion; PR CI without `cancel-in-progress` → low.
- Scheduled workflows in public repos are disabled after 60 days without repository activity → unknown; name it when schedule matters.
- Required-check names changed by rename/matrix edit → unknown unless ruleset evidence supplied; blocks merges silently.

## Selected fixes

Edit only selected findings' files. Preserve triggers, environments, concurrency and local steps.
Pin bumps: resolve SHA from action's release tag read-only (`gh api repos/<o>/<a>/git/ref/tags/<tag>`),
show tag and SHA; annotated tags need peeled commit. Validate: YAML parses, `actionlint` if approved,
syntax-check changed `run:` blocks for their effective shell (step `shell:`, `defaults.run.shell`, runner OS default:
`bash` on Linux/macOS, `pwsh` on Windows) without executing: `bash -n` for bash/sh, PowerShell parser for `pwsh`,
`python -m py_compile` on extracted Python; no available checker → report "not run". Local fix never implies push, dispatch or settings change.
After SHA pinning, check Dependabot/Renovate coverage per [Dependabot](dependabot.md).

## Finding example

> `actions-inject-pr-title` · ci · high · confirmed — `.github/workflows/label.yml:21` runs
> `echo "${{ github.event.pull_request.title }}"` on `pull_request_target`. A crafted PR title runs shell
> with write token. Fix: `env: TITLE: ${{ github.event.pull_request.title }}` and `echo "$TITLE"`.

Avoid: "Pin every `actions/*` to SHA (high)" when repo instructions accept GitHub-owned tags.
