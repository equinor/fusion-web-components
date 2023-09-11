import { PersonQueryDetails } from '../types';
import { SearchableDropdownResult } from '@equinor/fusion-wc-searchable-dropdown';

export const mapPersonSearchResult = (result: PersonQueryDetails): SearchableDropdownResult =>
  result.map((item) => ({
    id: item.azureId || item.azureUniqueId || '',
    title: item.name,
    subTitle: item.mail,
    graphic: item.mail ?? undefined, // used for avatar resolver
    isDisabled: item.isExpired,
    isError: item.azureId === 'error' || item.azureUniqueId === 'error',
  }));
