import { fusionElement } from '@equinor/fusion-wc-core';
import { RippleElement } from './element';
import { RippleElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-ripple';

@fusionElement(tag)
export default class _ extends RippleElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: RippleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<RippleElementProps & React.HTMLAttributes<RippleElement>>,
        RippleElement
      >;
    }
  }
}
