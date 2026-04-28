# Changelog

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
