import { HTMLTemplateResult, LitElement, html } from 'lit';
import { eventOptions, property, queryAsync } from 'lit/decorators.js';
import { styles } from './element.css';
import { IconElement } from '@equinor/fusion-wc-icon';
import Ripple, { RippleHandlers } from '@equinor/fusion-wc-ripple';

// Persist element
IconElement;

/**
 * Element for rendering an icon button.
 * {@inheritdoc}
 *
 * @tag fwc-icon-button
 *
 * @property {IconName} icon - Sets the icon of the icon button element.
 * @property {ButtonColor} color - Sets the color of the icon button element.
 * @property {String} shape - Sets the shape of the icon button element to rounded or square.
 * @property {boolean} disabled - Sets the icon button to disabled.
 *
 * @cssprop {theme.colors.text.static_icons__primary_white} --fwc-avatar-ink-color - text color of the element.
 * @cssprop {theme.colors.interactive.primary__resting} --fwc-avatar-base-color - base color of the element.
 *
 * @fires click - When the element is clicked
 *
 * Content can be slotted in with a slot named 'icon'.
 */

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled';
export type ButtonSize = 'x-small' | 'small' | 'medium' | 'large';

export type IconButtonElementProps = {
  color?: ButtonColor;
  size?: ButtonSize;
  shape?: 'rounded' | 'square';
  disabled?: boolean;
};

export class IconButtonElement extends LitElement implements IconButtonElementProps {
  static styles = [styles];

  @property({ type: String })
  public color?: ButtonColor = 'primary';

  @property({ type: String })
  public size?: ButtonSize = 'medium';

  @property({ type: String })
  public shape?: 'rounded' | 'square' = 'rounded';

  /**  */
  @property({ type: Boolean, reflect: true })
  public disabled?: boolean;

  /**
   * Reference to ripple element.
   */
  @queryAsync('fwc-ripple') ripple!: Promise<Ripple | null>;

  /**
   * Define ripple handlers.
   */
  protected rippleHandlers = new RippleHandlers(() => {
    return this.ripple;
  });

  /**
   * Render slotted icon element.
   */
  protected renderIconSlot(): HTMLTemplateResult {
    return html`<slot name="icon"></slot>`;
  }

  render(): HTMLTemplateResult {
    return html`<div
      class="fwc-iconBtn__container"
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
      ${this.renderRipple()} ${this.renderIconSlot()}
    </div>`;
  }

  /** Render ripple effect */
  protected renderRipple(): HTMLTemplateResult {
    return html`<fwc-ripple class="fwc-iconBtn__ripple" unbounded></fwc-ripple>`;
  }

  /**
   * Handle ripple activate event.
   */
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
    this.dispatchEvent(new PointerEvent('click', e));
  }
}
