# Upgrade migration contract

Apply when update is not a pure patch, upstream reports a breaking change, or the upgrade needs code or config changes to pass CI. Applies to interactive and automated reviews.

Goal: a maintainer can tell an upgrade apart from a workaround.

## 1. Read the upstream upgrade guide

- Find upstream's official upgrade or migration guide covering `from → to`, not only release notes.
- Note guide URL and the steps that apply to this repository.
- No guide exists: say so in research notes; fall back to release notes and changelog.
- Point to upstream guide; do not copy it into the review.

## 2. Run documented migration tooling first

- When upstream documents a migration command or codemod, run it before hand-editing code or config. Examples: `biome migrate --write`, `npx @next/codemod`, `npx storybook automigrate`, ESLint config migrators.
- Record exact command and a short output summary, including "no migration needed".
- Report manual steps the tool prints; apply them or list them as follow-up.
- No documented tooling: record `None documented`.

## 3. Fix new findings in code

- New linter, formatter, or type-checker findings get fixed in code.
- Re-run the failing check after fixes and record result.

## 4. Suppress narrowly, never broadly

Never, just to pass CI:

- downgrade or disable a rule repository-wide
- add glob or path overrides that downgrade rules or disable tools for whole file sets
- turn off a check in CI config

Deliberate exception: use narrowest suppression the tool supports (line or node level, for example `biome-ignore`, `eslint-disable-next-line`, `@ts-expect-error`) with an inline reason. List every suppression added.

## 5. Treat new default behaviour as a decision

- Upgrade enables something new by default (for example a formatter for a new language, a new recommended rule set): keep today's behaviour with the tool's first-class opt-out (config flag), not path-based disables.
- Flag adoption as a maintainer decision in the verdict. Do not adopt or reject it silently.

## 6. Report steps in the verdict

Fill verdict migration fields:

- **Upgrade guide:** URL or `None found`
- **Migration command:** command and output summary, or `None documented`
- **Findings fixed:** count and kind, or `None`
- **Suppressions added:** each with location and reason, or `None`
- **Decisions deferred:** new defaults opted out pending maintainer choice, or `None`

Broad suppression found in the PR (including bot or earlier agent commits): code-quality lens is `blocking` and the suppression is a technical blocker until replaced by fixes, narrow suppressions, or first-class opt-outs.
