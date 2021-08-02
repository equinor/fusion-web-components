import { fusionElement } from '@equinor/fusion-wc-core';
import RadioElement, { RadioElementProps } from './element';

export const tag = 'fwc-radio';

@fusionElement(tag)
export default class _ extends RadioElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: RadioElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<RadioElementProps & React.HTMLAttributes<RadioElement>>,
        RadioElement
      >;
    }
  }
}
