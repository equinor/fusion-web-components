/* eslint-disable @typescript-eslint/ban-ts-comment */
import { html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { TextFieldBase, TextFieldType } from '@material/mwc-textfield/mwc-textfield-base';

import { IconName } from '@equinor/fusion-wc-icon';
import { styles } from './element.css';

import('@equinor/fusion-wc-icon');

export type TextInputVariant = 'filled' | 'outlined';
export type ValidityTransform = (value: string, nativeValidity: ValidityState) => Partial<ValidityState>;
export type TextInputType = TextFieldType;
export type TextInputCharCounter = 'external' | 'internal';

export type TextInputElementProps = {
  name?: string;
  value?: string;
  type?:
    | 'text'
    | 'search'
    | 'tel'
    | 'url'
    | 'email'
    | 'password'
    | 'date'
    | 'month'
    | 'week'
    | 'time'
    | 'datetime-local'
    | 'number'
    | 'color';
  variant?: 'filled' | 'outlined';
  label?: string;
  disabled?: boolean;
  charCounter: boolean | 'external' | 'internal';
  maxLength?: number;
  helper?: string;
  icon?: IconName;
  iconTrailing?: IconName;
  errorMessage?: string;
  dense?: boolean;
};

/**
 * Follows the basic `<input>` [constraint validation model](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation).
 * It exposes:
 *
 * * required
 * * maxLength
 * * pattern
 * * min
 * * max
 * * step
 * * validity
 * * willValidate
 * * checkValidity()
 * * reportValidity()
 * * setCustomValidity(message)
 *
 * Additionally, it implements more features such as:
 *
 * * validationMessage
 * * validateOnInitialRender
 * * validityTransform
 *
 * The element will report validation on `blur`.
 *
 * @tag fwc-textinput
 * @property {string} name - should only be used for browser autofill as webcomponent form participation does not currently consider the `name` attribute. See [#289](https://github.com/material-components/material-components-web-components/issues/289).
 * @property {string} value - The input control's value.
 * @property {text|search|tel|url|email|password|date|month|week|time|datetime-local|number|color} type - A string specifying the type of control to render.
 * @property {filled|outlined} variant - Input style variant to render
 * @property {string} label - Sets floating label value
 * @property {string} placeholder - Sets disappearing input placeholder
 * @property {string} prefix - Prefix text to display before the input
 * @property {string} suffix - Suffix text to display after the input
 * @property {boolean} disabled - Whether or not the input should be disabled
 * @property {boolean|"external"|"internal"} charCounter - Display character counter with max length. **Note: requries `maxLength` to be set.**
 * @property {string} helper - Helper text to display below the input. Display default only when focused
 * @property {boolean} helperPersistent - Always show the helper text despite focus
 * @property {number} maxLength - Maximum length to accept input
 * @property {string} validationMessage - Message to show in the error color when the input is invalid _(Helper text will not be visible)_
 * @property {string} pattern - [`HTMLInputElement.prototype.pattern`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) _(empty string will unset attribute)_
 * @property {number|string} min - [`HTMLInputElement.prototype.min`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) _(empty string will unset attribute)_
 * @property {number|string} max - [`HTMLInputElement.prototype.min`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) _(empty string will unset attribute)_
 * @property {number|string} step - [`HTMLInputElement.prototype.min`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) _(empty string will unset attribute)_
 * @property {number} size - [`HTMLInputElement.prototype.size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefsize) _(null will unset attribute)_
 * @property {boolean} autoValidate - Reports validity on value change rather than only on blur
 * @property {ValidityState} validity - The [`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) of the input **readonly**
 * @property {boolean} willValidate - [`HTMLInputElement.prototype.willValidate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties) **readonly**
 * @property {boolean} validateOnInitialRender - Runs validation check on initial render
 * @property {(value: string, nativeValidity: ValidityState) => Partial<ValidityState>} validityTransform - Callback called before each validation check. See the [validation section](#Validation) for more details.
 *
 * @cssprop {theme.colors.text.static_icons__tertiary} --fwc-text-field-base-color - base color of the element
 * @cssprop {theme.colors.ui.background__light} --fwc-text-field-fill-color - background color of element
 * @cssprop {theme.colors.text.static_icons__default} --fwc-text-field-ink-color -  Text color
 * @cssprop {theme.colors.text.static_icons__default} --fwc-text-field-disabled-ink-color - Text color when disabled
 *
 * @fires change - When the focus is removed from the element
 * @fires input - When the value of the element changes
 * @fires invalid - When the validation of element fails
 *
 * @summary Enhanced input element, based on [Material Web Component](https://github.com/material-components/material-components-web-components/tree/master/packages/textfield)
 */
export class TextInputElement extends TextFieldBase {
  /**
   * Leading icon to display in input
   * [`fwc-icon`](https://github.com/equinor/fusion-web-components/tree/main/packages/icon)
   */
  // @ts-ignore
  override icon?: IconName;

  /**
   * Trailing icon to display in input
   * [`fwc-icon`](https://github.com/equinor/fusion-web-components/tree/main/packages/icon).
   */
  // @ts-ignore
  override iconTrailing?: IconName;

  /**
   * Input style variant to render.
   */
  @property({ type: String })
  public variant: TextInputVariant = 'filled';

  /**
   * Sets provided message as custom validity and displays it.
   */
  @property({ type: String })
  public errorMessage = '';

  /**
   * Compact mode of element.
   * can be adjusted with `--textinput-dense-size`
   */
  @property({ type: Boolean, reflect: true })
  public dense?: boolean;

  @property({ type: String, attribute: true, reflect: true })
  public autocomplete: AutoFill = '';

  /**
   * Returns `true` if the textinput passes validity checks. Returns `false` and fires an [`invalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) event on the textinput otherwise.
   *
   * **NOTE:** When accessing any property or function that checks validity at textinput initial boot up, you may have to await `<fwc-textinput>.updateComplete`.
   */
  public override checkValidity(): boolean {
    return super.checkValidity();
  }

  /**
   * Runs `checkValidity()` method, and if it returns false, then it reports to the user that the input is invalid.
   */
  public override reportValidity(): boolean {
    return super.reportValidity();
  }

  /**
   * Reset validity of element
   */
  public clearValidity(): void {
    this.mdcFoundation.setValid(true);
    this.isUiValid = true;
  }

  firstUpdated(): void {
    super.firstUpdated();
    this.formElement.autocomplete = this.autocomplete;
  }

  /** {@inheritDoc} */
  override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('variant')) {
      switch (this.variant) {
        case 'filled': {
          this.outlined = false;
          break;
        }
        case 'outlined': {
          this.outlined = true;
          break;
        }
      }
      this.requestUpdate();
    }
    if (changedProperties.has('errorMessage')) {
      this.setCustomValidity(this.errorMessage);
      this.errorMessage && this.clearValidity();
      this.reportValidity();
    }

    if (changedProperties.has('autocomplete')) {
      this.formElement.autocomplete = this.autocomplete;
    }
  }

  /** {@inheritDoc} */
  protected override renderIcon(icon: string, isTrailingIcon = false): TemplateResult {
    return html`<fwc-icon
      icon=${icon}
      isTrailingIcon=${isTrailingIcon}
      textInput
      class="mdc-text-field__icon ${isTrailingIcon
        ? 'mdc-text-field__icon--trailing'
        : 'mdc-text-field__icon--leading'}"
    ></fwc-icon>`;
  }
}

TextInputElement.styles = styles;

export default TextInputElement;
