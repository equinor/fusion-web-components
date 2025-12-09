import { type CSSResult, html, LitElement } from "lit";
import { property, queryAll } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import type { PersonInfo } from "@equinor/fusion-wc-person";

import type { ListElementProps } from "./types";
import { listStyle } from "./element.css";

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

  connectedCallback() {
    super.connectedCallback();
    // Listen for navigation events from list items
    this.addEventListener('navigate-list-item', this.handleNavigateListItem as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('navigate-list-item', this.handleNavigateListItem as EventListener);
  }

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

  updated() {
    console.log('listItems', this.listItems);
  }

  /**
   * Focus the list item at the given index
   * @param index - The index of the item to focus (0-based)
   */
  focusItemAtIndex(index: number): void {
    const items = this.listItems;
    if (index >= 0 && index < items.length) {
      const targetItem = items[index];
      if (targetItem) {
        targetItem.focus();
      }
    }
  }

  /**
   * Handle navigation events from list items
   */
  private handleNavigateListItem = (event: CustomEvent<{ direction: number; sourceElement: ListItemElement }>): void => {
    event.stopPropagation();
    const items = Array.from(this.listItems);

    // Find which item triggered the event using the source element
    const sourceElement = event.detail.sourceElement;
    if (!sourceElement || sourceElement.tagName !== 'FWC-PEOPLE-PICKER-LIST-ITEM') {
      return
    };

    const currentIndex = items.indexOf(sourceElement);

    // navigate to search input if we are on top of list and still pressing up
    if (currentIndex === 0 && event.detail.direction === -1) {
      this.dispatchEvent(new CustomEvent('navigate-to-search', {
        bubbles: true,
        composed: true,
      }));
      return;
    }

    if (currentIndex === -1) return;

    const nextIndex = currentIndex + event.detail.direction;

    // Focus the target item
    this.focusItemAtIndex(nextIndex);
  };

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
