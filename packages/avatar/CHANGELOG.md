# Change Log

## 3.2.3

### Patch Changes

- [#1562](https://github.com/equinor/fusion-web-components/pull/1562) [`150cc60`](https://github.com/equinor/fusion-web-components/commit/150cc606abaf489cbc432326b36af68e45052054) Thanks [@dependabot](https://github.com/apps/dependabot)! - chore(deps): bump lit from 3.1.3 to 3.2.0

- Updated dependencies [[`150cc60`](https://github.com/equinor/fusion-web-components/commit/150cc606abaf489cbc432326b36af68e45052054)]:
  - @equinor/fusion-wc-picture@3.1.1
  - @equinor/fusion-wc-ripple@1.1.1

## 3.2.2

### Patch Changes

- [#1503](https://github.com/equinor/fusion-web-components/pull/1503) [`e005262`](https://github.com/equinor/fusion-web-components/commit/e005262b7fc807cec1e08610fdf86f887979705d) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - - Add story to person-avatar to include both image and letter
  - Fix positioning/alignment so that letter and image are equal in avatar
  - Fix deprecation message for avatar.

## 3.2.1

### Patch Changes

- [#1461](https://github.com/equinor/fusion-web-components/pull/1461) [`0bc06db`](https://github.com/equinor/fusion-web-components/commit/0bc06dbf003e078bf73bf191a0de429ad443f836) Thanks [@eikeland](https://github.com/eikeland)! - Updates fusion-web-theme

## 3.2.0

### Minor Changes

- [#1072](https://github.com/equinor/fusion-web-components/pull/1072) [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update lit from 2.7.0 to 3.0.2

### Patch Changes

- Updated dependencies [[`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0)]:
  - @equinor/fusion-wc-picture@3.1.0
  - @equinor/fusion-wc-ripple@1.1.0

## 3.1.1

### Patch Changes

- [#961](https://github.com/equinor/fusion-web-components/pull/961) [`9f00da0`](https://github.com/equinor/fusion-web-components/commit/9f00da0e890457f4f832147fbc10e0658c3c891b) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - remove a console.log message

## 3.1.0

### Minor Changes

- [#908](https://github.com/equinor/fusion-web-components/pull/908) [`c786e48`](https://github.com/equinor/fusion-web-components/commit/c786e48e725c06499960193e1a4a7a151f3c722f) Thanks [@odinr](https://github.com/odinr)! - Update avatar element

  - allow setting size of element by css `--fwc-avatar-size`
  - cleaned up css
  - fixed `custom-element.json`

## 3.0.0

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
  - @equinor/fusion-wc-picture@3.0.0
  - @equinor/fusion-wc-ripple@1.0.0
  - @equinor/fusion-wc-core@2.0.0

## 2.0.1

### Patch Changes

- [`c9413be`](https://github.com/equinor/fusion-web-components/commit/c9413beb02b168de63c2f978f121e80fe1b68614) Thanks [@odinr](https://github.com/odinr)! - update package.json

## 2.0.0

### Patch Changes

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - move from lerna version to changeset

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.33](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.32...@equinor/fusion-wc-avatar@1.0.33) (2022-02-08)

### Bug Fixes

- add npm ignore to packages ([8a9f436](https://github.com/equinor/fusion-web-components/commit/8a9f436f4d38c0fec431d9388ce3098853f8babc))

## [1.0.29](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.28...@equinor/fusion-wc-avatar@1.0.29) (2021-10-29)

### Bug Fixes

- fixed styling, documentation and refactoring ([e9d8164](https://github.com/equinor/fusion-web-components/commit/e9d816498e839419af1cbc86041584ee87e59d26))

## [1.0.28](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.27...@equinor/fusion-wc-avatar@1.0.28) (2021-10-28)

### Bug Fixes

- added docs, fixed styling, added events and fixed types ([2f1332a](https://github.com/equinor/fusion-web-components/commit/2f1332ac92945761c841364a0f00c42955a75608))
- added documentation to avatar, renamed css variables and changed types to enum ([472d06b](https://github.com/equinor/fusion-web-components/commit/472d06b492642b87aea7c8d04fe2295f626ebb60))
- updated packages ([b752691](https://github.com/equinor/fusion-web-components/commit/b75269105063dfbb150432bd86426e33d67ba869))

## [1.0.23](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.22...@equinor/fusion-wc-avatar@1.0.23) (2021-09-29)

### Bug Fixes

- fixed props reflection for styling ([35ac052](https://github.com/equinor/fusion-web-components/commit/35ac0525ee58df621a831c323459234009e0000c))

## [1.0.20](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.19...@equinor/fusion-wc-avatar@1.0.20) (2021-09-23)

### Bug Fixes

- upgraded lit-element and lit-html and fixed styling for graphics ([85e1b4b](https://github.com/equinor/fusion-web-components/commit/85e1b4b92eea208fb4cf4918777b9e36637949cf))

## [1.0.19](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.18...@equinor/fusion-wc-avatar@1.0.19) (2021-09-23)

### Bug Fixes

- fixed lit imports ([1c15f6b](https://github.com/equinor/fusion-web-components/commit/1c15f6b865b9e43193942610f881ed1bc74a623c))

## [1.0.18](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.17...@equinor/fusion-wc-avatar@1.0.18) (2021-09-23)

### Bug Fixes

- fixed linting ([ca6a86e](https://github.com/equinor/fusion-web-components/commit/ca6a86ebda14f6c85cb58f125778e94847b70b1d))
- upgraded lit-element and lit-html to lit 2.0.0 with other packages ([93cd2f9](https://github.com/equinor/fusion-web-components/commit/93cd2f997d6045fd5ab69fe05ccee5acfa861ad7))

## [1.0.17](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.16...@equinor/fusion-wc-avatar@1.0.17) (2021-09-22)

### Bug Fixes

- minor avatar changes to styling and naming conventions according to person avatar requirements ([f3d99af](https://github.com/equinor/fusion-web-components/commit/f3d99af81e478ac65a987cc33a0928add645fbcc))

## [1.0.15](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.14...@equinor/fusion-wc-avatar@1.0.15) (2021-09-20)

### Bug Fixes

- added ripple and removed fusion specific attributes ([93f3206](https://github.com/equinor/fusion-web-components/commit/93f3206e36d90682c76d4b143164281878bae288))
- removing fusion specific attributes, replaced badge render with slot ([9a16c3f](https://github.com/equinor/fusion-web-components/commit/9a16c3f84225138196d9ee45b20f082c436e3f2d))

## [1.0.13](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.12...@equinor/fusion-wc-avatar@1.0.13) (2021-09-15)

### Bug Fixes

- removed test code for src ([52ec3ec](https://github.com/equinor/fusion-web-components/commit/52ec3ec07d12d3daaab46bed74a43ca2354d2b6a))

## [1.0.12](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.11...@equinor/fusion-wc-avatar@1.0.12) (2021-09-07)

### Bug Fixes

- fixed package and readme ([9f87852](https://github.com/equinor/fusion-web-components/commit/9f87852a946a16227d9a140ab342b8d7fed57324))

## [1.0.11](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.10...@equinor/fusion-wc-avatar@1.0.11) (2021-09-07)

### Bug Fixes

- added presence and position ([3cf9225](https://github.com/equinor/fusion-web-components/commit/3cf922522ea76add9987c7a88db062cf16b085c0))
- fixed linting ([d15372f](https://github.com/equinor/fusion-web-components/commit/d15372f78d4a7f831e2ebd346a3c20a0dfde4b0c))
- fixed linting ([aa3a553](https://github.com/equinor/fusion-web-components/commit/aa3a55384d6a0f8d0d811fd03f29121962d98984))
- fixed picture and adjusted storybook ([08979c3](https://github.com/equinor/fusion-web-components/commit/08979c36cbc70e12cbdd5d559a5cdedb19268d61))
- fixed readme file ([b8358bd](https://github.com/equinor/fusion-web-components/commit/b8358bd3329497090f2a2425947d280f33ab49fe))
- fixed storybook, changed props, added icons and other adjustments ([a77d956](https://github.com/equinor/fusion-web-components/commit/a77d956bce80daf4a9caf2862b28acdab5b95d78))
- merged badge ([defc3cb](https://github.com/equinor/fusion-web-components/commit/defc3cb369088bcdcd29ffd1e379848b56b9bba2))

## [1.0.9](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.8...@equinor/fusion-wc-avatar@1.0.9) (2021-08-13)

### Bug Fixes

- fixed dependencies... again... and fixed export of date ([7cefc47](https://github.com/equinor/fusion-web-components/commit/7cefc47b307e67c3a79c41579e07ece70c2e0728))
- fixed deps... ([d9eebcb](https://github.com/equinor/fusion-web-components/commit/d9eebcb1d637e9c2bb64f465c9378f1fea17c973))
- ran lernaupdate to hoist dependency versions ([693cb29](https://github.com/equinor/fusion-web-components/commit/693cb29a43943b512171a2747dad073bb8582b97))

## [1.0.8](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.7...@equinor/fusion-wc-avatar@1.0.8) (2021-08-13)

### Bug Fixes

- fixed locale and type exports ([aa14787](https://github.com/equinor/fusion-web-components/commit/aa14787d229b8a2956991ba940a10e5174356bb9))

## [1.0.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.6...@equinor/fusion-wc-avatar@1.0.7) (2021-08-13)

### Bug Fixes

- fixed dependencies for all packages ([9a78b73](https://github.com/equinor/fusion-web-components/commit/9a78b73068685cd4d096fdea1e8501464c18a51c))

## [1.0.6](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.5...@equinor/fusion-wc-avatar@1.0.6) (2021-08-13)

### Bug Fixes

- upgraded packages ([edc5862](https://github.com/equinor/fusion-web-components/commit/edc58624c3921ef6c77020dd3a026f40ed1dd5f2))

## [1.0.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-avatar@1.0.4...@equinor/fusion-wc-avatar@1.0.5) (2021-08-12)

### Bug Fixes

- fixed type exports ([e7e19a5](https://github.com/equinor/fusion-web-components/commit/e7e19a59c3db40b20d29f9ea888614a188a2fcc4))
- replaced props interfaces with type ([39cc307](https://github.com/equinor/fusion-web-components/commit/39cc3078b3bb217587f5eb39020a312cb859bb96))
