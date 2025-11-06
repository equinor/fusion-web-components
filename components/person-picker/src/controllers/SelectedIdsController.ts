import { ReactiveController, ReactiveControllerHost } from "lit";

/**
 * Controller to manage the selected ids
 */
export class SelectedIdsController implements ReactiveController {
  #host: ReactiveControllerHost;
  #selectedIds: Set<string> = new Set();

  constructor(host: ReactiveControllerHost) {
    this.#host = host;
    this.#host.addController(this);
  }

  // needed to comply with the ReactiveController interface
  hostConnected(): void { }

  /**
   * Set the selected ids
   * @param ids Array of id strings to set as selected
   */
  set selectedIds(ids: string[]) {
    this.#selectedIds = new Set(ids);
    this.#host.requestUpdate();
  }

  /**
   * Get the selected ids
   * @returns Array of id strings that are selected
   */
  get selectedIds(): string[] {
    return Array.from(this.#selectedIds);
  }

  /**
   * Add an id to the selected ids
   * @param id String id to add to the selected ids
   */
  add(id: string): void {
    this.#selectedIds.add(id);
    this.#host.requestUpdate();
  }

  /**
   * Remove an id from the selected ids
   * @param id String id to remove from the selected ids
   */
  remove(id: string): void {
    this.#selectedIds.delete(id);
    this.#host.requestUpdate();
  }
}
