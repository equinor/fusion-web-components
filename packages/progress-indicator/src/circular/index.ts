import { fusionElement } from '@equinor/fusion-wc-core';
import { CircularProgressElement, CircularProgressElementProps } from './element';

export * from './element';

export const tagCircular = 'fwc-circular-progress';

@fusionElement(tagCircular)
export default class HTMLCircularIndicatorCustomElement extends CircularProgressElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tagCircular]: CircularProgressElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tagCircular]: React.DetailedHTMLProps<
        React.PropsWithChildren<CircularProgressElementProps & React.HTMLAttributes<CircularProgressElement>>,
        CircularProgressElement
      >;
    }
  }
}
