import { fusionElement } from '@equinor/fusion-wc-core';
import { StarProgressElement, StarProgressElementProps } from './element';

export * from './element';

export const tag = 'fwc-star-progress';

@fusionElement(tag)
export default class HTMLStarIndicatorCustomElement extends StarProgressElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: StarProgressElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<StarProgressElementProps & React.HTMLAttributes<StarProgressElement>>,
        StarProgressElement
      >;
    }
  }
}
