import { type CSSResult, html, type TemplateResult } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { property } from "lit/decorators.js";

import { peopleViewerStyle } from "./element.css";
import { PeopleViewerElementProps } from "./types";

import { PeopleBaseElement } from "../../PeopleBaseElement";
import { peopleBaseStyle } from "../../PeopleBaseElementStyles";

// register the webcomponents
import { PillElement } from '../pill';
PillElement;

export class PeopleViewerElement extends PeopleBaseElement implements PeopleViewerElementProps {
  static styles: CSSResult[] = [peopleBaseStyle, peopleViewerStyle];

  /**
   * Whether the people are editable (can be removed)
   * Default is false
   */
  @property({ type: Boolean })
  editable: boolean = false;

  removePerson(azureId: string) {
    this.controllers.selected.removePerson(azureId);
  }

  renderPills() {
    if (this.controllers.selected.selectedPeople.size > 0) {
      return repeat(this.controllers.selected.selectedPeople.values(), (person) => person.azureId, (person) => html`
        <fwc-people-pill .dataSource=${person}></fwc-people-pill>
      `);
    }

    return html`<p>No people provided</p>`;
  }

  renderContentMode(): TemplateResult {
    if (this.viewMode === 'list') {
      return html`
        <div id="pills">
          ${this.renderPills()}
        </div>
      `;
    }
    return html`<div id="table">
        <table>
          <thead>
            <tr>
              ${this.renderTableColumns()}
            </tr>
          </thead>
          <tbody>
            ${this.renderTableRows()}
          </tbody>
        </table>
      </div>
    `;
  }

  render(): TemplateResult {
    return html`
      <div id="root">
        ${this.renderViewMode()}
        ${this.renderContentMode()}
        ${this.renderErrors()}
      </div>
    `;
  }
}

export default PeopleViewerElement;
