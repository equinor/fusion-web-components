# Follow-up Questions

Ask only the relevant unanswered questions from this bank. Do not ask all questions — pick the ones that would most reduce ambiguity for the current request.

## Scope questions

- Is this a single-package pass or a sweep across all packages?
- Should I process all packages in the workspace, or is there a specific subset?
- Are there packages I should skip (e.g., internal tooling, deprecated packages)?

## Standards questions

- Does this repository have documentation standards I should follow? (e.g., files under `.github/instructions/`, `CONTRIBUTING.md`)
- Is there a preferred README structure or template?
- Are there TSDoc conventions beyond the standard tags? (e.g., custom tags, specific example formats)

## Workflow questions

- Should I commit each package separately, or batch commits?
- What commit message format does this repository use? (e.g., `docs(package): description`)
- Is there a tracking issue I should update with progress?
- Should I create a PR after committing, or leave that to you?

## Quality questions

- How thorough should the `@example` coverage be? (every export vs. user-facing APIs only)
- Should I preserve existing README content or start fresh?
- Are there specific packages you'd like me to prioritize?

## Monorepo questions

- What workspace tool is this monorepo using? (npm workspaces, pnpm, turborepo, lerna, nx)
- Are there shared types packages that other packages depend on? (process those first)
- Is there a package dependency graph I should follow for ordering?
