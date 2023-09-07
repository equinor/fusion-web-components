import { Task } from '@lit-labs/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from '../task';
import { RequestResolvePersonAvatarEvent } from '../person-avatar/event';
import { AvatarData } from './types';

export type AzureIdOrUpnObj =
  | { azureId?: string; upn: string }
  | { azureId: string; upn?: string }
  | { azureId: string; upn: string };

export type PersonControllerHostAttributes = {
  azureId?: string;
  upn?: string;
  dataSource?: AvatarData;
};

export type PersonControllerHost = PersonControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [AvatarData | undefined, string | undefined, string | undefined];

export class PersonAvatarTask extends Task<TaskArgs, AvatarData> {
  constructor(public host: PersonControllerHost) {
    super(
      host,
      ([dataSource, azureId, upn]: TaskArgs): Promise<AvatarData> => {
        if (dataSource) {
          return Promise.resolve(dataSource);
        }

        const data = azureId ? { azureId } : upn ? { upn } : undefined;
        if (!data) {
          throw new Error('The host must have either a azureId or a upn property');
        }

        return resolveTaskEvent(host, new RequestResolvePersonAvatarEvent(data));
      },
      (): TaskArgs => [host.dataSource, host.azureId, host.upn],
    );
  }
}
