import { ReactiveController, ReactiveControllerHost } from 'lit';
import type { PersonDetails } from './types';

type PersonElement = ReactiveControllerHost & {
  azureId?: string;
  upn?: string;
  dataSource?: PersonDetails;
  resolveIds?: string[];
};

/**
 * Reactive controller that maps changes in azureId, upn or dataSource properties to resolveIds.
 * which is used to trigger the person details resolution in the PersonElements to the resolve endpoint.
 */
export class ResolvePropertyMapper implements ReactiveController {
  #host: PersonElement;

  constructor(host: PersonElement) {
    this.#host = host;
    this.#host.addController(this);
  }

  hostDisconnected(): void {
    this.#host.removeController(this);
  }

  hostUpdated(): void {
    if (this.#host.azureId) {
      this.#host.resolveIds = [this.#host.azureId];
      this.#host.azureId = undefined;
    }

    if (this.#host.upn) {
      this.#host.resolveIds = [this.#host.upn];
      this.#host.upn = undefined;
    }

    if (this.#host.dataSource && !this.#host.dataSource.avatarUrl) {
      this.#host.resolveIds = [this.#host.dataSource.azureId];
      this.#host.dataSource = undefined;
    }
  }
}

export default ResolvePropertyMapper;
