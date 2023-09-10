import { CSSResult, LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

import { PersonPhotoTask } from '../../tasks';
import { PersonDetails, PersonItemSize } from 'person/src/types';
// import { tag } from './index';
import { fusionElement } from '@equinor/fusion-wc-core';

import { style } from './element.manager.css';

@fusionElement('fwc-person-card-manager')
export class PersonCardManagerElement extends LitElement {
  static styles: CSSResult[] = [style];
  /** Azure unique id */
  @property({ type: String })
  public azureId?: string;

  @property({ type: String })
  public dataSource?: PersonDetails['manager'];

  /** Size of the component */
  @property({ type: String, reflect: true })
  size: PersonItemSize = 'medium';

  private tasks = {
    // details: PersonDetailTask;
    photo: new PersonPhotoTask(this),
  };

  render() {
    const { name, department } = this.dataSource ?? {};
    // TODO make avatar have pending state!
    return html` <div class="root">
      <span class="title">Reports to</span>
      <div class="content">
        <div class="avatar">
          ${this.tasks.photo.render({
            complete: (src) => html`<fwc-avatar .src=${src}></fwc-avatar>`,
            pending: () => html`<fwc-avatar .value=${name}></fwc-avatar>`,
          })}
        </div>
        <section>
          ${name && html`<header title="${name}" class="name">${name}</header>`}
          ${department && html`<span class="department">${department}</span>`}
        </section>
      </div>
    </div>`;
  }
}
