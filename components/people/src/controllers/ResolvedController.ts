import type { ReactiveController, ReactiveControllerHost } from "lit";

import type { PersonResolveResult, PersonResolveTask } from "@equinor/fusion-wc-person";

import { PeopleProps } from "../types";
import type { SelectedController } from "./SelectedController";
import { mapToPersonInfo, resolveFailedAvatarUrl } from "../utils";

type ResolvedControllerHost = ReactiveControllerHost & EventTarget & PeopleProps & {
  tasks: {
    resolve: PersonResolveTask;
  };
  controllers: {
    selected: SelectedController;
  };
  errors: string[];
  initalresolved: boolean;
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
      !this.#host.initalresolved &&
      this.#host.tasks.resolve.value &&
      this.#host.tasks.resolve.value.length > 0
    ) {

      // map resolved people to PersonInfo objects
      const resolvedPeople = this.#host.tasks.resolve.value.map((person) => {
        if (!person.success) {
          return this.mapToFailedPerson(person);
        }

        return mapToPersonInfo(person.account!)
      });

      // add all resolved people to selected people to prevent triggering selection-changed event for each person
      if (resolvedPeople.length > 0) {
        this.#host.controllers.selected.addPeople(resolvedPeople);
      }

      // this will prevent reapplying resolved people on subsequent updates
      this.#host.initalresolved = true;
    }
  }

  mapToFailedPerson = (person: PersonResolveResult) => {
    let name = person.errorMessage ?? 'Unknown error';

    if (person.statusCode === 404) {
      name = `Person do not exist in Entra ID`;
    } else if (person.statusCode === 400) {
      name = 'Not a valid guid';
    }

    return {
      azureId: person.identifier,
      name,
      jobTitle: person.identifier,
      isExpired: false, // set to not expired since we want to show the azureId for the failed person in the pill
      avatarUrl: resolveFailedAvatarUrl(),
      avatarColor: '#ff92a8',
    };
  }
}

export default ResolvedController;
