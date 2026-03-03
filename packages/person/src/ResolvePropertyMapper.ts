import { ReactiveController, ReactiveControllerHost } from 'lit';
import type { PersonDetails } from './types';

type PersonElement = ReactiveControllerHost & {
  azureId?: string;
  upn?: string;
  dataSource?: PersonDetails;
  resolveId?: string;
  resolveIds: string[];
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
    // set resolveIds based on the properties.
    this.#host.resolveIds = this.resolveIdsFromProperty();
  }

  resolveIdsFromProperty(): string[] {
    const { resolveIds } = this.#host;

    // Do not edit resolveIds if already set
    if (resolveIds.length > 0) {
      return resolveIds;
    }

    /**
     * The order of the following if's are important. do not edit.
     * order: dataSource -> resolveId -> azureId -> upn
     */
    if (this.#host.dataSource?.azureId && !this.#host.dataSource.avatarUrl) {
      return [this.#host.dataSource.azureId];
    }

    if (this.#host.resolveId) {
      return [this.#host.resolveId];
    }

    if (this.#host.azureId) {
      return [this.#host.azureId];
    }

    if (this.#host.upn) {
      return [this.#host.upn];
    }

    return resolveIds;
  }
}

export default ResolvePropertyMapper;
