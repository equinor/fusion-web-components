import { html, property, CSSResult, TemplateResult, PropertyValues } from 'lit-element';
import Icon, { IconName } from '@equinor/fusion-wc-icon';
import {
  TextFieldBase,
  TextFieldType,
} from '@material/mwc-textfield/mwc-textfield-base';
import { styles as mdcStyle } from '@material/mwc-textfield/mwc-textfield.css';
import elementStyle from './element.css';
Icon;

export type TextInputVariant = 'filled' | 'outlined';
export type ValidityTransform = (value: string, nativeValidity: ValidityState) => Partial<ValidityState>;
export type TextInputType = TextFieldType;

export interface TextInputElementProps {
  value?: string;
  type?: TextInputType;
  label?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  icon?: IconName;
  iconTrailing?: IconName;
  disabled?: boolean;
  charCounter?: boolean;
  variant?: TextInputVariant;
  helper?: string;
  helperPersistent?: boolean;
  required?: boolean;
  maxLength?: number;
  validationMessage?: string;
  pattern?: string;
  min?: number | string;
  max?: number | string;
  size?: number | null;
  step?: number | null;
  autoValidate?: boolean;
  get validity(): ValidityState;
  willValidate?: boolean;
  validityTransform?: ValidityTransform | null;
  validateOnInitialRender?: boolean;
  name?: string;
  readOnly?: boolean;
  endAligned: boolean;
  autocapitalize: string;
}

export class TextInputElement extends TextFieldBase implements TextInputElementProps {
  static styles: CSSResult[] = [mdcStyle, elementStyle];

  @property({ type: String }) icon: IconName = '';
  @property({ type: String }) iconTrailing: IconName = '';
  @property({ type: String }) variant: TextInputVariant = 'filled';
  @property({ type: Boolean }) charCounter: boolean = false;

  updated(changedProperties: PropertyValues) {
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
  }

  protected renderIcon(icon: string, isTrailingIcon = false): TemplateResult {
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

export default TextInputElement;
