import { LitElement } from 'lit';
import { property } from 'lit/decorators';
import { PersonController } from '../person-provider';

export type PersonElementProps = {
  azureId: string;
};

export class PersonElement extends LitElement implements PersonElementProps {
  @property({ type: String })
  azureId: string = '';
  controller = new PersonController(this);
}

export default PersonElement;
