import { PersonInfo } from './';

/**
 * Event emitted when the people picker selection changes.
 */
export class SelectionChangedEvent extends CustomEvent<PersonInfo[]> {
  static readonly eventName = 'selection-changed';
  constructor(detail: PersonInfo[]) {
    super(SelectionChangedEvent.eventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

/**
 * Event emitted when a person is added to the people picker selection.
 */
export class PersonAddedEvent extends CustomEvent<PersonInfo> {
  static readonly eventName = 'person-added';
  constructor(detail: PersonInfo) {
    super(PersonAddedEvent.eventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

/**
 * Event emitted when a person is removed from the people picker selection.
 */
export class PersonRemovedEvent extends CustomEvent<PersonInfo> {
  static readonly eventName = 'person-removed';
  constructor(detail: PersonInfo) {
    super(PersonRemovedEvent.eventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
