<!--prettier-ignore-start-->
## `fusion-wc-icon-button` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-icon-button.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-icon-button)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/general-iconbutton--basic)

### Installation
```sh
npm install @equinor/fusion-wc-icon-button
```

### Properties/Attributes
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `icon` | `IconName*` | `''` | Icon to display. Currently only maps to EDS icon names.
| `size` | `IconButtonSize` | `medium` | Sets the size of the icon button element.
| `color` | `IconButtonColor` | `''` | Sets the color of the icon button element.
| `rounded` | `boolean` | `''` | Sets the shape of the icon button element to rounded or square.
| `disabled` | `boolean` | `''` | Sets the icon button to disabled.
| `ariaLabel` | `string` | `''` | Sets the accessible label for the button. Uses icon+'_icon-button' when not defined.
| `ariaHasPopup` | `string` | `''` | Indicates the availability and type of an interactive popup element, such as menu or dialog, that can be triggered by the button.

\*  `IconName` is exported by `@equinor/eds-icons`.

```ts
type IconName = keyof typeof icons | string;
```

<!--prettier-ignore-end-->
