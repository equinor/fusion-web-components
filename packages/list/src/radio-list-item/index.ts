import { fusionElement } from '@equinor/fusion-wc-core';
import { RadioListItemElement, RadioListItemElementProps } from './element';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

export const tag = 'fwc-radio-list-item';

@fusionElement(tag)
export default class _ extends RadioListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: RadioListItemElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<RadioListItemElementProps & React.HTMLAttributes<RadioListItemElement>>,
        RadioListItemElement
      >;
    }
  }
}
