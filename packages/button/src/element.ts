import { html, property, CSSResult, TemplateResult, PropertyValues } from 'lit-element';
// import { classMap } from 'lit-html/directives/class-map';
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

  @property()
  icon: IconName = '';

  @property()
  color: ButtonColor = 'primary';

  @property({ reflect: true })
  variant: ButtonVariant = 'contained';

  // protected getRenderClasses() {
  //   return classMap({
  //     // 'mdc-button--raised': this.raised,
  //     // 'mdc-button--unelevated': this.unelevated,
  //     // 'mdc-button--outlined': this.outlined,
  //     // 'mdc-button--dense': this.dense,
  //     'fwc-button--ghost': this.variant === 'ghost',
  //     'fwc-button--primary': this.color === 'primary',
  //     'fwc-button--secondary': this.color === 'secondary',
  //     'fwc-button--danger': this.color === 'danger',
  //   });
  // }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('variant')) {
      switch (this.variant) {
        case 'contained': {
          this.unelevated = true;
          this.raised = false;
          this.outlined = false;
          break;
        }
        case 'outlined': {
          this.unelevated = false;
          this.raised = false;
          this.outlined = true;
          break;
        }
        case 'ghost': {
          this.unelevated = false;
          this.raised = false;
          this.outlined = false;
          break;
        }
      }
      this.requestUpdate();
    }
  }

  protected renderIcon(): TemplateResult {
    return html`<fwc-icon class="mdc-button__icon" icon=${this.icon}></fwc-icon>`;
  }
}

export default ButtonElement;
