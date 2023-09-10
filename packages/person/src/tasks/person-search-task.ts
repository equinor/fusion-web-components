import { Task } from '@lit-labs/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from '.';
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
      ([search]: TaskArgs): Promise<PersonSearchResult | []> => {
        if (search) {
          return resolveTaskEvent(host, new RequestResolvePersonSearchEvent({ search }));
        }
        return Promise.resolve([]);
      },
      (): TaskArgs => [host.search],
    );
  }
}

export default PersonSearchTask;
