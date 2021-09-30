import { LitElement } from 'lit';
import { property } from 'lit/decorators';
import { PersonController } from '../person-provider';

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
  controller: PersonController;

  constructor() {
    super();
    this.controller = new PersonController(this);
  }
}

export default PersonElement;
