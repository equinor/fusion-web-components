
import { Task } from '@lit-labs/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from '.';
import { PersonDetails } from '../types';
import { RequestResolvePersonDetailEvent } from '../events';

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
      ([dataSource, azureId, upn]: TaskArgs): Promise<PersonDetails> => {
        if (dataSource) {
          return Promise.resolve(dataSource);
        }

        const data = azureId ? { azureId } : upn ? { upn } : undefined;
        if (!data) {
          throw new Error('The host must have either a azureId or a upn property');
        }

        return resolveTaskEvent(host, new RequestResolvePersonDetailEvent(data));
      },
      (): TaskArgs => [host.dataSource, host.azureId, host.upn],
    );
  }
}

export default PersonDetailTask;
