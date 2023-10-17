import { IconName } from '@equinor/eds-icons';
import { HTMLTemplateResult, LitElement, SVGTemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import createIcon, { IconType } from './utils/create-icon';
import { style } from './element.css';

export type IconElementProps = {
  icon?: IconName;
  type?: IconType;
};

export class IconElement extends LitElement implements IconElementProps {
  static styles = [style];

  @property()
  public icon?: IconName;

  @property()
  public type?: IconType;

  render(): SVGTemplateResult | HTMLTemplateResult | void {
    if (this.icon) {
      return createIcon(this.icon, this.type);
    }
    return html`<slot></slot>`;
  }
}
