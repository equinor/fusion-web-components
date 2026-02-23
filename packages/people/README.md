<!--prettier-ignore-start-->
## `fusion-wc-people` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-people.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-people)

## Description

Comprehensive web component library for selecting and viewing people/users with advanced search functionality and multiple display modes.

### Components

#### `<fwc-people-picker>`

Interactive person selector with search, keyboard navigation, and multi-select support.

#### `<fwc-people-viewer>`

Display selected people in list or table format with customizable columns.

## Installation

```sh
npm install @equinor/fusion-wc-people
```

## Examples

```html
<!-- Simple picker -->
<fwc-people-picker></fwc-people-picker>

<!-- Viewer with pre-loaded people -->
<fwc-people-viewer 
  resolveIds="azure-id-1,azure-id-2,azure-id-3"
  viewMode="table">
</fwc-people-viewer>
```

## Events

The `fwc-people-picker` and `fwc-people-viewer` both share the same events.

```html
<!-- 
  Selection events
  @selection-changed: PersonInfo[]
  @person-added: PersonInfo
  @person-removed: PersonInfo
-->
<fwc-people-picker
  @selection-changed=${handler}
  @person-added=${handler}
  @person-removed=${handler}
></fwc-people-picker>
```

## PersonProvider

Its required to wrap these components with `fwc-person-provider` components.

The provider is usually delivered by the portal or cli. but you can also create a custom provider.

```html
<!-- Wrap components in person provider -->
<fwc-person-provider>
  <fwc-people-picker></fwc-people-picker>
</fwc-person-provider>
```

## Key Features

- ⌨️ Keyboard navigation (Arrow keys, Enter, Escape)
- 🔍 Debounced search (300ms)
- 👤 Single/multiple selection modes
- 📊 List and table view modes
- 🎨 Avatar customization
- 🔄 Service principal support

## Properties

### fwc-people-picker

| Property | Type | Description |
| ---------- | ------ | ------------- |
| `people` | `PersonInfo[]` | Array of PersonInfo objects to set as selected people in the picker. Mostly used when using PersonPicker as a controlled component. |
| `resolveIds` | `string[]` | Array of person azureIds to pre-resolve and display as selected people. PS: will only resolve on mount. |
| `placeholder` | `string` | Placeholder text shown in the search input. |
| `multiple` | `boolean` | Whether multiple people can be selected. Defaults to `true`. |
| `showSelectedPeople` | `boolean` | Whether to show selected people below the input. Defaults to `true`. This must be paired with `multiple` to be effective. |
| `subtitle` | `keyof PersonInfo` | Subtitle text field from PersonInfo displayed in the People Pills. |
| `secondarySubtitle` | `keyof PersonInfo` | Secondary subtitle field from PersonInfo displayed in the search result list. |
| `noResultTitle` | `string` | Title to show when suggest task has no results |
| `noResultSubtitle` | `string` | Subtitle to show when suggest task has no results |

### fwc-people-viewer

| Property | Type | Description |
| ---------- | ------ | ------------- |
| `people` | `PersonInfo[]` | Array of PersonInfo objects to display in the viewer. |
| `resolveIds` | `string[]` | Array of person azureIds to pre-resolve and display as selected people. PS: will only resolve on mount. |
| `viewMode` | `'list \| table'` | The view mode to display the people in. Defaults to `'list'`. |
| `showViewMode` | `boolean` | Whether to show the view mode selector. Defaults to `true`. |
| `tableColumns` | `string[]` | Array of column names to display in the table. Defaults to `['avatar', 'name', 'type', 'email', 'mobilePhone', 'jobTitle', 'department', 'manager', 'remove']`. |
| `subtitle` | `keyof PersonInfo` | Subtitle text field from PersonInfo displayed in the People Pills. |
