import type { ReactiveController, ReactiveControllerHost } from 'lit';

type Host = ReactiveControllerHost & HTMLElement & { close: () => void };
export class ClickOutsideController implements ReactiveController {
  #host: Host;

  constructor(host: Host) {
    this.#host = host;
    this.#host.addController(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  hostDisconnected(): void {
    this.removeClickOutsideListener();
    this.#host.removeController(this);
  }

  addClickOutsideListener(): void {
    window.addEventListener('click', this.handleClickOutside);
    window.addEventListener('keyup', this.handleKeyup);
  }

  removeClickOutsideListener(): void {
    window.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener('keyup', this.handleKeyup);
  }

  private handleClickOutside(event: MouseEvent): void {
    const path = event.composedPath();
    if (path.includes(this.#host)) {
      return;
    }

    // host should have an close method
    if ('close' in this.#host) {
      this.#host.close();
    }

    this.removeClickOutsideListener();
  }

  private handleKeyup(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if ('close' in this.#host) {
        this.#host.close();
      }
      this.removeClickOutsideListener();
    }
  }

}
