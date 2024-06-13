import { LitElement, HTMLTemplateResult, PropertyValues, html, CSSResult } from 'lit';
import { property, queryAsync, eventOptions } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AvatarSize, AvatarColor } from './static';
import Picture from '@equinor/fusion-wc-picture';
import Ripple, { RippleHandlers } from '@equinor/fusion-wc-ripple';
import styles from './element.css';

// Persist element
Picture;

// TODO - make as util
export type ObjectValue<T> = Extract<T[keyof T], string>;

/**
 * Element for rendering an avatar.
 *
 * @tag fwc-avatar
 *
 * @cssprop {3.5rem} --fwc-avatar-size - size of the element.
 * @cssprop {theme.colors.interactive.primary__resting} --fwc-avatar-color - base color of the element.
 * @cssprop {heme.colors.ui.background__light} --fwc-avatar-background - background color when `AvatarElement.border` is `true`
 * @cssprop {theme.colors.text.static_icons__primary_white} --fwc-avatar-ink-color - text color of the element.
 *
 * @fires click - When the element is clicked, only fires when 'clickable' is set to 'true'.
 *
 * Content can be slotted in with a slot named 'content'.
 */
export class AvatarElement extends LitElement {
  static styles: CSSResult[] = styles;

  /**
   * Size of the avatar.
   *
   * @default medium
   * @type {'x-small' | 'small' | 'medium' | 'large'}
   */
  @property({ type: String, reflect: true })
  size: ObjectValue<typeof AvatarSize> = AvatarSize.Medium;

  /**
   * Color of the element.
   * @type { 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled' }
   */
  @property({ type: String, reflect: true })
  color?: ObjectValue<typeof AvatarColor>;

  /**
   * Text value to be rendered within the element.
   */
  @property({ type: String })
  value?: string;

  /**
   * @deprecated - use slotted image
   * Source of picture to be rendered within the element.
   */
  @property({ type: String })
  src?: string;

  /**
   * Renders the element as clickable.
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * Render border for the picture element.
   */
  @property({ type: Boolean, reflect: true })
  border = false;

  /**
   * Renders the element as disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  elevated = false;

  /**
   * @internal
   * Reference to ripple element.
   */
  @queryAsync('fwc-ripple')
  protected ripple!: Promise<Ripple | null>;

  /**
   * @internal
   * Define ripple handlers.
   */
  protected rippleHandlers = new RippleHandlers(() => {
    return this.ripple;
  });

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
    return html`<fwc-picture id="picture" src=${ifDefined(this.src)} cover></fwc-picture>`;
  }

  /**
   * Render text value if 'value' attribute is set.
   */
  protected renderValue(): HTMLTemplateResult {
    return html`<span id="#value">${this.value}</span>`;
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
    if (this.src) {
      console.warn('fwc-avatar.src property is deprecated, use slot instead!');
    }
    const content = this.src ? this.renderPicture() : this.value ? this.renderValue() : html`<slot></slot>`;
    return html`<div id="content">${content}</div>`;
  }

  /** {@inheritDoc} */
  protected override render(): HTMLTemplateResult {
    return html`<div
      id="root"
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
      ${this.renderRipple()}${this.renderContent()}
      <div id="badge">${this.renderBadge()}</div>
    </div> `;
  }

  /**
   * Render the ripple element.
   */
  protected renderRipple(): HTMLTemplateResult | void {
    if (this.clickable) {
      return html`<fwc-ripple .disabled="${this.disabled}" unbounded></fwc-ripple>`;
    }
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
    if (this.clickable) {
      this.dispatchEvent(new PointerEvent('click', e));
    }
  }
}

export default AvatarElement;
