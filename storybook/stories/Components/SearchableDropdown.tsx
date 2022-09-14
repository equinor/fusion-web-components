import { PropsWithChildren, useRef, useEffect, MutableRefObject } from 'react';
import extractProps from './extract-props';
import {
  SearchableDropdownElement,
  SearchableDropdownProviderElement,
  SearchableDropdownProps,
  SearchableDropdownResolver,
  SearchableDropdownResult,
  SearchableDropdownResultItem,
} from '@equinor/fusion-wc-searchable-dropdown';
SearchableDropdownElement;
SearchableDropdownProviderElement;

/* generate single SearchableDropdownResult item */
const singleItem = (props: unknown): SearchableDropdownResultItem => {
  return Object.assign({ id: '0', title: 'Dummy title' }, props);
};
/* Dummy api handler */
const apiItems = (query: string): SearchableDropdownResult => {
  // min length
  const min = 3;
  const items = [];
  if (!query || query.length < min) {
    items.push(singleItem({ title: `Need ${min - query.length} more chars`, isDisabled: true }));
    return items;
  }
  const allResults = [
    {
      id: '0001',
      title: 'Johan Castberg',
      isError: true,
    },
    {
      id: '0002',
      title: 'Johan Sverdrup Business Case',
      subTitle: 'some project description...',
      isSelected: true,
      meta: 'check',
    },
    {
      id: '0003',
      title: 'Johan Sverdrup Phase 2',
    },
    {
      id: '0004',
      title: 'Johan Castberg Prosjektportal',
    },
  ];

  for (const item of allResults) {
    if (item.title.toLowerCase().indexOf(query) > -1) {
      items.push(item);
    }
  }

  if (!items.length) {
    items.push(singleItem({ title: 'No matches...', isDisabled: true }));
  }

  return items;
};

const sddResolver: SearchableDropdownResolver = {
  searchQuery: async (query: string) => {
    try {
      // Dummy api call returning matches
      return apiItems(query);
    } catch {
      return [singleItem({ title: 'Error while searcing', isDisabled: true, isError: true })];
    }
  },
};

const useSearchableDropdownProviderRef = (
  resolver: SearchableDropdownResolver
): MutableRefObject<SearchableDropdownProviderElement | null> => {
  const providerRef = useRef<SearchableDropdownProviderElement>(null);
  useEffect(() => {
    if (providerRef?.current) {
      window.addEventListener('action', (e) => console.log('Event', e));
      providerRef.current.setResolver(resolver);
      return () => {
        providerRef.current?.removeResolver();
      };
    }
  }, [providerRef]);

  return providerRef;
};

export const SearchableDropdown = ({ children, ...props }: PropsWithChildren<SearchableDropdownProps>): JSX.Element => {
  const providerRef = useSearchableDropdownProviderRef(sddResolver);

  return (
    <fwc-searchable-dropdown-provider ref={providerRef}>
      <fwc-searchable-dropdown {...extractProps<SearchableDropdownProps>(props)}>{children}</fwc-searchable-dropdown>
    </fwc-searchable-dropdown-provider>
  );
};

export default SearchableDropdown;
