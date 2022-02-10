import { fusionElement } from '@equinor/fusion-wc-core';
import { CircularProgressElement, CircularProgressElementProps } from './element';

export * from './element';

export const starTag = 'fwc-circular-progress';

@fusionElement(starTag)
export default class HTMLCircularIndicatorCustomElement extends CircularProgressElement {}

declare global {
  interface HTMLElementTagNameMap {
    [starTag]: CircularProgressElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [starTag]: React.DetailedHTMLProps<
        React.PropsWithChildren<CircularProgressElementProps & React.HTMLAttributes<CircularProgressElement>>,
        CircularProgressElement
      >;
    }
  }
}
