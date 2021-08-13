import { fusionElement } from '@equinor/fusion-wc-core';
import DateRangeElement, { DateRangeElementProps } from './element';
export * from './element';
export * from '../types';
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
