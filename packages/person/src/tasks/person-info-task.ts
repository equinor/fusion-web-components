import { Task } from '@lit-labs/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from '.';
import { AzureIdOrUpnObj, PersonInfo } from '../types';
import { AbortableEventDetail, RequestResolvePersonInfoEvent } from '../events';

type DataSource = Partial<PersonInfo>;

export type PersonInfoControllerHostAttributes = {
  azureId?: string;
  upn?: string;
  dataSource?: DataSource;
};

export type PersonInfoControllerHost = PersonInfoControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [DataSource | undefined, string | undefined, string | undefined];

export class PersonInfoTask<T extends DataSource = DataSource> extends Task<TaskArgs, DataSource> {
  constructor(public host: PersonInfoControllerHost) {
    super(
      host,
      ([dataSource, azureId, upn], { signal }): Promise<T | PersonInfo> => {
        if (dataSource) {
          return Promise.resolve(dataSource as T);
        }

        if (!(azureId || upn)) {
          throw new Error('The host must have either a azureId or a upn property');
        }

        const event = new RequestResolvePersonInfoEvent({
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

export default PersonInfoTask;
