import { fusionElement } from '@equinor/fusion-wc-core';
import { RadioListItemElement, RadioListItemElementProps } from './element';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

export const radioListItemTag = 'fwc-radio-list-item';

@fusionElement(radioListItemTag)
export default class _ extends RadioListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [radioListItemTag]: RadioListItemElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [radioListItemTag]: React.DetailedHTMLProps<
        React.PropsWithChildren<RadioListItemElementProps & React.HTMLAttributes<RadioListItemElement>>,
        RadioListItemElement
      >;
    }
  }
}
