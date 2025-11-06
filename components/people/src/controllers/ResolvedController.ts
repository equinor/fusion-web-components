import type { ReactiveController, ReactiveControllerHost } from "lit";

import type { PersonResolveTask } from "@equinor/fusion-wc-person";

import { PeopleProps } from "../types";
import type { SelectedController } from "./SelectedController";
import { mapToPersonInfo } from "../utils";

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
      this.#host.errors.push('resolveIds: Failed to resolve from people api, see console for more information');
    }

    if (
      !this.#host.initalresolved &&
      this.#host.tasks.resolve.value &&
      this.#host.tasks.resolve.value.length > 0
    ) {
      // add errors for unsuccessfull resolved people
      const unsuccessfullResolvedPeople = this.#host.tasks.resolve.value.filter((person) => !person.success);

      unsuccessfullResolvedPeople.forEach((person) => {
        this.#host.errors.push(person.errorMessage ? `resolveIds: ${person.errorMessage}` : `resolveIds: Could not resolve azureId ${person.indentifier}`);
      });

      // filter out successful resolves and map to PersonInfo
      const resolvedPeople = this.#host.tasks.resolve.value
        .filter((person) => person.success)
        .map((person) => mapToPersonInfo(person.account!));

      // add all resolved people to selected people to prevent triggering selection-changed event for each person
      if (resolvedPeople.length > 0) {
        this.#host.controllers.selected.addPeople(resolvedPeople);
      }

      // this will prevent reapplying resolved people on subsequent updates
      this.#host.initalresolved = true;
    }
  }
}

export default ResolvedController;
