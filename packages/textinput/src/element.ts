import { html, property, CSSResult, TemplateResult } from 'lit-element';
import Icon, { IconName } from '@equinor/fusion-wc-icon';
import { TextFieldBase } from '@material/mwc-textfield/mwc-textfield-base';
import { style as mdcStyle } from '@material/mwc-textfield/mwc-textfield-css';
import elementStyle from './element.css';
Icon;

export class TextInputElement extends TextFieldBase {
  static styles: CSSResult[] = [mdcStyle, elementStyle];

  @property({ type: String }) icon: IconName = '';
  @property({ type: String }) iconTrailing: IconName = '';

  protected renderIcon(icon: string, isTrailingIcon: boolean = false): TemplateResult {
    return html`<fwc-icon icon=${icon} isTrailingIcon=${isTrailingIcon} textInput></fwc-icon>`;
  }
}

export default TextInputElement;
