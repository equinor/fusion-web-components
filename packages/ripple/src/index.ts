import { fusionElement } from '@equinor/fusion-wc-core';
import { RippleElement, RippleElementProps } from './element';
export * from './element';

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
