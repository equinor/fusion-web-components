import type { ReactiveController, ReactiveControllerHost } from "lit";

type Host = ReactiveControllerHost & HTMLElement & { close: () => void };
export class ClickOutsideController implements ReactiveController {
  #host: Host;

  constructor(host: Host) {
    this.#host = host;
    this.#host.addController(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  hostDisconnected(): void {
    this.removeClickOutsideListener();
    this.#host.removeController(this);
  }

  addClickOutsideListener(): void {
    window.addEventListener('click', this.handleClickOutside);
  }

  removeClickOutsideListener(): void {
    window.removeEventListener('click', this.handleClickOutside);
  }

  private handleClickOutside(event: MouseEvent): void {
    if (event.target instanceof HTMLElement && this.#host.contains(event.target)) {
      return;
    }

    // host should have an close method
    if ('close' in this.#host) {
      this.#host.close();
    }

    this.removeClickOutsideListener();
  }
}
