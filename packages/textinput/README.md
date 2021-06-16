<!--prettier-ignore-start-->
# `<fusion-wc-textinput>` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-textinput.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-textinput)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/basic-textinput)

[Material Web Component](https://github.com/material-components/material-components-web-components/tree/master/packages/textinput)

## Installation
```sh
npm install @equinor/fusion-wc-textinput
```

### Properties/Attributes

Name                      | Type                          | Description
------------------------- | ----------------------------- | -----------
`value`                   | `string`                      | The input control's value.
`type`                    | `TextFieldType*`              | A string specifying the type of control to render.
`label`                   | `string`                      | Sets floating label value.
`placeholder`             | `string`                      | Sets disappearing input placeholder.
`prefix`                  | `string`                      | Prefix text to display before the input.
`suffix`                  | `string`                      | Suffix text to display after the input.
`icon`                    | `string`                      | Leading icon to display in input. See [`fwc-icon`](https://github.com/equinor/fusion-web-components/tree/main/packages/icon).
`iconTrailing`            | `string`                      | Trailing icon to display in input. See [`fwc-icon`](https://github.com/equinor/fusion-web-components/tree/main/packages/icon).
`disabled`                | `boolean`                     | Whether or not the input should be disabled.
`charCounter`             | `boolean`                     | **Note: requries `maxLength` to be set.** Display character counter with max length.
`outlined`                | `boolean`                     | Whether or not to show the material outlined variant.
`helper`                  | `string`                      | Helper text to display below the input. Display default only when focused.
`helperPersistent`        | `boolean`                     | Always show the helper text despite focus.
`required`                | `boolean`                     | Displays error state if value is empty and input is blurred.
`maxLength`               | `number`                      | Maximum length to accept input.
`validationMessage`       | `string`                      | Message to show in the error color when the textinput is invalid. (Helper text will not be visible)
`pattern`                 | `string`                      | [`HTMLInputElement.prototype.pattern`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) (empty string will unset attribute)
`min`                     | `number`\|`string`            | [`HTMLInputElement.prototype.min`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) (empty string will unset attribute)
`max`                     | `number`\|`string`            | [`HTMLInputElement.prototype.max`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) (empty string will unset attribute)
`size`                    | `number`\|`null`              | [`HTMLInputElement.prototype.size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefsize) (null will unset attribute)
`step`                    | `number`\|`null`              | [`HTMLInputElement.prototype.step`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) (null will unset attribute)
`autoValidate`            | `boolean`                     | Reports validity on value change rather than only on blur.
`validity`                | `ValidityState` (readonly)    | The [`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) of the textinput.
`willValidate`            | `boolean` (readonly)          | [`HTMLInputElement.prototype.willValidate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties)
`validityTransform`       | `ValidityTransform**`\|`null` | Callback called before each validation check. See the [validation section](#Validation) for more details.
`validateOnInitialRender` | `boolean`                     | Runs validation check on initial render.
`name`                    | `string`                      | Sets the `name` attribute on the internal input.\*\*\*

```ts
type TextFieldType = 'text'|'search'|'tel'|'url'|'email'|'password'|
    'date'|'month'|'week'|'time'|'datetime-local'|'number'|'color';
```

\*\* `ValidityTransform` is not exported. See the [validation section](#Validation) for more details.
```ts
type ValidityTransform = (value: string, nativeValidity: ValidityState) => Partial<ValidityState>
```

\*\*\* The `name` property should only be used for browser autofill as webcomponent form participation does not currently consider the `name` attribute. See [#289](https://github.com/material-components/material-components-web-components/issues/289).

### Methods

| Name     | Description
| -------- | -------------
| `checkValidity() => boolean`   | Returns `true` if the textinput passes validity checks. Returns `false` and fires an [`invalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) event on the textinput otherwise. <br>**NOTE:** When accessing any property or function that checks validity at textinput initial boot up, you may have to await `<fwc-textinput>.updateComplete`.
| `reportValidity() => boolean`   | Runs `checkValidity()` method, and if it returns false, then it reports to the user that the input is invalid.
| `setCustomValidity(message:string) => void`   | Sets a custom validity message (also overwrites `validationMessage`). If this message is not the empty string, then the element is suffering from a custom validity error and does not validate.
| `layout() => Promise<void>`   | Re-calculate layout. If a textinput is styled with `display:none` before it is first rendered, and it has a label that is floating, then you must call `layout()` the first time you remove `display:none`, or else the notch surrounding the label will not render correctly.

### Validation

`<fwc-textinput>` follows the basic `<input>` [constraint validation model](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation).
It exposes:

* `required`
* `maxLength`
* `pattern`
* `min`
* `max`
* `step`
* `validity`
* `willValidate`
* `checkValidity()`
* `reportValidity()`
* `setCustomValidity(message)`

Additionally, it implements more features such as:

* `validationMessage`
* `validateOnInitialRender`
* and `validityTransform`

By default, `<fwc-textinput>` will report validation on `blur`.
<!--prettier-ignore-end-->
