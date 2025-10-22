# Change Log

## 5.0.5

### Patch Changes

- [#2035](https://github.com/equinor/fusion-web-components/pull/2035) [`4ba9b25`](https://github.com/equinor/fusion-web-components/commit/4ba9b25812dfffb8d1a3c82e42072e96e58facc8) Thanks [@odinr](https://github.com/odinr)! - Added code highlighting and table support to markdown viewer
  - Add Prism.js dependency and TypeScript types
  - Implement syntax highlighting for code blocks
  - Create modular file structure with code-highlighter utility
  - Support multiple languages (TypeScript, C#, CSS, Bash, YAML)
  - Replace ProseMirror tokenizer with marked library for better table support
  - Add comprehensive table styling with responsive design
  - Create separate table.styles.ts file for better code organization
  - Update example files with TypeScript, C#, and enhanced table examples
  - All styles properly scoped to shadow DOM

## 5.0.4

### Patch Changes

- [#2033](https://github.com/equinor/fusion-web-components/pull/2033) [`467c568`](https://github.com/equinor/fusion-web-components/commit/467c568a853c852da89e163308c118ae48bf6287) Thanks [@odinr](https://github.com/odinr)! - feat(markdown): add code highlighting to markdown viewer
  - Add Prism.js dependency and TypeScript types
  - Implement syntax highlighting for code blocks
  - Create modular file structure with code-highlighter utility
  - Support multiple languages (TypeScript, C#, CSS, etc.)
  - Update example files with TypeScript and C# code blocks
  - All styles properly scoped to shadow DOM

## 5.0.3

### Patch Changes

- [#1950](https://github.com/equinor/fusion-web-components/pull/1950) [`448c47c`](https://github.com/equinor/fusion-web-components/commit/448c47cf1ca527622ec822bd3cbae97f9000f39d) Thanks [@dependabot](https://github.com/apps/dependabot)! - update faker person image from loremFlickr to picsum

## 5.0.2

### Patch Changes

- [#1957](https://github.com/equinor/fusion-web-components/pull/1957) [`73643b1`](https://github.com/equinor/fusion-web-components/commit/73643b102d205ee37d2dd952435e522f18332257) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - - Added a new `showLetter` boolean property to `PersonAvatarElement`.
  - When `showLetter` is true, the avatar displays the first letter of the person's name instead of an image.
  - Updated storybook on the following property

  **Usage Example:**

  ```html
  <fwc-person-avatar showLetter ...></fwc-person-avatar>
  ```

## 5.0.1

### Patch Changes

- [#1949](https://github.com/equinor/fusion-web-components/pull/1949) [`25b3682`](https://github.com/equinor/fusion-web-components/commit/25b36820dc0ab931b2328fcf23dc32cff9544a96) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Update Markdown Editor storybook to include the new 'tx' (clear formatting) menu item in the MenuItems story example.

## 5.0.0

### Major Changes

- [#1879](https://github.com/equinor/fusion-web-components/pull/1879) [`f5f2d32`](https://github.com/equinor/fusion-web-components/commit/f5f2d324170ea732b60cfd651a105c4efccdc0c6) Thanks [@odinr](https://github.com/odinr)! - upgraded storybook to v9

## 4.10.4

### Patch Changes

- [#1750](https://github.com/equinor/fusion-web-components/pull/1750) [`e3a4cde`](https://github.com/equinor/fusion-web-components/commit/e3a4cde5107e34c063e71eb6942b21b943d07e0e) Thanks [@eikeland](https://github.com/eikeland)! - Setting person-select variant page-dense height to 36px to match eds height

## 4.10.3

### Patch Changes

- [#1715](https://github.com/equinor/fusion-web-components/pull/1715) [`44aa0a8`](https://github.com/equinor/fusion-web-components/commit/44aa0a8b744e873e19ee6fa9e92da0bd8c3031d8) Thanks [@eikeland](https://github.com/eikeland)! - ### @equinor/fusion-wc-searchable-dropdown
  - Fix: support for setting selectedId in initalItems.
  - Fix: better handling of multiple selections.
  - Removed need for mutating result with isSelected, we now keep track of that in selectedItems set.
  - Removed controllers \_listItems array since we added getter method for flattening the elements to be able to select by index, and more easily loop over all list items.
  - Renamed methods to align naming scheme with functionality.

  ### @equinor/fusion-wc-storybook

  Fix: can use selectedId in stories and eslint

## 4.10.2

### Patch Changes

- [#1693](https://github.com/equinor/fusion-web-components/pull/1693) [`a2b50ff`](https://github.com/equinor/fusion-web-components/commit/a2b50ff76a9216e6d18b43aea5b42fbd3d28f0d3) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - Add and use accountClassification with accountType for displaying different colors on avatar border

## 4.10.1

### Patch Changes

- [#1562](https://github.com/equinor/fusion-web-components/pull/1562) [`150cc60`](https://github.com/equinor/fusion-web-components/commit/150cc606abaf489cbc432326b36af68e45052054) Thanks [@dependabot](https://github.com/apps/dependabot)! - chore(deps): bump lit from 3.1.3 to 3.2.0

## 4.10.0

### Minor Changes

- [#1553](https://github.com/equinor/fusion-web-components/pull/1553) [`3cdedca`](https://github.com/equinor/fusion-web-components/commit/3cdedcae5b542ccc1936486c97110c42c814ba88) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - **New web component `fwc-person-table-cell`**

  Component to display peson avatar and person details in table cell
  - Display data with azureId, upn or dataSource
  - Availability to show/hide avatar
  - Choose which details should be displayed in in both rows
  - Can use HTML as retun value displayed data
  - Choose the size of component

  ```jsx
   <fwc-person-table-cell
     azureId="bb463b8b-b76c-4f6a-a972-665ab5730b69"
     size="medium"
     .heading=${(person: TableCellData) => person.name`
     .subHeading=${(person: TableCellData) => `<a href="mailto:${person.mail}">${person.mail}</a>`
     showAvatar />
  ```

## 4.9.5

### Patch Changes

- [#1503](https://github.com/equinor/fusion-web-components/pull/1503) [`e005262`](https://github.com/equinor/fusion-web-components/commit/e005262b7fc807cec1e08610fdf86f887979705d) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - - Add story to person-avatar to include both image and letter
  - Fix positioning/alignment so that letter and image are equal in avatar
  - Fix deprecation message for avatar.

## 4.9.4

### Patch Changes

- [#1463](https://github.com/equinor/fusion-web-components/pull/1463) [`dcec24e`](https://github.com/equinor/fusion-web-components/commit/dcec24ef5609e5743a07055823a254f4621adf2c) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - Added stopPropagation to person card in avatar to prevent triggering click from parent

## 4.9.3

### Patch Changes

- [#1460](https://github.com/equinor/fusion-web-components/pull/1460) [`8b46bd4`](https://github.com/equinor/fusion-web-components/commit/8b46bd4231e8d83f9ac60f33761ead96c4b717af) Thanks [@eikeland](https://github.com/eikeland)! - Fix ending tag for person select story

## 4.9.2

### Patch Changes

- [#1454](https://github.com/equinor/fusion-web-components/pull/1454) [`a2ee7ab`](https://github.com/equinor/fusion-web-components/commit/a2ee7ab5befae5da63f1014930c88643215da318) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - Opacity and color to disabled and error list item

## 4.9.1

### Patch Changes

- [#1441](https://github.com/equinor/fusion-web-components/pull/1441) [`d940c0c`](https://github.com/equinor/fusion-web-components/commit/d940c0c49ecd121c078843c902ea8adee3e55e4e) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Upgrade storybook to 7.6.17

## 4.9.0

### Minor Changes

- [#1420](https://github.com/equinor/fusion-web-components/pull/1420) [`f8677ba`](https://github.com/equinor/fusion-web-components/commit/f8677ba33209cf9cfc65334b016c2cf7a90ea09b) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Upgrade storybook\* to 7.6.16

## 4.8.2

### Patch Changes

- [#1375](https://github.com/equinor/fusion-web-components/pull/1375) [`4875f40`](https://github.com/equinor/fusion-web-components/commit/4875f4063fdb9a3869010f565397404210def788) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add story for person-avatar to show avatar in each corner

## 4.8.1

### Patch Changes

- [#1366](https://github.com/equinor/fusion-web-components/pull/1366) [`f0a5bb3`](https://github.com/equinor/fusion-web-components/commit/f0a5bb337bd0bf5c9f75fa1ccbd6654ffe97f3ba) Thanks [@eikeland](https://github.com/eikeland)! - Add property `selectedPerson` to programmatically set or clear a person

## 4.8.0

### Minor Changes

- [#1350](https://github.com/equinor/fusion-web-components/pull/1350) [`f1ac6b8`](https://github.com/equinor/fusion-web-components/commit/f1ac6b88179f292b84d3f2224986259f286d466b) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add fix to prevent person-card from showing when the person-avatar is set to disabled.

## 4.7.0

### Minor Changes

- [#1284](https://github.com/equinor/fusion-web-components/pull/1284) [`4c8b130`](https://github.com/equinor/fusion-web-components/commit/4c8b130d828bf20140c3ba190a40ac4fb3687139) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add attr/prop `select-text-on-focus` for fwc-searchable-dropdown

## 4.6.1

### Patch Changes

- [#1278](https://github.com/equinor/fusion-web-components/pull/1278) [`eadc3fb`](https://github.com/equinor/fusion-web-components/commit/eadc3fbf303a5379f0da7ccbd6f40fd50ed51453) Thanks [@eikeland](https://github.com/eikeland)! - unselected person shows as null in select event

## 4.6.0

### Minor Changes

- [#1072](https://github.com/equinor/fusion-web-components/pull/1072) [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update lit from 2.7.0 to 3.0.2

## 4.5.1

### Patch Changes

- [#1076](https://github.com/equinor/fusion-web-components/pull/1076) [`3798fcb`](https://github.com/equinor/fusion-web-components/commit/3798fcb5e83c4a53701d87f3f6d86d5ff9b5ba24) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - fix(storybook): add missing icon.mdx

## 4.5.0

### Minor Changes

- [#1062](https://github.com/equinor/fusion-web-components/pull/1062) [`1f33b9a`](https://github.com/equinor/fusion-web-components/commit/1f33b9a1b6a178ab22a3085213c8618ca91f71d4) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybooks and stories for menu

- [#1066](https://github.com/equinor/fusion-web-components/pull/1066) [`e514ba1`](https://github.com/equinor/fusion-web-components/commit/e514ba11f3cfcdea293e1ad94ea6c8d01e7ffd16) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybooks and stories for list

- [#1068](https://github.com/equinor/fusion-web-components/pull/1068) [`3735aa5`](https://github.com/equinor/fusion-web-components/commit/3735aa51480bb5b16815c2fbf152da91f6231052) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybooks and stories for formfield

## 4.4.0

### Minor Changes

- [#1029](https://github.com/equinor/fusion-web-components/pull/1029) [`4b3c985`](https://github.com/equinor/fusion-web-components/commit/4b3c9852192fc800a883570948e6b80e2d62ebad) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for divider

- [#1047](https://github.com/equinor/fusion-web-components/pull/1047) [`fbffccd`](https://github.com/equinor/fusion-web-components/commit/fbffccdf3b9dd46190d40f934a651dacb70c0efe) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybooks and stories for daterange

- [#1032](https://github.com/equinor/fusion-web-components/pull/1032) [`170b79f`](https://github.com/equinor/fusion-web-components/commit/170b79fc08e98b615edab3f2d044a1648cdf65a8) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybooks and stories for switch

- [#1030](https://github.com/equinor/fusion-web-components/pull/1030) [`0b6fe1a`](https://github.com/equinor/fusion-web-components/commit/0b6fe1a577087327122de16e7006fa7c1d7ec0ab) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybooks and stories for progress-indicator

- [#1043](https://github.com/equinor/fusion-web-components/pull/1043) [`fddbde6`](https://github.com/equinor/fusion-web-components/commit/fddbde66a29a981df88aeb041c37512bf8f8c7b4) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for radio

- [#1034](https://github.com/equinor/fusion-web-components/pull/1034) [`3413dee`](https://github.com/equinor/fusion-web-components/commit/3413deef31ad7a5654bdc0329259f8d825d8c055) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for select

- [#1023](https://github.com/equinor/fusion-web-components/pull/1023) [`0aaa4ad`](https://github.com/equinor/fusion-web-components/commit/0aaa4ad08f505e3fbe1f90fe3b62cff0be6a8e3f) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for textinput

- [#1048](https://github.com/equinor/fusion-web-components/pull/1048) [`0f8f817`](https://github.com/equinor/fusion-web-components/commit/0f8f817cf482f5581b44649ad7c8a133a70dbd6d) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybooks and stories for datetime

## 4.3.0

### Minor Changes

- [#1018](https://github.com/equinor/fusion-web-components/pull/1018) [`447c85e`](https://github.com/equinor/fusion-web-components/commit/447c85e803efa64825cbc84de671924c7cf8be3f) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for markdown-viewer

- [#976](https://github.com/equinor/fusion-web-components/pull/976) [`f16ad1c`](https://github.com/equinor/fusion-web-components/commit/f16ad1c4a186077433a2d292a62e9d86c2cfe01a) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for link-button

- [#1003](https://github.com/equinor/fusion-web-components/pull/1003) [`f230753`](https://github.com/equinor/fusion-web-components/commit/f230753d73abed4bc08364dfef73d8afda1d1e0e) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for icon-button-toggle

- [#1011](https://github.com/equinor/fusion-web-components/pull/1011) [`e15cbb6`](https://github.com/equinor/fusion-web-components/commit/e15cbb63cfad5c0979058fead76e24105199572a) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for markdown-editor

- [#1022](https://github.com/equinor/fusion-web-components/pull/1022) [`2790a7d`](https://github.com/equinor/fusion-web-components/commit/2790a7d679e0b7a73065c643597c1f0cb70f6535) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for textarea

## 4.2.0

### Minor Changes

- [#975](https://github.com/equinor/fusion-web-components/pull/975) [`6c500df`](https://github.com/equinor/fusion-web-components/commit/6c500df8420c80cb693708bca9b90a66fb3c47a3) Thanks [@odinr](https://github.com/odinr)! - allow custom html as graphic slot of list item

- [#961](https://github.com/equinor/fusion-web-components/pull/961) [`9f00da0`](https://github.com/equinor/fusion-web-components/commit/9f00da0e890457f4f832147fbc10e0658c3c891b) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for icon-button

## 4.1.0

### Minor Changes

- [#928](https://github.com/equinor/fusion-web-components/pull/928) [`f6c9623`](https://github.com/equinor/fusion-web-components/commit/f6c9623bd1a3a0fea9733e696f34f832ab908c2c) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add storybook and stories for searchable dropdown

### Patch Changes

- [#931](https://github.com/equinor/fusion-web-components/pull/931) [`ba37e8d`](https://github.com/equinor/fusion-web-components/commit/ba37e8d15b3fbcecb81e1e2e878ca9b147d26c49) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add missing checkbox.mdx in storybook

## 4.0.0

### Major Changes

- [#908](https://github.com/equinor/fusion-web-components/pull/908) [`c786e48`](https://github.com/equinor/fusion-web-components/commit/c786e48e725c06499960193e1a4a7a151f3c722f) Thanks [@odinr](https://github.com/odinr)! - Upgrade storybook to V7
  - [x] avatar
  - [x] badge
  - [x] button
  - [ ] icon button
  - [ ] link button
  - [ ] toggle button
  - [x] chip
  - [ ] date range
  - [ ] date time
  - [ ] list
  - [ ] searchable dropdown
  - [x] skeleton
  - [x] checkbox
  - [ ] formfield
  - [ ] markdown
  - [ ] menu
  - [ ] radio
  - [ ] select
  - [ ] switch
  - [ ] text area
  - [ ] text input
  - [ ] divider
  - [ ] progress indicator

  **person elements**
  - [x] avatar
  - [x] card
  - [x] list item
  - [x] selector

## 3.1.1

### Patch Changes

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

- [#868](https://github.com/equinor/fusion-web-components/pull/868) [`a31dd11`](https://github.com/equinor/fusion-web-components/commit/a31dd11a7b8f5515cc62344849b2ce765861267a) Thanks [@odinr](https://github.com/odinr)! - fix storybook deps

## 2.22.1

### Patch Changes

- [`c9413be`](https://github.com/equinor/fusion-web-components/commit/c9413beb02b168de63c2f978f121e80fe1b68614) Thanks [@odinr](https://github.com/odinr)! - update package.json

## 2.22.0

### Minor Changes

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - updated storybook with new person components

### Patch Changes

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - move from lerna version to changeset

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.20.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.20.3...@equinor/fusion-wc-storybook@2.20.4) (2023-07-06)

### Bug Fixes

- **markdown:** comments ([955eec9](https://github.com/equinor/fusion-web-components/commit/955eec9c0ac905c35410f3e2e2b006956cd32c37))
- **markdown:** tag name ([ee66808](https://github.com/equinor/fusion-web-components/commit/ee66808e606bc9b2bba819cfaa0db6c3b8c9b918))

## [2.20.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.20.0...@equinor/fusion-wc-storybook@2.20.1) (2023-06-16)

### Bug Fixes

- **person-card:** card background and minimum width ([b38db94](https://github.com/equinor/fusion-web-components/commit/b38db945d18c42bbfecebaa96b8af8782a995f8d))

# [2.20.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.19.3...@equinor/fusion-wc-storybook@2.20.0) (2023-05-09)

### Features

- **markdown:** add markdown-viewer ([32ee915](https://github.com/equinor/fusion-web-components/commit/32ee91591e3bb10b1bbbbe21ff9970867d56b30d)), closes [#592](https://github.com/equinor/fusion-web-components/issues/592)

# [2.19.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.18.0...@equinor/fusion-wc-storybook@2.19.0) (2023-03-23)

### Bug Fixes

- **markdown-editor:** component fix ([703b61b](https://github.com/equinor/fusion-web-components/commit/703b61bc3e8d541c69b405f287ad399874a17a5a))

### Features

- **markdown-editor:** created component ([89ad4dc](https://github.com/equinor/fusion-web-components/commit/89ad4dcd916df6aad7921516b825df784ba75826))

# [2.18.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.17.1...@equinor/fusion-wc-storybook@2.18.0) (2023-03-22)

### Features

- **markdown-editor:** created component ([0d8bbbd](https://github.com/equinor/fusion-web-components/commit/0d8bbbd079461281e5ad38375e39599caad7da4e))

## [2.17.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.17.0...@equinor/fusion-wc-storybook@2.17.1) (2023-03-20)

### Bug Fixes

- **person-list-item:** pending skeleton ([d2594d0](https://github.com/equinor/fusion-web-components/commit/d2594d016ed82199c2c8b253d02ccdab01fcede6))
- **person-list-item:** remove clickable ([8027722](https://github.com/equinor/fusion-web-components/commit/8027722cd72a5882f055cba5c46d83a91e8fc043))

# [2.17.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.16.1...@equinor/fusion-wc-storybook@2.17.0) (2023-02-24)

### Bug Fixes

- **person-card:** redesign - 1.1 ([490439e](https://github.com/equinor/fusion-web-components/commit/490439ef2fc14800d9e42b845f552e0c92f9b559))
- **person-card:** redesign - draft v1 ([f55f973](https://github.com/equinor/fusion-web-components/commit/f55f9730f58b50e92809276aa0fa8987f5f92196))

### Features

- :sparkles: link icon button ([63a979f](https://github.com/equinor/fusion-web-components/commit/63a979f27b460706f14d2b0520178f0e7d7b7421))
- **person-list-item:** toolbar slot ([c9c3492](https://github.com/equinor/fusion-web-components/commit/c9c34921359ce33a550cf95fec42b0447e982634))
- **person:** person list item - single ([9234484](https://github.com/equinor/fusion-web-components/commit/9234484342e72659b81bcca35c570785c44ebd04))

# [2.16.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.15.5...@equinor/fusion-wc-storybook@2.16.0) (2023-02-16)

### Features

- :sparkles: link icon button ([70129de](https://github.com/equinor/fusion-web-components/commit/70129de257fc87b6e267fad221ef6d4eaf275f12))

## [2.15.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.15.1...@equinor/fusion-wc-storybook@2.15.2) (2023-02-08)

### Bug Fixes

- :bug: already defined fix ([517ed61](https://github.com/equinor/fusion-web-components/commit/517ed618cba8a5f80c065622e3ddcc6d8d70e6fd))
- :bug: already defined fix ([1b37437](https://github.com/equinor/fusion-web-components/commit/1b37437c2c99b08b410eab85bb50530e872e8c31))

# [2.15.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.14.0...@equinor/fusion-wc-storybook@2.15.0) (2023-02-03)

### Features

- :sparkles: icon button toggle ([4d00232](https://github.com/equinor/fusion-web-components/commit/4d002320abd242a5ba9931f997faaa243fe013a7))
- **web-components:** icon-button-toggle ([25fb8a5](https://github.com/equinor/fusion-web-components/commit/25fb8a586c5c63839f6c151addf3d42569a02225))

# [2.14.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.13.0...@equinor/fusion-wc-storybook@2.14.0) (2023-02-03)

### Bug Fixes

- **icon-button:** added changelog ([503032a](https://github.com/equinor/fusion-web-components/commit/503032ab6d86db6e49acf4d51122c8be4a36352a))
- **icon-button:** down version ([d2e24c6](https://github.com/equinor/fusion-web-components/commit/d2e24c6a9437ccb3a5b098e437801816bea5ab26))
- **icon-button:** readme and info ([1a6a700](https://github.com/equinor/fusion-web-components/commit/1a6a7001525aba7288b6892d8b72afc2503f0b33))
- **web-components:** icon-button storybook ([27953b4](https://github.com/equinor/fusion-web-components/commit/27953b42e38285632a9155b3e735efd73e69e8ae))

### Features

- :sparkles: icon button ([a263e16](https://github.com/equinor/fusion-web-components/commit/a263e16867e60db57da05593b1915242a4897a2e))
- **web-components:** icon-button ([c39cdb3](https://github.com/equinor/fusion-web-components/commit/c39cdb3e3b74ae5e07f4295d84babfce6e46b9ba))
- **web-components:** icon-button start ([9487354](https://github.com/equinor/fusion-web-components/commit/9487354bf4dcae34ff173c65339ae508d5a7219a))

# [2.13.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.12.2...@equinor/fusion-wc-storybook@2.13.0) (2023-01-19)

### Bug Fixes

- **searchable-dropdown:** input element close, delegatefocus, [@query](https://github.com/query) decorator ([66987d0](https://github.com/equinor/fusion-web-components/commit/66987d0c8989bbc2f9961593b7ae2f46b62ddf83))

### Features

- **searchable-dropdown:** fires customevent when closing dropdown ([efc41ce](https://github.com/equinor/fusion-web-components/commit/efc41ce7b57f1b30fad7d648109fb784df308f17))

# [2.12.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.11.2...@equinor/fusion-wc-storybook@2.12.0) (2022-12-22)

### Bug Fixes

- **button:** move link button to same package ([bae0bd7](https://github.com/equinor/fusion-web-components/commit/bae0bd7358585d46084413c5cdb82d36cc8e26c3))

### Features

- :zap: link button strorybook ([531221a](https://github.com/equinor/fusion-web-components/commit/531221aed896ffe81bf3df886ef3438957641ec7))

# [2.11.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.0.2...@equinor/fusion-wc-storybook@2.11.0) (2022-12-02)

### Bug Fixes

- **searchabledropdown:** hover border color, double close icon chrome ([3d48581](https://github.com/equinor/fusion-web-components/commit/3d48581e2b46f19bae7331449080e3b867658e03))

### Features

- **searchabledropdown:** storybook resolvers using closeHandler ([da12a64](https://github.com/equinor/fusion-web-components/commit/da12a64ebd290704cce5ed6a6f97b6124d679bc6))

## [2.0.3-alpha.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.0.2...@equinor/fusion-wc-storybook@2.0.3-alpha.0) (2022-12-02)

### Bug Fixes

- **searchabledropdown:** hover border color, double close icon chrome ([3d48581](https://github.com/equinor/fusion-web-components/commit/3d48581e2b46f19bae7331449080e3b867658e03))

### Features

- **searchabledropdown:** storybook resolvers using closeHandler ([da12a64](https://github.com/equinor/fusion-web-components/commit/da12a64ebd290704cce5ed6a6f97b6124d679bc6))

## [2.0.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@2.0.0...@equinor/fusion-wc-storybook@2.0.1) (2022-11-25)

### Bug Fixes

- **searchabledropdown:** show selected item on sectioned and flat result list ([415938f](https://github.com/equinor/fusion-web-components/commit/415938fc2243fcdc70cee68b130e17264e38416a))

# [2.0.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.23.3...@equinor/fusion-wc-storybook@2.0.0) (2022-11-24)

### Bug Fixes

- **searchable-dropdown:** multiple prop on list, and value prop ([766ef7d](https://github.com/equinor/fusion-web-components/commit/766ef7de5a827f03c5eac4f97b9b69413b80cfaf))
- **storybook:** bumping searchabledropdown version ([f0d47bd](https://github.com/equinor/fusion-web-components/commit/f0d47bdcc6ba1ba865e5432e2913999e925b970e))

### Features

- **earchabledropdown:** resolver has initialResult object, remembers selected items ([c400985](https://github.com/equinor/fusion-web-components/commit/c4009851982b32913c24a35044d69126fb8d18d9))
- **searchable-dropdown:** inital value in resolver ([1e3ba78](https://github.com/equinor/fusion-web-components/commit/1e3ba78a637adc450b8800883079fdb31e394950))
- **Searchable-dropdown:** variants for difrent uses and better style handling ([3eaba04](https://github.com/equinor/fusion-web-components/commit/3eaba049381158f2d39b336cd505461645314e56))
- **serchable-dropdown:** style variants from eds design ([8cfa51c](https://github.com/equinor/fusion-web-components/commit/8cfa51c03894157220aed2827f1809611378c6b4))

### BREAKING CHANGES

- **Searchable-dropdown:** new attributes and styles in resolver and element

## [1.23.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.23.1...@equinor/fusion-wc-storybook@1.23.2) (2022-11-14)

### Bug Fixes

- **searchable-dropdown:** task improvement, keydown navigation, styles ([d847638](https://github.com/equinor/fusion-web-components/commit/d8476385643fb42d3c99b45393ccf1a1434644f6))

# [1.23.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.22.7...@equinor/fusion-wc-storybook@1.23.0) (2022-11-08)

### Features

- **searchabledropdown:** multiple selections and section and icons ([7adf375](https://github.com/equinor/fusion-web-components/commit/7adf375fee31430d627bd8bb0b205c1079b2dc9b))
- **searchabledropdown:** open-close icon in traling slot ([bfbe200](https://github.com/equinor/fusion-web-components/commit/bfbe20034e72dfc8addd25ac040ceb7ba11e0e10))

## [1.22.6](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.22.5...@equinor/fusion-wc-storybook@1.22.6) (2022-11-01)

### Bug Fixes

- **switch:** No event on switch change ([3a12f02](https://github.com/equinor/fusion-web-components/commit/3a12f023418219b09bab18cc320b271a43688039))

## [1.22.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.22.0...@equinor/fusion-wc-storybook@1.22.1) (2022-10-21)

### Bug Fixes

- **person:** update account type ([feee3fd](https://github.com/equinor/fusion-web-components/commit/feee3fd76a4f523e7047802f6cd1f3836d8fab97))

# [1.22.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.21.1...@equinor/fusion-wc-storybook@1.22.0) (2022-10-11)

### Features

- **person-card:** created web component ([f81dc53](https://github.com/equinor/fusion-web-components/commit/f81dc53089d1bd27ebef63a2d2d3c45cfe1d50dc))

# [1.21.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.20.1...@equinor/fusion-wc-storybook@1.21.0) (2022-09-14)

### Bug Fixes

- **chromatic:** removed disable snapshot on default story ([12595d1](https://github.com/equinor/fusion-web-components/commit/12595d1b0242ae9223d580094c9c12193f615734))

### Features

- **searchabledropdown:** added package to storybook/packages.json ([06d8b27](https://github.com/equinor/fusion-web-components/commit/06d8b27965987121dee4092197125f976e10b204))
- **searchabledropdown:** Added storybook for component ([c5fd64b](https://github.com/equinor/fusion-web-components/commit/c5fd64b3079c4d1a2eed87b747cabee34684ebaa))
- **searchabledropdown:** Added storybook/tsconfig.json reference for component ([77d3008](https://github.com/equinor/fusion-web-components/commit/77d300824769ee9350295d8c0df9e61ff631f724))

# [1.20.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.19.0...@equinor/fusion-wc-storybook@1.20.0) (2022-04-05)

### Features

- **select:** clean code and remove unused ([a744dd6](https://github.com/equinor/fusion-web-components/commit/a744dd63ce12a59402368cff4937267aceca6fac))
- **select:** create select component ([acea5a7](https://github.com/equinor/fusion-web-components/commit/acea5a7c5e516bdbd61a3982b440201a60ae01d6))
- **select:** internally use fwc-menu ([7c8e298](https://github.com/equinor/fusion-web-components/commit/7c8e298aa871e81fa39a97b3eaa994ce0488ddca))

# [1.19.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.18.3...@equinor/fusion-wc-storybook@1.19.0) (2022-03-21)

### Features

- **menu:** added PackageInfo and more description ([3f2e599](https://github.com/equinor/fusion-web-components/commit/3f2e599d3867a6414d5864234ba8795f1200b102))
- **menu:** component description ([11a94c1](https://github.com/equinor/fusion-web-components/commit/11a94c1439a8053b792f06c49e527f926c81907d))
- **menu:** initial menu component creation ([17dbdf1](https://github.com/equinor/fusion-web-components/commit/17dbdf103086a85b98698ad7e5ce9322f80b005a))
- **menu:** template for stories ([b03b170](https://github.com/equinor/fusion-web-components/commit/b03b1703e8dc65a85a2189308a4229f5453897c3))

## [1.18.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.18.1...@equinor/fusion-wc-storybook@1.18.2) (2022-02-24)

### Bug Fixes

- **dots:** merge error fix ([c1ce478](https://github.com/equinor/fusion-web-components/commit/c1ce4788043be7ecea15f54f8143835cfd0c95b1))

# [1.18.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.17.0...@equinor/fusion-wc-storybook@1.18.0) (2022-02-21)

### Bug Fixes

- **dots:** removed default prop values ([cf0cd79](https://github.com/equinor/fusion-web-components/commit/cf0cd7954ad9e843608dd23991daac58c5dfb69a))

### Features

- **dots:** dots progress indicator component ([34eebf2](https://github.com/equinor/fusion-web-components/commit/34eebf2e1b2f0a2379b38037ff594dbf61280ecd))

# [1.17.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.16.2...@equinor/fusion-wc-storybook@1.17.0) (2022-02-18)

### Bug Fixes

- **circular:** removed unused code and cleaned ([d7af467](https://github.com/equinor/fusion-web-components/commit/d7af46786e4fec0a1017ba2c55e1fc910f60eed7))

### Features

- **circular:** added circular progress indicator ([0465646](https://github.com/equinor/fusion-web-components/commit/0465646c412429c7be42819fbcaaefb68548e9e1))
- **circular:** added stories for colors and sizes ([846ad33](https://github.com/equinor/fusion-web-components/commit/846ad336740ccf4d795a207814d5e93d2ba1577b))
- **circular:** Added story component ([fbb7366](https://github.com/equinor/fusion-web-components/commit/fbb73661c2afc7af07e621b5de7a42b45ab830ae))
- **circular:** default args for story ([568baba](https://github.com/equinor/fusion-web-components/commit/568babac61959a342c95ff46c14a3b8f504eb7cd))
- **circular:** sizes ([f4ce1a8](https://github.com/equinor/fusion-web-components/commit/f4ce1a84f52f9d4990b1db64a14812b6c6532121))
- **circular:** Sizes in small, medium etc ([d2305fc](https://github.com/equinor/fusion-web-components/commit/d2305fc525c609c9947cfdcc01518c8b217e5a2d))

# [1.16.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.15.8...@equinor/fusion-wc-storybook@1.16.0) (2022-02-08)

### Features

- rename loader to progress-indicator ([5459d2d](https://github.com/equinor/fusion-web-components/commit/5459d2d6f890447f7d741b17fcdd6604ff8c6ff5))

## [1.15.8](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.15.7...@equinor/fusion-wc-storybook@1.15.8) (2022-02-07)

### Bug Fixes

- **loader:** remove logging ([2208185](https://github.com/equinor/fusion-web-components/commit/22081856e05d34cce57ee54963bd125cf7fa6a73))

## [1.15.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.15.6...@equinor/fusion-wc-storybook@1.15.7) (2022-02-07)

### Bug Fixes

- **loader:** copy paste touch up ([5bc4e76](https://github.com/equinor/fusion-web-components/commit/5bc4e76d1475b4e18bb84c4487ada806b3d3333b))
- **loader:** copy paste touch up ([d218c9f](https://github.com/equinor/fusion-web-components/commit/d218c9fd1a846b73a6685856746a383a51eb94db))

# [1.15.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.14.15...@equinor/fusion-wc-storybook@1.15.0) (2021-10-29)

### Bug Fixes

- added person to root readme ([c7b3521](https://github.com/equinor/fusion-web-components/commit/c7b3521f7413a842d8b7c416b9e1419b74c682dc))
- added reactive controller with async tasks for person provider ([d2b9643](https://github.com/equinor/fusion-web-components/commit/d2b9643dc1e0653bbfe9b15cdcd09ffd8e20572a))
- added reactive controller with async tasks for person provider ([b3259aa](https://github.com/equinor/fusion-web-components/commit/b3259aac989f3b7d2452bd187a9a5762f4ba6891))
- fixed readme and storybook ([217734a](https://github.com/equinor/fusion-web-components/commit/217734a7b65ccba7f2002935826756466342b0b3))
- fixed readme and storybook ([2e7378c](https://github.com/equinor/fusion-web-components/commit/2e7378ce2d4924e239a4e2d33d4a83c99d114897))
- fixed rerender issue with tasks ([5bf833b](https://github.com/equinor/fusion-web-components/commit/5bf833b2409af2672e0ca3b4edf3c80c8ed7155a))
- fixed rerender issue with tasks ([0c68f4c](https://github.com/equinor/fusion-web-components/commit/0c68f4c608e31ecdec055da7ecd3391a34d16c32))
- fixed styling, documentation and refactoring ([e9d8164](https://github.com/equinor/fusion-web-components/commit/e9d816498e839419af1cbc86041584ee87e59d26))

### Features

- added person resolver and person avatar component ([36ac7df](https://github.com/equinor/fusion-web-components/commit/36ac7dfd6a0af41b884d80d72eaaf05f4908422d))
- added person resolver and person avatar component ([cb12d4e](https://github.com/equinor/fusion-web-components/commit/cb12d4ea55925e818c96c05db80e2960686eafe0))

## [1.14.14](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.14.13...@equinor/fusion-wc-storybook@1.14.14) (2021-10-28)

### Bug Fixes

- fixed docs and typing ([baa8d99](https://github.com/equinor/fusion-web-components/commit/baa8d995094c8f4091193f4611210083bafde508))

## [1.14.13](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.14.12...@equinor/fusion-wc-storybook@1.14.13) (2021-10-28)

### Bug Fixes

- added docs, fixed styling, added events and fixed types ([2f1332a](https://github.com/equinor/fusion-web-components/commit/2f1332ac92945761c841364a0f00c42955a75608))
- updated packages ([b752691](https://github.com/equinor/fusion-web-components/commit/b75269105063dfbb150432bd86426e33d67ba869))
- upgraded package and fixed typings ([72a2269](https://github.com/equinor/fusion-web-components/commit/72a226969cd30445d608cc98be1e61806886936d))

## [1.14.12](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.14.11...@equinor/fusion-wc-storybook@1.14.12) (2021-10-27)

### Bug Fixes

- added wrapper component and fixed spacing ([9e3186b](https://github.com/equinor/fusion-web-components/commit/9e3186b5065ef04c354931fffaf68a293d905388))

## [1.14.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.14.4...@equinor/fusion-wc-storybook@1.14.5) (2021-10-22)

### Bug Fixes

- added docs and fixed several bugs with refactoring ([85348c9](https://github.com/equinor/fusion-web-components/commit/85348c9ca4a3520b208375012e94cbec5064286a))

## [1.14.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.14.3...@equinor/fusion-wc-storybook@1.14.4) (2021-10-21)

### Bug Fixes

- fixed color and styling issues ([3afbdac](https://github.com/equinor/fusion-web-components/commit/3afbdac6a6f63938395b9619f5ad06895a42379a))
- fixed story headers ([a8e53d8](https://github.com/equinor/fusion-web-components/commit/a8e53d88b1860ece71cce5598a613fad561061a3))
- styling fixes and addition of events ([7c50173](https://github.com/equinor/fusion-web-components/commit/7c50173f0a041c846e3e9037b9468de074229978))

## [1.14.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.14.2...@equinor/fusion-wc-storybook@1.14.3) (2021-10-20)

### Bug Fixes

- fixed exports and refactored package structure ([268d905](https://github.com/equinor/fusion-web-components/commit/268d9055d4cb652d063fdfe729fcbeedf1c37f49))

# [1.14.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.13.1...@equinor/fusion-wc-storybook@1.14.0) (2021-10-07)

### Features

- **textinput:** allow dense ([2640cfd](https://github.com/equinor/fusion-web-components/commit/2640cfdc13a6e61b901aff6de989e8a8ff13276f))

# [1.13.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.12.0...@equinor/fusion-wc-storybook@1.13.0) (2021-10-05)

### Features

- **checkbox:** allow sizing of checkbox ([6cde535](https://github.com/equinor/fusion-web-components/commit/6cde535c6ec9f5a8ae13ccdbe0c0b0ea80cec150))

# [1.12.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.11.1...@equinor/fusion-wc-storybook@1.12.0) (2021-10-05)

### Features

- added chip component ([92c7d5e](https://github.com/equinor/fusion-web-components/commit/92c7d5e1a8911c1fa6ca3a645c2bf88a433f58b3))

# [1.11.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.10.0...@equinor/fusion-wc-storybook@1.11.0) (2021-10-01)

### Features

- added skeleton component ([24447d6](https://github.com/equinor/fusion-web-components/commit/24447d6e8c1714b3c08e887bcc398a4dca972e61))

# [1.10.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.9.17...@equinor/fusion-wc-storybook@1.10.0) (2021-09-30)

### Bug Fixes

- **storybook:** add fusion style ([8507c86](https://github.com/equinor/fusion-web-components/commit/8507c863c99c5b540c8351913dba62658767e498))
- **storybook:** allow jsx syntax ([cf98129](https://github.com/equinor/fusion-web-components/commit/cf9812925617a1f69595cd6a0446bb90c7a9e12b))
- **storybook:** set doc as default view mode ([ed1bf55](https://github.com/equinor/fusion-web-components/commit/ed1bf5539c1d1248f63fb86c3d0e4bcf25b5bf6a))

### Features

- add package installation code ([934d6cf](https://github.com/equinor/fusion-web-components/commit/934d6cfc2f30e0cc2038cdf40d2b1b286c7a3014))
- **storybook:** add elements to describe package ([4b30aee](https://github.com/equinor/fusion-web-components/commit/4b30aee7dd5a4cae38920dd347e4826b16eaee38))

## [1.9.17](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.9.16...@equinor/fusion-wc-storybook@1.9.17) (2021-09-29)

### Bug Fixes

- fixed readme ([6cd63ed](https://github.com/equinor/fusion-web-components/commit/6cd63edcd860620e7ef095d35d63159a1eb10bd9))

## [1.9.9](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.9.8...@equinor/fusion-wc-storybook@1.9.9) (2021-09-23)

### Bug Fixes

- import of lit ([44137af](https://github.com/equinor/fusion-web-components/commit/44137afb8005ca17af94f14dabe4a427c31391df))

## [1.9.6](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.9.5...@equinor/fusion-wc-storybook@1.9.6) (2021-09-23)

### Bug Fixes

- upgraded lit-element and lit-html and fixed styling for graphics ([85e1b4b](https://github.com/equinor/fusion-web-components/commit/85e1b4b92eea208fb4cf4918777b9e36637949cf))

## [1.9.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.9.3...@equinor/fusion-wc-storybook@1.9.4) (2021-09-23)

### Bug Fixes

- upgraded lit-element and lit-html to lit 2.0.0 with other packages ([93cd2f9](https://github.com/equinor/fusion-web-components/commit/93cd2f997d6045fd5ab69fe05ccee5acfa861ad7))

## [1.9.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.9.0...@equinor/fusion-wc-storybook@1.9.1) (2021-09-20)

### Bug Fixes

- added ripple and removed fusion specific attributes ([93f3206](https://github.com/equinor/fusion-web-components/commit/93f3206e36d90682c76d4b143164281878bae288))

# [1.9.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.8.2...@equinor/fusion-wc-storybook@1.9.0) (2021-09-17)

### Bug Fixes

- fixed storybook ([5261811](https://github.com/equinor/fusion-web-components/commit/5261811b3e5ef0c432756704aa53ab72afce40c4))

### Features

- added ripple component ([a90867d](https://github.com/equinor/fusion-web-components/commit/a90867d95c5efda0f8072a9338b660cc4e39e46c))

## [1.8.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.8.1...@equinor/fusion-wc-storybook@1.8.2) (2021-09-16)

### Bug Fixes

- added x-small size ([4aad6d1](https://github.com/equinor/fusion-web-components/commit/4aad6d1125f72c4593800df9de2638e62b66d6e6))
- fixed circular offset for sizes, added disabled and fixed hover ([9970e4b](https://github.com/equinor/fusion-web-components/commit/9970e4bcf78c416f68001ad0b3c35a1b5db59293))

# [1.8.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.7.7...@equinor/fusion-wc-storybook@1.8.0) (2021-09-15)

### Features

- added divider component ([aada7ae](https://github.com/equinor/fusion-web-components/commit/aada7ae231a2da8baa70d93baabbac1328f12b7e))

## [1.7.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.7.6...@equinor/fusion-wc-storybook@1.7.7) (2021-09-09)

### Bug Fixes

- **button:** slotted icon ([c0f2b7f](https://github.com/equinor/fusion-web-components/commit/c0f2b7ffd868e41051d344e1f0f6c202e6ee3999))

## [1.7.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.7.4...@equinor/fusion-wc-storybook@1.7.5) (2021-09-08)

### Bug Fixes

- **theme:** wrap content ([b29212e](https://github.com/equinor/fusion-web-components/commit/b29212e44d30bd84ed5bb2d44bf9f2b88c92c437))

## [1.7.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.7.2...@equinor/fusion-wc-storybook@1.7.3) (2021-09-07)

### Bug Fixes

- added presence and position ([3cf9225](https://github.com/equinor/fusion-web-components/commit/3cf922522ea76add9987c7a88db062cf16b085c0))
- fixed merge conflict ([e5892a9](https://github.com/equinor/fusion-web-components/commit/e5892a96c0cbc64dd8518863818f0f45acc4b986))
- fixed picture and adjusted storybook ([08979c3](https://github.com/equinor/fusion-web-components/commit/08979c36cbc70e12cbdd5d559a5cdedb19268d61))
- fixed storybook, changed props, added icons and other adjustments ([a77d956](https://github.com/equinor/fusion-web-components/commit/a77d956bce80daf4a9caf2862b28acdab5b95d78))
- merged badge ([defc3cb](https://github.com/equinor/fusion-web-components/commit/defc3cb369088bcdcd29ffd1e379848b56b9bba2))

# [1.7.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.6.8...@equinor/fusion-wc-storybook@1.7.0) (2021-09-06)

### Bug Fixes

- fixed sizing, storybook and readme ([e942393](https://github.com/equinor/fusion-web-components/commit/e942393890bd9daacb2a7d5b0485c497bc69826f))

### Features

- added badge web component ([0f3ce2a](https://github.com/equinor/fusion-web-components/commit/0f3ce2af72587ff255986df9344bbc9fb137157b))

## [1.6.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.6.6...@equinor/fusion-wc-storybook@1.6.7) (2021-08-18)

### Bug Fixes

- fixed storybook ([af437c9](https://github.com/equinor/fusion-web-components/commit/af437c99164781be2e5cc88c033e26390ad2da49))

## [1.6.6](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.6.5...@equinor/fusion-wc-storybook@1.6.6) (2021-08-13)

### Bug Fixes

- fixed dependencies... again... and fixed export of date ([7cefc47](https://github.com/equinor/fusion-web-components/commit/7cefc47b307e67c3a79c41579e07ece70c2e0728))

## [1.6.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.6.4...@equinor/fusion-wc-storybook@1.6.5) (2021-08-13)

### Bug Fixes

- fixed locale and type exports ([aa14787](https://github.com/equinor/fusion-web-components/commit/aa14787d229b8a2956991ba940a10e5174356bb9))

## [1.6.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.6.2...@equinor/fusion-wc-storybook@1.6.3) (2021-08-13)

### Bug Fixes

- updated storybook packages to fix build issue ([d9481f7](https://github.com/equinor/fusion-web-components/commit/d9481f72585ec3041ffa68655dd6c60ae0346de1))

# [1.6.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.5.12...@equinor/fusion-wc-storybook@1.6.0) (2021-08-12)

### Bug Fixes

- added better support for formats and fixed readme ([5fcb48b](https://github.com/equinor/fusion-web-components/commit/5fcb48bd0c0a7192d8d9765b9e42b8de39bd5e9e))
- added separator sløt ([667408b](https://github.com/equinor/fusion-web-components/commit/667408b5d031e9aeffb00ce5d733cf3ea5f38de7))
- fixed from/to date in storybook ([d9f8b1b](https://github.com/equinor/fusion-web-components/commit/d9f8b1bcf4f5086c648ed95a04bc33549534d2f8))
- fixed locale from attribute to property, fixed missing return type and added typedoc for updated ([83485f3](https://github.com/equinor/fusion-web-components/commit/83485f31d4c809bf6f529f1599af6db1ea203943))
- fixed property names and added support for datetime variant in daterange ([4a5da06](https://github.com/equinor/fusion-web-components/commit/4a5da06662a26266c59eaa7066b15cfd05a34334))
- fixed readme and added mapping from value to enum for format ([add657e](https://github.com/equinor/fusion-web-components/commit/add657e66d418e0b30db3434b44489a70cfc2516))
- fixed stories ([f4a3e2e](https://github.com/equinor/fusion-web-components/commit/f4a3e2ef1e857b1b588d78839ba103de7793c6ca))
- merged main ([a84d5e7](https://github.com/equinor/fusion-web-components/commit/a84d5e748c2030f8a2e610d31e16130d29174be0))

### Features

- added date component ([78b2317](https://github.com/equinor/fusion-web-components/commit/78b231795da1a9b8d4d8830e1a83f2e195be7267))
- split date into two components and improved functionality. Replaced Date type for string. Improved README and storybook. ([bd254fc](https://github.com/equinor/fusion-web-components/commit/bd254fce6598886d7a89c0329f7bd472a5b6a789))

## [1.5.10](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.5.9...@equinor/fusion-wc-storybook@1.5.10) (2021-08-02)

### Bug Fixes

- fixed typing and readme as well as updated packages ([6bf92ad](https://github.com/equinor/fusion-web-components/commit/6bf92ade989eaa8a4cbfd9b51b31a3dd98080140))

## [1.5.9](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.5.8...@equinor/fusion-wc-storybook@1.5.9) (2021-07-29)

### Bug Fixes

- fixed type declaration for JSX components ([59e93d7](https://github.com/equinor/fusion-web-components/commit/59e93d729299582edb97debb82ee4891eb8f9eb4))

## [1.5.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.5.3...@equinor/fusion-wc-storybook@1.5.4) (2021-07-20)

### Bug Fixes

- fixed storybook namespace ([5a242e0](https://github.com/equinor/fusion-web-components/commit/5a242e092edc2a1dedd4672e957a542aeadfe0c3))

## [1.5.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.5.1...@equinor/fusion-wc-storybook@1.5.2) (2021-07-19)

### Bug Fixes

- added button to docs ([a812ee4](https://github.com/equinor/fusion-web-components/commit/a812ee4abe6aa5e7a2740936900da15180dcd8e7))

# [1.5.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.4.1...@equinor/fusion-wc-storybook@1.5.0) (2021-07-15)

### Bug Fixes

- fixed readme ([32c155a](https://github.com/equinor/fusion-web-components/commit/32c155a1d50a69be36a159419ec27e8978fbe00a))

### Features

- add new button component ([eb5492a](https://github.com/equinor/fusion-web-components/commit/eb5492a473bf277866a8dc44827e280b4918790e))

# [1.4.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.3.6...@equinor/fusion-wc-storybook@1.4.0) (2021-07-01)

### Features

- added textarea component ([690b9cf](https://github.com/equinor/fusion-web-components/commit/690b9cf083169749d8646564df7f762162415807))

## [1.3.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.3.2...@equinor/fusion-wc-storybook@1.3.3) (2021-06-16)

### Bug Fixes

- added stories and fixed readme ([f1c5d5d](https://github.com/equinor/fusion-web-components/commit/f1c5d5d8e5f7b8c8c07a90331452c4524df62ab7))

## [1.3.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.3.0...@equinor/fusion-wc-storybook@1.3.1) (2021-06-16)

### Bug Fixes

- fixed stories ([da78df9](https://github.com/equinor/fusion-web-components/commit/da78df9614d230a0044056f7c10b71ab8dc027c7))

# [1.3.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.2.0...@equinor/fusion-wc-storybook@1.3.0) (2021-06-16)

### Bug Fixes

- merged changes and fixed merge conflicts ([6902fc7](https://github.com/equinor/fusion-web-components/commit/6902fc7d882b56d54cae4cd03932f1460fc6e61e))

### Features

- added radio component ([75e463b](https://github.com/equinor/fusion-web-components/commit/75e463bca2cd43df7dd9aefdb30b6702c01a034b))

# [1.2.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.1.0...@equinor/fusion-wc-storybook@1.2.0) (2021-06-16)

### Bug Fixes

- added stories ([4b82c95](https://github.com/equinor/fusion-web-components/commit/4b82c950dc91e00c83581777445c85eacb4f4c2c))
- fixed missing style and storybook buil ([4d1da9a](https://github.com/equinor/fusion-web-components/commit/4d1da9a3ee9a6d10829511d7a96f0953645dffba))
- fixed story text ([ff062bd](https://github.com/equinor/fusion-web-components/commit/ff062bd2ef005d5566245ffcf0cff68dde4a60d7))
- merged with main and fixed merge conflicts ([43f9238](https://github.com/equinor/fusion-web-components/commit/43f92384d1931557e98241eb7f2fa07a1578bc9b))

### Features

- added switch component ([c535aef](https://github.com/equinor/fusion-web-components/commit/c535aef78ea6e2774277568e65e60b49d298387a))

# [1.1.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-storybook@1.0.3...@equinor/fusion-wc-storybook@1.1.0) (2021-06-16)

### Bug Fixes

- added stories ([305a628](https://github.com/equinor/fusion-web-components/commit/305a628a6233298b587c3daf05d7a4293a023efb))
- fixed stories ([3615e66](https://github.com/equinor/fusion-web-components/commit/3615e6656c889803793ed617234dfab39a97b709))
- fixed storybook theme template ([4d1b28d](https://github.com/equinor/fusion-web-components/commit/4d1b28df932e08d9686b982b74d15010a2679bbb))
- fixed theming ([984f727](https://github.com/equinor/fusion-web-components/commit/984f72745c2012fe6141c8cd786c45d349b36a8a))
- merged changes and added stories tsx ([a91c7eb](https://github.com/equinor/fusion-web-components/commit/a91c7ebeb7607c968062556cb4111c5d3184dea7))

### Features

- added new checkbox component ([43e04c2](https://github.com/equinor/fusion-web-components/commit/43e04c238dff6899f8470c0c573d6b78ee86e71d))
