import { Task } from '@lit/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from './resolve-task-event';
import { PersonResolveResults } from '../types';
import { RequestResolvePersonResolveEvent } from '../events';

export type PersonResolveControllerHostAttributes = {
  preselectedIds: string[];
};

export type PersonResolveControllerHost = PersonResolveControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [string[]];

export class PersonResolveTask extends Task<TaskArgs, PersonResolveResults> {
  constructor(public host: PersonResolveControllerHost) {
    super(
      host,
      ([preselectedIds], options): Promise<PersonResolveResults> => {
        const { signal } = options ?? {};
        if (!preselectedIds || preselectedIds.length === 0) {
          return Promise.resolve([]);
        } else if (preselectedIds.length > 0) {
          return resolveTaskEvent(host, new RequestResolvePersonResolveEvent({ azureIds: preselectedIds, signal }));
        }
        return Promise.resolve([]);
      },
      () => [host.preselectedIds],
    );
  }
}

export default PersonResolveTask;
