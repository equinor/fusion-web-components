import { LitElement, HTMLTemplateResult, PropertyValues, html } from 'lit';
import { property, queryAssignedNodes, queryAsync, eventOptions } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BadgeElementProps, BadgeSize, BadgePosition, BadgeColor } from './types';
import { IconName } from '@equinor/fusion-wc-icon';
import Ripple, { RippleHandlers } from '@equinor/fusion-wc-ripple';
import style from './element.css';

/**
 * Element for displaying a badge.
 * {@inheritdoc}
 *
 * @tag fwc-badge
 *
 * @property {BadgeSize} size - Sets the size of the badge. Size 'XSmall' does not render 'value' or 'icon'.
 * @property {BadgePosition} position - Sets position of the badge.
 * @property {BadgeColor} color - Sets color of the badge.
 * @property {String} value - Sets text content to be rendered within the badge. Not rendered if size is set to 'XSmall'.
 * @property {IconName} icon - Sets icon to be rendered within the badge. Overrides the 'value' attribute. Not rendered if size is set to 'XSmall'.
 *
 * @cssprop {theme.colors.interactive.primary__resting} --fwc-badge-color - Color of the badge.
 * @cssprop {1.5rem} --fwc-badge-size - Size of the badge.
 * @cssprop {0.75rem} --fwc-badge-font-size - Font size of the text value.
 * @cssprop {0.685em} --fwc-badge-icon-size - Size of the icon.
 *
 * @fires click - When the element is clicked, only fires when `clickable` is set to `true` and `disabled` is set to `false`.
 *
 * Value can be slotted in with a slot named 'value'.
 * Icon can be slotted in with a slot named 'icon'. Overrides the 'value' slot.
 *
 */
export class BadgeElement extends LitElement implements BadgeElementProps {
  /**
   * Size of the badge
   * @default BadgeSize.Medium
   */
  @property({ type: String, reflect: true })
  size: BadgeSize = BadgeSize.Medium;

  /**
   * Absolute corner position for the badge
   * @default BadgePosition.TopRight
   */
  @property({ type: String, reflect: true })
  position: BadgePosition = BadgePosition.TopRight;

  /**
   * Color of the badge
   * @default BadgeColor.Secondary
   */
  @property({ type: String, reflect: true })
  color: BadgeColor = BadgeColor.Secondary;

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

  /**
   * Reference to the ripple element.
   */
  @queryAsync('fwc-ripple') ripple!: Promise<Ripple | null>;

  /**
   * Reference to the icon slot.
   */
  @queryAssignedNodes('icon')
  iconSlot?: NodeListOf<HTMLElement>;

  /**
   * Reference to the value slot.
   */
  @queryAssignedNodes('value')
  valueSlot?: NodeListOf<HTMLElement>;

  /**
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
   * Render the icon value if the 'icon' attribute is set or a slotted 'icon' element is provided.
   */
  protected renderIcon(): HTMLTemplateResult | undefined {
    const renderIcon = this.size !== BadgeSize.XSmall && (this.icon || (this.iconSlot && this.iconSlot.length > 0));
    if (renderIcon) {
      return html`<slot name="icon" class="fwc-badge__icon"><fwc-icon icon=${ifDefined(this.icon)}></fwc-icon></slot>`;
    }
    return undefined;
  }

  /**
   * Render the text value if the 'value' attribute is set or a slotted 'value' element is provided.
   */
  protected renderValue(): HTMLTemplateResult | undefined {
    const renderValue = this.size !== BadgeSize.XSmall && (this.value || (this.valueSlot && this.valueSlot.length > 0));
    if (renderValue) {
      return html`<slot name="value" class="fwc-badge__value">${this.value}</slot>`;
    }
    return undefined;
  }

  /**
   * Render the ripple element.
   */
  protected renderRipple(): HTMLTemplateResult | string {
    return this.clickable
      ? html`<fwc-ripple class="fwc-badge__ripple" disabled="${ifDefined(this.disabled)}" unbounded></fwc-ripple>`
      : '';
  }

  /** {@inheritDoc} */
  protected override render(): HTMLTemplateResult {
    const content = this.renderIcon() ?? this.renderValue();
    return html`<span
        class="fwc-badge__container"
        @click=${this.handleOnClick}
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleActivate}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleActivate}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
        >${content}</span
      >${this.renderRipple()}`;
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

BadgeElement.styles = [style];

export default BadgeElement;
