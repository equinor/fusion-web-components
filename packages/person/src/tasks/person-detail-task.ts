import { Task } from '@lit/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from './resolve-task-event';
import { AzureIdOrUpnObj, PersonDetails } from '../types';
import { AbortableEventDetail, RequestResolvePersonDetailEvent } from '../events';

export type PersonDetailControllerHostAttributes = {
  azureId?: string;
  upn?: string;
  dataSource?: PersonDetails;
};

export type PersonDetailControllerHost = PersonDetailControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [PersonDetails | undefined, string | undefined, string | undefined];

export class PersonDetailTask extends Task<TaskArgs, PersonDetails> {
  constructor(public host: PersonDetailControllerHost) {
    super(
      host,
      ([dataSource, azureId, upn], options): Promise<PersonDetails> => {
        const { signal } = options ?? {};
        if (dataSource) {
          return Promise.resolve(dataSource);
        }

        if (!(azureId || upn)) {
          throw new Error('The host must have either a azureId or a upn property');
        }

        const event = new RequestResolvePersonDetailEvent({
          azureId,
          upn,
          signal,
        } as AbortableEventDetail<AzureIdOrUpnObj>);

        return resolveTaskEvent(host, event);
      },
      () => [host.dataSource, host.azureId, host.upn],
    );
  }
}

export default PersonDetailTask;
