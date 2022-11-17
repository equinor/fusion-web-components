import React, { PropsWithChildren, useRef, useEffect, MutableRefObject } from 'react';
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

import allItems from '../resources/sections.json';

/* generate single SearchableDropdownResult item */
const singleItem = (props: Partial<SearchableDropdownResultItem>): SearchableDropdownResultItem => {
  return Object.assign({ id: '0', title: 'Dummy title' }, props);
};

/* Dummy api handler */

const apiItems = (query: string): SearchableDropdownResult => {
  /* min length of query string */
  const min = 2;
  const matched = [];
  if (!query || query.length < min) {
    matched.push(singleItem({ title: `Need ${min - query.length} more chars`, isDisabled: true }));
    return matched;
  }

  /* Recursive func for matching in children  */
  for (const item of allItems as SearchableDropdownResult) {
    const entry = { ...item };
    // loop over children to creta sections
    if (entry.type === 'section' && entry.children?.length) {
      entry.children = entry.children.filter((i) => i.title && i.title.toLowerCase().indexOf(query) > -1);
      if (entry.children.length) {
        matched.push(entry);
      }
    } else if (entry.title && entry.title.toLowerCase().indexOf(query) > -1) {
      matched.push(entry);
    }
  }

  if (!matched.length) {
    matched.push(singleItem({ title: 'No matches...', isDisabled: true }));
  }

  return matched;
};

const resolver: SearchableDropdownResolver = {
  searchQuery: (query: string) => {
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
      providerRef?.current.addEventListener('select', (e) => console.log('Event', e));
      providerRef.current.setResolver(resolver);
      return () => {
        providerRef.current?.removeEventListener('select', (e) => console.log('Event', e));
        providerRef.current?.removeResolver();
      };
    }
  }, [providerRef]);

  return providerRef;
};

export const SearchableDropdown = ({ children, ...props }: PropsWithChildren<SearchableDropdownProps>): JSX.Element => {
  const providerRef = useSearchableDropdownProviderRef(resolver);

  return (
    <fwc-searchable-dropdown-provider ref={providerRef}>
      <fwc-searchable-dropdown {...extractProps<SearchableDropdownProps>(props)}>{children}</fwc-searchable-dropdown>
    </fwc-searchable-dropdown-provider>
  );
};

export default SearchableDropdown;
