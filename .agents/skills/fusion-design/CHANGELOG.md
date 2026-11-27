# Changelog

## 0.2.0 - 2026-11-21

### minor

- [#493](https://github.com/equinor/fusion-skills/pull/493) [`6ad5348`](https://github.com/equinor/fusion-skills/commit/6ad5348913e97384b0e38b8b51d22bb917135fd5) - Add zero-dependency static invariant checker script for non-negotiable UI rules.


  - Add read-only `scripts/check-design-invariants.ts` checking bare HTML text tags, hardcoded `px` spacing, `BannerIcon` outside `Banner`, and block `Typography` inside `BannerMessage`
  - Wire the checker into `SKILL.md` handoff instructions

- [#494](https://github.com/equinor/fusion-skills/pull/494) [`cfb061e`](https://github.com/equinor/fusion-skills/commit/cfb061e8910a41c42d0c342a4b81e2a17c0d108a) - Protect existing apps, fix border-radius tokens, and add a guarded decision tree and `DESIGN.md` template


  - `SKILL.md`: add **Existing apps & rule strength** splitting mandatory rules (invariants, safety constraints, settled destructive-action/button-placement/dialog-copy rules, runtime/accessibility guards) from recommended defaults for new UI, plus an inline threshold stop gate before code edits
  - `SKILL.md`: harmonize static invariant checker output with existing-app protection (fix new/changed code; report pre-existing violations in untouched lines as suggestions unless runtime-breaking) and declare Fusion MCP under `metadata.mcp.suggested`
  - `references/decision-tree.md`: add ordered decision tree for new UI, scope matrix, existing-UI threshold check, 2-independent-sections open question, EDS fact verification, and `DESIGN.md` precedence/recording rules
  - `assets/DESIGN.md.hbs`: add app design contract template for apps without `DESIGN.md` (with `Revisit when` conditions; never reformats an existing `DESIGN.md`)
  - `references/navigation-sidemenu.md`, `references/navigation-tabs.md`, `references/layout.md`: resolve the 3–5 view overlap and link to the threshold check and 2-section rule in `decision-tree.md`
  - `references/spacing.md`: replace undefined `--eds-shape-corners-border-radius` with `@equinor/eds-tokens` v2 `--eds-spacing-border-radius-rounded` / `-none` / `-pill`
  - `references/actions.md`: mark action bar as ratified (`ready`) but optional until a shared component exists, and fix the broken destructive-actions doc reference

  refs equinor/fusion-skills#415
  refs equinor/fusion-skills#416

## 0.1.3 - 2026-11-01

### patch

- [#391](https://github.com/equinor/fusion-skills/pull/391) [`ece2d45`](https://github.com/equinor/fusion-skills/commit/ece2d4547c2cfd491234816c41c780b5153850ec) - Read task-relevant Fusion Design references instead of the full catalog before every frontend change. Keep typography, spacing, failure handling and both confirmation layers visible before code.


  resolves equinor/fusion-core-tasks#2689

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
