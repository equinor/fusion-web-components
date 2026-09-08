# Changelog

## 0.1.5 - 2026-09-07

### patch

- [#237](https://github.com/equinor/fusion-skills/pull/237) [`a6cc390`](https://github.com/equinor/fusion-skills/commit/a6cc3908a11b26454a85484d7def5df1b6a5bd5a) Thanks [@alftore](https://github.com/alftore)! - Close backend-convention gaps found while validating `fusion-developer-services` against

  `equinor/fusion-pss-subsea-catalog`:

  - `csharp.conventions.md`: declare `[ProducesResponseType]` for every status code an action can
    actually return (including negative paths); note that XML doc comments on controller actions and
    request/response model properties surface in the generated OpenAPI document's `summary`/
    `description` fields when the project enables XML-comment inclusion (`Microsoft.AspNetCore.OpenApi`/
    Swashbuckle), not just IntelliSense; prefer a small static factory class for enriched
    `ProblemDetails` responses so controller actions stay one-liners.

## 0.1.4 - 2026-08-31

### patch

- [#223](https://github.com/equinor/fusion-skills/pull/223) [`22d93c3`](https://github.com/equinor/fusion-skills/commit/22d93c3d89eea1bd37a84980c8c183236c305c1f) - Add valid custom-agent frontmatter so APM parses and integrates the constitution and intent agents.

## 0.1.3 - 2026-05-07

### patch

- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and all convention references.


  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress typescript, react, csharp, markdown convention references

## 0.1.2 - 2026-03-23

### patch

- [#120](https://github.com/equinor/fusion-skills/pull/120) [`5eb8e4d`](https://github.com/equinor/fusion-skills/commit/5eb8e4d4af2fd8d1cb11d042339100cb1197753d) Thanks [@alftore](https://github.com/alftore)! - Improve C# conventions for clarity and consistency


  - Separate Controllers/ and Endpoints/ into distinct lines in the project layout to avoid ambiguity
  - Clarify Startup.cs guidance to distinguish the older Startup class pattern from the .NET 6+ minimal hosting model
  - Broaden error-handling guidance to cover both minimal API and MVC ProblemDetails helpers across supported target frameworks

## 0.1.1 - 2026-03-22

### patch

- [#118](https://github.com/equinor/fusion-skills/pull/118) [`90e0ee2`](https://github.com/equinor/fusion-skills/commit/90e0ee2c0f14b3e0c5e0073839b6679baea16295) - Clarify default rules vs repository-level precedence for agents


  - Add "Precedence and applicability" section to SKILL.md establishing resolution order: repo policy > tooling config > skill defaults
  - Add applicability callout to all four convention reference files (TypeScript, React, C#, Markdown)
  - Guide maintainers to record overrides in CONTRIBUTING.md, contributor guides, or ADRs

  Resolves equinor/fusion-core-tasks#842

## 0.1.0 - 2026-03-21

### minor

- [#104](https://github.com/equinor/fusion-skills/pull/104) [`67bfabd`](https://github.com/equinor/fusion-skills/commit/67bfabd6c3e950dc7681a000eebdc42bff3be5fb) - Add new `fusion-code-conventions` system skill — orchestrates TypeScript, React, C#, and Markdown convention checks, intent comment auditing, and ADR/contributor-doc constitution enforcement across language-specific agents.
