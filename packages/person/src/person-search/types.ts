import { SearchableDropdownControllerHost } from '@equinor/fusion-wc-searchable-dropdown';

export type PersonSearchHost = SearchableDropdownControllerHost & { queryString: string } & EventTarget;
