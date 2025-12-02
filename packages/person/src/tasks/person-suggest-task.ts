import { Task } from '@lit-labs/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from './resolve-task-event';
import { PersonSuggestResults } from '../types';
import { RequestResolvePersonSuggestEvent } from '../events';

export type PersonSuggestControllerHostAttributes = {
  search?: string;
};

export type PersonSuggestControllerHost = PersonSuggestControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [string | undefined];

const emptyPersonSuggestResults: PersonSuggestResults = {
  totalCount: 0,
  count: 0,
  value: [],
};

export class PersonSuggestTask extends Task<TaskArgs, PersonSuggestResults> {
  constructor(public host: PersonSuggestControllerHost) {
    super(
      host,
      ([search], options): Promise<PersonSuggestResults> => {
        const { signal } = options ?? {};
        if (!search || search?.length < 3) {
          return Promise.resolve(emptyPersonSuggestResults);
        } else if (search && search?.length >= 3) {
          const result = resolveTaskEvent(host, new RequestResolvePersonSuggestEvent({ search, signal }));
          return result;
        }
        return Promise.resolve(emptyPersonSuggestResults);
      },
      () => [host.search],
    );
  }
}

export default PersonSuggestTask;
