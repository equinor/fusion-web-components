import { html, property, CSSResult, TemplateResult } from 'lit-element';
import { IconName } from '@equinor/fusion-wc-icon';
import { ButtonBase } from '@material/mwc-button/mwc-button-base';
import { style as mdcStyle } from '@material/mwc-button/styles-css';
import style from './element.css';

export class ButtonElement extends ButtonBase {
  static styles: CSSResult[] = [mdcStyle, style];

  @property() icon: IconName = '';

  protected renderIcon(): TemplateResult {
    return html`<fwc-icon icon=${this.icon}></fwc-icon>`;
  }
}

export default ButtonElement;
