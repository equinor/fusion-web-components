import { fusionElement } from '@equinor/fusion-wc-core';
import DateTimeElement, { DateTimeElementProps } from './dateTimeElement';
import DateRangeElement, { DateRangeElementProps } from './dateRangeElement';
export { DateTimeElementProps } from './dateTimeElement';
export { DateRangeElementProps } from './dateRangeElement';
export { DateTimeFormat } from './types';
export const dateTimeTag = 'fwc-datetime';
export const dateRangeTag = 'fwc-daterange';

@fusionElement(dateTimeTag)
export class DateTime extends DateTimeElement {}

@fusionElement(dateRangeTag)
export class DateRange extends DateRangeElement {}

declare global {
  interface HTMLElementTagNameMap {
    [dateTimeTag]: DateTimeElement;
    [dateRangeTag]: DateRangeElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [dateTimeTag]: React.DetailedHTMLProps<
        React.PropsWithChildren<DateTimeElementProps & React.HTMLAttributes<DateTimeElement>>,
        DateTimeElement
      >;
      [dateRangeTag]: React.DetailedHTMLProps<
        React.PropsWithChildren<DateRangeElementProps & React.HTMLAttributes<DateRangeElement>>,
        DateRangeElement
      >;
    }
  }
}
