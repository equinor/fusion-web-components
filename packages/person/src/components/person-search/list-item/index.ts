import { fusionElement } from '@equinor/fusion-wc-core';
import { PersonSearchListItemElement } from './element';
import { type SearchableDropdownResultItem } from '@equinor/fusion-wc-searchable-dropdown';
export * from './element';

export type PersonSearchListItemElementProps = {
  item?: SearchableDropdownResultItem;
};

export const tagListItem = 'fwc-person-search-list-item';

@fusionElement(tagListItem)
export default class _ extends PersonSearchListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tagListItem]: PersonSearchListItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tagListItem]: React.DetailedHTMLProps<
        React.PropsWithChildren<PersonSearchListItemElementProps & React.HTMLAttributes<PersonSearchListItemElement>>,
        PersonSearchListItemElement
      >;
    }
  }
}
