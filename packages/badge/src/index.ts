import { fusionElement } from '@equinor/fusion-wc-core';
import { BadgeElement } from './element';

export { BadgeElement } from './element';
export { BadgeColor, BadgePosition, BadgeSize } from './static';

export const tag = 'fwc-badge';

export type BadgeElementProps = Pick<
  BadgeElement,
  'size' | 'position' | 'color' | 'value' | 'icon' | 'circular' | 'clickable' | 'disabled'
>;

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
