import { IconName } from '@equinor/eds-icons';
import { LitElement, SVGTemplateResult } from 'lit';
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

  render(): SVGTemplateResult | null {
    return this.icon ? createIcon(this.icon, this.type) : null;
  }
}
