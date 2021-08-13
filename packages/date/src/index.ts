import { fusionElement } from '@equinor/fusion-wc-core';
import DateTime, { DateTimeElementProps } from './datetime/element';
import DateRange, { DateRangeElementProps } from './daterange/element';
export * from './datetime/element';
export * from './daterange/element';
export * from './types';
export const dateTimeTag = 'fwc-datetime';
export const dateRangeTag = 'fwc-daterange';

@fusionElement(dateTimeTag)
export class DateTimeElement extends DateTime {}

@fusionElement(dateRangeTag)
export class DateRangeElement extends DateRange {}

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
