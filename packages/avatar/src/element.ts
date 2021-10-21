import { LitElement, CSSResult, HTMLTemplateResult, PropertyValues, html } from 'lit';
import { property, queryAsync, eventOptions, queryAssignedNodes } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Placement } from 'tippy.js/headless';
import Ripple, { RippleHandlers } from '@equinor/fusion-wc-ripple';
import style from './element.css';

import Picture from '@equinor/fusion-wc-picture';
import Tooltip from '@equinor/fusion-wc-tooltip';
// persist elements
Picture;
Tooltip;

export type AvatarSize = 'x-small' | 'small' | 'medium' | 'large';

export type AvatarColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled';

export type AvatarElementProps = {
  size?: AvatarSize;
  color?: AvatarColor;
  value?: string;
  src?: string;
  clickable?: boolean;
  border?: boolean;
  disabled?: boolean;
  tooltip?: string;
  tooltipPlacement?: Placement;
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

  @property({ type: Boolean, reflect: true })
  border?: boolean;

  @property({ type: Boolean, reflect: true })
  disabled?: boolean;

  @property({ type: String })
  tooltip?: string;

  @property({ type: String })
  tooltipPlacement?: Placement;

  @queryAsync('fwc-ripple')
  ripple!: Promise<Ripple | null>;

  @queryAssignedNodes('tooltip', true)
  tooltipSlot!: HTMLElement;

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

  protected renderPicture(): HTMLTemplateResult {
    return html`<div class="fwc-avatar__picture-container">
      <fwc-picture class="fwc-avatar__picture" src=${ifDefined(this.src)} cover></fwc-picture>
    </div>`;
  }

  protected renderValue(): HTMLTemplateResult {
    return html`<span class="fwc-avatar__value">${this.value}</span>`;
  }

  protected renderSlot(): HTMLTemplateResult {
    return html`<slot></slot>`;
  }

  protected renderTooltip(): HTMLTemplateResult {
    return html`<fwc-tooltip
      content=${ifDefined(this.tooltip)}
      placement=${ifDefined(this.tooltipPlacement)}
      .anchor=${this}
    ></fwc-tooltip>`;
  }

  protected renderRipple(): HTMLTemplateResult | string {
    return this.clickable
      ? html`<fwc-ripple class="fwc-avatar__ripple" disabled="${ifDefined(this.disabled)}" unbounded></fwc-ripple>`
      : '';
  }

  protected render(): HTMLTemplateResult {
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
      >${this.renderRipple()}<slot name="badge"></slot>${content}${this.renderTooltip()}</span
    >`;
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
