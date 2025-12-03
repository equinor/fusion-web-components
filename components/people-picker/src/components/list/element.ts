import { type CSSResult, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import type { PersonInfo } from "@equinor/fusion-wc-person";


import type { ListElementProps } from "./types";
import { listStyle } from "./element.css";

import { SelectController } from "../../controllers/SelectController";

/* Other personComponents */
import { default as PersonPickerListItemElement } from '../list-item';

// register the webcomponents
PersonPickerListItemElement;

export class ListElement extends LitElement implements ListElementProps {
  static styles: CSSResult[] = [listStyle];

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  protected controllers = {
    select: new SelectController(this),
  };


  /**
   * The Azure ID of the person to resolve person info for
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? value.split(',').map((id) => id.trim()) : []
  })
  azureIds?: string[];

  /**
   * The custom data source of the person to display in the pill
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? JSON.parse(value) : []
  })
  dataSources?: PersonInfo[];

  /**
   * Array of selected IDs of the person
   */
  @property({ type: Array })
  selectedIds?: string[];

  /**
   * The maximum height of the list in pixels
   * Default is 250px
   */
  @property({ type: Number })
  maxHeight: number = 250; // in pixels

  /**
   * The total count of the results
   * Default is 0/0
   */
  @property({ type: String })
  totalCount: string = '0/0';

  selectTrigger(element: HTMLElement) {
    const dataSource = element.getAttribute('dataSource');
    const azureId = element.getAttribute('azureId');

    const selectedId: string = azureId ?? JSON.parse(dataSource ?? '{ "azureId": null }').azureId ?? '';

    if (!selectedId) {
      console.error('Person-picker: Could not retreive selected ID from element');
      return;
    }

    if (this.selectedIds?.includes(selectedId)) {
      this.controllers.select.triggerRemoveEvent(selectedId);
    } else {
      this.controllers.select.triggerAddEvent(selectedId);
    }
  }

  handleSelectClick(event: Event) {
    this.selectTrigger(event.target as HTMLElement);
  }

  handleSelectKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.selectTrigger(event.target as HTMLElement);
    }
  }

  renderListItems() {
    if (this.dataSources) {
      return this.dataSources.map(dataSource => html`
        <li>
          <fwc-people-picker-list-item
            tabindex="0"
            dataSource=${JSON.stringify(dataSource)}
            .selected=${this.selectedIds?.includes(dataSource.azureId)}
            @click=${this.handleSelectClick}
            @keydown=${this.handleSelectKeyDown}>
          </fwc-people-picker-list-item>
        </li>
      `);
    } else if (this.azureIds) {
      return this.azureIds.map(azureId => html`
        <li>
          <fwc-people-picker-list-item
            tabindex="0"
            azureId=${azureId}
            .selected=${this.selectedIds?.includes(azureId)}
            @click=${this.handleSelectClick}
            @keydown=${this.handleSelectKeyDown}>
          </fwc-people-picker-list-item>
        </li>
      `);
    }

    return html``;
  }

  renderTotalCount() {
    if ((this.dataSources?.length ?? 0) === 0 && (this.azureIds?.length ?? 0) === 0) {
      return html``;
    }

    return html`
      <div id="total-count">
        Displaying ${this.totalCount} results
      </div>
    `;
  }

  render() {
    const cssClasses = classMap({
      active: (this.dataSources?.length ?? 0) > 0 || (this.azureIds?.length ?? 0) > 0,
    });

    return html`
      <div id="root">
        <div id="list" class=${cssClasses} style="max-height: ${this.maxHeight}px;">
          <ul>
            ${this.renderListItems()}
          </ul>
        </div>
        
        ${this.renderTotalCount()}
      </div>
    `;
  }
}

export default ListElement;
