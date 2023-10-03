import { LitElement, type HTMLTemplateResult, type PropertyValues, html, CSSResult } from 'lit';
import { property, queryAssignedNodes, queryAsync, eventOptions } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BadgeSize, BadgeColor, BadgePosition } from './static';
import IconElement, { IconName } from '@equinor/fusion-wc-icon';
import Ripple, { RippleHandlers } from '@equinor/fusion-wc-ripple';

import styles from './element.css';

IconElement;

// TODO - make as util
export type ObjectValue<T> = Extract<T[keyof T], string>;

IconElement;
/**
 * Element for displaying a badge.
 *
 * @tag fwc-badge
 * @summary element for display a badge for another element
 *
 *
 *
 * @cssprop {theme.colors.interactive.primary__resting} --fwc-badge-color - Color of the badge.
 * @cssprop {1.5rem} --fwc-badge-size - Size of the badge.
 * @cssprop {0.75rem} --fwc-badge-font-size - Font size of the text value.
 * @cssprop {0.685em} --fwc-badge-icon-size - Size of the icon.
 *
 * @fires click - When the element is clicked, only fires when `clickable` is set to `true` and `disabled` is set to `false`.
 *
 * @slot -default - Value can be slotted.
 * @slot -icon - slot for icon _value will no longer be rendered_
 */
export class BadgeElement extends LitElement {
  static styles: CSSResult[] = styles;

  /**
   * Size of the badge
   *
   * @default medium
   * @type {'x-small' | 'small' | 'medium' | 'large'}
   */
  @property({ type: String, reflect: true })
  size: ObjectValue<typeof BadgeSize> = BadgeSize.Medium;

  /**
   * Absolute corner position for the badge
   *
   * @default top-right
   * @type {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'}
   */
  @property({ type: String, reflect: true })
  position: ObjectValue<typeof BadgePosition> = BadgePosition.TopRight;

  /**
   * Color of the badge
   *
   * @default {secondary}
   * @type { 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled' }
   */
  @property({ type: String, reflect: true })
  color: ObjectValue<typeof BadgeColor> = BadgeColor.Secondary;

  /**
   * Text value to be rendered within the badge
   * @type {string}
   */
  @property({ type: String })
  value?: string;

  /**
   * Icon to be rendered within the badge
   * @type {string}
   */
  @property({ type: String, reflect: true })
  icon?: IconName;

  /**
   * Set to `true` if badge is placed within a circular wrapper for correct position
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true })
  circular = true;

  /**
   * If the badge is clickable
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

  /**
   * If the badge is disabled
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true })
  disabled?: boolean;

  /**
   * @internal
   * Reference to the ripple element.
   */
  @queryAsync('fwc-ripple')
  protected ripple!: Promise<Ripple | null>;

  /**
   * @internal
   * Reference to the icon slot.
   */
  @queryAssignedNodes({ slot: 'icon' })
  protected iconSlot!: NodeListOf<HTMLElement>;

  /**
   * @internal
   * Reference to the value slot.
   */
  @queryAssignedNodes({ slot: 'value' })
  protected valueSlot!: NodeListOf<HTMLElement>;

  /**
   * @internal
   * Define ripple handlers.
   */
  protected rippleHandlers = new RippleHandlers(() => {
    return this.ripple;
  });

  /** {@inheritDoc} */
  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.clickable = false;
        this.color = BadgeColor.Disabled;
        this.requestUpdate('clickable');
        this.requestUpdate('color');
      }
    }
  }

  /**
   * @internal
   * Render the icon value if the 'icon' attribute is set or a slotted 'icon' element is provided.
   */
  protected renderIcon(): HTMLTemplateResult | void {
    if (this.icon || this.iconSlot.length > 0) {
      return html`<slot name="icon"><fwc-icon icon=${ifDefined(this.icon)}></fwc-icon></slot>`;
    }
  }

  /**
   * @internal
   * Render the text value if the 'value' attribute is set or a slotted 'value' element is provided.
   */
  protected renderValue(): HTMLTemplateResult | void {
    if (this.value || this.valueSlot.length > 0) {
      return html`<slot name="value">${this.value}</slot>`;
    }
  }

  /**
   * @internal
   * Render the ripple element.
   */
  protected renderRipple(): HTMLTemplateResult | string {
    return this.clickable
      ? html`<fwc-ripple class="fwc-badge__ripple" disabled="${ifDefined(this.disabled)}" unbounded></fwc-ripple>`
      : '';
  }

  /**
   * @internal
   */
  protected renderContent(): HTMLTemplateResult | void {
    if (this.size !== BadgeSize.XSmall) {
      return this.renderIcon() ?? this.renderValue();
    }
  }

  /** {@inheritDoc} */
  protected override render(): HTMLTemplateResult {
    return html`<div
        id="container"
        @click=${this.handleOnClick}
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleActivate}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleActivate}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
      >
        ${this.renderContent()}
      </div>
      ${this.renderRipple()}`;
  }

  @eventOptions({ passive: true })
  protected handleRippleActivate(evt?: Event): void {
    const onUp = () => {
      window.removeEventListener('mouseup', onUp);

      this.handleRippleDeactivate();
    };

    window.addEventListener('mouseup', onUp);
    this.rippleHandlers.startPress(evt);
  }

  /**
   * Handle ripple deactivate event.
   */
  protected handleRippleDeactivate(): void {
    this.rippleHandlers.endPress();
  }

  /**
   * Handle ripple start hover event.
   */
  protected handleRippleMouseEnter(): void {
    this.rippleHandlers.startHover();
  }

  /**
   * Handle ripple end hover event.
   */
  protected handleRippleMouseLeave(): void {
    this.rippleHandlers.endHover();
  }

  /**
   * Handle ripple focus event.
   */
  protected handleRippleFocus(): void {
    this.rippleHandlers.startFocus();
  }

  /**
   * Handle ripple blur event.
   */
  protected handleRippleBlur(): void {
    this.rippleHandlers.endFocus();
  }

  /**
   * Handle on click.
   */
  protected handleOnClick(e: PointerEvent): void {
    if (this.clickable && !this.disabled) {
      this.dispatchEvent(new PointerEvent('click', e));
    }
  }
}

export default BadgeElement;
