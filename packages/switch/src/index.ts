import { fusionElement } from '@equinor/fusion-wc-core';
import SwitchElement, { SwitchElementProps } from './element';
export * from './element';

export const tag = 'fwc-switch';

@fusionElement(tag)
export default class _ extends SwitchElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: SwitchElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<SwitchElementProps & React.HTMLAttributes<SwitchElement>>,
        SwitchElement
      >;
    }
  }
}
