import type { ReactiveController } from 'lit';

import type { ListElement } from './element';
import type { NavigateListItemEvent } from '../list-item';

export class NavigateController implements ReactiveController {
  #host: ListElement;

  constructor(host: ListElement) {
    this.#host = host;
    this.#host.addController(this);
  }

  hostConnected(): void {
    // Listen for navigation events from list items
    this.#host.addEventListener('navigate-list-item', this.handleNavigateListItem as EventListener);
  }

  hostDisconnected(): void {
    this.#host.removeEventListener('navigate-list-item', this.handleNavigateListItem as EventListener);
    this.#host.removeController(this);
  }

  /**
   * Focus the list item at the given index
   * @param index - The index of the item to focus (0-based)
   */
  focusItemAtIndex(index: number): void {
    const items = this.#host.listItems;
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
  private handleNavigateListItem = (event: NavigateListItemEvent): void => {
    event.stopPropagation();
    const items = Array.from(this.#host.listItems);

    // Find which item triggered the event using the source element
    const sourceElement = event.detail.sourceElement;
    if (!sourceElement || sourceElement.tagName !== 'FWC-PEOPLE-PICKER-LIST-ITEM') {
      return
    };

    const currentIndex = items.indexOf(sourceElement);

    // navigate to search input if we are on top of list and still pressing up
    if (currentIndex === 0 && event.detail.direction === -1) {
      this.#host.dispatchEvent(new CustomEvent('navigate-to-search', {
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
}
