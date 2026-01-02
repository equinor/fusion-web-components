import { type CSSResult, html, LitElement, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ContextProvider } from "@lit/context";

import { PersonResolveTask, type PersonInfo, PersonAvatarElement, PersonTableCellElement } from "@equinor/fusion-wc-person";
import { IconButtonElement } from '@equinor/fusion-wc-button';

import type { PeopleViewerElementProps } from "./types";
import { peopleViewerStyle } from "./element.css";

import { mapToPersonInfo, ucFirst } from "../../utils";
import { pickerContext } from "../../controllers/context";
import { PickerPersonRemovedEvent } from "../../events";

// register the webcomponents
import { default as ViewerPillElement } from './viewerPill';
ViewerPillElement;
PersonAvatarElement;
IconButtonElement;
PersonTableCellElement;

export class PeopleViewerElement extends LitElement implements PeopleViewerElementProps {
  static styles: CSSResult[] = [peopleViewerStyle];

  protected resolveTask = new PersonResolveTask(this);

  private _provider = new ContextProvider(this, {
    context: pickerContext,
  });

  /**
   * The custom data source of the person to display in the pill
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? JSON.parse(value) : []
  })
  people: PersonInfo[] = [];

  /**
   * The Azure IDs of the selected people.
   * should be a comma seperated string of Azure IDs.
   * The ids will be resolved on mount only.
   * 
   */
  @property({ type: Array, converter: (value: string | null) => value ? JSON.parse(value) : [] })
  resolveIds: string[] = [];

  /**
   * The view mode to display the people in the viewer
   */
  @property({ type: String, reflect: true })
  viewMode: 'list' | 'table' = 'list';

  /**
   * The property from PersonInfo to display as subtitle in the pill
   * Default is jobTitle
   */
  @property({ type: String })
  subTitle: keyof PersonInfo = 'jobTitle';

  /**
   * The property from PersonInfo to display as secondary subtitle in the pill
   * Default is department
   */
  @property({ type: String })
  secondarySubTitle: keyof PersonInfo = 'department';

  /**
   * The columns to display in the table view
   * Should be a comma seperated list of column names
   * Default is ['avatar', 'name', 'type', 'email', 'mobilePhone', 'jobTitle', 'department', 'manager', 'remove']
   */
  @property({ type: Array, converter: (value: string | null) => value ? JSON.parse(value) : [] })
  tableColumns: PeopleViewerElementProps['tableColumns'] = ['avatar', 'name', 'type', 'email', 'mobilePhone', 'jobTitle', 'department', 'manager', 'remove'];

  /**
   * Whether to show the view mode selector
   * Default is true
   */
  @property({ type: Boolean, converter: (value: string | null) => value === 'true' })
  showViewMode = true;

  // State to trigger task for resolving the people on mount
  @state()
  preselectedIds: string[] = [];

  connectedCallback() {
    super.connectedCallback();

    // if resolvedIds is set, convert it to preselectedIds to trigger task
    if (this.resolveIds.length) {
      this.preselectedIds = this.resolveIds;
    }
  }

  updated() {
    // add resolved people to the people array if they are not already in the array
    if (this.resolveTask.value?.length && this.people.length === 0) {
      this.people = this.resolveTask.value.filter(person => person.success).map(person => mapToPersonInfo(person.account!));
    }

    // update provider context
    this._provider.setValue({
      subTitle: this.subTitle,
      secondarySubTitle: this.secondarySubTitle,
    });
  }

  handleAzureIdRemoved(e: CustomEvent<string>) {
    const personRemoved = this.people.find(person => person.azureId === e.detail);
    if (personRemoved) {
      this.dispatchEvent(new PickerPersonRemovedEvent(personRemoved));
    }
  }

  renderPills(): TemplateResult[] | TemplateResult | undefined {
    if (this.people.length > 0) {
      return this.people.map(person => html`
        <fwc-people-viewer-pill
          .dataSource=${person}
          @azureid-removed=${this.handleAzureIdRemoved}
        >
        </fwc-people-viewer-pill>
      `);
    }
    return html`<p>No people provided</p>`;
  }

  renderTableColumns(): TemplateResult[] | undefined {
    return this.tableColumns?.map(column => html`<th class="${column}">${ucFirst(column)}</th>`);
  }

  renderTableRows(): TemplateResult[] {
    return this.people.map((person) => {
      return html`
        <tr>
          ${this.tableColumns?.map((column) => {
        if (column === 'avatar') {
          return html`<td class="avatar"><fwc-person-avatar .dataSource=${person} trigger="none" size="small" showLetter=${ifDefined(person.applicationId)} customColor=${person.avatarColor}></fwc-person-avatar></td>`;
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
          return html`<td class="remove"><fwc-icon-button @click=${() => this.handleAzureIdRemoved(new CustomEvent<string>('azureid-removed', { detail: person.azureId }))} icon="close" size="x-small" rounded title="Remove person"></fwc-icon-button></td>`;
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
        <p>Viewing ${this.people.length} people</p>
        <fwc-icon-button @click=${() => this.viewMode = 'list'} color=${this.viewMode === 'list' ? 'success' : 'primary'} icon="list" size="x-small" rounded title="List view"></fwc-icon-button>
        <fwc-icon-button @click=${() => this.viewMode = 'table'} color=${this.viewMode === 'table' ? 'success' : 'primary'} icon="view_week" size="x-small" rounded title="Table view"></fwc-icon-button>
      </div>
    `;
  }

  render(): TemplateResult {
    return html`
      <div id="root">
        ${this.renderViewMode()}
        ${this.renderContentMode()}
      </div>
    `;
  }
}

export default PeopleViewerElement;
