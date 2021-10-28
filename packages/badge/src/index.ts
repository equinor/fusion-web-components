import { fusionElement } from '@equinor/fusion-wc-core';
import { BadgeElement } from './element';
import { BadgeElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-badge';

@fusionElement(tag)
export default class _ extends BadgeElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: BadgeElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<BadgeElementProps & React.HTMLAttributes<BadgeElement>>,
        BadgeElement
      >;
    }
  }
}
