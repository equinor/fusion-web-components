import { LitElement, HTMLTemplateResult, PropertyValues, html } from 'lit';
import { property, queryAsync, eventOptions } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AvatarElementProps, AvatarSize, AvatarColor } from './types';
import Picture from '@equinor/fusion-wc-picture';
import Ripple, { RippleHandlers } from '@equinor/fusion-wc-ripple';
import style from './element.css';

// Persist element
Picture;

/**
 * Element for rendering an avatar.
 * {@inheritdoc}
 *
 * @tag fwc-avatar
 *
 * @property {AvatarSize} size - Sets the size of the avatar element.
 * @property {AvatarColor} color - Sets the background/border color of the avatar element.
 * @property {string} value - Sets the text value to be rendered within the avatar. Overridden by 'src' attribute.
 * @property {string} src - Sets the picture source for the avatar. Overrides the 'value' attribute.
 * @property {boolean} clickable - Enables the click event and adds click effects for the avatar element.
 * @property {boolean} border - Adds a border to the avatar picture element.
 * @property {boolean} disabled - Sets the avatar to disabled.
 *
 * @cssprop {theme.colors.text.static_icons__primary_white} --fwc-avatar-ink-color - text color of the element.
 * @cssprop {theme.colors.interactive.primary__resting} --fwc-avatar-base-color - base color of the element.
 *
 * @fires click - When the element is clicked, only fires when 'clickable' is set to 'true'.
 *
 * Content can be slotted in with a slot named 'content'.
 */
export class AvatarElement extends LitElement implements AvatarElementProps {
  /**
   * Size of the element.
   * @default AvatarSize.Medium
   */
  @property({ type: String, reflect: true })
  size: AvatarSize = AvatarSize.Medium;

  /**
   * Color of the element.
   */
  @property({ type: String, reflect: true })
  color?: AvatarColor;

  /**
   * Text value to be rendered within the element.
   */
  @property({ type: String })
  value?: string;

  /**
   * Source of picture to be rendered within the element.
   */
  @property({ type: String })
  src?: string;

  /**
   * Renders the element as clickable.
   */
  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

  /**
   * Render border for the picture element.
   */
  @property({ type: Boolean, reflect: true })
  border?: boolean;

  /**
   * Renders the element as disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled?: boolean;

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
   * Handle on click.
   */
  protected handleOnClick(e: PointerEvent): void {
    if (this.clickable) {
      this.dispatchEvent(new PointerEvent('clicked', e));
    }
  }

  /** {@inheritDoc} */
  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.color = AvatarColor.Disabled;
        this.clickable = false;
      }
      this.requestUpdate();
    }
  }

  /**
   * Render a picture element if 'src' attribute is set.
   */
  protected renderPicture(): HTMLTemplateResult {
    return html`<div class="fwc-avatar__picture-container">
      <fwc-picture class="fwc-avatar__picture" src=${ifDefined(this.src)} cover></fwc-picture>
    </div>`;
  }

  /**
   * Render text value if 'value' attribute is set.
   */
  protected renderValue(): HTMLTemplateResult {
    return html`<span class="fwc-avatar__value">${this.value}</span>`;
  }

  /**
   * Render slotted badge element.
   */
  protected renderBadge(): HTMLTemplateResult {
    return html`<slot name="badge"></slot>`;
  }

  /**
   * Render the content. 'src' attribute overrides 'value' attribute.
   */
  protected renderContent(): HTMLTemplateResult {
    const content = this.src ? this.renderPicture() : this.value ? this.renderValue() : undefined;
    return html`<slot name="content">${content}</slot>`;
  }

  /** {@inheritDoc} */
  protected override render(): HTMLTemplateResult {
    return html`<span
      class="fwc-avatar__container"
      @click=${this.handleOnClick}
      @focus="${this.handleRippleFocus}"
      @blur="${this.handleRippleBlur}"
      @mousedown="${this.handleRippleActivate}"
      @mouseenter="${this.handleRippleMouseEnter}"
      @mouseleave="${this.handleRippleMouseLeave}"
      @touchstart="${this.handleRippleActivate}"
      @touchend="${this.handleRippleDeactivate}"
      @touchcancel="${this.handleRippleDeactivate}"
      >${this.renderRipple()}${this.renderBadge()}${this.renderContent()}</span
    >`;
  }

  /**
   * Render the ripple element.
   */
  protected renderRipple(): HTMLTemplateResult | string {
    return this.clickable
      ? html`<fwc-ripple class="fwc-avatar__ripple" disabled="${ifDefined(this.disabled)}" unbounded></fwc-ripple>`
      : '';
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
}

AvatarElement.styles = [style];

export default AvatarElement;
