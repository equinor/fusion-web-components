import { fusionElement } from '@equinor/fusion-wc-core';
import { PersonProviderElement, PersonProviderProps } from './element';
export * from './element';
export * from './controller';

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
        React.PropsWithChildren<PersonProviderProps & React.HTMLAttributes<PersonProviderElement>>,
        PersonProviderElement
      >;
    }
  }
}
