import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { PersonInfo } from "@equinor/fusion-wc-person";
import { PersonAddedEvent, PersonRemovedEvent, SelectionChangedEvent } from "../events";
import type { PeopleProps } from "../types";

type SelectedControllerHost = ReactiveControllerHost & EventTarget & PeopleProps;
/**
 * Controller to manage the selected ids
 */
export class SelectedController implements ReactiveController {
  #host: SelectedControllerHost;
  #selectedPeople: Map<string, PersonInfo> = new Map();

  constructor(host: SelectedControllerHost) {
    this.#host = host;
    this.#host.addController(this);
  }

  hostDisconnected(): void {
    this.#host.removeController(this);
  }

  hostUpdated(): void {
    // update components value attribute with selectedIds joined by comma
    this.#host.value = this.selectedIds.join();
  }

  /**
   * Get the selected ids
   * @returns Array of id strings that are selected
   */
  get selectedIds(): string[] {
    return Array.from(this.#selectedPeople.keys());
  }

  /**
   * Get the selected people
   * @returns Map of selected people
   */
  get selectedPeople(): Map<string, PersonInfo> {
    return this.#selectedPeople;
  }

  /**
   * Get a person from the selected people
   * @param id String id to get the person from the selected people
   * @returns PersonInfo or undefined if not found
   */
  getPerson(id: string): PersonInfo | undefined {
    return this.#selectedPeople.get(id);
  }

  /**
   * Add a person to the selected people
   * @param person PersonInfo to add to the selected people
   * @param dispatchSelectionEvent Whether to dispatch the selection-changed event, default is true
   */
  addPerson(person: PersonInfo, dispatchSelectionEvent: boolean = true): void {
    if (this.#host.multiple) {
      if (!this.#selectedPeople.has(person.azureId)) {
        this.#selectedPeople.set(person.azureId, person);
        this.#host.dispatchEvent(new PersonAddedEvent(person));
      }
    } else {
      this.#selectedPeople.clear();
      if (!this.#selectedPeople.has(person.azureId)) {
        this.#selectedPeople.set(person.azureId, person);
        this.#host.dispatchEvent(new PersonAddedEvent(person));
      }
    }

    if (dispatchSelectionEvent) {
      this.#host.dispatchEvent(new SelectionChangedEvent(Array.from(this.#selectedPeople.values())));
    }

    this.#host.requestUpdate();
  }

  /**
   * Add multiple people to the selectedPeople Map.
   * @param people Array of PersonInfo to add to the selectedPeople Map
   */
  addPeople(people: PersonInfo[]): void {
    people.forEach((person) => {
      // do not dispatch the selection-changed event for each preselected person
      this.addPerson(person, false);
    });

    // dispatch the selection-changed event after all preselected people have been added
    this.#host.dispatchEvent(new SelectionChangedEvent(Array.from(this.#selectedPeople.values())));
  }

  /**
   * Remove a person from the selected people
   * @param id String id to remove the person from the selected people
   */
  removePerson(id: string): void {
    const person = this.#selectedPeople.get(id);
    if (!person) {
      return;
    }

    this.#selectedPeople.delete(id);

    this.#host.dispatchEvent(new PersonRemovedEvent(person));
    this.#host.dispatchEvent(new SelectionChangedEvent(Array.from(this.#selectedPeople.values())));

    this.#host.requestUpdate();
  }

  /**
   * Set the selected people without triggering any events
   * Mostly used for controlled component changes to people.
   * @param people Array of PersonInfo to set as selected people
   */
  setSelectedPeople(people: PersonInfo[]): void {
    this.#selectedPeople = new Map(people.map((person) => [person.azureId, person]));

    this.#host.requestUpdate();
  }

  /**
   * Sorts the selected people by the given column and direction
   * 
   * @param column string name of the column to sort by
   * @param direction 'asc' | 'desc'
   * @ps Does not trigger any events
   */
  sortColumn(column: string, direction: 'asc' | 'desc'): void {
    this.#selectedPeople = new Map([...this.#selectedPeople.entries()].toSorted((a, b) => {
      let sortingColumn = column;

      // map certain column names to PersonInfo properties
      if (column === 'email') {
        sortingColumn = 'mail';
      }
      if (column === 'type') {
        sortingColumn = 'accountType';
      }
      if (column === 'manager') {
        sortingColumn = 'managerAzureUniqueId';
      }

      const aValue = a[1][sortingColumn as keyof PersonInfo];
      const bValue = b[1][sortingColumn as keyof PersonInfo];

      if (aValue === bValue) {
        return 0;
      }

      if (aValue && bValue === undefined) {
        return direction === 'asc' ? 1 : -1;
      }

      if (bValue && aValue === undefined) {
        return direction === 'asc' ? -1 : 1;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return direction === 'asc' ? 1 : -1;
    }));

    this.#host.requestUpdate();
  }
}

export default SelectedController;
