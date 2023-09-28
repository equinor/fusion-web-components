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
import { ChipElement } from '@equinor/fusion-wc-chip';
ChipElement;
SearchableDropdownElement;
SearchableDropdownProviderElement;

import appIconSvgTemplate from '../resources/appIcon.svg';

import rawItems from '../resources/context.json';
import { IconType } from '@equinor/fusion-wc-icon';

const mapper = (src: Array<{ id: string; title: string; type: { id: string } }>): SearchableDropdownResult => {
  const dst = src.map((i) => {
    return {
      id: i.id,
      title: i.title,
      graphic: i.type.id === 'OrgChart' ? 'list' : undefined,
    };
  });

  return dst;
};

const allItems = mapper(rawItems);

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
      id: 'ctx-123',
      title: 'Context',
      type: 'section',
      children: [
        singleItem({
          id: '1337',
          title: 'custom svg',
          subTitle: 'foo bar baz',
          graphic: appIconSvgTemplate,
          graphicType: IconType.SVG,
          meta: '<fwc-chip disabled variant="outlined" value="Custom meta" />',
        }),
        singleItem({ id: '456', title: 'Context 1', graphic: 'list' }),
        singleItem({ id: '654', title: 'Context 2', graphic: 'list' }),
        singleItem({ id: '789', title: 'Context 3', graphic: 'list' }),
        singleItem({ id: '321', title: 'Context 4', graphic: 'list' }),
      ],
    }),
    singleItem({
      id: 'fav-123',
      title: 'Favourites',
      type: 'section',
      children: [
        singleItem({ id: '456456', title: 'Favourite 1', meta: 'check' }),
        singleItem({ id: '654654', title: 'Favourite 2', meta: 'check' }),
        singleItem({ id: '789789', title: 'Favourite 3', meta: 'check' }),
        singleItem({ id: '321321', title: 'Favourite 4', meta: 'check' }),
      ],
    }),
  ],
  closeHandler: (e: MouseEvent | KeyboardEvent) => {
    console.log('closeEvent fired', e);
  },
};

const useSearchableDropdownProviderRef = (
  resolver: SearchableDropdownResolver
): MutableRefObject<SearchableDropdownProviderElement | null> => {
  const providerRef = useRef<SearchableDropdownProviderElement>(null);
  useEffect(() => {
    if (providerRef?.current) {
      providerRef.current.connectResolver(resolver);
      providerRef?.current.addEventListener('select', (e) => console.log('Event', e));
      providerRef?.current.addEventListener('dropdownClosed', (e) => console.log('Event', e));
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
      <fwc-searchable-dropdown {...extractProps(props)}>{children}</fwc-searchable-dropdown>
    </fwc-searchable-dropdown-provider>
  );
};

export default SearchableDropdown;
