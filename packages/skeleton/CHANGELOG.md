# Change Log

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

## 0.2.26

### Patch Changes

- [`c9413be`](https://github.com/equinor/fusion-web-components/commit/c9413beb02b168de63c2f978f121e80fe1b68614) Thanks [@odinr](https://github.com/odinr)! - update package.json

## 0.2.25

### Patch Changes

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - move from lerna version to changeset

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.14](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-skeleton@0.2.13...@equinor/fusion-wc-skeleton@0.2.14) (2022-02-08)

### Bug Fixes

- add npm ignore to packages ([8a9f436](https://github.com/equinor/fusion-web-components/commit/8a9f436f4d38c0fec431d9388ce3098853f8babc))

## [0.2.9](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-skeleton@0.2.8...@equinor/fusion-wc-skeleton@0.2.9) (2021-10-29)

### Bug Fixes

- fixed styling, documentation and refactoring ([e9d8164](https://github.com/equinor/fusion-web-components/commit/e9d816498e839419af1cbc86041584ee87e59d26))

## [0.2.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-skeleton@0.2.6...@equinor/fusion-wc-skeleton@0.2.7) (2021-10-28)

### Bug Fixes

- added documentation to avatar, renamed css variables and changed types to enum ([472d06b](https://github.com/equinor/fusion-web-components/commit/472d06b492642b87aea7c8d04fe2295f626ebb60))
- upgraded package and fixed typings ([72a2269](https://github.com/equinor/fusion-web-components/commit/72a226969cd30445d608cc98be1e61806886936d))

## [0.2.6](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-skeleton@0.2.5...@equinor/fusion-wc-skeleton@0.2.6) (2021-10-27)

### Bug Fixes

- added wrapper component and fixed spacing ([9e3186b](https://github.com/equinor/fusion-web-components/commit/9e3186b5065ef04c354931fffaf68a293d905388))

## [0.2.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-skeleton@0.2.4...@equinor/fusion-wc-skeleton@0.2.5) (2021-10-27)

### Bug Fixes

- fixed fluid ([7d255e1](https://github.com/equinor/fusion-web-components/commit/7d255e19609ca9d539e15d36b1c3216c6d046a21))

## [0.2.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-skeleton@0.2.3...@equinor/fusion-wc-skeleton@0.2.4) (2021-10-27)

### Bug Fixes

- changed render methods from public to protected and removed icon from text variant ([0d1f77f](https://github.com/equinor/fusion-web-components/commit/0d1f77fa509c8db3f79c5a4360425a19c949297e))

## [0.2.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-skeleton@0.2.2...@equinor/fusion-wc-skeleton@0.2.3) (2021-10-26)

### Bug Fixes

- added documentation and icon name attribute ([120732a](https://github.com/equinor/fusion-web-components/commit/120732a00448044f1b81694e3bd5496e324bc547))
- missing package ([6de44af](https://github.com/equinor/fusion-web-components/commit/6de44af69adb1b1ad99f81711995e75b86690fed))

# 0.2.0 (2021-10-01)

### Bug Fixes

- added docs ([f8b2fcf](https://github.com/equinor/fusion-web-components/commit/f8b2fcfeae46ce83526c9da0848002f96f20837b))
- fixed linting ([80db15d](https://github.com/equinor/fusion-web-components/commit/80db15d2aef631a5cbb46eab1c9b6ca9f886cce5))
- removed card component ([2e24e6c](https://github.com/equinor/fusion-web-components/commit/2e24e6c8aec443442d866378bab9e96fb7d0e845))

### Features

- added skeleton component ([24447d6](https://github.com/equinor/fusion-web-components/commit/24447d6e8c1714b3c08e887bcc398a4dca972e61))
