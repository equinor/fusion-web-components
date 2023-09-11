import { PersonSearchResult } from '../../types';
import { SearchableDropdownResult } from '@equinor/fusion-wc-searchable-dropdown';

export const mapPersonSearchResult = (result: PersonSearchResult): SearchableDropdownResult =>
  result.map((item) => ({
    id: item.azureId,
    title: item.name,
    subTitle: item.mail,
    graphic: item.mail ?? undefined, // used for avatar resolver
    isError: item.azureId === 'error',
  }));
