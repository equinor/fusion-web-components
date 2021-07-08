<!--prettier-ignore-start-->
# `<fusion-wc-textarea>` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-textarea.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-textarea)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/basic-textarea)

[Material Web Component](https://github.com/material-components/material-components-web-components/tree/master/packages/textarea)

## Installation
```sh
npm install @equinor/fusion-wc-textarea
```

### Properties/Attributes

| Name                | Type             | Description
| ------------------- | ---------------- |------------
| `rows`              | `number`         | Sets number of visible text lines.
| `cols`              | `number`         | Sets the visible width of the textarea.
| `value`             | `string`         | The input control's value.
| `type`              | `TextFieldType*` | A string specifying the type of control to render.
| `label`             | `string`         | Sets floating label value.
| `placeholder`       | `string`         | Sets disappearing input placeholder.
| `icon`              | `string`         | Leading icon to display in input. See [`mwc-icon`](https://github.com/material-components/material-components-web-components/tree/master/packages/icon).
| `iconTrailing`      | `string`         | Trailing icon to display in input. See [`mwc-icon`](https://github.com/material-components/material-components-web-components/tree/master/packages/icon).
| `disabled`          | `boolean`        | Whether or not the input should be disabled.
| `charCounter`       | `boolean`\|`TextAreaCharCounter**` | **Note: requires `maxLength` to be set.** Display character counter with max length. Textareas may display an `"external"` or `"internal"` `charCounter`. When `true`, textareas display an external character counter by default.
| `outlined`          | `boolean`        | Whether or not to show the material outlined variant.
| `helper`            | `string`         | Helper text to display below the input. Display default only when focused.
| `helperPersistent`  | `boolean`        | Always show the helper text despite focus.
| `required`          | `boolean`        | Displays error state if value is empty and input is blurred.
| `maxLength`         | `number`         | Maximum length input to accept.
| `validationMessage` | `string`         | Message to show in the error color when the textarea is invalid. (Helper text will not be visible)
| `validity`          | `ValidityState` (readonly) | The [`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) of the textfield.
| `willValidate`      | `boolean` (readonly)       | [`HTMLInputElement.prototype.willValidate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties)
| `validityTransform` | `ValidityTransform***`\|`null` | Callback called before each validation check. See the [validation section](#Validation) for more details.
| `validateOnInitialRender` | `boolean`            | Runs validation check on initial render.
`name`                | `string`         | Sets the `name` attribute on the internal textarea.\*\*\*

\*  `TextFieldType` is exported by `fwc-textarea` and `fwc-textarea-base`.
```ts
type TextFieldType = 'text'|'search'|'tel'|'url'|'email'|'password'|
    'date'|'month'|'week'|'time'|'datetime-local'|'number'|'color';
```
\*\*  `TextAreaCharCounter` is exported by `fwc-textarea`.
```ts
type TextAreaCharCounter = 'external'|'internal';

\*\*\* `ValidityTransform` is not exported. See the [validation section](#Validation) for more details.
```ts
type ValidityTransform = (value: string, nativeValidity: ValidityState) => Partial<ValidityState>
```

\*\*\* The `name` property should only be used for browser autofill as webcomponent form participation does not currently consider the `name` attribute. See [#289](https://github.com/material-components/material-components-web-components/issues/289).

### Methods

| Name     | Description
| -------- | -------------
| `checkValidity() => boolean`   | Returns `true` if the textarea passes validity checks. Returns `false` and fires an [`invalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) event on the textarea otherwise.
| `reportValidity() => boolean`   | Runs `checkValidity()` method, and if it returns false, then it reports to the user that the input is invalid.
| `setCustomValidity(message:string) => void`   | Sets a custom validity message (also overwrites `validationMessage`). If this message is not the empty string, then the element is suffering from a  custom validity error and does not validate.
| `layout() => Promise<void>`   | Re-calculate layout. If a textarea is styled with `display:none` before it is first rendered, and it has a label that is floating, then you must call `layout()` the first time you remove `display:none`, or else the notch surrounding the label will not render correctly.

### Validation

`<fwc-textarea>` follows the basic `<input>` [constraint validation model](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation).
It exposes:

* `required`
* `maxLength`
* `validity`
* `willValidate`
* `checkValidity()`
* `reportValidity()`
* `setCustomValidity(message)`

Additionally, it implements more features such as:
* `validationMessage`
* `validateOnInitialRender`
* and `validityTransform`

By default, `<fwc-textarea>` will report validation on `blur`.
<!--prettier-ignore-end-->
