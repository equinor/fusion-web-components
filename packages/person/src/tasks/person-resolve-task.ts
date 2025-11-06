import { Task } from '@lit/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from './resolve-task-event';
import { PersonResolveResults } from '../types';
import { RequestResolvePersonResolveEvent } from '../events';

export type PersonResolveControllerHostAttributes = {
  resolveIds: string[];
};

export type PersonResolveControllerHost = PersonResolveControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [string[]];

export class PersonResolveTask extends Task<TaskArgs, PersonResolveResults> {
  constructor(public host: PersonResolveControllerHost) {
    super(
      host,
      ([resolveIds], options): Promise<PersonResolveResults> => {
        const { signal } = options ?? {};
        if (!resolveIds || resolveIds.length === 0) {
          return Promise.resolve([]);
        } else if (resolveIds.length > 0) {
          return resolveTaskEvent(host, new RequestResolvePersonResolveEvent({ resolveIds, signal }));
        }
        return Promise.resolve([]);
      },
      () => [host.resolveIds],
    );
  }
}

export default PersonResolveTask;
