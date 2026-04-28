# Follow-Up Questions

Use these when required inputs are missing during skill activation.

## Q1: Target app

> Which app do you want to add Fusion Help integration to?
>
> Available apps: `fra-access-manager`, `fra-app-management`, `fra-mdl`, `fusion-resources-import-tool`, `one-equinor`, `org-admin`, `people-search`, `personnel-allocation`, `pro-org`, `resource-allocation-landingpage`, `task-management`

## Q2: Target pages

> Which pages should get a help button? I can check for all pages using `PageLayout` and wire them all, or you can specify individual pages.
>
> Options:
> - All pages using `PageLayout`
> - Specific pages (list them)

## Q3: Article slugs

> Should I auto-generate article slugs using the `{app-name}-{page-kebab}` convention, or do you have specific slugs?
>
> Note: Slugs must match articles published via the `fhelp` CLI. If the articles don't exist yet, I'll list the slugs you'll need to create.

## Q4: Release notes

> Should each page also include the "What's New" release notes button? (Default: yes)

## Q5: Constants file location

> Where should the `FUSION_HELP_ARTICLES` constants live?
>
> Common patterns in this repo:
> - `src/constants/helpArticles.ts` (used by `fra-app-management`)
> - `src/constants/fusionHelpArticles.ts` (used by `fra-access-manager`)
> - `src/pages/helpArticles.ts` (used by `personnel-allocation`)
>
> Default: `src/constants/helpArticles.ts`
