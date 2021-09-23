import { LitElement, CSSResult, TemplateResult, PropertyValues, html } from 'lit';
import { property, queryAsync, eventOptions } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import Picture from '@equinor/fusion-wc-picture';
import Ripple, { RippleHandlers } from '@equinor/fusion-wc-ripple';
import style from './element.css';

// persist element
Picture;

export type AvatarSize = 'x-small' | 'small' | 'medium' | 'large';

export type AvatarColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled';

export type AvatarElementProps = {
  size?: AvatarSize;
  color?: AvatarColor;
  value?: string;
  src?: string;
  clickable?: boolean;
  disabled?: boolean;
};

export class AvatarElement extends LitElement implements AvatarElementProps {
  static styles: CSSResult[] = [style];

  @property({ type: String, reflect: true })
  size: AvatarSize = 'medium';

  @property({ type: String, reflect: true })
  color?: AvatarColor;

  @property({ type: String })
  value?: string;

  @property({ type: String })
  src?: string;

  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

  @property({ type: Boolean })
  disabled?: boolean;

  @queryAsync('fwc-ripple') ripple!: Promise<Ripple | null>;

  protected rippleHandlers = new RippleHandlers(() => {
    return this.ripple;
  });

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.color = 'disabled';
        this.clickable = false;
      }
      this.requestUpdate();
    }
  }

  protected renderPicture(): TemplateResult {
    return html`<div class="fwc-avatar__picture-container">
      <fwc-picture class="fwc-avatar__picture" src=${ifDefined(this.src)} cover></fwc-picture>
    </div>`;
  }

  protected renderValue(): TemplateResult {
    return html`<span class="fwc-avatar__value">${this.value}</span>`;
  }

  protected renderSlot(): TemplateResult {
    return html`<slot></slot>`;
  }

  protected render(): TemplateResult {
    const content = this.src ? this.renderPicture() : this.value ? this.renderValue() : this.renderSlot();
    return html`<span
      class="fwc-avatar__container"
      @focus="${this.handleRippleFocus}"
      @blur="${this.handleRippleBlur}"
      @mousedown="${this.handleRippleActivate}"
      @mouseenter="${this.handleRippleMouseEnter}"
      @mouseleave="${this.handleRippleMouseLeave}"
      @touchstart="${this.handleRippleActivate}"
      @touchend="${this.handleRippleDeactivate}"
      @touchcancel="${this.handleRippleDeactivate}"
      >${this.renderRipple()}<slot name="badge"></slot>${content}</span
    >`;
  }

  protected renderRipple(): TemplateResult | string {
    return this.clickable
      ? html`<fwc-ripple class="fwc-avatar__ripple" disabled="${ifDefined(this.disabled)}" unbounded></fwc-ripple>`
      : '';
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

  protected handleRippleDeactivate(): void {
    this.rippleHandlers.endPress();
  }

  protected handleRippleMouseEnter(): void {
    this.rippleHandlers.startHover();
  }

  protected handleRippleMouseLeave(): void {
    this.rippleHandlers.endHover();
  }

  protected handleRippleFocus(): void {
    this.rippleHandlers.startFocus();
  }

  protected handleRippleBlur(): void {
    this.rippleHandlers.endFocus();
  }
}

export default AvatarElement;
