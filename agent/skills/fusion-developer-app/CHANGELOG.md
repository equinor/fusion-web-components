# Changelog

## 0.3.0 - 2026-05-07

### minor

- [#860](https://github.com/equinor/fusion-skills/pull/860) [`96f1768`](https://github.com/equinor/fusion-skills/commit/96f1768e3f1cdf988caa4a398776d8753b4cb77f) - Add design agent to fusion-developer-app


  - Add `agents/design.md` helper agent covering Fusion Portal shell composition, layout zone nesting, side panel usage (SideSheet), empty/loading state patterns, and structural anti-patterns
  - Update `SKILL.md` Step 4 to reference `design.md` for page/view structure review and `styling.md` for component-level checks
  - Update helper agents section to include `design.md` with clear scope boundary vs `styling.md`

  Agent references `equinor-design-system` system skill for authoritative token and layout zone ground truth, and delegates component-level EDS checks to `agents/styling.md`.

  resolves equinor/fusion-core-tasks#860

### patch

- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and all references.


  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress all using-*.md, configure-*.md, styled-components, styling-with-eds, project-structure references

## 0.2.0 - 2026-05-05

### minor

- [#753](https://github.com/equinor/fusion-skills/pull/753) [`88878fe`](https://github.com/equinor/fusion-skills/commit/88878fe1c7d4fbfdd6b49139f3718e68d8e5aad7) - Add custom Fusion Framework module authoring reference


  - Add `references/using-custom-modules.md` covering the IModule contract, wiring into `config.ts`, accessing via `useAppModule`, module lifecycle, file structure, and common pitfalls (naming conflicts, outside-React access, un-awaited config)
  - Update `SKILL.md` Step 6 module table with a `using-custom-modules.md` entry
  - Add custom-module-related activation triggers

  resolves equinor/fusion-core-tasks#753

- [#160](https://github.com/equinor/fusion-skills/pull/160) [`0428056`](https://github.com/equinor/fusion-skills/commit/042805616fba13256265b1622c0cdd344f59197a) - Add Fusion Framework people service reference


  - Add `references/using-people-service.md` covering the preferred `azureId`-only integration pattern, picker components, `PersonCell` for AG Grid, and guidance on what NOT to do (manual API calls, caching PersonInfo)
  - Update `SKILL.md` Step 6 module table with a `using-people-service.md` entry
  - Add people-related activation triggers to the skill description

  resolves equinor/fusion-core-tasks#748

- [#858](https://github.com/equinor/fusion-skills/pull/858) [`50bfdf6`](https://github.com/equinor/fusion-skills/commit/50bfdf6451059951e94e8ec4b69fdc33e77d4c7a) - Add person component training wheels to fusion-developer-app


  - Expand `references/using-fusion-react-components.md` with `PersonCard`, `PersonListItem`, and `PersonCell` (AG Grid) usage examples
  - Add a decision guide table covering all person components and their intended use cases
  - Add new `agents/person-components.md` helper agent covering component selection, the custom DOM event pattern, `PersonCell` valueGetter setup, and common pitfalls
  - Update `SKILL.md` helper agents section and Step 6 module table to reference the new agent

  resolves equinor/fusion-core-tasks#858

- add companion-skill metadata for `fusion-research-framework`
  - delegate framework API and package research before choosing app implementation patterns
  - align the framework helper agent with the shared source-backed research workflow

## 0.1.0 - 2026-03-18

### minor

- [#97](https://github.com/equinor/fusion-skills/pull/97) [`da1c011`](https://github.com/equinor/fusion-skills/commit/da1c011b803f79ba159313d54b531ab9dbcc6708) - Add fusion-app-react-dev skill to the catalog


  Guides feature development in Fusion Framework React apps — scaffolding
  components, hooks, services, and types that follow EDS conventions and
  Fusion Framework patterns. Includes helper agents for framework review,
  styling review, and code-quality review, plus reference docs and asset
  checklists.

  resolves equinor/fusion-core-tasks#799
