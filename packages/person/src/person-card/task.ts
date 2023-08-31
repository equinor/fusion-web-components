import { Task } from '@lit-labs/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from '../task';
import { PersonDetails, RequiredAndOptionalPick } from '../types';
import { RequestResolvePersonCardEvent } from './event';

export type AzureIdOrUpnObj =
  | { azureId?: string; upn: string }
  | { azureId: string; upn?: string }
  | { azureId: string; upn: string };

export type CardData = RequiredAndOptionalPick<
  PersonDetails,
  'name' | 'pictureSrc',
  'department' | 'jobTitle' | 'accountType' | 'mail' | 'mobilePhone' | 'positions' | 'manager'
>;

export type PersonControllerHostAttributes = {
  azureId?: string;
  upn?: string;
  dataSource?: CardData;
};

export type PersonControllerHost = PersonControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [CardData | undefined, string | undefined, string | undefined];

export class PersonCardTask extends Task<TaskArgs, CardData> {
  constructor(public host: PersonControllerHost) {
    super(
      host,
      ([dataSource, azureId, upn]: TaskArgs): Promise<CardData> => {
        if (dataSource) {
          return Promise.resolve(dataSource);
        }

        const data = azureId ? { azureId } : upn ? { upn } : undefined;
        if (!data) {
          throw new Error('The host must have either a azureId or a upn property');
        }

        return resolveTaskEvent(host, new RequestResolvePersonCardEvent(data));
      },
      (): TaskArgs => [host.dataSource, host.azureId, host.upn],
    );
  }
}
