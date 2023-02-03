<!--prettier-ignore-start-->
# @equinor/fusion-wc-button 
[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-button.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-button)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/input-button)

[Material Web Component](https://github.com/material-components/material-components-web-components/tree/master/packages/button)

### Installation
```sh

npm install @equinor/fusion-wc-button

```

### Usage
```html
<fwc-button label="default"></fwc-button>
<fwc-button label="default" icon="settings"></fwc-button>
<fwc-button label="default"><span slot="icon">🚀</span></fwc-button>
```

### Slots
| Name           | Description
| -------------- | -----------
| `icon`         | Leading icon. Overrides `icon` property. Use `label` or the `icon` property to set the `aria-label`.
| `trailingIcon` | Icon to show _after_ the label. Overrides `trailingIcon` property. Use `label` or the `trailingIcon` property to set the `aria-label`.
| _default_      | Default content to display between both icons and after label. __NOTE:__ It is highly recommended to set the `label` property instead of projecting text as it will also set the `aria-label`

### Properties/Attributes
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `icon` | `string` | `''` | Icon to display, and `aria-label` value when `label` is not defined.
| `label` | `string` | `''` | Label to display for the button, and `aria-label`.
| `variant` | `ButtonVariant*` | `'contained'` | Button variant to render, defaults to `contained` if no variant is defined.
| `color` | `ButtonColor**` | `'primary'` | Button color to render, defaults to `primary` if no color is defined.
| `dense` | `boolean` | `false` | Makes the button text and container slightly smaller.
| `disabled` | `boolean` | `false` | Disabled buttons cannot be interacted with and have no visual interaction effect.
| `trailingIcon` | `boolean` | `false` | When `true`, `icon` will be displayed _after_ `label`.
| 'expandContent' | `boolean` | `false` | When `true`, the space after the label and before any trailing icon, where default slotted content is rendered, is expanded to fit the available space inside the button.

\*  `ButtonVariant` is exported by `fwc-button`.

```ts

type ButtonVariant = 'contained'|'outlined'|'ghost';

```

\**  `ButtonColor` is exported by `fwc-button`.

```ts

type ButtonColor = 'primary'|'secondary'|'danger';

```
<!--prettier-ignore-end-->
