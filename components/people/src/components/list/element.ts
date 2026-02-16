import { type CSSResult, html, LitElement } from "lit";
import { property, queryAll } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ContextConsumer } from "@lit/context";

import type { PersonInfo } from "@equinor/fusion-wc-person";
import { FormfieldElement } from "@equinor/fusion-wc-formfield";
import { CheckboxElement } from "@equinor/fusion-wc-checkbox";

import type { ListElementProps } from "./types";
import { listStyle } from "./element.css";
import { NavigateController } from "./NavigateController";

import { pickerContext } from "../../controllers/context";
import { default as ListItemElement } from '../list-item';

// register the webcomponents
ListItemElement;
FormfieldElement;
CheckboxElement;

export class ListElement extends LitElement implements ListElementProps {
  static styles: CSSResult[] = [listStyle];

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private _context = new ContextConsumer(this, { context: pickerContext, subscribe: true });

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
      <div id="search-meta">
        <p>Displaying ${this.totalCount} results</p>
        |
        <label title="Include system accounts in search results">
          <fwc-checkbox style="--fwc-checkbox-size: 14px;" .checked=${this._context.value?.systemAccounts ?? false} @change=${(e: Event) => {
        this.dispatchEvent(new CustomEvent('toggle-system-accounts', {
          detail: {
            systemAccounts: (e.target as CheckboxElement).checked,
          },
          bubbles: true,
          composed: true,
        }));
      }}></fwc-checkbox>
        System accounts
        </label>
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
