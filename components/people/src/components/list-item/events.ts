import type { ListItemElement } from "./element";

export class NavigateListItemEvent extends CustomEvent<{ direction: number; sourceElement: ListItemElement }> {
  constructor(direction: number, sourceElement: ListItemElement) {
    super('navigate-list-item', {
      detail: { direction, sourceElement },
      bubbles: true,
      composed: true,
    });
  }
}
