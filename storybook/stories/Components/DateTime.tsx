import extractProps from './extract-props';
import { DateTimeElement, DateTimeElementProps } from '@equinor/fusion-wc-date';
DateTimeElement;

export const DateTime = ({ ...props }: DateTimeElementProps): JSX.Element => (
  <fwc-datetime {...extractProps<DateTimeElementProps>(props)} />
);

export default DateTime;
