import { LitElement, TemplateResult, PropertyValues, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IconName } from '@equinor/fusion-wc-icon';
import style from './element.css';

export type BadgeSize = 'x-small' | 'small' | 'medium' | 'large';
export type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled';

export class BadgeElement extends LitElement {
  /** Size of the badge */
  @property({ type: String, reflect: true })
  size: BadgeSize = 'medium';

  /** Absolute corner position for the badge */
  @property({ type: String, reflect: true })
  position: BadgePosition = 'top-right';

  /** Color of the badge */
  @property({ type: String, reflect: true })
  color: BadgeColor = 'secondary';

  /** Text value to be rendered within the badge */
  @property({ type: String })
  value?: string;

  /** Icon to be rendered within the badge */
  @property({ type: String, reflect: true })
  icon?: IconName;

  /** Set to `true` if badge is placed within a circular wrapper for correct position */
  @property({ type: Boolean, reflect: true })
  circular?: boolean;

  /** Tooltip text to show on hover */
  @property({ type: String })
  tooltip?: string;

  /** If the badge is clickable */
  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

  /** If the badge is disabled */
  @property({ type: Boolean })
  disabled?: boolean;

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.clickable = false;
        this.color = 'disabled';
      }
      this.requestUpdate();
    }
  }

  protected renderIcon(): TemplateResult {
    return html`<fwc-icon icon=${ifDefined(this.icon)}></fwc-icon>`;
  }

  protected render(): TemplateResult {
    if (this.icon) {
      return this.renderIcon();
    }
    if (this.value) {
      return html`<span>${this.value}</span>`;
    }
    return html`<span><slot></slot></span>`;
  }
}

BadgeElement.styles = [style];

export default BadgeElement;
