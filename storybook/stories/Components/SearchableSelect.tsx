import { SearchableSelectElement } from '@equinor/fusion-wc-searchable-select';

import { createComponent } from '@equinor/fusion-react-utils';
SearchableSelectElement;

export type SelectProps = React.ComponentProps<typeof SearchableSelect>;
export const SearchableSelect = createComponent(SearchableSelectElement, 'fwc-searchable-select');

export default SearchableSelect;
