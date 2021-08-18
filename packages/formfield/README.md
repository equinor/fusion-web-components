<!--prettier-ignore-start-->
## `fusion-wc-checkbox` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-formfield.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-formfield)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/basic-formfield)

[Material Web Component](https://github.com/material-components/material-components-web-components/tree/master/packages/formfield)

### Installation

```sh
npm install @equinor/fusion-wc-formfield
```

## Example Usage

```html
<fwc-formfield label='My label' nowrap>
  <fwx-checkbox />
</fwc-formfield>
```

### Properties/Attributes

## API

### Slots

Name      | Description
--------- | -----------
*default* | The input element that this form field provides a label for.


### Properties/Attributes

Name    | Type     | Description
------- | -------- | ----------------------------------
`label` | `string` | The text to display for the label and sets a11y label on input. (visually overriden by slotted label)
`alignEnd` | `boolean` | Align the component at the end of the label.
`spaceBetween` | `boolean` | Add space between the component and the label as the formfield grows.
`nowrap` | `boolean` | Prevents the label from wrapping and overflow text is ellipsed.

### Methods

*None*

### Events

*None*
<!--prettier-ignore-end-->
