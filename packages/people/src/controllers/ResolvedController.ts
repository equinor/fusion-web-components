import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type { PersonResolveTask } from '@equinor/fusion-wc-person';

import type { PeopleProps } from '../types';
import type { SelectedController } from './SelectedController';
import { mapResolveToPersonInfo } from '../utils';

type ResolvedControllerHost = ReactiveControllerHost & EventTarget & PeopleProps & {
  tasks: {
    resolve: PersonResolveTask;
  };
  controllers: {
    selected: SelectedController;
  };
  errors: string[];
  initialResolved: boolean;
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

    if (
      !this.#host.initialResolved &&
      this.#host.tasks.resolve.value &&
      this.#host.tasks.resolve.value.length > 0
    ) {

      // map resolved people to PersonInfo objects
      const resolvedPeople = this.#host.tasks.resolve.value.map((person) => {
        return mapResolveToPersonInfo(person)
      });

      // add all resolved people to selected people to prevent triggering selection-changed event for each person
      if (resolvedPeople.length > 0) {
        this.#host.controllers.selected.addPeople(resolvedPeople);
      }

      // this will prevent reapplying resolved people on subsequent updates
      this.#host.initialResolved = true;
    }
  }
}

export default ResolvedController;
