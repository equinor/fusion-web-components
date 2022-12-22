/* eslint-disable @typescript-eslint/ban-ts-comment */
import { html, TemplateResult, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ButtonBase } from '@material/mwc-button/mwc-button-base';

import Icon, { IconName } from '@equinor/fusion-wc-icon';

import styles from './element.css';
import { classMap } from 'lit/directives/class-map.js';

// persist element
Icon;

// export type ButtonColor = 'primary' | 'secondary' | 'danger';

import type { ButtonColor, ButtonVariant } from '../button';

export type LinkButtonTarget = '_blank' | '_parent' | '_self' | '_top';

export type LinkButtonElementProps = {
  href: string;
  target: LinkButtonTarget;
  label?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  dense?: boolean;
  trailingIcon?: boolean;
  expandContent?: boolean;
};

export class LinkButtonElement extends ButtonBase implements LinkButtonElementProps {
  /**
   * Leading icon to display in input
   * @See [`fwc-icon`](https://github.com/equinor/fusion-web-components/tree/main/packages/icon)
   * @override
   */
  // @ts-ignore
  override icon: IconName = '';

  @property({ type: String })
  href!: string;

  @property({ type: String })
  target!: LinkButtonTarget;

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

  protected render(): TemplateResult {
    return html` <a
      class="mdc-button ${classMap(this.getRenderClasses())}"
      href="${ifDefined(this.href)}"
      target="${ifDefined(this.target)}"
      ?disabled="${this.disabled}"
      aria-label="${this.label || this.icon}"
      @focus="${this.handleRippleFocus}"
      @blur="${this.handleRippleBlur}"
      @mousedown="${this.handleRippleActivate}"
      @mouseenter="${this.handleRippleMouseEnter}"
      @mouseleave="${this.handleRippleMouseLeave}"
      @touchstart="${this.handleRippleActivate}"
      @touchend="${this.handleRippleDeactivate}"
      @touchcancel="${this.handleRippleDeactivate}"
    >
      ${this.renderOverlay()} ${this.renderRipple()}
      <span class="leading-icon">
        <slot name="icon"> ${this.icon && !this.trailingIcon ? this.renderIcon() : ''} </slot>
      </span>
      <span class="mdc-button__label">${this.label}</span>
      <span
        class="slot-container ${classMap({
          flex: this.expandContent,
        })}"
      >
        <slot></slot>
      </span>
      <span class="trailing-icon">
        <slot name="trailingIcon"> ${this.icon && this.trailingIcon ? this.renderIcon() : ''} </slot>
      </span>
    </a>`;
  }
}

LinkButtonElement.styles = styles;

export default LinkButtonElement;
