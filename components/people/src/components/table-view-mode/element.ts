import { LitElement, PropertyValues, html, type CSSResult, type TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { ContextConsumer } from '@lit/context';

import { pickerContext } from "../../controllers/context";
import type { PeopleProps, TableColumns } from "../../types";
import { tableViewStyles } from "./element.css";
import { ClickOutsideController } from "../../controllers/ClickOutsideController";

const fullColumns: TableColumns = ['avatar', 'name', 'azureId', 'type', 'email', 'mobilePhone', 'jobTitle', 'department', 'manager', 'remove'];
export const defaultColumns: TableColumns = ['avatar', 'name', 'azureId', 'type', 'email', 'mobilePhone', 'jobTitle', 'department', 'remove'];
const simpleColumns: TableColumns = ['avatar', 'name', 'email', 'mobilePhone', 'jobTitle', 'department', 'remove'];

type EventDetails = {
  viewMode?: PeopleProps['viewMode'];
  tableColumns?: TableColumns;
  subtitle?: PeopleProps['subtitle'];
};
export class TableViewModeChangeEvent extends CustomEvent<EventDetails> {
  static readonly eventName = 'table-view-change';
  constructor(detail: EventDetails) {
    super(TableViewModeChangeEvent.eventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

/**
 * Base element class for all public people components.
 * All public people components that share the same PeopleProps and controller logic should extend this class.
 */
export class TableViewModeElement extends LitElement {
  static styles: CSSResult[] = [tableViewStyles];
  private _context = new ContextConsumer(this, { context: pickerContext, subscribe: true });
  
  private _clickOutside = new ClickOutsideController(this)

  @state()
  viewSettingsOpen: boolean = false;
  
  close() {
    this.viewSettingsOpen = false;
  }
  
  updated(changes: PropertyValues) {
    if (changes.has('viewSettingsOpen') && this.viewSettingsOpen) {
      console.log('View settings opened, adding click outside listener');
      this._clickOutside.addClickOutsideListener();
    }
  }
  
  protected dispatchViewModeChange(detail: EventDetails): void {
    this.dispatchEvent(new TableViewModeChangeEvent(detail));
  }

  handleKeyup = (event: KeyboardEvent) => {
    console.log('handleKeyup', event);
    if (event.key === 'Escape') {
      this.close();
    }
  }

  handleClickOutside = (event: MouseEvent) => {
    console.log('handleClickOutside', event);
    // Use composedPath to check if the click is inside the component (works with Shadow DOM)
    const path = event.composedPath();
    if (path.includes(this)) {
      return;
    }
    
    this.close();
  }

  protected renderSettings(): TemplateResult {
    if (this._context.value?.viewMode === 'list') {
      return html`
        <p>Select Subtitle field</p>
        <div class="view-settings-options">
          <label>
            <input type="radio" name="subtitle" value="jobTitle" ?checked=${this._context.value?.subtitle === 'jobTitle'} @change=${() => this.dispatchViewModeChange({ subtitle: 'jobTitle' })}>
            <p>JobTitle</p>
          </label>
          <label>
            <input type="radio" name="subtitle" value="department" ?checked=${this._context.value?.subtitle === 'department'} @change=${() => this.dispatchViewModeChange({ subtitle: 'department' })}>
            <p>Department</p>
          </label>
          <label>
            <input type="radio" name="subtitle" value="email" ?checked=${this._context.value?.subtitle === 'mail'} @change=${() => this.dispatchViewModeChange({ subtitle: 'mail' })}>
            <p>Email</p>
          </label>
          <label>
            <input type="radio" name="subtitle" value="mobilePhone" ?checked=${this._context.value?.subtitle === 'mobilePhone'} @change=${() => this.dispatchViewModeChange({ subtitle: 'mobilePhone' })}>
            <p>MobilePhone</p>
          </label>
          <label>
            <input type="radio" name="subtitle" value="accountType" ?checked=${this._context.value?.subtitle === 'accountType'} @change=${() => this.dispatchViewModeChange({ subtitle: 'accountType' })}>
            <p>AccountType</p>
          </label>
          <label>
            <input type="radio" name="subtitle" value="employeeNumber" ?checked=${this._context.value?.subtitle === 'employeeNumber'} @change=${() => this.dispatchViewModeChange({ subtitle: 'employeeNumber' })}>
            <p>EmployeeNumber</p>
          </label>
          <label>
            <input type="radio" name="subtitle" value="azureId" ?checked=${this._context.value?.subtitle === 'azureId'} @change=${() => this.dispatchViewModeChange({ subtitle: 'azureId' })}>
            <p>AzureId</p>
          </label>
        </div>
      `;
    }

    return html`
      <p>Select Table view mode</p>
      <div class="view-settings-options">
        <label>
          <input type="radio" name="tableviewmode" value="simple" ?checked=${(this._context.value?.tableColumns ?? []).length === simpleColumns.length} @change=${() => this.dispatchViewModeChange({ tableColumns: simpleColumns })}>
          <p>Simple table</p>
        </label>
        <label>
          <input type="radio" name="tableviewmode" value="full" ?checked=${(this._context.value?.tableColumns ?? []).length === fullColumns.length} @change=${() => this.dispatchViewModeChange({ tableColumns: fullColumns })}>
          <p>Full table</p>
        </label>
        <label>
          <input type="radio" name="tableviewmode" value="default" ?checked=${(this._context.value?.tableColumns ?? []).length === defaultColumns.length} @change=${() => this.dispatchViewModeChange({ tableColumns: defaultColumns })}>
          <p>Default table</p>
        </label>
      </div>
    `;
  }

  render(): TemplateResult {
    return html`
      <div id="view-mode">
        <p>Viewing ${this._context.value?.selected?.selectedPeople.size ?? 0} people</p>
        <fwc-icon-button
          color=${this._context.value?.viewMode === 'list' ? 'success' : 'primary'}
          icon="list"
          size="x-small"
          rounded
          title="List view"
          @click=${() => this.dispatchViewModeChange({ viewMode: 'list' })}
        ></fwc-icon-button>
        <fwc-icon-button
          @click=${() => this.dispatchViewModeChange({ viewMode: 'table' })}
          color=${this._context.value?.viewMode === 'table' ? 'success' : 'primary'}
          icon="view_week"
          size="x-small"
          rounded title="Table view"
          title="Table view"
        ></fwc-icon-button>
        <fwc-icon-button
          @click=${() => this.viewSettingsOpen = !this.viewSettingsOpen}
          color=${this.viewSettingsOpen ? 'success' : 'primary'}
          icon="settings"
          size="x-small"
          rounded
          title="Setting view options"
        ></fwc-icon-button>
        <div id="view-settings" class=${this.viewSettingsOpen ? 'open' : 'closed'}>
          ${this.renderSettings()}
        </div>
      </div>
    `;
  }
}

export default TableViewModeElement;
