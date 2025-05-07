# Change Log

## 3.1.9

### Patch Changes

- Updated dependencies [[`44e2503`](https://github.com/equinor/fusion-web-components/commit/44e2503f51a98131963d29200ed295416c0fa452)]:
  - @equinor/fusion-wc-list@1.1.4

## 3.1.8

### Patch Changes

- [#1826](https://github.com/equinor/fusion-web-components/pull/1826) [`df53ffe`](https://github.com/equinor/fusion-web-components/commit/df53ffe819ad7937286a6a594a3659e785769d9f) Thanks [@odinr](https://github.com/odinr)! - Fixed an issue with module exports to ensure compatibility with TypeScript 4.7, addressing changes in how ES module interop is handled.

## 3.1.7

### Patch Changes

- [#1823](https://github.com/equinor/fusion-web-components/pull/1823) [`9cb7c65`](https://github.com/equinor/fusion-web-components/commit/9cb7c65ea083b26e9f41cb9ae24f918315f930dd) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - re-add styling for person select

## 3.1.6

### Patch Changes

- Updated dependencies [[`546dd16`](https://github.com/equinor/fusion-web-components/commit/546dd168db71e881d7b7151478ef4adb62e6fb09)]:
  - @equinor/fusion-wc-textinput@1.1.4

## 3.1.5

### Patch Changes

- Updated dependencies [[`eb388db`](https://github.com/equinor/fusion-web-components/commit/eb388dbe5b5c9fb4b9d84811a26a1bb0ef725062)]:
  - @equinor/fusion-wc-textinput@1.1.3

## 3.1.4

### Patch Changes

- [#1750](https://github.com/equinor/fusion-web-components/pull/1750) [`e3a4cde`](https://github.com/equinor/fusion-web-components/commit/e3a4cde5107e34c063e71eb6942b21b943d07e0e) Thanks [@eikeland](https://github.com/eikeland)! - Setting person-select variant page-dense height to 36px to match eds height

## 3.1.3

### Patch Changes

- [#1742](https://github.com/equinor/fusion-web-components/pull/1742) [`e275a23`](https://github.com/equinor/fusion-web-components/commit/e275a231ccb1ab8cb79d64268cc2e1f91eac0622) Thanks [@eikeland](https://github.com/eikeland)! - Setting dense size to the same height as eds form input fields

## 3.1.2

### Patch Changes

- [#1715](https://github.com/equinor/fusion-web-components/pull/1715) [`44aa0a8`](https://github.com/equinor/fusion-web-components/commit/44aa0a8b744e873e19ee6fa9e92da0bd8c3031d8) Thanks [@eikeland](https://github.com/eikeland)! - Remove dependency for searchable-dropdown component

## 3.1.1

### Patch Changes

- [#1713](https://github.com/equinor/fusion-web-components/pull/1713) [`9bae280`](https://github.com/equinor/fusion-web-components/commit/9bae2807497f8c42e91e82d64e3f9e9caa97177f) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - Remove avatar border of internal employee

## 3.1.0

### Minor Changes

- [#1691](https://github.com/equinor/fusion-web-components/pull/1691) [`b72a1b7`](https://github.com/equinor/fusion-web-components/commit/b72a1b7768e0c9837f01a71113a5cc73a6511e62) Thanks [@odinr](https://github.com/odinr)! - - improved initial resolve of `selectedPerson`
  - added frame delay of dispatching resolve request (allow resolver to connect to `dom` and setup).

### Patch Changes

- [#1693](https://github.com/equinor/fusion-web-components/pull/1693) [`a2b50ff`](https://github.com/equinor/fusion-web-components/commit/a2b50ff76a9216e6d18b43aea5b42fbd3d28f0d3) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - Add and use accountClassification with accountType for displaying different colors on avatar border

## 3.0.6

### Patch Changes

- [#1687](https://github.com/equinor/fusion-web-components/pull/1687) [`6bd2a51`](https://github.com/equinor/fusion-web-components/commit/6bd2a51486260e346d5ac55b0d45dc253cad1c3a) Thanks [@eikeland](https://github.com/eikeland)! - ### Changes in `PersonSelectElement`

  - Added the `attribute: 'selectedperson'` to the `selectedPerson` property config to fix use in react and as a legal html property name.

## 3.0.5

### Patch Changes

- [#1653](https://github.com/equinor/fusion-web-components/pull/1653) [`ca2ea73`](https://github.com/equinor/fusion-web-components/commit/ca2ea738ba33c96e519c196c7c814138c1653d25) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add `focusTextInput` method to person-select.

## 3.0.4

### Patch Changes

- [#1650](https://github.com/equinor/fusion-web-components/pull/1650) [`4a69b85`](https://github.com/equinor/fusion-web-components/commit/4a69b8586d9c178fb07c4adce143ba77d2dd481a) Thanks [@eikeland](https://github.com/eikeland)! - ### Changes in `PersonSelectController`

  - Renamed the `attrSelectPerson` method to `attrSelectedPerson`.
  - Updated the `attrSelectedPerson` method to clear `selectedIds` when `select` is null or an empty string and `selectedIds` size is greater than zero.
  - Added logic to clear previous selections when the `selectedPerson` property changes.

  ### Changes in `PersonSelectElement`

  - Updated the `updated` method to call `attrSelectedPerson` instead of `attrSelectPerson`.

## 3.0.3

### Patch Changes

- [#1641](https://github.com/equinor/fusion-web-components/pull/1641) [`4aea53b`](https://github.com/equinor/fusion-web-components/commit/4aea53bbc75790f3afef1cf187710c0848e6bf74) Thanks [@eikeland](https://github.com/eikeland)! - ### Changes in `PersonSelectController`

  - Updated the `attrSelectPerson` method to clear `selectedIds` when `personData` or `selectedPerson` is null.
  - Updated the `clearInput` method to reset `azureId` and `upn` properties.
  - Refactored the `clear` method to use `#firePersonSelectEvent` instead of directly dispatching the event.
  - Removed unnecessary comments and cleaned up the code.

  ### Changes in `PersonSelectElement`

  - Added a new CSS class `.selected-persons` to hide the text input when a person is selected.
  - Updated the `selectedPersonsTemplate` method to be conditionally rendered based on the `selectedIds` size and `isOpen` state.
  - Adjusted the `classMap` to include the `selected-persons` class based on the `selectedIds` size and `isOpen`

## 3.0.2

### Patch Changes

- [#1584](https://github.com/equinor/fusion-web-components/pull/1584) [`2e8694b`](https://github.com/equinor/fusion-web-components/commit/2e8694b35a17ed6203f71427bb3e3f2e14994502) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - Change "undefined" look of the cell

- [#1562](https://github.com/equinor/fusion-web-components/pull/1562) [`150cc60`](https://github.com/equinor/fusion-web-components/commit/150cc606abaf489cbc432326b36af68e45052054) Thanks [@dependabot](https://github.com/apps/dependabot)! - chore(deps): bump lit from 3.1.3 to 3.2.0

- Updated dependencies [[`150cc60`](https://github.com/equinor/fusion-web-components/commit/150cc606abaf489cbc432326b36af68e45052054)]:
  - @equinor/fusion-wc-avatar@3.2.3
  - @equinor/fusion-wc-badge@1.3.2
  - @equinor/fusion-wc-button@2.4.2
  - @equinor/fusion-wc-icon@2.3.1
  - @equinor/fusion-wc-list@1.1.3
  - @equinor/fusion-wc-searchable-dropdown@3.7.4
  - @equinor/fusion-wc-skeleton@2.1.2
  - @equinor/fusion-wc-textinput@1.1.2

## 3.0.1

### Patch Changes

- [#1566](https://github.com/equinor/fusion-web-components/pull/1566) [`5b61628`](https://github.com/equinor/fusion-web-components/commit/5b616282a4c74c191352ee42d356c72443961e3d) Thanks [@eikeland](https://github.com/eikeland)! - Fixes clearing person when using the `selectedPerson` property

  # Summary of Latest Changes in This Branch Compared to Main Branch

  ## File: `controller.ts`

  ### Lines: 199-264

  ### Summary of Changes:

  1. **New Methods Added:**
     - **`clearInput()`**: Clears the input fields and resets the host's value and search properties.
     - **`clear()`**: Calls `clearInput()`, clears selected IDs, resets the selected person, and dispatches a custom `PersonSelectEvent`.
     - **`closeClick(e: MouseEvent | KeyboardEvent)`**: Handles the close icon click event, blurs the input and close icon, closes the dropdown if open, and calls an external close handler if defined.

  ### Detailed Changes:

  1. **Method: `clearInput()`**
     - **Purpose:** Clears the input fields and resets the host's value and search properties.
     - **Code:**
       ```typescript
       public clearInput() {
         this.#host.value = '';
         this.#host.search = '';
         this.#host.textInputElement.value = '';
       }
       ```
  2. **Method: `clear()`**

     - **Purpose:** Calls `clearInput()`, clears selected IDs, resets the selected person, and dispatches a custom `PersonSelectEvent`.
     - **Code:**

       ```typescript
       public clear() {
         this.clearInput();

         if (this.selectedIds.size) {
           this.selectedIds.clear();
         }

         if (this.#host.selectedPerson) {
           this.#host.selectedPerson = null;
         }

         /* Dispatch custom select event with our details */
         this.#host.dispatchEvent(
           new PersonSelectEvent({
             detail: {
               selected: null,
             },
             bubbles: true,
           }),
         );
       }
       ```

  3. **Method: `closeClick(e: MouseEvent | KeyboardEvent)`**

     - **Purpose:** Handles the close icon click event, blurs the input and close icon, closes the dropdown if open, and calls an external close handler if defined.
     - **Code:**

       ```typescript
       public closeClick = (e: MouseEvent | KeyboardEvent): void => {
         if (e.type === 'keydown') {

           /* only close on enter or space not tab */
           const me = e as KeyboardEvent;
           if (me.key !== 'Enter' && me.key !== 'Space') {
             return;
           }

           /* blur closeicon if focused */
           const closeIcon = this.#host.renderRoot.querySelector('.trailing');
           if (closeIcon) {
             (closeIcon as HTMLSpanElement).blur();
           }
         }

         if (this.#host.textInputElement) {
           this.#host.textInputElement.blur();
         }

         /* close dropdown if open */
         if (this.isOpen) {
           this.isOpen = false;
         }

         /* call resolvers handleclick if defined */
         if (this.#externaCloseHandler) {
           this.#externaCloseHandler(e);
         }
       }
       ```

## 3.0.0

### Major Changes

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

## 2.6.9

### Patch Changes

- [#1526](https://github.com/equinor/fusion-web-components/pull/1526) [`c073574`](https://github.com/equinor/fusion-web-components/commit/c0735742af9b01fc7d4064987855abd4135a7d0d) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Fix the hovering state not closing the floating element when position is bottom.

## 2.6.8

### Patch Changes

- Updated dependencies [[`e005262`](https://github.com/equinor/fusion-web-components/commit/e005262b7fc807cec1e08610fdf86f887979705d)]:
  - @equinor/fusion-wc-avatar@3.2.2

## 2.6.7

### Patch Changes

- [#1463](https://github.com/equinor/fusion-web-components/pull/1463) [`dcec24e`](https://github.com/equinor/fusion-web-components/commit/dcec24ef5609e5743a07055823a254f4621adf2c) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - Added stopPropagation to person card in avatar to prevent triggering click from parent

## 2.6.6

### Patch Changes

- [#1461](https://github.com/equinor/fusion-web-components/pull/1461) [`0bc06db`](https://github.com/equinor/fusion-web-components/commit/0bc06dbf003e078bf73bf191a0de429ad443f836) Thanks [@eikeland](https://github.com/eikeland)! - Updates fusion-web-theme

- Updated dependencies [[`0bc06db`](https://github.com/equinor/fusion-web-components/commit/0bc06dbf003e078bf73bf191a0de429ad443f836)]:
  - @equinor/fusion-wc-searchable-dropdown@3.7.3
  - @equinor/fusion-wc-textinput@1.1.1
  - @equinor/fusion-wc-skeleton@2.1.1
  - @equinor/fusion-wc-avatar@3.2.1
  - @equinor/fusion-wc-button@2.4.1
  - @equinor/fusion-wc-badge@1.3.1
  - @equinor/fusion-wc-list@1.1.2

## 2.6.5

### Patch Changes

- [#1458](https://github.com/equinor/fusion-web-components/pull/1458) [`12989dd`](https://github.com/equinor/fusion-web-components/commit/12989dd29716366d95d1c741aa2a9770659cd134) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Fix `fwc-avatar` size in `fwc-person-avatar`.

## 2.6.4

### Patch Changes

- [#1456](https://github.com/equinor/fusion-web-components/pull/1456) [`a7a8357`](https://github.com/equinor/fusion-web-components/commit/a7a8357d3907e539c6dbffb1fbdba81dec72b8ed) Thanks [@eikeland](https://github.com/eikeland)! - Fixes conflicts between tasks on personselect

## 2.6.3

### Patch Changes

- Updated dependencies [[`a2ee7ab`](https://github.com/equinor/fusion-web-components/commit/a2ee7ab5befae5da63f1014930c88643215da318)]:
  - @equinor/fusion-wc-searchable-dropdown@3.7.2

## 2.6.2

### Patch Changes

- [#1444](https://github.com/equinor/fusion-web-components/pull/1444) [`4b3ea8b`](https://github.com/equinor/fusion-web-components/commit/4b3ea8ba0f160769d934444ed8e993abe234490b) Thanks [@eikeland](https://github.com/eikeland)! - Support for searching with azureId on selectedPerson property

## 2.6.1

### Patch Changes

- [#1424](https://github.com/equinor/fusion-web-components/pull/1424) [`e74859b`](https://github.com/equinor/fusion-web-components/commit/e74859b91479c6452f98e5b76ebdc799b6228822) Thanks [@odinr](https://github.com/odinr)! - add CHANGELOG.md to tarball

- [#1437](https://github.com/equinor/fusion-web-components/pull/1437) [`cd90c94`](https://github.com/equinor/fusion-web-components/commit/cd90c949f025e7449ab55622dd5135d5b2e773d4) Thanks [@eikeland](https://github.com/eikeland)! - Fixes issue in CLI when resolving a person with selectedPerson property

## 2.6.0

### Minor Changes

- [#1321](https://github.com/equinor/fusion-web-components/pull/1321) [`f3a37c6`](https://github.com/equinor/fusion-web-components/commit/f3a37c63dd9fbb405eda01f7869a8efc93f7c1b6) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - add icon-bar for person-card

### Patch Changes

- [#1423](https://github.com/equinor/fusion-web-components/pull/1423) [`29adb1f`](https://github.com/equinor/fusion-web-components/commit/29adb1f2eef331f59c1f1fd58ac37ba746fc4b41) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Make avatar attribute `trigger` optional

## 2.5.1

### Patch Changes

- [#1375](https://github.com/equinor/fusion-web-components/pull/1375) [`4875f40`](https://github.com/equinor/fusion-web-components/commit/4875f4063fdb9a3869010f565397404210def788) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Fix placement to top if there is no space on bottom

## 2.5.0

### Minor Changes

- [#1366](https://github.com/equinor/fusion-web-components/pull/1366) [`f0a5bb3`](https://github.com/equinor/fusion-web-components/commit/f0a5bb337bd0bf5c9f75fa1ccbd6654ffe97f3ba) Thanks [@eikeland](https://github.com/eikeland)! - Add property `selectedPerson` to programmatically set or clear a person

## 2.4.0

### Minor Changes

- [#1350](https://github.com/equinor/fusion-web-components/pull/1350) [`f1ac6b8`](https://github.com/equinor/fusion-web-components/commit/f1ac6b88179f292b84d3f2224986259f286d466b) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Add fix to prevent person-card from showing when the person-avatar is set to disabled.

## 2.3.3

### Patch Changes

- Updated dependencies [[`69c55ae`](https://github.com/equinor/fusion-web-components/commit/69c55ae9d183c841470ddddafb29c337643ec04a)]:
  - @equinor/fusion-wc-list@1.1.1
  - @equinor/fusion-wc-searchable-dropdown@3.7.1

## 2.3.2

### Patch Changes

- Updated dependencies [[`4c8b130`](https://github.com/equinor/fusion-web-components/commit/4c8b130d828bf20140c3ba190a40ac4fb3687139)]:
  - @equinor/fusion-wc-searchable-dropdown@3.7.0

## 2.3.1

### Patch Changes

- [#1278](https://github.com/equinor/fusion-web-components/pull/1278) [`eadc3fb`](https://github.com/equinor/fusion-web-components/commit/eadc3fbf303a5379f0da7ccbd6f40fd50ed51453) Thanks [@eikeland](https://github.com/eikeland)! - unselected person shows as null in select event

## 2.3.0

### Minor Changes

- [#1103](https://github.com/equinor/fusion-web-components/pull/1103) [`e550bfd`](https://github.com/equinor/fusion-web-components/commit/e550bfd50497d415cb3e9a602b8b7b5dda2b167f) Thanks [@eikeland](https://github.com/eikeland)! - - Adding ui with selected person as person-list-items
  - Adding variable to person-list-item for setting background color

## 2.2.1

### Patch Changes

- [#1145](https://github.com/equinor/fusion-web-components/pull/1145) [`6f45901`](https://github.com/equinor/fusion-web-components/commit/6f45901c70f7945bf6afc5f9c120dbb2566822e8) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - - Person avatar: Account color fix

## 2.2.0

### Minor Changes

- [#1072](https://github.com/equinor/fusion-web-components/pull/1072) [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update lit from 2.7.0 to 3.0.2

### Patch Changes

- [`9c56a8b`](https://github.com/equinor/fusion-web-components/commit/9c56a8b624b9b5ce57f1e12eb650422b59641bfd) Thanks [@odinr](https://github.com/odinr)! - fixed account type color

- Updated dependencies [[`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0), [`e67f078`](https://github.com/equinor/fusion-web-components/commit/e67f078243a9fbf614c261ce8efa888d7c6c16fb), [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0), [`67f5368`](https://github.com/equinor/fusion-web-components/commit/67f5368005022dad3c103cc1673e352d6efd65e0)]:
  - @equinor/fusion-wc-list@1.1.0
  - @equinor/fusion-wc-searchable-dropdown@3.6.0
  - @equinor/fusion-wc-textinput@1.1.0
  - @equinor/fusion-wc-skeleton@2.1.0
  - @equinor/fusion-wc-avatar@3.2.0
  - @equinor/fusion-wc-button@2.4.0
  - @equinor/fusion-wc-badge@1.3.0
  - @equinor/fusion-wc-icon@2.3.0

## 2.1.8

### Patch Changes

- Updated dependencies [[`abd5d13`](https://github.com/equinor/fusion-web-components/commit/abd5d1397ee12a824e2b382bdc9cd73fc28affe1), [`bfebb70`](https://github.com/equinor/fusion-web-components/commit/bfebb7056ab6f02fd68dc19700c133327ae13a46), [`6482d02`](https://github.com/equinor/fusion-web-components/commit/6482d028db9b821aa29a6ee4638c3a5d3a2a2e29)]:
  - @equinor/fusion-wc-searchable-dropdown@3.5.0
  - @equinor/fusion-wc-skeleton@2.0.1

## 2.1.7

### Patch Changes

- Updated dependencies [[`e514ba1`](https://github.com/equinor/fusion-web-components/commit/e514ba11f3cfcdea293e1ad94ea6c8d01e7ffd16)]:
  - @equinor/fusion-wc-list@1.0.5
  - @equinor/fusion-wc-searchable-dropdown@3.4.3

## 2.1.6

### Patch Changes

- [#1061](https://github.com/equinor/fusion-web-components/pull/1061) [`c3d7232`](https://github.com/equinor/fusion-web-components/commit/c3d723233248177bd433cb37813b727d98bd09df) Thanks [@eikeland](https://github.com/eikeland)! - Exporting PersonSelectEvent

- Updated dependencies [[`0aaa4ad`](https://github.com/equinor/fusion-web-components/commit/0aaa4ad08f505e3fbe1f90fe3b62cff0be6a8e3f)]:
  - @equinor/fusion-wc-textinput@1.0.3
  - @equinor/fusion-wc-list@1.0.4
  - @equinor/fusion-wc-searchable-dropdown@3.4.2

## 2.1.5

### Patch Changes

- Updated dependencies [[`f16ad1c`](https://github.com/equinor/fusion-web-components/commit/f16ad1c4a186077433a2d292a62e9d86c2cfe01a), [`f230753`](https://github.com/equinor/fusion-web-components/commit/f230753d73abed4bc08364dfef73d8afda1d1e0e), [`70e72d6`](https://github.com/equinor/fusion-web-components/commit/70e72d674d4a7fd1b7dd5339bfbddc4a94ada428)]:
  - @equinor/fusion-wc-button@2.3.0
  - @equinor/fusion-wc-searchable-dropdown@3.4.1

## 2.1.4

### Patch Changes

- Updated dependencies [[`68ecc45`](https://github.com/equinor/fusion-web-components/commit/68ecc45544fbb3de9db701831b50d669dce02133), [`6c5c55e`](https://github.com/equinor/fusion-web-components/commit/6c5c55e9af7bfa107b74ce4791a884b1081a6f63), [`6c500df`](https://github.com/equinor/fusion-web-components/commit/6c500df8420c80cb693708bca9b90a66fb3c47a3), [`9f00da0`](https://github.com/equinor/fusion-web-components/commit/9f00da0e890457f4f832147fbc10e0658c3c891b), [`9f00da0`](https://github.com/equinor/fusion-web-components/commit/9f00da0e890457f4f832147fbc10e0658c3c891b)]:
  - @equinor/fusion-wc-icon@2.2.0
  - @equinor/fusion-wc-list@1.0.3
  - @equinor/fusion-wc-searchable-dropdown@3.4.0
  - @equinor/fusion-wc-avatar@3.1.1
  - @equinor/fusion-wc-button@2.2.0
  - @equinor/fusion-wc-badge@1.2.1
  - @equinor/fusion-wc-textinput@1.0.2

## 2.1.3

### Patch Changes

- Updated dependencies [[`f6c9623`](https://github.com/equinor/fusion-web-components/commit/f6c9623bd1a3a0fea9733e696f34f832ab908c2c), [`e000106`](https://github.com/equinor/fusion-web-components/commit/e000106f0ba91fcdb3b52fd9571aba5e46e06ed2)]:
  - @equinor/fusion-wc-searchable-dropdown@3.3.0

## 2.1.2

### Patch Changes

- Updated dependencies [[`43a3e00`](https://github.com/equinor/fusion-web-components/commit/43a3e007716d4568e6cfcb00e801b417631c92de)]:
  - @equinor/fusion-wc-badge@1.2.0

## 2.1.1

### Patch Changes

- [#925](https://github.com/equinor/fusion-web-components/pull/925) [`6f5df68`](https://github.com/equinor/fusion-web-components/commit/6f5df680380b31e9ce7f76b8d6b531854130b6c4) Thanks [@odinr](https://github.com/odinr)! - update person component

  - change order of manger in `fwc-person-card`
  - decrease padding of search result list items in `fwc-person-selector`

## 2.1.0

### Minor Changes

- [#908](https://github.com/equinor/fusion-web-components/pull/908) [`c786e48`](https://github.com/equinor/fusion-web-components/commit/c786e48e725c06499960193e1a4a7a151f3c722f) Thanks [@odinr](https://github.com/odinr)! - update person components

  - quick update of TsDoc
  - changed all avatars to person-avatars
    - added flag on avatar for `none` trigger _(prevent hover on card, select)_
    - TODO: avatars need `azureId`|`upn`, this can be resolved from `dataSource`
  - minor style/css cleanup
  - fixed exports from `package.json`
  - created new stories
    - added FakerJS _(`azureId` as seed to persist snapshots)_

### Patch Changes

- [#907](https://github.com/equinor/fusion-web-components/pull/907) [`4729fda`](https://github.com/equinor/fusion-web-components/commit/4729fda8d184d1ab23dca0b32df82a904141b6f2) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - updates the typing of `accountType` to use the string variant of the enum.

- [#902](https://github.com/equinor/fusion-web-components/pull/902) [`93a5f89`](https://github.com/equinor/fusion-web-components/commit/93a5f89d590a71b9c903352a8839be49c4a52d51) Thanks [@odinr](https://github.com/odinr)! - Fix all missing imports of web elements

  - fixed imports _(still need more clean-up!)_
  - fixed 'unused' protection of required WC
  - fix un-relative paths
  - updated interfaces

- Updated dependencies [[`c786e48`](https://github.com/equinor/fusion-web-components/commit/c786e48e725c06499960193e1a4a7a151f3c722f), [`c786e48`](https://github.com/equinor/fusion-web-components/commit/c786e48e725c06499960193e1a4a7a151f3c722f), [`c786e48`](https://github.com/equinor/fusion-web-components/commit/c786e48e725c06499960193e1a4a7a151f3c722f), [`c786e48`](https://github.com/equinor/fusion-web-components/commit/c786e48e725c06499960193e1a4a7a151f3c722f)]:
  - @equinor/fusion-wc-avatar@3.1.0
  - @equinor/fusion-wc-button@2.1.0
  - @equinor/fusion-wc-badge@1.1.0
  - @equinor/fusion-wc-skeleton@2.0.0
  - @equinor/fusion-wc-list@1.0.2
  - @equinor/fusion-wc-searchable-dropdown@3.2.1

## 2.0.3

### Patch Changes

- Updated dependencies [[`a24d31f`](https://github.com/equinor/fusion-web-components/commit/a24d31ff732424964407602025f2dc95dfc89ef9)]:
  - @equinor/fusion-wc-searchable-dropdown@3.2.0

## 2.0.2

### Patch Changes

- Updated dependencies [[`aeed5b1`](https://github.com/equinor/fusion-web-components/commit/aeed5b1d0bf8f540ec86ad1e28d09b1c2d0348a9), [`aeed5b1`](https://github.com/equinor/fusion-web-components/commit/aeed5b1d0bf8f540ec86ad1e28d09b1c2d0348a9)]:
  - @equinor/fusion-wc-icon@2.1.0
  - @equinor/fusion-wc-searchable-dropdown@3.1.0
  - @equinor/fusion-wc-badge@1.0.1
  - @equinor/fusion-wc-button@2.0.1
  - @equinor/fusion-wc-list@1.0.1
  - @equinor/fusion-wc-skeleton@1.0.0

## 2.0.1

### Patch Changes

- [#882](https://github.com/equinor/fusion-web-components/pull/882) [`8a5c681`](https://github.com/equinor/fusion-web-components/commit/8a5c681dd385f2b0d8cda0ed70309d264eef2e94) Thanks [@asbjornhaland](https://github.com/asbjornhaland)! - Updates the internal structure and styling to correctly calculate position of
  person card in person avatar.

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
  - @equinor/fusion-wc-searchable-dropdown@3.0.0
  - @equinor/fusion-wc-skeleton@1.0.0
  - @equinor/fusion-wc-avatar@3.0.0
  - @equinor/fusion-wc-button@2.0.0
  - @equinor/fusion-wc-badge@1.0.0
  - @equinor/fusion-wc-core@2.0.0
  - @equinor/fusion-wc-icon@2.0.0
  - @equinor/fusion-wc-list@1.0.0

## 1.2.2

### Patch Changes

- [#865](https://github.com/equinor/fusion-web-components/pull/865) [`33916bb`](https://github.com/equinor/fusion-web-components/commit/33916bbd67b5a7354244ec159b375ed56abe38c8) Thanks [@odinr](https://github.com/odinr)! - force update of style on render for `PersonProviderElement`

## 1.2.1

### Patch Changes

- [#862](https://github.com/equinor/fusion-web-components/pull/862) [`28ce1f0`](https://github.com/equinor/fusion-web-components/commit/28ce1f07139294ecdfa28db34f2be3dee0d94c00) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - swap places with default and types in package eports

## 1.2.0

### Minor Changes

- [#859](https://github.com/equinor/fusion-web-components/pull/859) [`2b30ccb`](https://github.com/equinor/fusion-web-components/commit/2b30ccbb8e36926ca0c27defa8876dcf72234dce) Thanks [@AndrejNikolicEq](https://github.com/AndrejNikolicEq)! - Updated package.json export route

## 1.1.1

### Patch Changes

- [`c9413be`](https://github.com/equinor/fusion-web-components/commit/c9413beb02b168de63c2f978f121e80fe1b68614) Thanks [@odinr](https://github.com/odinr)! - update package.json

## 1.1.0

### Minor Changes

- [#856](https://github.com/equinor/fusion-web-components/pull/856) [`fb8434b`](https://github.com/equinor/fusion-web-components/commit/fb8434b56f23ab98b546cb88ded76d464fb67549) Thanks [@odinr](https://github.com/odinr)! - rename search to select

  renamed `fusion-wc-person-search` to `fusion-wc-person-select`

### Patch Changes

- [#856](https://github.com/equinor/fusion-web-components/pull/856) [`fb8434b`](https://github.com/equinor/fusion-web-components/commit/fb8434b56f23ab98b546cb88ded76d464fb67549) Thanks [@odinr](https://github.com/odinr)! - expose upn in PersonInfo interface

- [#856](https://github.com/equinor/fusion-web-components/pull/856) [`fb8434b`](https://github.com/equinor/fusion-web-components/commit/fb8434b56f23ab98b546cb88ded76d464fb67549) Thanks [@odinr](https://github.com/odinr)! - fix circular dependency

## 1.0.0

### Major Changes

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - re-align person component

  ## Highlight

  > all elements can resolve by either providing `azureId` or `upn`
  >
  > _note, missing setting photo source by data source_

  - **all elements can resolve by either providing `azureId` or `upn`**
  - **only resolve when intersected in the DOM**
  - **major rework of styling**

  ## Components

  ### Avatar

  element which renders a person avatar.
  by default when hovering an avatar the person card is shown

  ### Card

  element which shows detailed information about a user

  ### List item

  element to display a user as a list item

  ### search

  Drop down selector of person element

  ### Task

  added tasks for rendering person data source async. These jobs emits events that are handled by the closes provider

  - info
  - detail
  - photo
  - search

  ### Provider

  element which listens for task events to process, this element should have a `resolver` which executes the query of the event dispatcher.

  ```ts
  export interface PersonResolver {
    getDetails?: (args: ResolverArgs<AzureIdOrUpnObj>) => ResolverResult<PersonDetails>;
    getInfo?: (args: ResolverArgs<AzureIdOrUpnObj>) => ResolverResult<PersonInfo>;
    getPhoto?: (args: ResolverArgs<AzureIdOrUpnObj>) => ResolverResult<string>;
    search?: (args: ResolverArgs<{ search: string }>) => ResolverResult<PersonSearchResult>;
  }
  ```

### Patch Changes

- [#806](https://github.com/equinor/fusion-web-components/pull/806) [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59) Thanks [@odinr](https://github.com/odinr)! - move from lerna version to changeset

- Updated dependencies [[`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59), [`266cefd`](https://github.com/equinor/fusion-web-components/commit/266cefd493f898f440ce93e92e79964bbd33be59)]:
  - @equinor/fusion-wc-list@0.4.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.6.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.6.0...@equinor/fusion-wc-person@0.6.1) (2023-09-07)

### Bug Fixes

- **person:** update namesapce ([22d05aa](https://github.com/equinor/fusion-web-components/commit/22d05aab6c0da2fb7201c964369dc1b676efe72b))

# [0.6.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.5.1...@equinor/fusion-wc-person@0.6.0) (2023-09-07)

### Features

- **person:** move task types to typings file ([5389a57](https://github.com/equinor/fusion-web-components/commit/5389a57abfc37dd18cd8625f9cf5e6a96511632d))

## [0.5.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.5.0...@equinor/fusion-wc-person@0.5.1) (2023-09-04)

**Note:** Version bump only for package @equinor/fusion-wc-person

# [0.5.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.4.7...@equinor/fusion-wc-person@0.5.0) (2023-09-04)

### Features

- **person-avatar:** show person-card when avatar is clicked or hovered ([a85e61d](https://github.com/equinor/fusion-web-components/commit/a85e61d85ef0bba821416e7e2b1a5309c6875703))

## [0.4.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.4.6...@equinor/fusion-wc-person@0.4.7) (2023-08-24)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.4.6](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.4.5...@equinor/fusion-wc-person@0.4.6) (2023-08-10)

### Bug Fixes

- **person:** account type background ([000f2b8](https://github.com/equinor/fusion-web-components/commit/000f2b81f37dcb1fe545ecdd3c1e26d9d57289f3))

## [0.4.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.4.4...@equinor/fusion-wc-person@0.4.5) (2023-07-10)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.4.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.4.3...@equinor/fusion-wc-person@0.4.4) (2023-06-19)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.4.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.4.2...@equinor/fusion-wc-person@0.4.3) (2023-06-16)

### Bug Fixes

- **person-card:** card background and minimum width ([b38db94](https://github.com/equinor/fusion-web-components/commit/b38db945d18c42bbfecebaa96b8af8782a995f8d))

## [0.4.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.4.1...@equinor/fusion-wc-person@0.4.2) (2023-03-24)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.4.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.4.0...@equinor/fusion-wc-person@0.4.1) (2023-03-20)

### Bug Fixes

- **person-card:** pending look ([9276807](https://github.com/equinor/fusion-web-components/commit/9276807413d298b08e500b76021b4cf8f7809fd8))
- **person-list-item:** comented code cleanup ([a3dc9a2](https://github.com/equinor/fusion-web-components/commit/a3dc9a2b511c49ba1d759c31d02131dbcebc3f4a))
- **person-list-item:** export shortcuts ([73f1b43](https://github.com/equinor/fusion-web-components/commit/73f1b43c65461c3b8d4cf48f08bc983919213ec5))
- **person-list-item:** icon size ([c402f3c](https://github.com/equinor/fusion-web-components/commit/c402f3cf9013a1d284ce086fed3034c491ec99e5))
- **person-list-item:** pending skeleton ([d2594d0](https://github.com/equinor/fusion-web-components/commit/d2594d016ed82199c2c8b253d02ccdab01fcede6))
- **person-list-item:** pending slot ([5760526](https://github.com/equinor/fusion-web-components/commit/57605269d1d86b8d3b34ae93d6f39bf723316144))
- **person-list-item:** remove click handle ([7b69d89](https://github.com/equinor/fusion-web-components/commit/7b69d89f2fb719ead9b5ecf90c08b148dd899022))

# [0.4.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.11...@equinor/fusion-wc-person@0.4.0) (2023-02-24)

### Bug Fixes

- **person-avatar:** use person placeholder ([9b6bfb4](https://github.com/equinor/fusion-web-components/commit/9b6bfb42df870548a2ab29556ab0beeb021ee393))
- **person-card:** redesign - 1.1 ([490439e](https://github.com/equinor/fusion-web-components/commit/490439ef2fc14800d9e42b845f552e0c92f9b559))
- **person-card:** redesign - draft v1 ([f55f973](https://github.com/equinor/fusion-web-components/commit/f55f9730f58b50e92809276aa0fa8987f5f92196))
- **person-list-item:** design ([5097374](https://github.com/equinor/fusion-web-components/commit/5097374c532f4b1266eaa5b4ba5235a413e387a4))
- **person-list-item:** style rework ([df2102c](https://github.com/equinor/fusion-web-components/commit/df2102c88ec1a4fc52536b5a4d9b4080ce48dd1a))

### Features

- **person-list-item:** toolbar slot ([c9c3492](https://github.com/equinor/fusion-web-components/commit/c9c34921359ce33a550cf95fec42b0447e982634))
- **person:** person list item - single ([9234484](https://github.com/equinor/fusion-web-components/commit/9234484342e72659b81bcca35c570785c44ebd04))
- **person:** public placeholders ([3674581](https://github.com/equinor/fusion-web-components/commit/3674581200eaa381a66653275b5f8ca3fe64b1ce))

## [0.3.11](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.10...@equinor/fusion-wc-person@0.3.11) (2023-02-09)

### Bug Fixes

- :stethoscope: handle error ([7ceae67](https://github.com/equinor/fusion-web-components/commit/7ceae67b45e26788a536ef6853a0c6db3eb54d31))

## [0.3.10](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.9...@equinor/fusion-wc-person@0.3.10) (2023-02-08)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.3.9](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.8...@equinor/fusion-wc-person@0.3.9) (2023-02-07)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.3.8](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.7...@equinor/fusion-wc-person@0.3.8) (2022-12-20)

### Bug Fixes

- **person:** resolver fix ([bd95dfa](https://github.com/equinor/fusion-web-components/commit/bd95dfa71ed41f2a94c382652fbcfa2d012f9d08))

## [0.3.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.6...@equinor/fusion-wc-person@0.3.7) (2022-11-24)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.3.6](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.5...@equinor/fusion-wc-person@0.3.6) (2022-11-07)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.3.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.4...@equinor/fusion-wc-person@0.3.5) (2022-10-31)

### Bug Fixes

- **person-card:** added busy to badge ([4508a7e](https://github.com/equinor/fusion-web-components/commit/4508a7e61630a1d7f41c793f06a5c0f001cf8481))
- **person-card:** availability icon ([f6d4058](https://github.com/equinor/fusion-web-components/commit/f6d4058967a38f46d43668b6fa7a08800deea36c))

## [0.3.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.3...@equinor/fusion-wc-person@0.3.4) (2022-10-24)

### Bug Fixes

- **person:** update type exports ([e16cf55](https://github.com/equinor/fusion-web-components/commit/e16cf5524fe51b52d46ca4cfa2831a3d0445dda6))

## [0.3.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.2...@equinor/fusion-wc-person@0.3.3) (2022-10-24)

### Bug Fixes

- **person:** fix export of tags ([3a43c96](https://github.com/equinor/fusion-web-components/commit/3a43c968dc9f30a43e25db4b4c04601ca6aa06c7))

## [0.3.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.1...@equinor/fusion-wc-person@0.3.2) (2022-10-21)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.3.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.3.0...@equinor/fusion-wc-person@0.3.1) (2022-10-21)

### Bug Fixes

- **person:** update account type ([feee3fd](https://github.com/equinor/fusion-web-components/commit/feee3fd76a4f523e7047802f6cd1f3836d8fab97))
- **person:** update check of account type name ([70e074b](https://github.com/equinor/fusion-web-components/commit/70e074b81228e19b6ed82dc3337d483806fe4ae2))
- **person:** update typing and export ([3b20559](https://github.com/equinor/fusion-web-components/commit/3b205592c45e6534ccb1a1930a71a0b9dfd11d12))

# [0.3.0](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.10...@equinor/fusion-wc-person@0.3.0) (2022-10-11)

### Bug Fixes

- **person-card:** readme update ([69a9ed6](https://github.com/equinor/fusion-web-components/commit/69a9ed6ce5999fff96ef6f41469e47c1d981541f))
- **person-card:** remove badge type color ([c2f5047](https://github.com/equinor/fusion-web-components/commit/c2f504758d291d5c380226b849ff3e570f338cf1))
- **person-card:** removed host from css ([97efa02](https://github.com/equinor/fusion-web-components/commit/97efa029647e638147e90d6b1295816b58ac716a))

### Features

- **person-card:** created web component ([f81dc53](https://github.com/equinor/fusion-web-components/commit/f81dc53089d1bd27ebef63a2d2d3c45cfe1d50dc))

## [0.2.10](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.9...@equinor/fusion-wc-person@0.2.10) (2022-09-14)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.2.9](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.8...@equinor/fusion-wc-person@0.2.9) (2022-02-24)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.2.8](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.7...@equinor/fusion-wc-person@0.2.8) (2022-02-23)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.2.7](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.6...@equinor/fusion-wc-person@0.2.7) (2022-02-18)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.2.6](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.5...@equinor/fusion-wc-person@0.2.6) (2022-02-08)

### Bug Fixes

- add npm ignore to packages ([8a9f436](https://github.com/equinor/fusion-web-components/commit/8a9f436f4d38c0fec431d9388ce3098853f8babc))

## [0.2.5](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.4...@equinor/fusion-wc-person@0.2.5) (2022-02-08)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.2.4](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.3...@equinor/fusion-wc-person@0.2.4) (2022-02-07)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.2.3](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.2...@equinor/fusion-wc-person@0.2.3) (2022-02-07)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.2.2](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.1...@equinor/fusion-wc-person@0.2.2) (2022-01-19)

**Note:** Version bump only for package @equinor/fusion-wc-person

## [0.2.1](https://github.com/equinor/fusion-web-components/compare/@equinor/fusion-wc-person@0.2.0...@equinor/fusion-wc-person@0.2.1) (2021-10-29)

**Note:** Version bump only for package @equinor/fusion-wc-person

# 0.2.0 (2021-10-29)

### Bug Fixes

- added pending state for avatar ([1fce13c](https://github.com/equinor/fusion-web-components/commit/1fce13c3333f96ea9e9a47f9ac42bc33ce4240f3))
- added pending state for avatar ([fee3a87](https://github.com/equinor/fusion-web-components/commit/fee3a8795f9610c6308833159196da4931572f0f))
- added pending state for avatar ([f32a064](https://github.com/equinor/fusion-web-components/commit/f32a06468de4209bb3fe366d8f812bc887bcbd81))
- added pending state for avatar ([8848e76](https://github.com/equinor/fusion-web-components/commit/8848e7647e49808bcc88ecf32c1727751034ebdf))
- added reactive controller with async tasks for person provider ([e6f9055](https://github.com/equinor/fusion-web-components/commit/e6f9055a3edaabe37403e41bc22d90109a815307))
- added reactive controller with async tasks for person provider ([d2b9643](https://github.com/equinor/fusion-web-components/commit/d2b9643dc1e0653bbfe9b15cdcd09ffd8e20572a))
- added reactive controller with async tasks for person provider ([5f6c557](https://github.com/equinor/fusion-web-components/commit/5f6c5576aff90dee6483cda06cb4b6bae4e296bc))
- added reactive controller with async tasks for person provider ([b3259aa](https://github.com/equinor/fusion-web-components/commit/b3259aac989f3b7d2452bd187a9a5762f4ba6891))
- fixed attributes to props where not needed in DOM ([e500d5d](https://github.com/equinor/fusion-web-components/commit/e500d5dbd95cc6abdcb50bf14f84d824160ecad5))
- fixed conflicts ([e386124](https://github.com/equinor/fusion-web-components/commit/e38612472730b8d9be38c56e5058c8c872e9638c))
- fixed linting ([6e0fa8e](https://github.com/equinor/fusion-web-components/commit/6e0fa8ee478ba852d9744e04107f3a72be447f10))
- fixed readme and storybook ([a68d7fc](https://github.com/equinor/fusion-web-components/commit/a68d7fca30573d818955b39ebc9a6209a347962a))
- fixed readme and storybook ([217734a](https://github.com/equinor/fusion-web-components/commit/217734a7b65ccba7f2002935826756466342b0b3))
- fixed readme and storybook ([5474869](https://github.com/equinor/fusion-web-components/commit/54748691b6cac64027179dc17ef93b5e2dcce233))
- fixed readme and storybook ([2e7378c](https://github.com/equinor/fusion-web-components/commit/2e7378ce2d4924e239a4e2d33d4a83c99d114897))
- fixed rerender issue with tasks ([00c4d26](https://github.com/equinor/fusion-web-components/commit/00c4d26ca321e01c4c9a08d14a3ae80f7ac87209))
- fixed rerender issue with tasks ([5bf833b](https://github.com/equinor/fusion-web-components/commit/5bf833b2409af2672e0ca3b4edf3c80c8ed7155a))
- fixed rerender issue with tasks ([e1506c3](https://github.com/equinor/fusion-web-components/commit/e1506c37322660d40c1044a17117b923c69e35a4))
- fixed rerender issue with tasks ([0c68f4c](https://github.com/equinor/fusion-web-components/commit/0c68f4c608e31ecdec055da7ecd3391a34d16c32))
- fixed styling, documentation and refactoring ([e9d8164](https://github.com/equinor/fusion-web-components/commit/e9d816498e839419af1cbc86041584ee87e59d26))
- removed unused import ([0958bd5](https://github.com/equinor/fusion-web-components/commit/0958bd56b4d18dd7c0928653a3f547bf4b8c7b3b))
- removed unused type ([edd1c1b](https://github.com/equinor/fusion-web-components/commit/edd1c1bc9d476d03f89ed0ac8492db2a2e367369))
- updated avatar and badge packages ([53ac849](https://github.com/equinor/fusion-web-components/commit/53ac8490322218e0673c44adeecc7b43dcac41c7))
- updated avatar and badge packages ([d386f63](https://github.com/equinor/fusion-web-components/commit/d386f6373aff98019fd93359495c22ddbfb476c2))
- upgraded lit-element and lit-html to li 2.0.0 ([3709cdd](https://github.com/equinor/fusion-web-components/commit/3709cddf32629583941af18a6664e0f987a014ba))
- upgraded lit-element and lit-html to li 2.0.0 ([b54c39e](https://github.com/equinor/fusion-web-components/commit/b54c39e2e94066d07ac79ab1b98453155c378cc9))
- upgraded lit-element and lit-html to li 2.0.0 ([2003168](https://github.com/equinor/fusion-web-components/commit/200316866064e26fb991d2195bff2c9a09c1f35a))
- upgraded lit-element and lit-html to li 2.0.0 ([a2e18aa](https://github.com/equinor/fusion-web-components/commit/a2e18aab25f7f1e5c6178a03b2b8d5d9007724f1))

### Features

- added person resolver and person avatar component ([36ac7df](https://github.com/equinor/fusion-web-components/commit/36ac7dfd6a0af41b884d80d72eaaf05f4908422d))
- added person resolver and person avatar component ([cb12d4e](https://github.com/equinor/fusion-web-components/commit/cb12d4ea55925e818c96c05db80e2960686eafe0))
