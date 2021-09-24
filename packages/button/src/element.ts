import { html, TemplateResult, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { ButtonBase } from '@material/mwc-button/mwc-button-base';

import Icon, { IconName } from '@equinor/fusion-wc-icon';

import styles from './element.css';

// persist element
Icon;

export type ButtonColor = 'primary' | 'secondary' | 'danger';

export type ButtonVariant = 'contained' | 'outlined' | 'ghost';

export type ButtonElementProps = {
  label?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  dense?: boolean;
  trailingIcon?: boolean;
  expandContent?: boolean;
};

export class ButtonElement extends ButtonBase implements ButtonElementProps {
  @property({ type: String })
  icon: IconName = '';

  @property({ type: String, reflect: true })
  color: ButtonColor = 'primary';

  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'contained';

  protected updated(changedProperties: PropertyValues): void {
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
    return html`<fwc-icon class="mdc-button__icon" .icon=${this.icon}></fwc-icon>`;
  }
}

ButtonElement.styles = styles;

export default ButtonElement;
