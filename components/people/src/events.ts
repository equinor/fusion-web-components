import { PersonInfo } from "packages/person/lib/types";

/**
 * Event emitted when the people picker selection changes.
 */
export class PickerSelectionChangedEvent extends CustomEvent<PersonInfo[]> {
  static readonly eventName = 'selection-changed';
  constructor(detail: PersonInfo[]) {
    super(PickerSelectionChangedEvent.eventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

export default PickerSelectionChangedEvent;

/**
 * Event emitted when a person is added to the people picker selection.
 */
export class PickerPersonAddedEvent extends CustomEvent<PersonInfo> {
  static readonly eventName = 'person-added';
  constructor(detail: PersonInfo) {
    super(PickerPersonAddedEvent.eventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

/**
 * Event emitted when a person is removed from the people picker selection.
 */
export class PickerPersonRemovedEvent extends CustomEvent<PersonInfo> {
  static readonly eventName = 'person-removed';
  constructor(detail: PersonInfo) {
    super(PickerPersonRemovedEvent.eventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
