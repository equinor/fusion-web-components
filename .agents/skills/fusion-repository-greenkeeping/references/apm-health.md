# APM consumer health

Read-only check that a repository's Agent Package Manager setup is reproducible and that
installed agent context is not silently edited. APM = Agent Package Manager, not application
performance monitoring. Sync automation itself: [APM sync](sync-workflows.md).

## Scope and evidence

Read committed `apm.yml`, `apm.lock.yaml`, `.gitignore`, deployed paths listed in lockfile
`deployed_files`, sync workflow, and docs that tell contributors to run `apm install`.
Record whether repo commits deployed files or regenerates them (gitignored + documented
install step): both are valid conventions.

Static by default. Raw `shasum -a 256` does not reproduce lockfile hashes: APM applies per-file rules
(e.g. APM 0.33.0 normalizes CRLF to LF for UTF-8 text without NUL bytes) and stores `sha256:<hex>`.
Apply producing CLI version's rules before comparing; if not reproducible, hash mismatch is **unknown**. CLI checks need
approval of exact command and installed version (`apm --version`, then `apm <cmd> --help`;
older CLIs lack newer commands):

| Command | Effect | Use |
| --- | --- | --- |
| `apm audit` | Hidden-Unicode content scan plus advisory, cache-only drift replay | Content safety; cold cache skips replay |
| `apm audit --ci` | Baseline lockfile checks, then replay diff; cold cache hydrates lock-pinned sources from network, fails closed | Strongest drift evidence |
| `apm outdated` | Read-only remote ref/registry comparison; network | Stale floats, newer releases |

Never run `apm install`, `apm update`, `--force` or `--strip` during audit: they rewrite deployed files.
Source: [APM drift detection](https://microsoft.github.io/apm/enterprise/drift-detection/) (checked 2026-10-31).

## Checks

| Check | Confirmed when | Priority | Fix |
| --- | --- | --- | --- |
| Manifest/lock disagree | `apm.yml` dependency has no lock entry; lock entry neither declared nor transitive; or declared ref/constraint (`#v2`, `#^2.4.0`) not satisfied by lock `resolved_ref`/`version`/`constraint` | high | Run `apm install` locally after approval; commit both files |
| Deployed file missing | Lockfile lists path absent on disk, and repo commits deployed files | high | Reinstall after approval |
| Installed copy edited | Hash computed with producing CLI's rules differs from `deployed_file_hashes`, or approved `apm audit` reports `modified` | medium | Move change to dependency source or a local override; next update overwrites or blocks it |
| Unmanaged duplicate | Same skill/instruction name exists as hand-copied file beside APM-managed one in another target dir | medium | Keep one owner; rename local variant |
| Floating ref | Dependency on branch (`resolved_ref: main`) without tag/semver constraint | low suggestion; confirmed if repo docs require pinned versions | Pin tag or semver range |
| CLI version drift | Lockfile `apm_version`, effective CLI version in sync workflow (`apm-version` input or action default) and contributor docs disagree on major/minor. `microsoft/apm-action` pin versions the action, not the CLI: audit it separately as an action pin | low | Align CLI on reviewed version |
| Cache committed | `apm_modules/` tracked or not ignored | medium | Ignore and untrack after approval |
| Sync token gap | Sync uses `github.token` with internal/private dependencies | high | [Detect visibility](sync-workflows.md#detect-visibility-first) |
| No update path | Dependencies exist, no sync workflow, docs promise current skills | low suggestion | Offer [APM sync](sync-workflows.md) template |

Traps:

- Lockfile `generated_at`/`resolved_at` change alone is noise, not drift.
- Missing `apm.yml` is not a finding unless docs reference APM. Absence is never a badge penalty.
- Deployed files gitignored by convention: missing on disk is expected; check docs say how to install.
- MCP servers declared in `apm.yml` need explicit consent on install; never auto-approve during fixes.
- Edited installed copy may be intentional local override: ask before reverting; never discard edits unapproved.

## Report

Per finding: ID (`apm-<slug>`), lockfile entry/dependency, evidence path:line or hash pair,
whether committed or regenerated convention, impact, fix. Separate static evidence from
approved CLI output with its version and date.
