import { fusionElement } from '@equinor/fusion-wc-core';
import { PersonProviderElement } from './element';

export * from './element';
export * from './controller';
export * from './types';

const tag = 'fwc-person-provider';

@fusionElement(tag)
export default class _ extends PersonProviderElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PersonProviderElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<React.HTMLAttributes<PersonProviderElement>>,
        PersonProviderElement
      >;
    }
  }
}
