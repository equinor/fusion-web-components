import type { ReactiveController } from "lit";

import type { ListItemElement } from "./element";
import { NavigateListItemEvent } from "./events";

export class NavigateController implements ReactiveController {
  #host: ListItemElement;

  constructor(host: ListItemElement) {
    this.#host = host;
    this.#host.addController(this);
  }

  hostDisconnected(): void {
    this.#host.removeController(this);
  }

  /**
   * Navigate to the next or previous focusable item
   * @param direction - 1 for next, -1 for previous
   */
  navigateToAdjacentItem(direction: number): void {
    this.#host.dispatchEvent(new NavigateListItemEvent(direction, this.#host));
  }
}
