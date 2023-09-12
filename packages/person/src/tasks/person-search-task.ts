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
      ([search], { signal }): Promise<PersonSearchResult | []> => {
        if (!search || search?.length) {
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
