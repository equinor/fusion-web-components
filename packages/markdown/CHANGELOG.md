# Change Log

## 1.3.2

### Patch Changes

- [#1949](https://github.com/equinor/fusion-web-components/pull/1949) [`25b3682`](https://github.com/equinor/fusion-web-components/commit/25b36820dc0ab931b2328fcf23dc32cff9544a96) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add "Clear Formatting" functionality to markdown editor. The feature removes all formatting (marks, list items, block styles) from the selected text. Also adds a new menu item 'clear-format' for triggering the clear formatting action. Added prosemirror-transform dependency to support the implementation.

## 1.3.1

### Patch Changes

- [#1856](https://github.com/equinor/fusion-web-components/pull/1856) [`233c007`](https://github.com/equinor/fusion-web-components/commit/233c007197bcc26a08314cf58fd68ae507a08c1d) Thanks [@eikeland](https://github.com/eikeland)! - Updating package exports to be supportive of latest node versions and clients using bundler as moduleresolution

## 1.3.0

### Minor Changes

- [#1577](https://github.com/equinor/fusion-web-components/pull/1577) [`c6d1524`](https://github.com/equinor/fusion-web-components/commit/c6d15249643673d6d68894bd5b7ceb4a009cf025) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Update prosemirror packages
  - prosemirror-commands to 1.6.0
  - prosemirror-markdown to 1.13.0
  - prosemirror-model to 1.22.3
  - prosemirror-view to 1.33.11

### Patch Changes

- [#1562](https://github.com/equinor/fusion-web-components/pull/1562) [`150cc60`](https://github.com/equinor/fusion-web-components/commit/150cc606abaf489cbc432326b36af68e45052054) Thanks [@dependabot](https://github.com/apps/dependabot)! - chore(deps): bump lit from 3.1.3 to 3.2.0

- Updated dependencies [[`150cc60`](https://github.com/equinor/fusion-web-components/commit/150cc606abaf489cbc432326b36af68e45052054)]:
  - @equinor/fusion-wc-icon@2.3.1

## 1.2.1

### Patch Changes

- [#1461](https://github.com/equinor/fusion-web-components/pull/1461) [`0bc06db`](https://github.com/equinor/fusion-web-components/commit/0bc06dbf003e078bf73bf191a0de429ad443f836) Thanks [@eikeland](https://github.com/eikeland)! - Updates fusion-web-theme

## 1.2.0

### Minor Changes

- [#1072](https://github.com/equinor/fusion-web-components/pull/1072) [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update lit from 2.7.0 to 3.0.2

### Patch Changes

- Updated dependencies [[`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0)]:
  - @equinor/fusion-wc-icon@2.3.0

## 1.1.0

### Minor Changes

- [#1018](https://github.com/equinor/fusion-web-components/pull/1018) [`447c85e`](https://github.com/equinor/fusion-web-components/commit/447c85e803efa64825cbc84de671924c7cf8be3f) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for markdown-viewer

### Patch Changes

- [#1011](https://github.com/equinor/fusion-web-components/pull/1011) [`e15cbb6`](https://github.com/equinor/fusion-web-components/commit/e15cbb63cfad5c0979058fead76e24105199572a) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add missing icon dependency and update value from default slot to only include the text parts.

- [#956](https://github.com/equinor/fusion-web-components/pull/956) [`b423f3b`](https://github.com/equinor/fusion-web-components/commit/b423f3b7c052ae9b942339d7d777a4b907d824e0) Thanks [@dependabot](https://github.com/apps/dependabot)! - updated prosemirror-view

## 1.0.2

### Patch Changes

- Updated dependencies [[`68ecc45`](https://github.com/equinor/fusion-web-components/commit/68ecc45544fbb3de9db701831b50d669dce02133)]:
  - @equinor/fusion-wc-icon@2.2.0

## 1.0.1

### Patch Changes

- Updated dependencies [[`aeed5b1`](https://github.com/equinor/fusion-web-components/commit/aeed5b1d0bf8f540ec86ad1e28d09b1c2d0348a9)]:
  - @equinor/fusion-wc-icon@2.1.0

## 1.0.0

### Major Changes

- [#868](https://github.com/equinor/fusion-web-components/pull/868) [`a31dd11`](https://github.com/equinor/fusion-web-components/commit/a31dd11a7b8f5515cc62344849b2ce765861267a) Thanks [@odinr](https://github.com/odinr)! - initial update to pnpm
  - update all packages to use workspace for local packages
  - fix all missing references
  - cleanup root scripts
  - update lerna config

  > moved to major since so many packages had missing deps (resolved threw peer deps)
  >
  > this might alter render and cause 'correct' behavior, but current relays on 'wrong'

### Patch Changes

- Updated dependencies [[`a31dd11`](https://github.com/equinor/fusion-web-components/commit/a31dd11a7b8f5515cc62344849b2ce765861267a)]:
  - @equinor/fusion-wc-core@2.0.0
  - @equinor/fusion-wc-icon@2.0.0

## 0.3.6

### Patch Changes

- [`c9413be`](https://github.com/equinor/fusion-web-components/commit/c9413beb02b168de63c2f978f121e80fe1b68614) Thanks [@odinr](https://github.com/odinr)! - update package.json

## 0.3.5

### Patch Changes

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - move from lerna version to changeset

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-markdown@0.3.3...@equinor/fusion-wc-markdown@0.3.4) (2023-08-24)

**Note:** Version bump only for package @equinor/fusion-wc-markdown

## [0.3.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-markdown@0.3.2...@equinor/fusion-wc-markdown@0.3.3) (2023-07-06)

### Bug Fixes

- **markdown:** log remove ([0f2f654](https://github.com/equinor/fusion-web-components/commit/0f2f654cbc5026f884acc17413ae4a5731959921))

## [0.3.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-markdown@0.3.1...@equinor/fusion-wc-markdown@0.3.2) (2023-07-06)

### Bug Fixes

- **markdown:** comments ([955eec9](https://github.com/equinor/fusion-web-components/commit/955eec9c0ac905c35410f3e2e2b006956cd32c37))
- **markdown:** on copy/paste event ([0282707](https://github.com/equinor/fusion-web-components/commit/0282707e306c59bb9de3304c8f1f52bc5f8ab05e))

## [0.3.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-markdown@0.3.0...@equinor/fusion-wc-markdown@0.3.1) (2023-06-19)

**Note:** Version bump only for package @equinor/fusion-wc-markdown

# [0.3.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-markdown@0.2.3...@equinor/fusion-wc-markdown@0.3.0) (2023-05-09)

### Features

- **markdown:** add markdown-viewer ([32ee915](https://github.com/equinor/fusion-web-components/commit/32ee91591e3bb10b1bbbbe21ff9970867d56b30d)), closes [#592](https://github.com/equinor/fusion-web-components/issues/592)

## [0.2.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-markdown@0.2.2...@equinor/fusion-wc-markdown@0.2.3) (2023-03-24)

### Bug Fixes

- **markdown-editor:** typo ([3c19abf](https://github.com/equinor/fusion-web-components/commit/3c19abf88133479efd80f68ea7f8ef4f15d1a323))

## [0.2.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-markdown@0.2.1...@equinor/fusion-wc-markdown@0.2.2) (2023-03-24)

**Note:** Version bump only for package @equinor/fusion-wc-markdown

## [0.2.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-markdown@0.2.0...@equinor/fusion-wc-markdown@0.2.1) (2023-03-23)

### Bug Fixes

- **markdown-editor:** wc builder ([32f00a4](https://github.com/equinor/fusion-web-components/commit/32f00a41f7e779c0a366dd7d40c167f37b905117))

# [0.2.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-markdown@0.1.0...@equinor/fusion-wc-markdown@0.2.0) (2023-03-23)

### Bug Fixes

- **markdown-editor:** component fix ([703b61b](https://github.com/equinor/fusion-web-components/commit/703b61bc3e8d541c69b405f287ad399874a17a5a))

### Features

- **markdown-editor:** created component ([89ad4dc](https://github.com/equinor/fusion-web-components/commit/89ad4dcd916df6aad7921516b825df784ba75826))

# 0.1.0 (2023-03-22)

### Features

- **markdown-editor:** created component ([0d8bbbd](https://github.com/equinor/fusion-web-components/commit/0d8bbbd079461281e5ad38375e39599caad7da4e))
