import { type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { TextAreaBase } from '@material/mwc-textarea/mwc-textarea-base';
import { styles } from './element.css';

/**
 * Element for multi line text input
 * {@inheritdoc}
 *
 * @tag fwc-textarea
 *
 * @property {number} rows - Sets number of visible text lines.
 * @property {number} cols - Sets the visible width of the textarea
 *
 * @property {string} name - should only be used for browser autofill as webcomponent form participation does not currently consider the `name` attribute. See [#289](https://github.com/material-components/material-components-web-components/issues/289).
 * @property {string} value - The input control's value.
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
 * @property {string} pattern - [`HTMLTextAreaElement.prototype.pattern`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) _(empty string will unset attribute)_
 * @property {number|string} min - [`HTMLTextAreaElement.prototype.min`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) _(empty string will unset attribute)_
 * @property {number|string} max - [`HTMLTextAreaElement.prototype.min`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) _(empty string will unset attribute)_
 * @property {number|string} step - [`HTMLTextAreaElement.prototype.min`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes) _(empty string will unset attribute)_
 * @property {number} size - [`HTMLTextAreaElement.prototype.size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefsize) _(null will unset attribute)_
 * @property {boolean} autoValidate - Reports validity on value change rather than only on blur
 * @property {ValidityState} validity - The [`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) of the input **readonly**
 * @property {boolean} willValidate - [`HTMLTextAreaElement.prototype.willValidate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement#Properties) **readonly**
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
 * @summary Enhanced multi-line input element, based on [Material Web Component](https://github.com/material-components/material-components-web-components/tree/master/packages/textarea)
 */
export class TextAreaElement extends TextAreaBase {
  /**
   * Sets provided message as custom validity and displays it.
   */
  @property({ type: String })
  errorMessage = '';

  /**
   * Reset validity of element
   */
  public clearValidity(): void {
    this.mdcFoundation.setValid(true);
    this.isUiValid = true;
  }

  /**
   * Returns `true` if the textinput passes validity checks. Returns `false` and fires an [`invalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) event on the textinput otherwise.
   *
   * **NOTE:** When accessing any property or function that checks validity at element initial boot up, you may have to await `element.updateComplete`.
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

  /** {@inheritDoc} */
  override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('errorMessage')) {
      this.setCustomValidity(this.errorMessage);
      this.errorMessage && this.clearValidity();
      this.reportValidity();
    }
  }
}

TextAreaElement.styles = styles;

export default TextAreaElement;
