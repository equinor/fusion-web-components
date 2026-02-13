import { Task } from '@lit/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from './resolve-task-event';
import { PersonSuggestResults } from '../types';
import { RequestResolvePersonSuggestEvent } from '../events';

export type PersonSuggestControllerHostAttributes = {
  search: string;
  systemAccounts: boolean;
};

export type PersonSuggestControllerHost = PersonSuggestControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [string, boolean];

const emptyPersonSuggestResults: PersonSuggestResults = {
  totalCount: 0,
  count: 0,
  value: [],
};

export class PersonSuggestTask extends Task<TaskArgs, PersonSuggestResults> {
  constructor(public host: PersonSuggestControllerHost) {
    super(
      host,
      async ([search, systemAccounts], options): Promise<PersonSuggestResults> => {
        const { signal } = options ?? {};
        if (!search || search?.length < 3) {
          return emptyPersonSuggestResults;
        } else if (search && search?.length >= 3) {
          const result = await resolveTaskEvent(host, new RequestResolvePersonSuggestEvent({ search, systemAccounts, signal }));
          return result;
        }
        return emptyPersonSuggestResults;
      },
      () => [host.search, host.systemAccounts],
    );
  }
}

export default PersonSuggestTask;
