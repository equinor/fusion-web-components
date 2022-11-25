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

/* import rawItems from '../resources/context.json';

const mapper = (src): SearchableDropdownResult => {
  const dst = src.map((i) => {
      return {
          id: i.id,
          title: i.title,
          subTitle: i.type.id,
          graphic: i.type.id === 'OrgChart' ? 'list' : undefined,
      };
  });

  return dst;
};

const allItems = mapper(rawItems); */

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
    // Match against children in sections
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
  initialResult: [
    singleItem({
      id: '123',
      title: 'Initial Items',
      type: 'section',
      children: [
        singleItem({ id: '456', title: 'Initial Item 1', graphic: 'list' }),
        singleItem({ id: '654', title: 'Initial Item 2', graphic: 'list' }),
        singleItem({ id: '789', title: 'Initial Item 3', graphic: 'list' }),
        singleItem({ id: '321', title: 'Initial Item 4', graphic: 'list' }),
      ],
    }),
  ],
};

const useSearchableDropdownProviderRef = (
  resolver: SearchableDropdownResolver
): MutableRefObject<SearchableDropdownProviderElement | null> => {
  const providerRef = useRef<SearchableDropdownProviderElement>(null);
  useEffect(() => {
    if (providerRef?.current) {
      providerRef.current.connectResolver(resolver);
      providerRef?.current.addEventListener('select', (e) => console.log('Event', e));
      return () => {
        providerRef.current?.removeResolver();
        providerRef.current?.removeEventListener('select', (e) => console.log('Event', e));
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
