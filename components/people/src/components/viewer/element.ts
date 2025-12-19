import { type CSSResult, html, LitElement, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ContextProvider } from "@lit/context";

import { PersonResolveTask, type PersonInfo, PersonAvatarElement, PersonTableCellElement } from "@equinor/fusion-wc-person";
import { IconButtonElement } from '@equinor/fusion-wc-button';

import type { PeopleViewerElementProps } from "./types";
import { peopleViewerStyle } from "./element.css";

import { mapToPersonInfo } from "../../utils";
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

  // State to trigger task for resolving the people on mount
  @state()
  preselectedIds: string[] = [];

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
              <th>Avatar</th>
              <th>Name</th>
              <th>Type</th>
              <th>Email</th>
              <th>Mobile Phone</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Manager</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            ${this.people.map(person => html`
              <tr>
                <td><fwc-person-avatar .dataSource=${person} size="small" showLetter=${ifDefined(person.applicationId)} customColor=${person.avatarColor}></fwc-person-avatar></td>
                <td>${person.name ?? person.applicationName ?? 'Unknown'}</td>
                <td>${person.applicationId ? 'Application' : person.accountType}</td>
                <td>${person.upn}</td>
                <td>${person.mobilePhone}</td>
                <td>${person.jobTitle}</td>
                <td>${person.department}</td>
                <td>${person.managerAzureUniqueId && html`<fwc-person-table-cell size="small" .azureId=${person.managerAzureUniqueId} .subHeading=${(person: PersonInfo) => person.upn}></fwc-person-table-cell>`}</td>
                <td><fwc-icon-button @click=${() => this.handleAzureIdRemoved(new CustomEvent<string>('azureid-removed', { detail: person.azureId }))} icon="close" size="x-small" title="Remove person"></fwc-icon-button></td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  render() {
    return html`
      <div id="root">
        <div id="view-mode">
          <p>Viewing ${this.people.length} people</p>
          <fwc-icon-button @click=${() => this.viewMode = 'list'} color=${this.viewMode === 'list' ? 'success' : 'primary'} icon="list" size="x-small" title="List view"></fwc-icon-button>
          <fwc-icon-button @click=${() => this.viewMode = 'table'} color=${this.viewMode === 'table' ? 'success' : 'primary'} icon="view_module" size="x-small" title="Table view"></fwc-icon-button>
        </div>
        ${this.renderContentMode()}
      </div>
    `;
  }

}

export default PeopleViewerElement;
