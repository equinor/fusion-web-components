import extractProps from './extract-props';
import { DateRangeElement, DateRangeElementProps } from '@equinor/fusion-wc-date';
DateRangeElement;

export const DateRange = ({ ...props }: DateRangeElementProps): JSX.Element => (
  <fwc-daterange {...extractProps<DateRangeElementProps>(props)} />
);

export default DateRange;
