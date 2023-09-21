import { LitElement } from 'lit';
import { PersonResolver } from '.';

import { PersonResolverHost } from './types';
import { PersonResolverController } from './controller';

// TODO add styling to display: contents
export class PersonProviderElement extends LitElement implements PersonResolverHost {
  resolver?: PersonResolver = undefined;

  constructor() {
    super();
    new PersonResolverController(this);
  }

  createRenderRoot(): LitElement {
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.style.display = 'contents';
  }
}

export default PersonProviderElement;
