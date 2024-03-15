# Change Log

## 1.2.1

### Patch Changes

- [#1461](https://github.com/equinor/fusion-web-components/pull/1461) [`0bc06db`](https://github.com/equinor/fusion-web-components/commit/0bc06dbf003e078bf73bf191a0de429ad443f836) Thanks [@eikeland](https://github.com/eikeland)! - Updates fusion-web-theme

## 1.2.0

### Minor Changes

- [#1072](https://github.com/equinor/fusion-web-components/pull/1072) [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update lit from 2.7.0 to 3.0.2

### Patch Changes

- Updated dependencies [[`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0)]:
  - @equinor/fusion-wc-ripple@1.1.0
  - @equinor/fusion-wc-icon@2.3.0

## 1.1.1

### Patch Changes

- Updated dependencies [[`68ecc45`](https://github.com/equinor/fusion-web-components/commit/68ecc45544fbb3de9db701831b50d669dce02133)]:
  - @equinor/fusion-wc-icon@2.2.0

## 1.1.0

### Minor Changes

- [#908](https://github.com/equinor/fusion-web-components/pull/908) [`c786e48`](https://github.com/equinor/fusion-web-components/commit/c786e48e725c06499960193e1a4a7a151f3c722f) Thanks [@odinr](https://github.com/odinr)! - Update chip element

  - updated story
  - fix markup
  - update css

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
  - @equinor/fusion-wc-ripple@1.0.0
  - @equinor/fusion-wc-core@2.0.0
  - @equinor/fusion-wc-icon@2.0.0

## 0.2.25

### Patch Changes

- [`c9413be`](https://github.com/equinor/fusion-web-components/commit/c9413beb02b168de63c2f978f121e80fe1b68614) Thanks [@odinr](https://github.com/odinr)! - update package.json

## 0.2.24

### Patch Changes

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - move from lerna version to changeset

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.23](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-chip@0.2.22...@equinor/fusion-wc-chip@0.2.23) (2023-06-19)

### Bug Fixes

- **chip:** double trigger on remove click ([b263f89](https://github.com/equinor/fusion-web-components/commit/b263f89c83da1426befcbc15659d60ad712d6b1c))

## [0.2.13](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-chip@0.2.12...@equinor/fusion-wc-chip@0.2.13) (2022-02-08)

### Bug Fixes

- add npm ignore to packages ([8a9f436](https://github.com/equinor/fusion-web-components/commit/8a9f436f4d38c0fec431d9388ce3098853f8babc))

## [0.2.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-chip@0.2.6...@equinor/fusion-wc-chip@0.2.7) (2021-10-29)

### Bug Fixes

- fixed styling, documentation and refactoring ([e9d8164](https://github.com/equinor/fusion-web-components/commit/e9d816498e839419af1cbc86041584ee87e59d26))

## [0.2.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-chip@0.2.4...@equinor/fusion-wc-chip@0.2.5) (2021-10-28)

### Bug Fixes

- updated packages ([b752691](https://github.com/equinor/fusion-web-components/commit/b75269105063dfbb150432bd86426e33d67ba869))

## [0.2.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-chip@0.2.3...@equinor/fusion-wc-chip@0.2.4) (2021-10-26)

### Bug Fixes

- **chip:** rendering of slots ([c50c707](https://github.com/equinor/fusion-web-components/commit/c50c7078c31504c34b99637ef9597edef50d98b0))

## [0.2.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-chip@0.2.2...@equinor/fusion-wc-chip@0.2.3) (2021-10-22)

### Bug Fixes

- force release ([077adb6](https://github.com/equinor/fusion-web-components/commit/077adb64953e7e8b6b9ba2c60d64a3d4b4695546))

## [0.2.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-chip@0.2.1...@equinor/fusion-wc-chip@0.2.2) (2021-10-21)

### Bug Fixes

- fixed color and styling issues ([3afbdac](https://github.com/equinor/fusion-web-components/commit/3afbdac6a6f63938395b9619f5ad06895a42379a))
- fixed render issue ([f76b483](https://github.com/equinor/fusion-web-components/commit/f76b4832f9a3b4310c801bb845f2f77e85f5f497))
- styling fixes and addition of events ([7c50173](https://github.com/equinor/fusion-web-components/commit/7c50173f0a041c846e3e9037b9468de074229978))

## [0.2.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-chip@0.2.0...@equinor/fusion-wc-chip@0.2.1) (2021-10-18)

### Bug Fixes

- fixed disabled color and display ([85438a0](https://github.com/equinor/fusion-web-components/commit/85438a0e9fc382b96a60ae745526e21b5c828ea0))

# 0.2.0 (2021-10-05)

### Bug Fixes

- added props type and docs ([a8b787f](https://github.com/equinor/fusion-web-components/commit/a8b787f3b2c44324343df58811a9367c67bc8457))

### Features

- added chip component ([92c7d5e](https://github.com/equinor/fusion-web-components/commit/92c7d5e1a8911c1fa6ca3a645c2bf88a433f58b3))

## [0.2.9](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-badge@0.2.8...@equinor/fusion-wc-badge@0.2.9) (2021-09-27)

### Bug Fixes

- rendering of disabled ([fcf3659](https://github.com/equinor/fusion-web-components/commit/fcf365929939b54bb8a0d0f6848a5f57683c0b1c))

## [0.2.8](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-badge@0.2.7...@equinor/fusion-wc-badge@0.2.8) (2021-09-26)

### Bug Fixes

- **badge:** remove unnecessary props ([7e470d5](https://github.com/equinor/fusion-web-components/commit/7e470d5e26671e52a2d1fc7376a67ca8c9963d92))

## [0.2.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-badge@0.2.6...@equinor/fusion-wc-badge@0.2.7) (2021-09-26)

### Bug Fixes

- **badge:** reflect required attributes for styling ([8060c4c](https://github.com/equinor/fusion-web-components/commit/8060c4cbaf890d6aec05cfeb932e61c479736cd3))

## [0.2.6](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-badge@0.2.5...@equinor/fusion-wc-badge@0.2.6) (2021-09-23)

### Bug Fixes

- fixed lit imports ([1c15f6b](https://github.com/equinor/fusion-web-components/commit/1c15f6b865b9e43193942610f881ed1bc74a623c))

## [0.2.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-badge@0.2.4...@equinor/fusion-wc-badge@0.2.5) (2021-09-23)

### Bug Fixes

- fixed linting ([ca6a86e](https://github.com/equinor/fusion-web-components/commit/ca6a86ebda14f6c85cb58f125778e94847b70b1d))
- upgraded lit-element and lit-html to lit 2.0.0 with other packages ([93cd2f9](https://github.com/equinor/fusion-web-components/commit/93cd2f997d6045fd5ab69fe05ccee5acfa861ad7))

## [0.2.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-badge@0.2.2...@equinor/fusion-wc-badge@0.2.3) (2021-09-16)

### Bug Fixes

- added x-small size ([4aad6d1](https://github.com/equinor/fusion-web-components/commit/4aad6d1125f72c4593800df9de2638e62b66d6e6))
- fixed circular offset for sizes, added disabled and fixed hover ([9970e4b](https://github.com/equinor/fusion-web-components/commit/9970e4bcf78c416f68001ad0b3c35a1b5db59293))

## [0.2.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-badge@0.2.1...@equinor/fusion-wc-badge@0.2.2) (2021-09-07)

### Bug Fixes

- size and position adjustments ([fbc7ec6](https://github.com/equinor/fusion-web-components/commit/fbc7ec61a6254179550b97fbb9034f5e81fa8168))

## [0.2.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-badge@0.2.0...@equinor/fusion-wc-badge@0.2.1) (2021-09-06)

### Bug Fixes

- fixed publish config ([e7e27ec](https://github.com/equinor/fusion-web-components/commit/e7e27ec939fa6b3183dc43ded06418c714a06f89))

# 0.2.0 (2021-09-06)

### Bug Fixes

- added colors to readme ([1070be8](https://github.com/equinor/fusion-web-components/commit/1070be8dd745a3688b272b05aa2b1332f2439d66))
- added new status colors and fixed sizing ([8f7a924](https://github.com/equinor/fusion-web-components/commit/8f7a924d0fed3e5e75df1952f40afeed815c1c0c))
- fixed sizing, storybook and readme ([e942393](https://github.com/equinor/fusion-web-components/commit/e942393890bd9daacb2a7d5b0485c497bc69826f))
- made package public ([71640b6](https://github.com/equinor/fusion-web-components/commit/71640b6366d7809eec9668046d0e08f5a6bf3402))

### Features

- added badge web component ([0f3ce2a](https://github.com/equinor/fusion-web-components/commit/0f3ce2af72587ff255986df9344bbc9fb137157b))
