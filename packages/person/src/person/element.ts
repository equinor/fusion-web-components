import { LitElement } from 'lit';
<<<<<<< HEAD
import { Task } from '@lit-labs/task';
import { property } from 'lit/decorators.js';
import { PersonPresence, PersonDetails } from '../types';
import { PersonHost } from '../person-provider';
import { PersonController } from '../person-provider';
=======
import { property } from 'lit/decorators';
import { PersonResolver, PersonPresence, PersonDetails, PersonPicture } from '../types';
import { PersonElementConnectEvent } from '../events';
>>>>>>> a2e18aa (fix: upgraded lit-element and lit-html to li 2.0.0)

export type PersonElementProps = {
  azureId: string;
};

/**
 * @property {string} azureId - Azure unique id for the person.
 *
 * @summary Base element for person elements implementing a reactive controller to resolve person data by 'azureId'.
 */
export class PersonElement extends LitElement implements PersonHost {
  /**
   * Text value to be rendered within the badge
   */
  @property({ type: String })
  azureId: string = '';

  protected controller: PersonController;

  details?: Task<[string], PersonDetails>;

  presence?: Task<[string], PersonPresence>;

  constructor() {
    super();
    this.controller = new PersonController(this);
  }
}

export default PersonElement;
