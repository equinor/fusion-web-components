import { ReactiveController } from "lit";
import { PersonInfo } from "packages/person/lib/types";
import { PickerElement } from "../components/picker/element";
import { PickerPersonAddedEvent, PickerPersonRemovedEvent, PickerSelectionChangedEvent } from "../events";

/**
 * Controller to manage the selected ids
 */
export class SelectedController implements ReactiveController {
  #host: PickerElement;
  #selectedPeople: Map<string, PersonInfo> = new Map();

  constructor(host: PickerElement) {
    this.#host = host;
    this.#host.addController(this);
  }

  // needed to comply with the ReactiveController interface
  hostConnected(): void { }

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
  addPerson(person: PersonInfo, dispatchSelectionEvent = true): void {
    if (this.#host.multiple) {
      this.#selectedPeople.set(person.azureId, person);
    } else {
      this.#selectedPeople.clear();
      this.#selectedPeople.set(person.azureId, person);
    }

    if (dispatchSelectionEvent) {
      this.#host.dispatchEvent(new PickerSelectionChangedEvent(Array.from(this.#selectedPeople.values())));
    }

    this.#host.dispatchEvent(new PickerPersonAddedEvent(person));
    this.#host.requestUpdate();
  }

  /**
   * Add multiple people to the selectedPeople Map
   * @param people Array of PersonInfo to add to the selectedPeople Map
   */
  addPeople(people: PersonInfo[]): void {
    people.forEach((person) => {
      this.addPerson(person, false);
    });

    this.#host.dispatchEvent(new PickerSelectionChangedEvent(Array.from(this.#selectedPeople.values())));
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

    this.#host.dispatchEvent(new PickerPersonRemovedEvent(person));
    this.#host.dispatchEvent(new PickerSelectionChangedEvent(Array.from(this.#selectedPeople.values())));

    this.#host.requestUpdate();
  }
}

export default SelectedController;
