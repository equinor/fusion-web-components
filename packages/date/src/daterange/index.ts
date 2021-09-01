import { fusionElement } from '@equinor/fusion-wc-core';
import { DateRangeElement, DateRangeElementProps } from './element';

export { DateRangeElement, DateRangeElementProps } from './element';

export const dateRangeTag = 'fwc-daterange';

@fusionElement(dateRangeTag)
export default class _ extends DateRangeElement {}

declare global {
  interface HTMLElementTagNameMap {
    [dateRangeTag]: DateRangeElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [dateRangeTag]: React.DetailedHTMLProps<
        React.PropsWithChildren<DateRangeElementProps & React.HTMLAttributes<DateRangeElement>>,
        DateRangeElement
      >;
    }
  }
}
