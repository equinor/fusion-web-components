/* eslint-disable @typescript-eslint/ban-ts-comment */
import { html, TemplateResult, PropertyValues } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';

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
  /**
   * Leading icon to display in input
   * @See [`fwc-icon`](https://github.com/equinor/fusion-web-components/tree/main/packages/icon)
   * @override
   */
  // @ts-ignore
  override icon: IconName = '';

  @property({ type: String, reflect: true })
  color: ButtonColor = 'primary';

  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'contained';

  @queryAssignedElements({ selector: 'a' })
  links?: Array<HTMLLinkElement>;

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onClick);
  }

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

  protected _onClick() {
    if (this.links) {
      this.links[0].click();
    }
  }
}

ButtonElement.styles = styles;

export default ButtonElement;
