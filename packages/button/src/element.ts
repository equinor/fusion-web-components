import { html, property, CSSResult, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { IconName } from '@equinor/fusion-wc-icon';
import { ButtonBase } from '@material/mwc-button/mwc-button-base';
import { style as mdcStyle } from '@material/mwc-button/styles-css';
import style from './element.css';

export type ButtonColor = 'primary' | 'secondary' | 'danger';

export type ButtonVariant = 'contained' | 'outlined' | 'ghost';

export interface ButtonProps {
  icon?: IconName;
  variant?: ButtonVariant;
  color?: ButtonColor;
}

export class ButtonElement extends ButtonBase implements ButtonProps {
  static styles: CSSResult[] = [mdcStyle, style];

  @property() icon: IconName = '';
  @property() color: ButtonColor = 'primary';
  @property() variant: ButtonVariant = 'contained';
  @property({ type: Boolean, reflect: true }) unelevated: boolean = false;

  constructor() {
    super();
  }

  protected getRenderClasses() {
    return classMap({
      'mdc-button--unelevated': this.variant === 'contained',
      'mdc-button--outlined': this.variant === 'outlined',
      'fwc-button--ghost': this.variant === 'ghost',
      'mdc-button--dense': this.dense,
      'fwc-button--primary': this.color === 'primary',
      'fwc-button--secondary': this.color === 'secondary',
      'fwc-button--danger': this.color === 'danger',
    });
  }

  protected renderIcon(): TemplateResult {
    return html`<fwc-icon class="mdc-button__icon" icon=${this.icon}></fwc-icon>`;
  }
}

export default ButtonElement;
