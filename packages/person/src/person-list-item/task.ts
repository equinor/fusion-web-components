import { Task } from '@lit-labs/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from '../task';
import { PersonDetails, RequiredAndOptionalPick } from '../types';
import { RequestResolvePersonListItemEvent } from './event';

export type AzureIdOrUpnObj =
  | { azureId?: string; upn: string }
  | { azureId: string; upn?: string }
  | { azureId: string; upn: string };

export type ListItemData = RequiredAndOptionalPick<PersonDetails, 'name' | 'accountType', 'department' | 'pictureSrc'>;

export type PersonControllerHostAttributes = {
  azureId?: string;
  upn?: string;
  dataSource?: ListItemData;
};

export type PersonControllerHost = PersonControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [ListItemData | undefined, string | undefined, string | undefined];

export class PersonListItemTask extends Task<TaskArgs, ListItemData> {
  constructor(public host: PersonControllerHost) {
    super(
      host,
      ([dataSource, azureId, upn]: TaskArgs): Promise<ListItemData> => {
        if (dataSource) {
          return Promise.resolve(dataSource);
        }

        const data = azureId ? { azureId } : upn ? { upn } : undefined;
        if (!data) {
          throw new Error('The host must have either a azureId or upn property');
        }

        return resolveTaskEvent(host, new RequestResolvePersonListItemEvent(data));
      },
      (): TaskArgs => [host.dataSource, host.azureId, host.upn],
    );
  }
}
