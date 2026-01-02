import { Task } from '@lit/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from './resolve-task-event';
import { PersonSearchResult } from '../types';
import { RequestResolvePersonSearchEvent } from '../events';

export type PersonSearchControllerHostAttributes = {
  search?: string;
};

export type PersonSearchControllerHost = PersonSearchControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [string | undefined];

export class PersonSearchTask extends Task<TaskArgs, PersonSearchResult> {
  constructor(public host: PersonSearchControllerHost) {
    super(
      host,
      ([search], options): Promise<PersonSearchResult | []> => {
        const { signal } = options ?? {};
        if (!search || search?.length < 3) {
          return Promise.resolve([]);
        } else if (search && search?.length >= 3) {
          const result = resolveTaskEvent(host, new RequestResolvePersonSearchEvent({ search, signal }));
          if (result) {
            return result;
          }
        }
        return Promise.resolve([]);
      },
      () => [host.search],
    );
  }
}

export default PersonSearchTask;
