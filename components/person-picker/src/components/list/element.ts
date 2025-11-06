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

  @property({ type: Array })
  selectedIds?: string[];

  /**
   * The custom data source of the person to display in the pill
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? JSON.parse(value) : []
  })
  dataSources?: PersonInfo[];

  /**
   * The property from PersonInfo to display as subtitle in the pill
   * Default is department
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
   * The maximum height of the list in pixels
   * Default is 250px
   */
  @property({ type: Number })
  maxHeight: number = 250; // in pixels

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
          <fwc-person-picker-list-item
            tabindex="0"
            dataSource=${JSON.stringify(dataSource)}
            subTitle=${this.subTitle}
            secondarySubTitle=${this.secondarySubTitle}
            .selected=${this.selectedIds?.includes(dataSource.azureId)}
            @click=${this.handleSelectClick}
            @keydown=${this.handleSelectKeyDown}>
          </fwc-person-picker-list-item>
        </li>
      `);
    } else if (this.azureIds) {
      return this.azureIds.map(azureId => html`
        <li>
          <fwc-person-picker-list-item
            tabindex="0"
            azureId=${azureId}
            .selected=${this.selectedIds?.includes(azureId)}
            @click=${this.handleSelectClick}
            @keydown=${this.handleSelectKeyDown}>
          </fwc-person-picker-list-item>
        </li>
      `);
    }

    return html``;
  }

  render() {
    const cssClasses = classMap({
      active: (this.dataSources?.length ?? 0) > 0 || (this.azureIds?.length ?? 0) > 0,
    });

    return html`<div id="root">
      <div id="list" class=${cssClasses}>
        <ul>
          ${this.renderListItems()}
        </ul>
      </div>

      <style>
        #list {
          max-height: ${this.maxHeight}px;
        }
      </style>
    </div>`;
  }
}

export default ListElement;
