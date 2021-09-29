<!--prettier-ignore-start-->
## `fusion-wc-list` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-list.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-list)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/data-list)

## Installation
```sh
npm install @equinor/fusion-wc-list
```

## List `<fwc-list>`

### Properties/Attributes

| Name             | Type           | Default | Description
| ---------------- | -------------- | ------- |------------
| `activatable`    | `boolean`      | `false` | Sets `activated` attribute on selected items which provides a focus-persistent highlight.
| `rootTabbable`   | `boolean`      | `false` | When `true`, sets `tabindex="0"` on the internal list. Otherwise sets `tabindex="-1"`.
| `multi`          | `boolean`      | `false` | When `true`, enables selection of multiple items.
| `wrapFocus`      | `boolean`      | `false` | When `true`, pressing `up` on the keyboard when focused on the first item will focus the last item and `down` when focused on the last item will focus the first item.
| `itemRoles`      | `string\|null` | `null`  | Determines what `role` attribute to set on all list items.
| `innerAriaLabel` | `string\|null` | `null`  | ARIA label of the internal `<ul>` element.
| `innerRole`      | `string\|null` | `null`  | Role of the internal `<ul>` element.
| `noninteractive` | `boolean`      | `false` | When `true`, disables focus and pointer events (thus ripples) on the list. Used for display-only lists.
<!--prettier-ignore-end-->
