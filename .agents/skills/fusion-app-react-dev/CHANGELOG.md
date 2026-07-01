# Changelog

## 0.2.1 - 2026-03-23

### patch

- [#124](https://github.com/equinor/fusion-skills/pull/124) [`42150b6`](https://github.com/equinor/fusion-skills/commit/42150b62e1aa14c3c08007258a73d6902bb4dceb) - Deprecate fusion-app-react-dev in favor of fusion-developer-app


  - Set status to deprecated with successor pointer to fusion-developer-app
  - Added deprecation notice and migration guidance to SKILL.md
  - Moved to skills/.deprecated/

  Resolves equinor/fusion-core-tasks#848

## 0.2.0 - 2026-03-21

### minor

- [#108](https://github.com/equinor/fusion-skills/pull/108) [`5573046`](https://github.com/equinor/fusion-skills/commit/5573046cc9534d48740c6487690d2db3956c5a3b) - Add feature-flag guidance as `references/using-feature-flags.md`


  - Covers app-level `enableFeatureFlag` + `useFeature` from `@equinor/fusion-framework-react-app/feature-flag`
  - Covers framework-level `enableFeatureFlagging` with `createLocalStoragePlugin` and `createUrlPlugin` from `@equinor/fusion-framework-module-feature-flag`
  - Documents provider-based `useFeature(provider, key)` variant
  - Includes rollout checklist and cleanup guidance
  - Calls out `readonly` vs `readOnly` API ambiguity
  - Updated Step 6 module table and trigger phrases in SKILL.md to point to the new reference

  resolves equinor/fusion-core-tasks#840

## 0.1.2 - 2026-03-21

### patch

- [#104](https://github.com/equinor/fusion-skills/pull/104) [`67bfabd`](https://github.com/equinor/fusion-skills/commit/67bfabd6c3e950dc7681a000eebdc42bff3be5fb) - Delegate code convention checks to `fusion-code-conventions` skill — removes inline `references/code-conventions.md`, replaces Step 6 wall-of-links with a module routing table, and updates `code-quality` agent to aggregate findings from the dedicated conventions skill.

- [#106](https://github.com/equinor/fusion-skills/pull/106) [`1f8a01d`](https://github.com/equinor/fusion-skills/commit/1f8a01ddcb5c9afe9119a1fcf1ded2c6980036d0) - Update companion skill reference from `fusion-research-framework` to `fusion-research`.


  - update `metadata.skills` entry to `fusion-research`
  - update all inline references in SKILL.md and `agents/framework.md` to the renamed companion skill
  - broaden companion description to reflect the expanded scope (Framework, EDS, and skill catalog research)

## 0.1.1 - 2026-03-20

### patch

- [#101](https://github.com/equinor/fusion-skills/pull/101) [`2bc25ee`](https://github.com/equinor/fusion-skills/commit/2bc25eee94cd7bb80a8a9a0d1c844071fac0296f) - Expand `fusion-app-react-dev` with focused framework guidance for app settings, bookmarks, runtime config and assets, and analytics.


  - add dedicated references for the current settings, bookmark, runtime-config, and analytics surfaces
  - improve module guidance and review checklists for these workflows
  - broaden activation cues so the skill is easier to discover for common Fusion app tasks

  resolves equinor/fusion-core-tasks#746
  resolves equinor/fusion-core-tasks#747
  resolves equinor/fusion-core-tasks#751
  resolves equinor/fusion-core-tasks#754

- [#103](https://github.com/equinor/fusion-skills/pull/103) [`06b664d`](https://github.com/equinor/fusion-skills/commit/06b664d177a01a760738ae3d43f1670e665f81fe) - Teach `fusion-app-react-dev` to use the `fusion-research-framework` companion skill when implementation work depends on uncertain Fusion Framework APIs or examples.


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
