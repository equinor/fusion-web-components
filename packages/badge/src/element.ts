import { LitElement, CSSResult, TemplateResult, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
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
};

export class BadgeElement extends LitElement implements BadgeElementProps {
  static styles: CSSResult[] = [style];

  @property({ type: String, reflect: true })
  size: BadgeSize = 'medium';

  @property({ type: String, reflect: true })
  position: BadgePosition = 'top-right';

  @property({ type: String, reflect: true })
  color: BadgeColor = 'primary';

  @property({ type: String })
  value?: string;

  @property({ type: String })
  icon?: IconName;

  @property({ type: Boolean })
  circular?: boolean;

  @property({ type: String })
  tooltip?: string;

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
