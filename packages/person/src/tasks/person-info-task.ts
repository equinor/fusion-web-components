import { Task } from '@lit-labs/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from '.';
import { PersonInfo } from '../types';
import { RequestResolvePersonInfoEvent } from '../events';

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
      ([dataSource, azureId, upn]: TaskArgs): Promise<T | PersonInfo> => {
        if (dataSource) {
          return Promise.resolve(dataSource as T);
        }

        const data = azureId ? { azureId } : upn ? { upn } : undefined;
        if (!data) {
          throw new Error('The host must have either a azureId or a upn property');
        }

        return resolveTaskEvent(host, new RequestResolvePersonInfoEvent(data));
      },
      (): TaskArgs => [host.dataSource, host.azureId, host.upn],
    );
  }
}

export default PersonInfoTask;
