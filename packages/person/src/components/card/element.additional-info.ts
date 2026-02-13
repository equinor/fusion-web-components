import { type HTMLTemplateResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { fusionElement } from '@equinor/fusion-wc-core';
import { PersonDetailTask } from '../../tasks';
import { TaskStatus } from '@lit/task';

import {SkeletonElement} from '@equinor/fusion-wc-skeleton';
SkeletonElement;

import './element.manager';

@fusionElement('fwc-person-card-additional-info')

export class PersonCardAdditionalInfoElement extends LitElement {
  /** Azure unique id */
  @property()
  public azureId?: string;

  tasks = {
    details: new PersonDetailTask(this),
  }
 
  protected createRenderRoot(): HTMLElement {
    return this;
  }
 
  renderManager(): HTMLTemplateResult | undefined {
    const { value } = this.tasks.details;
    if (!value?.manager) {
      return;
    }

    return html`
      <div class="info-item">
        <div class="info-item_heading">Reports to</div>
        <fwc-person-card-manager .dataSource=${value.manager}></fwc-person-card-manager>
      </div>
    `;
  }
  
  renderProjects(): HTMLTemplateResult | undefined {
    const { value } = this.tasks.details;
    if (!value?.positions) {
      return;
    };

    const filterProjects = [...new Set(value.positions?.map((p) => p.project.name))];
    
    if (filterProjects.length === 0) {
      return;
    };
    
    return html`
      <div class="info-item">
        <div class="info-item_heading" title="Tasks the current person is allocated to">Tasks</div>
        <div class="person-card-projects__projects">
          ${filterProjects.map((p) => html`<div class="person-card-projects__project">${p}</div>`)}
        </div>
      </div>
    `;
  }
  
  renderPositions(): HTMLTemplateResult | undefined {
    const { value } = this.tasks.details;
    if (!value?.positions) {
      return;
    };

    const filterPositions = [...new Set(value.positions?.map((p) => p.name))];
    if (filterPositions.length === 0) {
      return;
    };
    
    return html`
      <div class="info-item">
        <div class="info-item_heading" title="Unique list of generic task positions the person is allocated to">
          Task positions
        </div>
        <div class="person-card-projects__projects">
          ${filterPositions.map((p) => html`<div class="person-card-projects__project">${p}</div>`)}
        </div>
      </div>
    `;
  }

  render(): HTMLTemplateResult {
    if (this.tasks.details.status === TaskStatus.PENDING) {
      return html`<fwc-skeleton></fwc-skeleton>`;
    }

    if (this.tasks.details.status === TaskStatus.ERROR) {
      console.warn(`Failed to load additional info for azureId: ${this.azureId}`);
      return html``;
    }

    // TODO make avatar have pending state!
    return html`<div id="root">
      ${this.renderManager()}
      ${this.renderProjects()}
      ${this.renderPositions()}
    </div>`;
  }
}
