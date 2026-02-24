import type { ReactiveController } from 'lit';

import type { PickerElement } from './element';
import { mapToPersonInfo } from '../../utils';

export class NavigateController implements ReactiveController {
  #host: PickerElement;

  constructor(host: PickerElement) {
    this.#host = host;
    this.#host.addController(this);
    this.handleKeyDownSearchInput = this.handleKeyDownSearchInput.bind(this);
    this.handleNavigateToSearch = this.handleNavigateToSearch.bind(this);
  }

  hostConnected(): void {
    this.#host.addEventListener('navigate-to-search', this.handleNavigateToSearch as EventListener);
  }

  hostDisconnected(): void {
    this.#host.removeEventListener('navigate-to-search', this.handleNavigateToSearch as EventListener);
    this.#host.removeController(this);
  }

  private handleNavigateToSearch(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.#host.searchElement?.focus();
  }

  handleKeyDownSearchInput(event: KeyboardEvent) {
    const { controllers, tasks, listElement, viewMode, search } = this.#host;
    // select/deselect first person from searchresults when pressing enter in search input
    if (event.key === 'Enter') {
      const { value: people } = tasks.suggest?.value ?? {};
      if (!people?.length) {
        return;
      }

      const firstPerson = people[0];
      if (controllers.selected.selectedPeople.has(firstPerson.azureUniqueId)) {
        controllers.selected.removePerson(firstPerson.azureUniqueId);
      } else {
        controllers.selected.addPerson(mapToPersonInfo(firstPerson));
      }
    }

    // navigate to list if pressing down arrow in search input
    if (event.key === 'ArrowDown') {
      // Important: Prevent page scrolling when focusing the list item
      event.preventDefault();
      listElement?.controllers.navigate.focusItemAtIndex(0);
    }

    // delete PeoplePills when backspacing empty input and there are people to delete
    if (event.key === 'Backspace' && viewMode === 'list' && !search) {
      const { selectedPeople } = controllers.selected;
      if (selectedPeople.size > 0) {
        const lastId = [...selectedPeople.keys()][selectedPeople.size - 1];
        controllers.selected.removePerson(lastId);
      }
    }

    // clear search input when pressing escape
    if (event.key === 'Escape') {
      this.#host.clearSearch();
    }
  }
}
