# Change Log

## 2.1.2

### Patch Changes

- [#2261](https://github.com/equinor/fusion-web-components/pull/2261) [`abd3915`](https://github.com/equinor/fusion-web-components/commit/abd39157a95fd9f2ce7f268a4dcf4512dcf0ee5d) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Security patch to override:

  - picomatch >= 4.0.0, < 4.0.4 to 4.0.4
  - serialize-javascript < 7.0.5 to 7.0.5

## 2.1.1

### Patch Changes

- [#2226](https://github.com/equinor/fusion-web-components/pull/2226) [`0c2033a`](https://github.com/equinor/fusion-web-components/commit/0c2033a983deece5461c141fcde6d71b6061f20f) Thanks [@odinr](https://github.com/odinr)! - Remove source maps from build output. Source maps were included in packages but referenced source files that were excluded from npm, making them broken and adding unnecessary size.

## 2.1.0

### Minor Changes

- [#2215](https://github.com/equinor/fusion-web-components/pull/2215) [`ba38e3c`](https://github.com/equinor/fusion-web-components/commit/ba38e3c22bb508d98281d5976202cf9907fa0165) Thanks [@chdefrene](https://github.com/chdefrene)! - Upgrade from TypeScript 5 to 6

### Patch Changes

- Updated dependencies [[`ba38e3c`](https://github.com/equinor/fusion-web-components/commit/ba38e3c22bb508d98281d5976202cf9907fa0165)]:
  - @equinor/fusion-wc-progress-indicator@1.2.0
  - @equinor/fusion-wc-formfield@1.2.0
  - @equinor/fusion-wc-checkbox@1.2.0
  - @equinor/fusion-wc-skeleton@2.2.0
  - @equinor/fusion-wc-button@2.5.0
  - @equinor/fusion-wc-person@3.5.0
  - @equinor/fusion-wc-chip@1.3.0
  - @equinor/fusion-wc-icon@2.4.0

## 2.0.1

### Patch Changes

- [#2183](https://github.com/equinor/fusion-web-components/pull/2183) [`fbff2c5`](https://github.com/equinor/fusion-web-components/commit/fbff2c5b80560f85ec3ad9d90953419026f1f14f) Thanks [@eikeland](https://github.com/eikeland)! - Show expired account status in the people table and fix singular versus plural viewing text.

## 2.0.0

### Major Changes

- [#2155](https://github.com/equinor/fusion-web-components/pull/2155) [`6081b7e`](https://github.com/equinor/fusion-web-components/commit/6081b7ecf8cab5fe0a91bfd1cf5457c245bf29dd) Thanks [@eikeland](https://github.com/eikeland)! - **Breaking change**
  Rename public display props in people components for consistency:

  - `viewMode` is replaced by `display`
  - `showViewMode` is replaced by `displayToggle`

  **Refactored**
  Also refines picker/viewer behavior and selected-people state handling.

### Patch Changes

- Updated dependencies [[`6081b7e`](https://github.com/equinor/fusion-web-components/commit/6081b7ecf8cab5fe0a91bfd1cf5457c245bf29dd)]:
  - @equinor/fusion-wc-person@3.4.0

## 1.0.2

### Patch Changes

- [#2143](https://github.com/equinor/fusion-web-components/pull/2143) [`056e538`](https://github.com/equinor/fusion-web-components/commit/056e53841599edd1462e7f6ab6912ccd695b7c55) Thanks [@eikeland](https://github.com/eikeland)! - Fix escape-key handling to close or refocus picker elements without unintended clicks.

  Removes unnecessary padding on top of people components.

## 1.0.1

### Patch Changes

- [`3661fb7`](https://github.com/equinor/fusion-web-components/commit/3661fb72eb938db542f67bd448f21644b6108232) Thanks [@odinr](https://github.com/odinr)! - Validation changeset to test OIDC trusted publishing for newly added packages and confirm the OIDC release workflow works as expected.
  - `@equinor/fusion-wc-people`: validation bump for OIDC workflow verification
  - `@equinor/fusion-web-components`: validation bump for OIDC workflow verification

## 1.0.0

### Major Changes

- [#2069](https://github.com/equinor/fusion-web-components/pull/2069) [`1a72d5a`](https://github.com/equinor/fusion-web-components/commit/1a72d5a1045610347cb55353a362d88167ecbfc8) Thanks [@eikeland](https://github.com/eikeland)! - Added new @equinor/fusion-wc-people package with comprehensive web component library for selecting and viewing people. Includes fwc-people-picker component for person selection with advanced search functionality, debounced search, keyboard navigation, and support for preselected people. Includes fwc-people-viewer component for displaying people in list or table format with responsive design. Features avatar customization with colors, service principal support, copyable names, and application badges.

### Patch Changes

- Updated dependencies [[`1a72d5a`](https://github.com/equinor/fusion-web-components/commit/1a72d5a1045610347cb55353a362d88167ecbfc8), [`1a72d5a`](https://github.com/equinor/fusion-web-components/commit/1a72d5a1045610347cb55353a362d88167ecbfc8), [`1a72d5a`](https://github.com/equinor/fusion-web-components/commit/1a72d5a1045610347cb55353a362d88167ecbfc8), [`1a72d5a`](https://github.com/equinor/fusion-web-components/commit/1a72d5a1045610347cb55353a362d88167ecbfc8)]:
  - @equinor/fusion-wc-person@3.3.0
