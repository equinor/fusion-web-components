import { type CSSResult, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { type PersonInfo, PersonTableCellElement } from "@equinor/fusion-wc-person";
import { IconButtonElement } from '@equinor/fusion-wc-button';
import { ChipElement } from "@equinor/fusion-wc-chip";

import { peopleViewerStyle } from "./element.css";
import { PeopleViewerElementProps } from "./types";

import { ucFirst } from "../../utils";
import { PeopleBaseElement } from "../../PeopleBaseElement";

// register the webcomponents
import { PeopleAvatarElement } from '../avatar';
import { PillElement } from '../pill';
ChipElement;
PillElement;
PeopleAvatarElement;
IconButtonElement;
PersonTableCellElement;

export class PeopleViewerElement extends PeopleBaseElement implements PeopleViewerElementProps {
  static styles: CSSResult[] = [peopleViewerStyle];

  /**
   * The view mode to display the people in the viewer
   */
  @property({ type: String, reflect: true })
  viewMode: 'list' | 'table' = 'list';

  /**
   * The columns to display in the table view
   * Should be a comma seperated list of column names
   * Default is ['avatar', 'name', 'type', 'email', 'mobilePhone', 'jobTitle', 'department', 'manager', 'remove']
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? value.split(',').map(column => column.trim()) : []
  })
  tableColumns: Array<'avatar' | 'name' | 'type' | 'email' | 'mobilePhone' | 'jobTitle' | 'department' | 'manager' | 'remove'> = ['avatar', 'name', 'type', 'email', 'mobilePhone', 'jobTitle', 'department', 'manager', 'remove'];

  /**
   * Whether to show the view mode selector
   * Default is true
   */
  @property({ type: Boolean, converter: (value: string | null) => value === 'true' })
  showViewMode = true;

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

  renderTableColumns(): TemplateResult[] | undefined {
    return this.tableColumns?.map(column => html`<th class="${column}">${ucFirst(column)}</th>`);
  }

  renderTableRows() {
    return repeat(
      [...this.controllers.selected.selectedPeople.values()],
      (person) => person.azureId,
      (person) => {
        return html`
          <tr>
            ${this.tableColumns?.map((column) => {
          if (column === 'avatar') {
            return html`<td class="avatar"><fwc-people-avatar .dataSource=${person} disabled></fwc-people-avatar></td>`;
          }
          if (column === 'name') {
            return html`<td class="name">${person.name ?? person.applicationName ?? 'Unknown'}</td>`;
          }
          if (column === 'type') {
            return html`<td class="type">${person.applicationId ? 'Application' : person.accountType}</td>`;
          }
          if (column === 'email') {
            return html`<td class="email">${person.upn}</td>`;
          }
          if (column === 'manager') {
            return html`<td class="manager">${person.managerAzureUniqueId && html`<fwc-person-table-cell size="small" .azureId=${person.managerAzureUniqueId} .subHeading=${(person: PersonInfo) => person.upn}></fwc-person-table-cell>`}</td>`;
          }
          if (column === 'remove') {
            return html`<td class="remove"><fwc-icon-button @click=${() => this.controllers.selected.removePerson(person.azureId)} icon="close" size="x-small" rounded title="Remove person"></fwc-icon-button></td>`;
          }

          return html`<td class="${column}">${person[column]}</td>`
        })}
          </tr>
        `;
      });
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

  renderViewMode(): TemplateResult {
    if (!this.showViewMode) {
      return html``;
    }

    return html`
      <div id="view-mode">
        <p>Viewing ${this.controllers.selected.selectedPeople.size} people</p>
        <fwc-icon-button @click=${() => this.viewMode = 'list'} color=${this.viewMode === 'list' ? 'success' : 'primary'} icon="list" size="x-small" rounded title="List view"></fwc-icon-button>
        <fwc-icon-button @click=${() => this.viewMode = 'table'} color=${this.viewMode === 'table' ? 'success' : 'primary'} icon="view_week" size="x-small" rounded title="Table view"></fwc-icon-button>
      </div>
    `;
  }

  renderErrors(): TemplateResult {
    if (this.errors.length === 0) {
      return html``;
    }

    const removeError = (error: string) => {
      this.errors = this.errors.filter((e) => e !== error);
    };

    return html`<div id="errors">${repeat(this.errors, (error: string) => error, (error: string) => html`<fwc-chip value="${error}" size="small" variant="outlined" color="danger" removable @remove=${() => removeError(error)}></fwc-chip>`)}</div>`;
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
