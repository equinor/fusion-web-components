import { type CSSResult, html, LitElement } from "lit";
import { property, queryAll } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import type { PersonInfo } from "@equinor/fusion-wc-person";

import type { ListElementProps } from "./types";
import { listStyle } from "./element.css";
import { NavigateController } from "./NavigateController";

/* Other personComponents */
import { default as ListItemElement } from '../list-item';

// register the webcomponents
ListItemElement;

export class ListElement extends LitElement implements ListElementProps {
  static styles: CSSResult[] = [listStyle];

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  controllers = {
    navigate: new NavigateController(this),
  };

  /**
   * The custom data source of the person to display in the pill
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? JSON.parse(value) : []
  })
  dataSources: PersonInfo[] = [];

  /**
   * The maximum height of the list in pixels
   * Default is 250
   */
  @property({ type: Number })
  maxHeight: number = 250; // in pixels

  /**
   * The total count of the results
   * Default is 0/0
   */
  @property({ type: String })
  totalCount: string = '0/0';

  @queryAll('fwc-people-picker-list-item')
  listItems!: NodeListOf<ListItemElement>;

  renderListItems() {
    return this.dataSources.map(dataSource => html`
      <li>
        <fwc-people-picker-list-item
          .dataSource=${dataSource}
          tabindex="0">
        </fwc-people-picker-list-item>
      </li>
    `);
  }

  renderTotalCount() {
    // if there are no data sources, don't render the total count
    if (this.dataSources.length === 0) {
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
      active: this.dataSources.length > 0,
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
