import { LitElement } from 'lit';
import { Task } from '@lit-labs/task';
import { property } from 'lit/decorators.js';
import { PersonElementProps } from './types';
import { PersonPresence, PersonDetails } from '../types';
import { PersonHost } from '../person-provider';
import { PersonController } from '../person-provider';

/**
 * @property {string} azureId - Azure unique id for the person.
 *
 * @summary Base element for person elements implementing a reactive controller to resolve person data by 'azureId'.
 */
export class PersonElement extends LitElement implements PersonHost, PersonElementProps {
  /**
   * Unique Azure ID
   */
  @property({ type: String })
  azureId = '';

  protected controller: PersonController;

  details?: Task<[string], PersonDetails>;

  presence?: Task<[string], PersonPresence>;

  constructor() {
    super();
    this.controller = new PersonController(this);
  }
}

export default PersonElement;
