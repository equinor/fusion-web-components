import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { TaskStatus } from '@lit/task';

import type { PersonResolveTask } from '@equinor/fusion-wc-person';

import type { PeopleProps } from '../types';
import type { SelectedController } from './SelectedController';
import { mapResolveToPersonInfo } from '../utils';

type ResolvedControllerHost = ReactiveControllerHost &
  EventTarget &
  PeopleProps & {
    tasks: {
      resolve: PersonResolveTask;
    };
    controllers: {
      selected: SelectedController;
    };
    errors: string[];
    parsedResolved: boolean;
  };

/**
 * Controller to manage the resolved people
 */
export class ResolvedController implements ReactiveController {
  #host: ResolvedControllerHost;

  constructor(host: ResolvedControllerHost) {
    this.#host = host;
    this.#host.addController(this);
  }

  hostDisconnected(): void {
    this.#host.removeController(this);
  }

  hostUpdated(): void {
    // add resolved ids to selected people
    if (this.#host.tasks.resolve.error) {
      this.#host.errors.push('Failed to resolve from people api, see console for more information');
    }

    const {
      resolveIds,
      tasks: { resolve },
      controllers: { selected },
    } = this.#host;

    /**
     * Only run when task is complete and has a value,
     * or when the component has not yet added resolved to selected people.
     */
    if (
      resolve.status !== TaskStatus.COMPLETE ||
      resolve.value === undefined ||
      resolveIds === undefined ||
      this.#host.parsedResolved
    ) {
      return;
    }

    // map resolved people to PersonInfo objects
    const resolvedPeople = resolve.value.map((person) => {
      return mapResolveToPersonInfo(person);
    });

    // check if resolved people are different from selected people
    const resolvedIds = resolvedPeople.map((person) => person.azureId);
    const hasChanged =
      resolvedIds.some((id) => !selected.selectedIds.includes(id)) ||
      selected.selectedIds.some((id) => !resolvedIds.includes(id));

    if (hasChanged) {
      // sync resolved people to selected people
      selected.addPeople(resolvedPeople);

      // set flag to true to prevent re-parsing on next update
      this.#host.parsedResolved = true;
    }
  }
}

export default ResolvedController;
