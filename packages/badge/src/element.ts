import { LitElement, TemplateResult, PropertyValues, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IconName } from '@equinor/fusion-wc-icon';
import style from './element.css';

export type BadgeSize = 'x-small' | 'small' | 'medium' | 'large';
export type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

/**
 * Element for rendering a badge
 *
 * TODO: should have better behaviour for slotted elements
 */
export class BadgeElement extends LitElement {
  /**
   * Size of the badge
   * @default medium
   */
  @property({ type: String, reflect: true })
  size: BadgeSize = 'medium';

  /**
   * Absolute corner position for the badge
   * @default top-right
   */
  @property({ type: String, reflect: true })
  position: BadgePosition = 'top-right';

  /**
   * Color of the badge
   * @default secondary
   */
  @property({ type: String, reflect: true })
  color: BadgeColor = 'secondary';

  /**
   * Text value to be rendered within the badge
   */
  @property({ type: String })
  value?: string;

  /**
   * Icon to be rendered within the badge
   */
  @property({ type: String, reflect: true })
  icon?: IconName;

  /**
   * Set to `true` if badge is placed within a circular wrapper for correct position
   */
  @property({ type: Boolean, reflect: true })
  circular?: boolean;

  /**
   * Tooltip text to show on hover
   */
  @property({ type: String })
  tooltip?: string;

  /**
   * If the badge is clickable
   */
  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

  /**
   * If the badge is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled?: boolean;

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.clickable = false;
        this.requestUpdate('clickable');
      }
    }
  }

  protected renderIcon(): TemplateResult {
    return html`<fwc-icon icon=${ifDefined(this.icon)}></fwc-icon>`;
  }

  protected render(): TemplateResult {
    return html`
      <span>
        <slot>${this.icon ? this.renderIcon() : this.value}</slot>
      </span>
    `;
  }
}

BadgeElement.styles = [style];

export default BadgeElement;
