import { fusionElement } from '@equinor/fusion-wc-core';
import { DotsProgressElement, DotsProgressElementProps } from './element';

export * from './element';

export const tagDots = 'fwc-dots-progress';

@fusionElement(tagDots)
export default class HTMLDotsIndicatorCustomElement extends DotsProgressElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tagDots]: DotsProgressElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tagDots]: React.DetailedHTMLProps<
        React.PropsWithChildren<DotsProgressElementProps & React.HTMLAttributes<DotsProgressElement>>,
        DotsProgressElement
      >;
    }
  }
}
