import { ReactiveController, ReactiveControllerHost } from 'lit';
import type { PersonDetails } from './types';

type PersonElement = ReactiveControllerHost & {
  azureId?: string;
  upn?: string;
  dataSource?: PersonDetails;
  resolveId?: string;
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
    this.#host.resolveIds = this.resolveIdsFromProperty();

    // Clear the old properties to avoid reresolving.
    this.#host.dataSource = undefined;
    this.#host.resolveId = undefined;
    this.#host.azureId = undefined;
    this.#host.upn = undefined;
  }

  resolveIdsFromProperty(): string[] | undefined {
    const resolveIds = this.#host.resolveIds;

    if (resolveIds && resolveIds.length > 0) {
      // resolveIds is already set, do not override it.
      return resolveIds;
    }

    // 1. dataSource
    if (this.#host.dataSource?.azureId && !this.#host.dataSource.avatarUrl) {
      return [this.#host.dataSource.azureId];
    }
    
    // 2. resolveId
    if (this.#host.resolveId) {
      return [this.#host.resolveId];
    }

    // 3. azureId
    if (this.#host.azureId) {
      return [this.#host.azureId];
    }
    
    // 4. upn
    if (this.#host.upn) {
      return [this.#host.upn];
    }

    return resolveIds;
  }
}

export default ResolvePropertyMapper;
