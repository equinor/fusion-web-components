import { LitElement, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';

import { PersonResolveTask } from '../../tasks';
import type { PersonBaseElementProps } from './types';
import type { PersonInfo } from '../../types';

/**
 * Base element for shared properties between person components
 */
export abstract class PersonBaseElement extends LitElement implements PersonBaseElementProps {
  /**
   * Unique person AzureId
   * @deprecated use resolveId instead.
   */
  @property({ type: String })
  public azureId?: string;

  /**
   * Unique person User Principal Name
   * @deprecated use resolveId instead.
   */
  @property({ type: String })
  public upn?: string;

  /**
   * Unique id used to resolve person details.
   * Can be azureId or upn.
   * Using this property will take precedence over azureId and upn.
   */
  @property({ type: String })
  resolveId?: string;

  /**
   * Person details data source. If provided, it will be used to render the component without resolving the details.
   * If the dataSource does not contain an avatarUrl, the component will attempt to resolve the details.
   */
  @property({ type: Object })
  public dataSource?: PersonInfo;

  /** State used to trigger resolve task */
  @state()
  resolveIds: string[] = [];

  /**
   * Is the element in viewport
   */
  @state()
  protected intersected = false;

  /**
   * taks for rendering content from people api
   */
  tasks?: {
    resolve: PersonResolveTask;
  };

  controllers = {
    observer: new IntersectionController(this, {
      callback: (e) => {
        if (!this.intersected) {
          this.intersected = !!e.find((x) => x.isIntersecting);
          if (this.intersected) {
            this.controllers.observer.unobserve(this);
            this.tasks = {
              resolve: new PersonResolveTask(this),
            };
          }
        }
      },
    }),
  };

  /** Map properties to resolveIds */
  updated(changes: PropertyValues): void {
    if (
      changes.has('dataSource') ||
      changes.has('resolveId') ||
      changes.has('azureId') ||
      changes.has('upn')
    ) {
      if (this.dataSource?.azureId && !this.dataSource.avatarUrl) {
        this.resolveIds = [this.dataSource.azureId];
      } else if (this.resolveId) {
        this.resolveIds = [this.resolveId];
      } else if (this.azureId) {
        this.resolveIds = [this.azureId];
      } else if (this.upn) {
        this.resolveIds = [this.upn];
      } else {
        this.resolveIds = [];
      }
    }
  }
}

export default PersonBaseElement;
