import { fusionElement } from '@equinor/fusion-wc-core';
import DateElement, { DateElementProps } from './element';

export const tag = 'fwc-date';

@fusionElement(tag)
export default class _ extends DateElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: DateElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<DateElementProps & React.HTMLAttributes<DateElement>>,
        DateElement
      >;
    }
  }
}
