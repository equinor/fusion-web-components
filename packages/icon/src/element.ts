import { IconName } from '@equinor/eds-icons';
import { LitElement, property } from 'lit-element';
import createIcon, { IconType } from './utils/create-icon';

import { style } from './element.css';

export interface IconElementProps {
  icon: IconName;
  type?: IconType;
}

export class IconElement extends LitElement implements IconElementProps {
  static styles = [style];

  @property()
  public icon!: IconName;

  @property()
  public type?: IconType;

  render() {
    return createIcon(this.icon);
  }
}
