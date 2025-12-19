import type { ReactiveController } from "lit";

import type { PickerElement } from "./element";

export class NavigateController implements ReactiveController {
  #host: PickerElement;

  constructor(host: PickerElement) {
    this.#host = host;
    this.#host.addController(this);
  }

  hostConnected(): void {
    this.#host.addEventListener('navigate-to-search', this.handleNavigateToSearch.bind(this) as EventListener);
  }

  hostDisconnected(): void {
    this.#host.removeEventListener('navigate-to-search', this.handleNavigateToSearch.bind(this) as EventListener);
    this.#host.removeController(this);
  }

  private handleNavigateToSearch(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.#host.searchElement?.focus();
  }
}
