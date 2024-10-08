# Change Log

## 2.3.1

### Patch Changes

- [#1562](https://github.com/equinor/fusion-web-components/pull/1562) [`150cc60`](https://github.com/equinor/fusion-web-components/commit/150cc606abaf489cbc432326b36af68e45052054) Thanks [@dependabot](https://github.com/apps/dependabot)! - chore(deps): bump lit from 3.1.3 to 3.2.0

## 2.3.0

### Minor Changes

- [#1072](https://github.com/equinor/fusion-web-components/pull/1072) [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update lit from 2.7.0 to 3.0.2

## 2.2.0

### Minor Changes

- [#972](https://github.com/equinor/fusion-web-components/pull/972) [`68ecc45`](https://github.com/equinor/fusion-web-components/commit/68ecc45544fbb3de9db701831b50d669dce02133) Thanks [@odinr](https://github.com/odinr)! - allow slotting svg into fwc-icon

  - removed allowing setting svg as a property (don`t want content in memory)
  - added slot for adding svg content

## 2.1.0

### Minor Changes

- [#888](https://github.com/equinor/fusion-web-components/pull/888) [`aeed5b1`](https://github.com/equinor/fusion-web-components/commit/aeed5b1d0bf8f540ec86ad1e28d09b1c2d0348a9) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - add possibility to add svg template to `fwc-icon`.

  ```html
  <fwc-icon type="svg" icon='<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>'"></fwc-icon>
  ```

## 2.0.0

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

## 1.0.33

### Patch Changes

- [`c9413be`](https://github.com/equinor/fusion-web-components/commit/c9413beb02b168de63c2f978f121e80fe1b68614) Thanks [@odinr](https://github.com/odinr)! - update package.json

## 1.0.32

### Patch Changes

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - move from lerna version to changeset

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.31](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.30...@equinor/fusion-wc-icon@1.0.31) (2023-06-19)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.30](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.29...@equinor/fusion-wc-icon@1.0.30) (2023-03-24)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.29](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.28...@equinor/fusion-wc-icon@1.0.29) (2023-02-08)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.28](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.27...@equinor/fusion-wc-icon@1.0.28) (2023-02-07)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.27](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.26...@equinor/fusion-wc-icon@1.0.27) (2022-11-24)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.26](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.25...@equinor/fusion-wc-icon@1.0.26) (2022-11-07)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.25](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.24...@equinor/fusion-wc-icon@1.0.25) (2022-09-14)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.24](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.23...@equinor/fusion-wc-icon@1.0.24) (2022-02-24)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.23](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.22...@equinor/fusion-wc-icon@1.0.23) (2022-02-23)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.22](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.21...@equinor/fusion-wc-icon@1.0.22) (2022-02-18)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.21](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.20...@equinor/fusion-wc-icon@1.0.21) (2022-02-08)

### Bug Fixes

- add npm ignore to packages ([8a9f436](https://github.com/equinor/fusion-web-components/commit/8a9f436f4d38c0fec431d9388ce3098853f8babc))

## [1.0.20](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.19...@equinor/fusion-wc-icon@1.0.20) (2022-02-08)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.19](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.18...@equinor/fusion-wc-icon@1.0.19) (2022-02-07)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.18](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.17...@equinor/fusion-wc-icon@1.0.18) (2022-02-07)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.17](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.16...@equinor/fusion-wc-icon@1.0.17) (2022-01-19)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.16](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.15...@equinor/fusion-wc-icon@1.0.16) (2021-10-29)

### Bug Fixes

- **icon:** handle when no icon provided ([8f003a3](https://github.com/equinor/fusion-web-components/commit/8f003a3e61838ddd513f80d34d507254d1a54229))

## [1.0.15](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.14...@equinor/fusion-wc-icon@1.0.15) (2021-10-28)

### Bug Fixes

- updated packages ([b752691](https://github.com/equinor/fusion-web-components/commit/b75269105063dfbb150432bd86426e33d67ba869))

## [1.0.14](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.13...@equinor/fusion-wc-icon@1.0.14) (2021-10-22)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.13](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.12...@equinor/fusion-wc-icon@1.0.13) (2021-10-21)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.12](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.11...@equinor/fusion-wc-icon@1.0.12) (2021-09-30)

### Bug Fixes

- **icon:** change typing of name for autocomplete ([6357819](https://github.com/equinor/fusion-web-components/commit/6357819a86770066eb01726dc6b2aa4e8c05c491))

## [1.0.11](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.10...@equinor/fusion-wc-icon@1.0.11) (2021-09-23)

### Bug Fixes

- fixed lit imports ([1c15f6b](https://github.com/equinor/fusion-web-components/commit/1c15f6b865b9e43193942610f881ed1bc74a623c))

## [1.0.10](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.9...@equinor/fusion-wc-icon@1.0.10) (2021-09-23)

### Bug Fixes

- upgraded lit-element and lit-html to lit 2.0.0 with other packages ([93cd2f9](https://github.com/equinor/fusion-web-components/commit/93cd2f997d6045fd5ab69fe05ccee5acfa861ad7))

## [1.0.9](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.8...@equinor/fusion-wc-icon@1.0.9) (2021-09-01)

**Note:** Version bump only for package @equinor/fusion-wc-icon

## [1.0.8](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.7...@equinor/fusion-wc-icon@1.0.8) (2021-08-13)

### Bug Fixes

- fixed dependencies... again... and fixed export of date ([7cefc47](https://github.com/equinor/fusion-web-components/commit/7cefc47b307e67c3a79c41579e07ece70c2e0728))
- fixed deps... ([d9eebcb](https://github.com/equinor/fusion-web-components/commit/d9eebcb1d637e9c2bb64f465c9378f1fea17c973))

## [1.0.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.6...@equinor/fusion-wc-icon@1.0.7) (2021-08-13)

### Bug Fixes

- fixed dependencies for all packages ([9a78b73](https://github.com/equinor/fusion-web-components/commit/9a78b73068685cd4d096fdea1e8501464c18a51c))

## [1.0.6](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.5...@equinor/fusion-wc-icon@1.0.6) (2021-08-13)

### Bug Fixes

- upgraded packages ([edc5862](https://github.com/equinor/fusion-web-components/commit/edc58624c3921ef6c77020dd3a026f40ed1dd5f2))

## [1.0.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.4...@equinor/fusion-wc-icon@1.0.5) (2021-08-12)

### Bug Fixes

- added readme ([b2db09b](https://github.com/equinor/fusion-web-components/commit/b2db09b8be8889af0d4d8e8730338042630c2972))
- fixed type exports ([e7e19a5](https://github.com/equinor/fusion-web-components/commit/e7e19a59c3db40b20d29f9ea888614a188a2fcc4))
- replaced props interfaces with type ([39cc307](https://github.com/equinor/fusion-web-components/commit/39cc3078b3bb217587f5eb39020a312cb859bb96))

## [1.0.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.3...@equinor/fusion-wc-icon@1.0.4) (2021-07-15)

### Bug Fixes

- fixed size ([9c9f1bb](https://github.com/equinor/fusion-web-components/commit/9c9f1bbc3202f2cac1bc29328cd3c0991a02d77e))

## [1.0.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.2...@equinor/fusion-wc-icon@1.0.3) (2021-06-16)

### Bug Fixes

- fixed linting ([ce77a7b](https://github.com/equinor/fusion-web-components/commit/ce77a7bcf493e6d05b4201513b8676906130d235))

## [1.0.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-icon@1.0.1...@equinor/fusion-wc-icon@1.0.2) (2021-03-30)

### Bug Fixes

- update package deps ([24f71cd](https://github.com/equinor/fusion-web-components/commit/24f71cdb8f2ce709dcd7be534e3ddaea6496311f))

## 1.0.1 (2021-03-26)

**Note:** Version bump only for package @equinor/fusion-wc-icon
