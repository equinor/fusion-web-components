import { html, LitElement, type TemplateResult, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { ContextProvider } from "@lit/context";

import { PersonResolveTask, PersonSuggestTask, type PersonInfo } from "@equinor/fusion-wc-person";

import { pickerContext } from "./controllers/context";
import SelectedController from "./controllers/SelectedController";
import ResolvedController from "./controllers/ResolvedController";
import { PeopleProps, TableColumns } from "./types";
import { NavigateController } from "./components/picker/NavigateController";
import { ClickOutsideController } from "./controllers/ClickOutsideController";
import { ucFirst } from "./utils";

import { TableViewModeElement, defaultColumns, type TableViewModeChangeEvent } from "./components/table-view-mode";
TableViewModeElement;

/**
 * Base element class for all public people components.
 * All public people components that share the same PeopleProps and controller logic should extend this class.
 */
export abstract class PeopleBaseElement extends LitElement implements PeopleProps {
  tasks: {
    resolve: PersonResolveTask;
    suggest?: PersonSuggestTask;
  } = {
      resolve: new PersonResolveTask(this),
    };

  controllers: {
    selected: SelectedController;
    resolved: ResolvedController;
    navigate?: NavigateController;
    clickOutside?: ClickOutsideController;
  } = {
      selected: new SelectedController(this),
      resolved: new ResolvedController(this),
    };

  protected _provider = new ContextProvider(this, {
    context: pickerContext,
  });

  /**
   * The value of the element
   * A comma seperated string of Azure IDs of the people selected
   */
  @property({ type: String, reflect: true })
  value: string = '';

  /**
   * Whether the element should allow multiple selections.
   * Default is true.
   */
  @property()
  multiple: boolean = true;

  /**
   * The PersonInfo objects to display as selected people.
   * Should be a JSON string of PersonInfo objects.
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? JSON.parse(value) : []
  })
  people: PersonInfo[] = [];

  /**
   * The Azure IDs of the people to resolve and add to selected people.
   * Should be a comma seperated string of Azure IDs.
   * @ps The ids will be resolved on mount only.
   */
  @property({
    type: Array,
    converter: (value: string | null) => {
      if (!value) {
        return [];
      }
      return value.split(',').map(id => id.trim());
    }
  })
  resolveIds: string[] = [];

  @state()
  initalresolved: boolean = false;

  /**
   * The property from PersonInfo to display as subtitle in the pill
   * Default is jobTitle
   */
  @property({ type: String })
  subtitle: keyof PersonInfo = 'jobTitle';

  /**
   * The property from PersonInfo to display as secondary subtitle in the pill
   * Default is department
   */
  @property({ type: String })
  secondarySubtitle: keyof PersonInfo = 'department';

  /**
   * The errors to display in the component
   * Should be an array of strings.
   */
  @state()
  errors: string[] = [];

  /**
   * The view mode to display the people in the viewer
   */
  @property({ type: String, reflect: true })
  viewMode: 'list' | 'table' = 'list';

  /**
   * The columns to display in the table view
   * Should be a comma seperated list of column names
   * Default is ['avatar', 'name', 'azureId', 'type', 'email', 'mobilePhone', 'jobTitle', 'department', 'remove']
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? value.split(',').map(column => column.trim()) : []
  })
  tableColumns: TableColumns = defaultColumns;

  /**
   * Whether to show the view mode selector
   * Default is true
   */
  @property({ type: Boolean, converter: (value: string | null) => value === 'true' })
  showViewMode = true;

  /**
   * Whether the people are editable (can be removed)
   * Default is true
   */
  @property({ type: Boolean })
  editable: boolean = true;

  @state()
  viewSettingsOpen: boolean = false;

  updated(changes: PropertyValues) {
    // when updating the people property, set the selected people to the new people
    if (changes.has('people')) {
      this.controllers.selected.setSelectedPeople(this.people);
    }

    // when updating the editable property, hide/show the remove column in table view
    if (changes.has('editable') && this.editable === false) {
      this.hideColumnm('remove');
    }

    // update provider context
    this._provider.setValue({
      subtitle: this.subtitle,
      secondarySubtitle: this.secondarySubtitle,
      editable: this.editable,
      selected: this.controllers.selected,
      viewMode: this.viewMode,
      tableColumns: this.tableColumns,
    });
  }
  
  hideColumnm(column: string) {
    this.tableColumns = this.tableColumns?.filter(col => col !== column);
  }
  
  renderTableColumns(): TemplateResult[] | undefined {
    const noSortColumns = ['avatar', 'remove'];
    return this.tableColumns?.map(column => html`
      <th class="${column}">
        ${ucFirst(column)}
        <div class="column-actions">
          ${noSortColumns.includes(column) ? html`` : html`
            <div class="table-column-sort">
              <fwc-icon title="Sort Asc" icon="arrow_drop_up" size="x-small" @click=${() => this.controllers.selected.sortColumn(column, 'asc')}></fwc-icon>
              <fwc-icon title="Sort Desc" icon="arrow_drop_down" size="x-small" @click=${() => this.controllers.selected.sortColumn(column, 'desc')}></fwc-icon>
            </div>
          `}
          <div class="table-column-delete">
            <fwc-icon title="${`Hide ${column} column from view`}" icon="blocked" size="x-small" @click=${() => this.hideColumnm(column)}></fwc-icon>
          </div>
        </div>
      </th>
    `);
  }
  
  renderTableRows() {
    return repeat(
      [...this.controllers.selected.selectedPeople.values()],
      (person) => person.azureId,
      (person) => {
        return html`
          <tr>
            ${this.tableColumns?.map((column) => {
              switch (column) {
                case 'avatar':
                  return html`<td class="avatar"><fwc-people-avatar .dataSource=${person} disabled></fwc-people-avatar></td>`;
                case 'name':
                  return html`<td class="name">${person.name ?? person.applicationName ?? 'Unknown'}</td>`;
                case 'type':
                  return html`<td class="type">${person.applicationId ? 'Application' : person.accountType}</td>`;
                case 'email':
                  return html`<td class="email">${person.upn}</td>`;
                case 'jobTitle':
                  return html`<td class="jobTitle">${person.jobTitle === person.azureId ? '' : person.jobTitle}</td>`;
                case 'manager':
                  return html`<td class="manager">${person.managerAzureUniqueId && html`<fwc-person-table-cell size="small" .azureId=${person.managerAzureUniqueId} .subHeading=${(person: PersonInfo) => person.upn}></fwc-person-table-cell>`}</td>`;
                case 'remove':
                  return html`<td class="remove"><fwc-icon-button @click=${() => this.controllers.selected.removePerson(person.azureId)} icon="close" size="x-small" rounded title="Remove person"></fwc-icon-button></td>`;
                default:
                  return html`<td class="${column}">${person[column]}</td>`;
              }
            })}
          </tr>
        `;
      });
  }

  renderViewMode(): TemplateResult {
    if (!this.showViewMode) {
      return html``;
    }
    
    const handler = (e: TableViewModeChangeEvent) => {
      const { detail } = e;
      if (detail.viewMode) {
        this.viewMode = detail.viewMode;
      }
      if (detail.tableColumns) {
        this.tableColumns = detail.tableColumns;
      }
      if (detail.subtitle) {
        this.subtitle = detail.subtitle;
      }
    }
    
    return html`
      <fwc-people-table-view-mode @table-view-change=${handler}></fwc-people-table-view-mode>
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
}

export default PeopleBaseElement;
