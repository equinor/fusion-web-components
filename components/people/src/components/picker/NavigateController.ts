import type { ReactiveController } from "lit";

import type { PickerElement } from "./element";
import { mapToPersonInfo } from "../../utils";

export class NavigateController implements ReactiveController {
  #host: PickerElement;

  constructor(host: PickerElement) {
    this.#host = host;
    this.#host.addController(this);
  }

  hostConnected(): void {
    this.#host.addEventListener('navigate-to-search', this.handleNavigateToSearch.bind(this) as EventListener);
    this.handleKeyDownSearchInput = this.handleKeyDownSearchInput.bind(this);
    this.handlePickerKeyDown = this.handlePickerKeyDown.bind(this);
  }

  hostDisconnected(): void {
    this.#host.removeEventListener('navigate-to-search', this.handleNavigateToSearch.bind(this) as EventListener);
    this.#host.removeController(this);
  }

  private handleNavigateToSearch(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.#host.searchElement?.focus();
  }

  handleKeyDownSearchInput(event: KeyboardEvent) {
    // add/remove first person from searchresults
    if (event.key === 'Enter') {
      const { value: people } = this.#host.tasks.suggest?.value ?? {};
      if (!people?.length) {
        return;
      }

      const firstPerson = people[0];
      if (this.#host.controllers.selected.selectedPeople.has(firstPerson.azureUniqueId)) {
        this.#host.controllers.selected.removePerson(firstPerson.azureUniqueId);
      } else {
        this.#host.controllers.selected.addPerson(mapToPersonInfo(firstPerson));
      }
    }

    if (event.key === 'ArrowDown') {
      // Important: Prevent page scrolling when focusing the list item
      event.preventDefault();
      this.#host.listElement?.controllers.navigate.focusItemAtIndex(0);
    }
  }

  handlePickerKeyDown(event: KeyboardEvent) {
    // delete pills when backspacing empty input and there are people to delete
    if (event.key === 'Backspace' && this.#host.viewMode === 'list' && !this.#host.search) {
      const { selectedPeople } = this.#host.controllers.selected;
      if (selectedPeople.size > 0) {
        const lastId = [...selectedPeople.keys()][selectedPeople.size - 1];
        this.#host.controllers.selected.removePerson(lastId);
      }
    }

    if (event.key === 'Escape') {
      this.#host.clearSearch();
    }
  }
}
