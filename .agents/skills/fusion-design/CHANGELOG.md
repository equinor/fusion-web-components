# Changelog

## 0.1.2 - 2026-07-23

### patch

- [#198](https://github.com/equinor/fusion-skills/pull/198) [`2ab8e00`](https://github.com/equinor/fusion-skills/commit/2ab8e008c4d38a50df481f115fa1a7d644bc071e) - Add action and layout references; fix typography and table-width guidance


  - Add `references/actions.md`: action bar (experimental), destructive-action `Dialog` structure, and button placement rules
  - Add `references/layout-centered-content.md`: centered-content layout rules for form- and reading-heavy pages
  - `references/eds-typography.md`: document the grouped-variant trap — `cell_header`/`cell_text` require `group="table"` (passes typecheck but crashes at runtime without it); prefer group-free quick variants
  - `references/layout.md`: data tables and lists must fill the full content width (`width: 100%`) in the full-width pattern
  - `SKILL.md`: add `actions.md` to the references table
  - `SKILL.md`: add a "Non-negotiable invariants" section so agents honour "all text uses `<Typography>`" and "all spacing uses EDS spacing variables" from the skill entry point, before reading references

- [#198](https://github.com/equinor/fusion-skills/pull/198) [`2ab8e00`](https://github.com/equinor/fusion-skills/commit/2ab8e008c4d38a50df481f115fa1a7d644bc071e) - Add Fusion design navigation/layout/spacing references


  - Add `references/navigation-sidemenu.md` with sidemenu structure, hierarchy, and breadcrumb rules
  - Add `references/navigation-tabs.md` with tab navigation rules
  - Add `references/layout.md` with content area layout patterns
  - Add `references/spacing.md` with EDS spacing token guidance
  - Update `SKILL.md` reference table to include the new references

- [#198](https://github.com/equinor/fusion-skills/pull/198) [`2ab8e00`](https://github.com/equinor/fusion-skills/commit/2ab8e008c4d38a50df481f115fa1a7d644bc071e) - Add empty-states, error-messages, and contextual-help references (including the Tooltip double-tooltip guidance).

## 0.1.1 - 2026-06-16

### patch

- [#180](https://github.com/equinor/fusion-skills/pull/180) [`e7ca6c1`](https://github.com/equinor/fusion-skills/commit/e7ca6c18b72a3313c5c21d3febc30a54594a5a8a) - Add EDS typography reference


  - Add `references/eds-typography.md` with EDS typography rules
  - Update SKILL.md to list the reference and clarify all references are mandatory

- [#182](https://github.com/equinor/fusion-skills/pull/182) [`6c262c3`](https://github.com/equinor/fusion-skills/commit/6c262c3cc2c100b3ce1598cfcd70c88a4fd54207) - Add sidemenu navigation reference


  - Add `references/navigation-sidemenu.md` with sidemenu structure, hierarchy, and breadcrumb rules
  - Update SKILL.md reference table to include the new navigation reference

## 0.1.0 - 2026-06-10

### minor

- [#178](https://github.com/equinor/fusion-skills/pull/178) [`e6e7e1f`](https://github.com/equinor/fusion-skills/commit/e6e7e1f0e7964965b9e63c489c4da6a31f13de9c) - Add experimental `fusion-design` skill


  New skill that looks up Fusion Design Guidelines and applies them to frontend code in the Fusion ecosystem. Covers layout, spacing, component usage, and interaction patterns. Supports app-local `DESIGN.md` overrides.

  Refs: equinor/fusion-core-tasks#860
