# Change Log

## 4.0.4

### Patch Changes

- Updated dependencies [[`44e2503`](https://github.com/equinor/fusion-web-components/commit/44e2503f51a98131963d29200ed295416c0fa452)]:
  - @equinor/fusion-wc-list@1.1.4

## 4.0.3

### Patch Changes

- [#1785](https://github.com/equinor/fusion-web-components/pull/1785) [`b2fa8fa`](https://github.com/equinor/fusion-web-components/commit/b2fa8fa5f959698763189e2f6fe3cd81916d2c18) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - - re-add styling for searchable dropdown
  - fix arrow down for searchable dropdown

## 4.0.2

### Patch Changes

- Updated dependencies [[`546dd16`](https://github.com/equinor/fusion-web-components/commit/546dd168db71e881d7b7151478ef4adb62e6fb09)]:
  - @equinor/fusion-wc-textinput@1.1.4

## 4.0.1

### Patch Changes

- [#1764](https://github.com/equinor/fusion-web-components/pull/1764) [`eb388db`](https://github.com/equinor/fusion-web-components/commit/eb388dbe5b5c9fb4b9d84811a26a1bb0ef725062) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Turn off autocomplete

- Updated dependencies [[`eb388db`](https://github.com/equinor/fusion-web-components/commit/eb388dbe5b5c9fb4b9d84811a26a1bb0ef725062)]:
  - @equinor/fusion-wc-textinput@1.1.3

## 4.0.0

### Major Changes

- [#1715](https://github.com/equinor/fusion-web-components/pull/1715) [`44aa0a8`](https://github.com/equinor/fusion-web-components/commit/44aa0a8b744e873e19ee6fa9e92da0bd8c3031d8) Thanks [@eikeland](https://github.com/eikeland)! - ### @equinor/fusion-wc-searchable-dropdown

  - Fix: support for setting selectedId in initalItems.
  - Fix: better handling of multiple selections.
  - Removed need for mutating result with isSelected, we now keep track of that in selectedItems set.
  - Removed controllers \_listItems array since we added getter method for flattening the elements to be able to select by index, and more easily loop over all list items.
  - Renamed methods to align naming scheme with functionality.

  ### @equinor/fusion-wc-storybook

  Fix: can use selectedId in stories and eslint

## 3.7.4

### Patch Changes

- [#1562](https://github.com/equinor/fusion-web-components/pull/1562) [`150cc60`](https://github.com/equinor/fusion-web-components/commit/150cc606abaf489cbc432326b36af68e45052054) Thanks [@dependabot](https://github.com/apps/dependabot)! - chore(deps): bump lit from 3.1.3 to 3.2.0

- Updated dependencies [[`150cc60`](https://github.com/equinor/fusion-web-components/commit/150cc606abaf489cbc432326b36af68e45052054)]:
  - @equinor/fusion-wc-divider@1.1.2
  - @equinor/fusion-wc-icon@2.3.1
  - @equinor/fusion-wc-list@1.1.3
  - @equinor/fusion-wc-textinput@1.1.2

## 3.7.3

### Patch Changes

- [#1461](https://github.com/equinor/fusion-web-components/pull/1461) [`0bc06db`](https://github.com/equinor/fusion-web-components/commit/0bc06dbf003e078bf73bf191a0de429ad443f836) Thanks [@eikeland](https://github.com/eikeland)! - Updates fusion-web-theme

- Updated dependencies [[`0bc06db`](https://github.com/equinor/fusion-web-components/commit/0bc06dbf003e078bf73bf191a0de429ad443f836)]:
  - @equinor/fusion-wc-textinput@1.1.1
  - @equinor/fusion-wc-divider@1.1.1
  - @equinor/fusion-wc-list@1.1.2

## 3.7.2

### Patch Changes

- [#1454](https://github.com/equinor/fusion-web-components/pull/1454) [`a2ee7ab`](https://github.com/equinor/fusion-web-components/commit/a2ee7ab5befae5da63f1014930c88643215da318) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - Opacity and color to disabled and error list item

## 3.7.1

### Patch Changes

- Updated dependencies [[`69c55ae`](https://github.com/equinor/fusion-web-components/commit/69c55ae9d183c841470ddddafb29c337643ec04a)]:
  - @equinor/fusion-wc-list@1.1.1

## 3.7.0

### Minor Changes

- [#1284](https://github.com/equinor/fusion-web-components/pull/1284) [`4c8b130`](https://github.com/equinor/fusion-web-components/commit/4c8b130d828bf20140c3ba190a40ac4fb3687139) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add attr/prop `select-text-on-focus` for fwc-searchable-dropdown

## 3.6.0

### Minor Changes

- [#1072](https://github.com/equinor/fusion-web-components/pull/1072) [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update lit from 2.7.0 to 3.0.2

### Patch Changes

- [#1060](https://github.com/equinor/fusion-web-components/pull/1060) [`e67f078`](https://github.com/equinor/fusion-web-components/commit/e67f078243a9fbf614c261ce8efa888d7c6c16fb) Thanks [@eikeland](https://github.com/eikeland)! - Removal of developers console.log

- [#1072](https://github.com/equinor/fusion-web-components/pull/1072) [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update searchable-dropdown to get trailing from el instead of queryselect the shadow root

- Updated dependencies [[`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0), [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0)]:
  - @equinor/fusion-wc-list@1.1.0
  - @equinor/fusion-wc-textinput@1.1.0
  - @equinor/fusion-wc-divider@1.1.0
  - @equinor/fusion-wc-icon@2.3.0

## 3.5.0

### Minor Changes

- [#944](https://github.com/equinor/fusion-web-components/pull/944) [`abd5d13`](https://github.com/equinor/fusion-web-components/commit/abd5d1397ee12a824e2b382bdc9cd73fc28affe1) Thanks [@dependabot](https://github.com/apps/dependabot)! - bump @lit-labs/task from 2.1.2 to [3.1.0](https://github.com/lit/lit/blob/main/packages/labs/task/CHANGELOG.md#310)

### Patch Changes

- [#1077](https://github.com/equinor/fusion-web-components/pull/1077) [`6482d02`](https://github.com/equinor/fusion-web-components/commit/6482d028db9b821aa29a6ee4638c3a5d3a2a2e29) Thanks [@eikeland](https://github.com/eikeland)! - Click outside compares against element

## 3.4.3

### Patch Changes

- Updated dependencies [[`e514ba1`](https://github.com/equinor/fusion-web-components/commit/e514ba11f3cfcdea293e1ad94ea6c8d01e7ffd16)]:
  - @equinor/fusion-wc-list@1.0.5

## 3.4.2

### Patch Changes

- Updated dependencies [[`4b3c985`](https://github.com/equinor/fusion-web-components/commit/4b3c9852192fc800a883570948e6b80e2d62ebad), [`0aaa4ad`](https://github.com/equinor/fusion-web-components/commit/0aaa4ad08f505e3fbe1f90fe3b62cff0be6a8e3f)]:
  - @equinor/fusion-wc-divider@1.0.1
  - @equinor/fusion-wc-textinput@1.0.3
  - @equinor/fusion-wc-list@1.0.4

## 3.4.1

### Patch Changes

- [#1020](https://github.com/equinor/fusion-web-components/pull/1020) [`70e72d6`](https://github.com/equinor/fusion-web-components/commit/70e72d674d4a7fd1b7dd5339bfbddc4a94ada428) Thanks [@eikeland](https://github.com/eikeland)! - Select first search result on Enter

## 3.4.0

### Minor Changes

- [#975](https://github.com/equinor/fusion-web-components/pull/975) [`6c500df`](https://github.com/equinor/fusion-web-components/commit/6c500df8420c80cb693708bca9b90a66fb3c47a3) Thanks [@odinr](https://github.com/odinr)! - allow custom html as graphic slot of list item

### Patch Changes

- Updated dependencies [[`68ecc45`](https://github.com/equinor/fusion-web-components/commit/68ecc45544fbb3de9db701831b50d669dce02133), [`6c5c55e`](https://github.com/equinor/fusion-web-components/commit/6c5c55e9af7bfa107b74ce4791a884b1081a6f63)]:
  - @equinor/fusion-wc-icon@2.2.0
  - @equinor/fusion-wc-list@1.0.3
  - @equinor/fusion-wc-textinput@1.0.2

## 3.3.0

### Minor Changes

- [#928](https://github.com/equinor/fusion-web-components/pull/928) [`f6c9623`](https://github.com/equinor/fusion-web-components/commit/f6c9623bd1a3a0fea9733e696f34f832ab908c2c) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for searchable dropdown

### Patch Changes

- [#949](https://github.com/equinor/fusion-web-components/pull/949) [`e000106`](https://github.com/equinor/fusion-web-components/commit/e000106f0ba91fcdb3b52fd9571aba5e46e06ed2) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add `part` attribute to list and list items.

  This will allow styling the list item outside the `shadowRoot`.

  ```css
  fwc-searchable-dropdown::part(list) {
    background-color: red;
  }

  fwc-searchable-dropdown::part(list-item) {
    --fwc-list-item-vertical-padding: 4px;
  }
  ```

## 3.2.1

### Patch Changes

- Updated dependencies []:
  - @equinor/fusion-wc-list@1.0.2

## 3.2.0

### Minor Changes

- [#892](https://github.com/equinor/fusion-web-components/pull/892) [`a24d31f`](https://github.com/equinor/fusion-web-components/commit/a24d31ff732424964407602025f2dc95dfc89ef9) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Adds meta slot to `searchable-dropdown` component

  Updates storybook with example:

  ```js
  const searchResultItem = [
    {
      id: '1337',
      title: 'custom svg',
      subTitle: 'foo bar baz',
      graphic: appIconSvgTemplate,
      graphicType: IconType.SVG,
      meta: '<fwc-chip disabled variant="outlined" value="Custom meta" />',
    },
  ];
  ```

## 3.1.0

### Minor Changes

- [#888](https://github.com/equinor/fusion-web-components/pull/888) [`aeed5b1`](https://github.com/equinor/fusion-web-components/commit/aeed5b1d0bf8f540ec86ad1e28d09b1c2d0348a9) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - updates to that searchable dropdown will allow an list item to show custom svg icon

### Patch Changes

- Updated dependencies [[`aeed5b1`](https://github.com/equinor/fusion-web-components/commit/aeed5b1d0bf8f540ec86ad1e28d09b1c2d0348a9)]:
  - @equinor/fusion-wc-icon@2.1.0
  - @equinor/fusion-wc-list@1.0.1
  - @equinor/fusion-wc-textinput@1.0.1

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
  - @equinor/fusion-wc-textinput@1.0.0
  - @equinor/fusion-wc-divider@1.0.0
  - @equinor/fusion-wc-core@2.0.0
  - @equinor/fusion-wc-icon@2.0.0
  - @equinor/fusion-wc-list@1.0.0

## 2.6.1

### Patch Changes

- [`c9413be`](https://github.com/equinor/fusion-web-components/commit/c9413beb02b168de63c2f978f121e80fe1b68614) Thanks [@odinr](https://github.com/odinr)! - update package.json

## 2.6.0

### Patch Changes

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - align styling

  - added vertical padding
  - added interactive color when error

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - move from lerna version to changeset

- Updated dependencies [[`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59), [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59)]:
  - @equinor/fusion-wc-list@0.4.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.5.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.5.2...@equinor/fusion-wc-searchable-dropdown@2.5.3) (2023-06-19)

**Note:** Version bump only for package @equinor/fusion-wc-searchable-dropdown

## [2.5.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.5.1...@equinor/fusion-wc-searchable-dropdown@2.5.2) (2023-03-24)

**Note:** Version bump only for package @equinor/fusion-wc-searchable-dropdown

## [2.5.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.5.0...@equinor/fusion-wc-searchable-dropdown@2.5.1) (2023-02-24)

### Bug Fixes

- **searchable-dd:** better tab navigation ([b7d8952](https://github.com/equinor/fusion-web-components/commit/b7d8952e9c75d8f1da6ca9faf6ccabcef650d29a))
- **searchable-dd:** closing on click outside works with multiple sdd elements ([d0bcbbd](https://github.com/equinor/fusion-web-components/commit/d0bcbbdec9368e5ab364f1bca94df1c2dfb63a66))
- **searchable-dd:** tab navigation closes element on blur ([2bbed43](https://github.com/equinor/fusion-web-components/commit/2bbed4376c5ad1b75d935aad067aee8bde9e3662))

# [2.5.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.4.4...@equinor/fusion-wc-searchable-dropdown@2.5.0) (2023-02-15)

### Features

- **Searchable-Dropdown:** added type listElement on SearchableDropdownProps ([7cfc35f](https://github.com/equinor/fusion-web-components/commit/7cfc35f0d0679a538ba18e9aeec40cccf5016fe1))
- **Searchable-Dropdown:** better event handling in controller for keyboard navigation ([4ee195f](https://github.com/equinor/fusion-web-components/commit/4ee195f5eb58ec1841356abcb6cdb4e4f2573e6b))
- **searchable-dropdown:** improving keyboard navigation and removing delegatefocus ([8926d37](https://github.com/equinor/fusion-web-components/commit/8926d37e010c9d4f446faff2fdf31f1dc9ed6fa7))

## [2.4.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.4.3...@equinor/fusion-wc-searchable-dropdown@2.4.4) (2023-02-14)

**Note:** Version bump only for package @equinor/fusion-wc-searchable-dropdown

## [2.4.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.4.2...@equinor/fusion-wc-searchable-dropdown@2.4.3) (2023-02-08)

**Note:** Version bump only for package @equinor/fusion-wc-searchable-dropdown

## [2.4.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.4.1...@equinor/fusion-wc-searchable-dropdown@2.4.2) (2023-02-07)

**Note:** Version bump only for package @equinor/fusion-wc-searchable-dropdown

## [2.4.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.4.0...@equinor/fusion-wc-searchable-dropdown@2.4.1) (2023-02-03)

**Note:** Version bump only for package @equinor/fusion-wc-searchable-dropdown

# [2.4.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.3.0...@equinor/fusion-wc-searchable-dropdown@2.4.0) (2023-01-19)

### Bug Fixes

- **searchable-dropdown:** input element close, delegatefocus, [@query](https://github.com/query) decorator ([66987d0](https://github.com/equinor/fusion-web-components/commit/66987d0c8989bbc2f9961593b7ae2f46b62ddf83))
- **searchabledropdown:** open/close syncs dropdown list ([fe5e3bc](https://github.com/equinor/fusion-web-components/commit/fe5e3bc3568e03edefe77c82b3eaa921581620ed))

### Features

- **searchable-dropdown:** fires customevent when closing dropdown ([efc41ce](https://github.com/equinor/fusion-web-components/commit/efc41ce7b57f1b30fad7d648109fb784df308f17))
- **searchabledropdown:** adding autofocus property for textinput ([ac65f27](https://github.com/equinor/fusion-web-components/commit/ac65f270ab627781442a177c6296b8d44c7520c3))
- **searchabledropdown:** dispatchEvent dropdownClosed when closing dropdown ([8143586](https://github.com/equinor/fusion-web-components/commit/81435866a4211af2b1342671fbcb3883e9f4dfa8))

# [2.3.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.2.0...@equinor/fusion-wc-searchable-dropdown@2.3.0) (2023-01-13)

### Bug Fixes

- **searchable-dropdown:** textoverflow ellipses in list items ([bb53c64](https://github.com/equinor/fusion-web-components/commit/bb53c64d3162be83d53c74dd1690f5f62e27367f))
- **searchabledropdown:** closing dropdown on select event if no multiple flag ([f64181b](https://github.com/equinor/fusion-web-components/commit/f64181b889d928b6c43185a8c9f56805c465baa9))
- **searchabledropdown:** saving resolver in provider instance for a more reliable init ([b7350bd](https://github.com/equinor/fusion-web-components/commit/b7350bd4c14dc0654b2609e86f73d55629aaa821))
- **searchabledropdown:** stop select event when target is child checkbox ([b111fa8](https://github.com/equinor/fusion-web-components/commit/b111fa8d408ab89f37715e404123720a30001add))

### Features

- **context-selector:** escape also blurs focus on sdd ([6281950](https://github.com/equinor/fusion-web-components/commit/6281950dff2384ba0f4e4838dd1435b4d0b7c564))
- **searchable-dropdown:** event closing dropdown on escape key ([02ef6e4](https://github.com/equinor/fusion-web-components/commit/02ef6e4941e1d6cdb011eb2f3e3b3db9df0a8576))

# [2.2.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.0.2...@equinor/fusion-wc-searchable-dropdown@2.2.0) (2022-12-02)

### Bug Fixes

- **searchabledropdown:** dispatching the right event type ([fc4fa9a](https://github.com/equinor/fusion-web-components/commit/fc4fa9a445f784ac6a33a6de44a343d31c2bd7e8))
- **searchabledropdown:** hover border color, double close icon chrome ([3d48581](https://github.com/equinor/fusion-web-components/commit/3d48581e2b46f19bae7331449080e3b867658e03))
- **searchabledropdown:** manual version bump ([f14f70a](https://github.com/equinor/fusion-web-components/commit/f14f70ae0f0d60f2eb633f79e8e501784b0594dd))

### Features

- **searchabledropdown:** css style adjustments for element ([383b69a](https://github.com/equinor/fusion-web-components/commit/383b69aa6ea3c238db2dc841280fe08502569823))
- **searchabledropdown:** resolver typehint for callback when closing list ([ccc4658](https://github.com/equinor/fusion-web-components/commit/ccc465841e0595837f6c41beb6775168ae14485e))
- **searchabledropdown:** storybook resolvers using closeHandler ([da12a64](https://github.com/equinor/fusion-web-components/commit/da12a64ebd290704cce5ed6a6f97b6124d679bc6))

## [2.1.1-alpha.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.0.2...@equinor/fusion-wc-searchable-dropdown@2.1.1-alpha.0) (2022-12-02)

### Bug Fixes

- **searchabledropdown:** dispatching the right event type ([fc4fa9a](https://github.com/equinor/fusion-web-components/commit/fc4fa9a445f784ac6a33a6de44a343d31c2bd7e8))
- **searchabledropdown:** hover border color, double close icon chrome ([3d48581](https://github.com/equinor/fusion-web-components/commit/3d48581e2b46f19bae7331449080e3b867658e03))
- **searchabledropdown:** manual version bump ([f14f70a](https://github.com/equinor/fusion-web-components/commit/f14f70ae0f0d60f2eb633f79e8e501784b0594dd))

### Features

- **searchabledropdown:** css style adjustments for element ([383b69a](https://github.com/equinor/fusion-web-components/commit/383b69aa6ea3c238db2dc841280fe08502569823))
- **searchabledropdown:** resolver typehint for callback when closing list ([ccc4658](https://github.com/equinor/fusion-web-components/commit/ccc465841e0595837f6c41beb6775168ae14485e))
- **searchabledropdown:** storybook resolvers using closeHandler ([da12a64](https://github.com/equinor/fusion-web-components/commit/da12a64ebd290704cce5ed6a6f97b6124d679bc6))

## [2.0.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.0.1...@equinor/fusion-wc-searchable-dropdown@2.0.2) (2022-11-29)

### Bug Fixes

- **searchabledropdown:** typehinting for select event ([1844bd8](https://github.com/equinor/fusion-web-components/commit/1844bd8e9e55b0e1c787bad3ac3405e9922113be))

## [2.0.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@2.0.0...@equinor/fusion-wc-searchable-dropdown@2.0.1) (2022-11-25)

### Bug Fixes

- **searchabledropdown:** show selected item on sectioned and flat result list ([415938f](https://github.com/equinor/fusion-web-components/commit/415938fc2243fcdc70cee68b130e17264e38416a))

# [2.0.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@0.3.3...@equinor/fusion-wc-searchable-dropdown@2.0.0) (2022-11-24)

### Bug Fixes

- **searchable-dropdown:** disable linting for ts any type ([d9c6501](https://github.com/equinor/fusion-web-components/commit/d9c6501a3083ee313b15ccfb9027c441385f9e52))
- **searchable-dropdown:** multiple prop on list, and value prop ([766ef7d](https://github.com/equinor/fusion-web-components/commit/766ef7de5a827f03c5eac4f97b9b69413b80cfaf))
- **searchable-dropdown:** type on controllerHost renderRoot ([c945f90](https://github.com/equinor/fusion-web-components/commit/c945f90ee9678e6acff294cb947995e5e492345c))

### Features

- **earchabledropdown:** resolver has initialResult object, remembers selected items ([c400985](https://github.com/equinor/fusion-web-components/commit/c4009851982b32913c24a35044d69126fb8d18d9))
- **searchable-dropdown:** inital value in resolver ([1e3ba78](https://github.com/equinor/fusion-web-components/commit/1e3ba78a637adc450b8800883079fdb31e394950))
- **Searchable-dropdown:** variants for difrent uses and better style handling ([3eaba04](https://github.com/equinor/fusion-web-components/commit/3eaba049381158f2d39b336cd505461645314e56))
- **serchable-dropdown:** style variants from eds design ([8cfa51c](https://github.com/equinor/fusion-web-components/commit/8cfa51c03894157220aed2827f1809611378c6b4))

### BREAKING CHANGES

- **Searchable-dropdown:** new attributes and styles in resolver and element

## [0.3.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@0.3.2...@equinor/fusion-wc-searchable-dropdown@0.3.3) (2022-11-15)

### Bug Fixes

- **searchable-dropdown:** expose leadingicon through props ([796d31f](https://github.com/equinor/fusion-web-components/commit/796d31f2a65b6adbfdc1143278d48179cd5fcb5f))

## [0.3.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@0.3.1...@equinor/fusion-wc-searchable-dropdown@0.3.2) (2022-11-14)

### Bug Fixes

- **searchable-dropdown:** task improvement, keydown navigation, styles ([d847638](https://github.com/equinor/fusion-web-components/commit/d8476385643fb42d3c99b45393ccf1a1434644f6))

## [0.3.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@0.3.0...@equinor/fusion-wc-searchable-dropdown@0.3.1) (2022-11-09)

### Bug Fixes

- **searchable-dropdown:** event type to TextInputElement ([f5a8c21](https://github.com/equinor/fusion-web-components/commit/f5a8c21428849c9c8d86570900a20164b4f0f4e0))
- **searchable-dropdown:** exposing utilized fwc elements ([1b6ec00](https://github.com/equinor/fusion-web-components/commit/1b6ec00999b3b60c2793dd7c994d87b6f14b58b2))

# [0.3.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@0.2.1...@equinor/fusion-wc-searchable-dropdown@0.3.0) (2022-11-08)

### Features

- **searchabledropdown:** multiple selections and section and icons ([7adf375](https://github.com/equinor/fusion-web-components/commit/7adf375fee31430d627bd8bb0b205c1079b2dc9b))
- **searchabledropdown:** open-close icon in traling slot ([bfbe200](https://github.com/equinor/fusion-web-components/commit/bfbe20034e72dfc8addd25ac040ceb7ba11e0e10))

## [0.2.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@0.2.0...@equinor/fusion-wc-searchable-dropdown@0.2.1) (2022-11-07)

**Note:** Version bump only for package @equinor/fusion-wc-searchable-dropdown

# [0.2.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-searchable-dropdown@0.1.0...@equinor/fusion-wc-searchable-dropdown@0.2.0) (2022-09-29)

### Bug Fixes

- **searchabledropdown:** Link to storybook in README.md, + entry for component in monorepo README.md ([d583555](https://github.com/equinor/fusion-web-components/commit/d583555aedb2ea787e4397567f61618e95d4bb15))
- **searchabledropdown:** linting error ([3075b2c](https://github.com/equinor/fusion-web-components/commit/3075b2cd99e4918c9da90599dea01eaaac625359))
- **searchabledropdown:** list items with isError triggers disabled state on item ([30e921f](https://github.com/equinor/fusion-web-components/commit/30e921f70a6649b045ed9581ec05ea5637027d93))
- **searchabledropdown:** property description typo ([5a3f40f](https://github.com/equinor/fusion-web-components/commit/5a3f40f4c7eceb9235b98777efd0d4134eb6cc95))

### Features

- **searchabledropdown:** additional attributes, initalText and trailingIcon ([6ef8fdd](https://github.com/equinor/fusion-web-components/commit/6ef8fdd871deb78e2cca8b15256dd5bd9d413cb0))

# 0.1.0 (2022-09-14)

### Features

- **searchabledropdown:** added component searchabledropdown ([b093ac3](https://github.com/equinor/fusion-web-components/commit/b093ac378c869aa8393b12cea1d03a51e36c9e3e))

# Change Log

## Features
