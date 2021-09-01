import { fusionElement } from '@equinor/fusion-wc-core';
import { DateTimeElement, DateTimeElementProps } from './element';

export { DateTimeElement, DateTimeElementProps } from './element';

export const dateTimeTag = 'fwc-datetime';
@fusionElement(dateTimeTag)
export class _ extends DateTimeElement {}

declare global {
  interface HTMLElementTagNameMap {
    [dateTimeTag]: DateTimeElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [dateTimeTag]: React.DetailedHTMLProps<
        React.PropsWithChildren<DateTimeElementProps & React.HTMLAttributes<DateTimeElement>>,
        DateTimeElement
      >;
    }
  }
}
