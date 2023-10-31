import { fusionElement } from '@equinor/fusion-wc-core';
import PersonSelectElement from './element';
import { type SearchableDropdownProps } from '@equinor/fusion-wc-searchable-dropdown';

export * from './element';

export type { PersonSelectEvent } from './controller';

export type PersonSelectElementProps = Partial<SearchableDropdownProps>;

export const tag = 'fwc-person-select';

@fusionElement(tag)
export default class _ extends PersonSelectElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PersonSelectElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PersonSelectElementProps & React.HTMLAttributes<PersonSelectElement>>,
        PersonSelectElement
      >;
    }
  }
}
