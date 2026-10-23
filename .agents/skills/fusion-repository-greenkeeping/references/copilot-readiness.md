# Copilot readiness check

Agent-run audit of Copilot environment and instructions. Objective checks only;
report findings with evidence and proposed fix; change nothing without approval.
Judging convention quality belongs to `fusion-code-conventions`.

Verified 2026-10-20 against GitHub docs:
[environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment),
[code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review),
[repository instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions).
Code review reads instructions from pull request **head** branch; setup files act only
from **default** branch.

## Inventory

List each file present, with size in bytes and lines:

- Environment: `.github/workflows/copilot-setup-steps.yml`, `.github/workflows/copilot-code-review.yml`.
- Always-loaded instructions: `.github/copilot-instructions.md`, `AGENTS.md` (nearest wins),
  `CLAUDE.md`, `GEMINI.md`, `REVIEW.md`.
- Scoped instructions: `.github/instructions/**/*.instructions.md`.
- Review skills: `.github/skills/*/SKILL.md` with review-focused name or description.

## Environment checks

| Check | Command or evidence | Severity |
| --- | --- | --- |
| Setup file missing | Inventory | warning; recommend [setup template](copilot-setup.md) |
| Not on default branch | `git ls-tree --name-only origin/<default> .github/workflows/copilot-setup-steps.yml` empty | blocking |
| Job not named `copilot-setup-steps` | Parse YAML `jobs` | blocking |
| Ignored job keys (anything except `steps`, `permissions`, `runs-on`, `services`, `snapshot`, `timeout-minutes`) or `timeout-minutes` > 59 | Parse YAML | warning; move values to step level |
| Latest default-branch run failed | `gh run list --workflow copilot-setup-steps.yml --branch <default> --limit 1 --json conclusion,url` | blocking: Copilot continues silently with partial environment |
| Run status unavailable | Command fails or no run | unverified, never passing |
| .NET SDK not selected for repository | `setup-dotnet` without applicable `global.json` (newest preinstalled SDK wins), or only a nested `global.json`; compare `dotnet --version` at root and pinned directory | warning; use template's pin and verify steps |
| No dependency install while lockfile exists, or no `dotnet restore` while solutions/projects exist | Compare steps with committed lockfiles and `.sln`/`.slnx`/`.csproj` | warning |

Apply same shape checks to `copilot-code-review.yml` when present; note it replaces
setup steps for review.

## Instruction checks

| Check | How | Severity |
| --- | --- | --- |
| Scoped file without `applyTo` | Frontmatter | warning: never applies |
| `applyTo` pattern matches no tracked file | Split on commas; `git ls-files -- ':(glob)<pattern>'` empty | warning |
| Invalid `excludeAgent` | Must be `code-review` or `cloud-agent` | warning |
| Broken relative link or referenced path | Path missing in repository | warning |
| Referenced command missing | e.g. `bun run <script>` / `npm run <script>` absent from `package.json` scripts | warning |
| Conflicting directives | Same topic, incompatible rules across always-loaded files or scoped files covering same paths; quote both | warning; maintainer decides |
| Duplicated guidance | Same rule repeated across always-loaded files | info; suggest one source |
| Size | Report always-loaded bytes/lines; review cost grows with instruction size | info; no fixed limit |

Unknown frontmatter keys used by other clients (e.g. `description`, `name`) are not findings.
Disable shell globbing (`set -f`) or quote patterns before passing them to `git ls-files`;
otherwise the shell expands `**` and match counts are wrong.

## Report

```markdown
| Severity | File | Check | Evidence | Proposed fix |
| --- | --- | --- | --- | --- |
```

Then list unverified items and the exact commands run. Offer fixes as one reviewable
diff; apply only after approval. Do not resolve contradictions yourself.
