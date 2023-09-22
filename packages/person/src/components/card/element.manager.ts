import { type CSSResult, type HTMLTemplateResult, LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';

import { PersonPhotoTask } from '../../tasks';
import { PersonDetails, PersonItemSize } from 'person/src/types';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
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

  private tasks?: {
    photo: PersonPhotoTask;
  };

  @state()
  protected intersected = false;

  protected controllers = {
    observer: new IntersectionController(this, {
      callback: (e) => {
        if (!this.intersected) {
          this.intersected = !!e.find((x) => x.isIntersecting);
          if (this.intersected) {
            this.controllers.observer.unobserve(this);
            this.tasks = {
              photo: new PersonPhotoTask(this),
            };
          }
        }
      },
    }),
  };

  render(): HTMLTemplateResult {
    const { name, department } = this.dataSource ?? {};
    // TODO make avatar have pending state!
    return html` <div class="root">
      <span class="title">Reports to</span>
      <div class="content">
        <div class="avatar">
          ${this.tasks?.photo.render({
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
