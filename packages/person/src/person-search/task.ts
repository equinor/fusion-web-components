import { Task } from '@lit-labs/task';
import { PersonSearchHost } from './types';
import { resolveTaskEvent } from '../task';
import { RequestResolvePersonSearchEvent } from './event';
import { mapPersonSearchResult } from './utils';
import { SearchableDropdownResult } from '@equinor/fusion-wc-searchable-dropdown';

type TaskArgs = [string | undefined];

export class PersonSearchTask extends Task<TaskArgs, SearchableDropdownResult> {
  constructor(public host: PersonSearchHost) {
    super(
      host,
      async ([query]: TaskArgs): Promise<SearchableDropdownResult> => {
        let result = [];
        if (!query) {
          result = [
            {
              azureUniqueId: 'initial',
              name: host.initialText,
              isExpired: true,
            },
          ];
        } else {
          result = await resolveTaskEvent(host, new RequestResolvePersonSearchEvent({ query }));
          if (result.length < 1) {
            result = [
              {
                azureUniqueId: 'nomatch',
                name: 'No matching person found',
                isExpired: true,
              },
            ];
          }
        }

        return mapPersonSearchResult(result);
      },
      (): TaskArgs => [host.queryString],
    );
  }
}
