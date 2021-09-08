import { IconData } from '@equinor/eds-icons';
import { LitElement, property, SVGTemplateResult } from 'lit-element';
import createIcon, { IconType } from './utils/create-icon';

import { style } from './element.css';

export type IconElementProps = {
  icon: IconData;
  type?: IconType;
};

export class IconElement extends LitElement implements IconElementProps {
  static styles = [style];

  @property()
  public icon!: IconData;

  @property()
  public type?: IconType;

  render(): SVGTemplateResult {
    return createIcon(this.icon.name);
  }
}
