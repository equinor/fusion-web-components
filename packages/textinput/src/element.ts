import { html, property, CSSResult, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { IconName } from '@equinor/fusion-wc-icon';
import { TextFieldBase } from '@material/mwc-textfield/mwc-textfield-base';
import { style as mdcStyle } from '@material/mwc-textfield/mwc-textfield-css';
import elementStyle from './element.css';

export class TextInputElement extends TextFieldBase {
  static styles: CSSResult[] = [mdcStyle, elementStyle];

  @property({ type: String }) icon: IconName = '';
  @property({ type: String }) iconTrailing: IconName = '';

  protected renderIcon(icon: string, isTrailingIcon: boolean = false): TemplateResult {
    const classes = {
      'mdc-text-field__icon--leading': !isTrailingIcon,
      'mdc-text-field__icon--trailing': isTrailingIcon,
    };

    return html`<fwc-icon icon=${icon} ${classMap(classes)}"></fwc-icon>`;
  }
}

export default TextInputElement;
