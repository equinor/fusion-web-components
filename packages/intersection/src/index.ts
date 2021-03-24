import { fusionElement } from '@equinor/fusion-wc-core';
import Element from './element';

export * from './directories/observe-intersection';
export * from './element';
export * from './events/intersection-event';

export const tag = 'fwc-intersection';

@fusionElement(tag)
export default class _element extends Element {}
declare global {
  interface HTMLElementTagNameMap {
    [tag]: _element;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: Element;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<Element>, Element>;
    }
  }
}
