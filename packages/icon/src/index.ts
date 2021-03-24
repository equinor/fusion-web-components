import { fusionElement } from '@equinor/fusion-wc-core';
import { IconElement, IconElementProps } from './element';

export { createIcon, IconName, IconType, iconNames } from './utils/create-icon';

export const tag = 'fwc-icon';

@fusionElement(tag)
export default class _ extends IconElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: IconElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<IconElementProps>, IconElement>;
    }
  }
}
