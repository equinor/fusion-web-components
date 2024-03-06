import {
  SearchableDropdownProviderElement,
  SearchableDropdownResolver,
  SearchableDropdownResultItem,
} from '@equinor/fusion-wc-searchable-dropdown';
import { faker } from '@faker-js/faker';
import { html } from 'lit';
import appIconSvgTemplate from './appIconSvg.svg';

SearchableDropdownProviderElement;

faker.seed(123);

const item = (props: Partial<SearchableDropdownResultItem>): SearchableDropdownResultItem => {
  return Object.assign(
    {
      id: faker.number.int(),
      title: faker.animal.dog(),
    },
    props,
  );
};

const resolver: SearchableDropdownResolver = {
  searchQuery: (args) => {
    return new Array(faker.number.int({ min: 3, max: 10 })).fill(undefined).map((_, i) => {
      const seed =
        args
          .split('')
          .map((x) => x.charCodeAt(0))
          .reduce((acc, item) => (acc += item), 0) + i;
      faker.seed(seed);

      return item({ id: String(seed) });
    });
  },
  initialResult: [
    item({
      title: 'Context',
      type: 'section',
      children: [
        item({
          title: 'custom svg',
          subTitle: 'foo bar baz',
          graphic: appIconSvgTemplate,
          graphicType: 'inline-svg',
          meta: '<fwc-chip disabled variant="outlined" value="Custom meta" />',
        }),
        item({
          title: 'custom content',
          subTitle: 'foo bar baz',
          graphic: `<div style="background: red; padding: .5rem">${appIconSvgTemplate}</div>`,
          graphicType: 'inline-svg',
          meta: '<fwc-chip disabled variant="outlined" value="Custom meta" />',
        }),
        item({ title: 'Context 1', graphic: 'list' }),
        item({ title: 'Context 2', graphic: 'list', isDisabled: true }),
        item({ title: 'Context 3', subTitle: 'sub title 3', graphic: 'list' }),
        item({ title: 'Context 4', subTitle: 'sub title 4', graphic: 'list', isError: true }),
        item({ title: 'Context 5', graphic: 'list' }),
      ],
    }),
    item({
      title: 'Favourites',
      type: 'section',
      children: [
        item({ title: 'Favourite 1', meta: 'check' }),
        item({ title: 'Favourite 2', meta: 'check' }),
        item({ title: 'Favourite 3', meta: 'check' }),
        item({ title: 'Favourite 4', meta: 'check' }),
      ],
    }),
  ],
};

export const searchableDropdownProviderDecorator = (story) => {
  return html` <fwc-searchable-dropdown-provider .resolver=${resolver}>${story()}</fwc-searchable-dropdown-provider> `;
};
