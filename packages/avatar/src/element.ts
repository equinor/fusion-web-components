import {
  LitElement,
  CSSResult,
  TemplateResult,
  PropertyValues,
  html,
  property,
  queryAsync,
  eventOptions,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
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

  protected updated(changedProperties: PropertyValues) {
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
    return html`<fwc-picture class="picture" src=${ifDefined(this.src)} cover></fwc-picture> `;
  }

  protected renderValue(): TemplateResult {
    return html`${this.value}`;
  }

  protected renderSlot(): TemplateResult {
    return html`<slot></slot>`;
  }

  protected render(): TemplateResult {
    const content = this.src ? this.renderPicture() : this.value ? this.renderValue() : this.renderSlot();
    return html`<span
      class="circle"
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
      ? html`<fwc-ripple class="ripple" disabled="${ifDefined(this.disabled)}" unbounded></fwc-ripple>`
      : '';
  }

  @eventOptions({ passive: true })
  protected handleRippleActivate(evt?: Event) {
    const onUp = () => {
      window.removeEventListener('mouseup', onUp);

      this.handleRippleDeactivate();
    };

    window.addEventListener('mouseup', onUp);
    this.rippleHandlers.startPress(evt);
  }

  protected handleRippleDeactivate() {
    this.rippleHandlers.endPress();
  }

  protected handleRippleMouseEnter() {
    this.rippleHandlers.startHover();
  }

  protected handleRippleMouseLeave() {
    this.rippleHandlers.endHover();
  }

  protected handleRippleFocus() {
    this.rippleHandlers.startFocus();
  }

  protected handleRippleBlur() {
    this.rippleHandlers.endFocus();
  }
}

export default AvatarElement;
