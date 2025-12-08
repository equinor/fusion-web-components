import { ReactiveController } from "lit";
import { PersonInfo } from "packages/person/lib/types";
import { PeoplePickerElement } from "../components/picker/element";

/**
 * Controller to manage the selected ids
 */
export class SelectedController implements ReactiveController {
  #host: PeoplePickerElement;
  #selectedPeople: Map<string, PersonInfo> = new Map();

  constructor(host: PeoplePickerElement) {
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
   */
  addPerson(person: PersonInfo): void {
    if (this.#host.multiple) {
      this.#selectedPeople.set(person.azureId, person);
    } else {
      this.#selectedPeople.clear();
      this.#selectedPeople.set(person.azureId, person);
    }

    this.#host.requestUpdate();
  }

  /**
   * Remove a person from the selected people
   * @param id String id to remove the person from the selected people
   */
  removePerson(id: string): void {
    this.#selectedPeople.delete(id);
    this.#host.requestUpdate();
  }
}

export default SelectedController;
