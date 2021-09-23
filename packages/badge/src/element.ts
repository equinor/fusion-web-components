import { LitElement, CSSResult, TemplateResult, PropertyValues, html } from 'lit';
import { property } from 'lit/decorators';
import { ifDefined } from 'lit/directives/if-defined';
import { IconName } from '@equinor/fusion-wc-icon';
import style from './element.css';

export type BadgeSize = 'x-small' | 'small' | 'medium' | 'large';
export type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled';

export type BadgeElementProps = {
  size?: BadgeSize;
  position?: BadgePosition;
  color?: BadgeColor;
  value?: string;
  icon?: IconName;
  circular?: boolean;
  tooltip?: string;
  clickable?: boolean;
  disabled?: boolean;
};

export class BadgeElement extends LitElement implements BadgeElementProps {
  static styles: CSSResult[] = [style];

  @property({ type: String })
  size?: BadgeSize;

  @property({ type: String, reflect: true })
  position: BadgePosition = 'top-right';

  @property({ type: String, reflect: true })
  color?: BadgeColor;

  @property({ type: String })
  value?: string;

  @property({ type: String })
  icon?: IconName;

  @property({ type: Boolean })
  circular?: boolean;

  @property({ type: String })
  tooltip?: string;

  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

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

export default BadgeElement;
