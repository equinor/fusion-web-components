import { fusionElement } from '@equinor/fusion-wc-core';
import PersonSearchElement from './element';
import { type SearchableDropdownProps } from '@equinor/fusion-wc-searchable-dropdown';
export * from './element';

export type PersonSearchElementProps = Partial<SearchableDropdownProps>;

export const tag = 'fwc-person-search';

@fusionElement(tag)
export default class _ extends PersonSearchElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PersonSearchElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PersonSearchElementProps & React.HTMLAttributes<PersonSearchElement>>,
        PersonSearchElement
      >;
    }
  }
}
