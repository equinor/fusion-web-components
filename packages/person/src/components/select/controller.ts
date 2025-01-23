import { ReactiveController } from 'lit';
import { PersonSelectElement } from './element';

import { PersonInfo } from '../../types';

export interface ExplicitEventTarget extends Event {
  readonly detail: {
    index: number;
  };
  readonly explicitOriginalTarget: HTMLInputElement;
}

type PersonSelectEventDetail = {
  selected: PersonInfo | null;
};

export class PersonSelectEvent extends CustomEvent<PersonSelectEventDetail> {
  static readonly eventName = 'select';
  constructor(args: CustomEventInit<PersonSelectEventDetail>) {
    super(PersonSelectEvent.eventName, args);
  }
}

/**
 * @todo
 * @eikeland
 * This should be used from @equinor/fusion-wc-searchable-dropdown
 * There is no point of duplicating this controller.
 * An element can have multiple controllers
 * The parent controller should have type-hint of `selected` in `CustomEventDetail`
 */
export class PersonSelectController implements ReactiveController {
  protected timer?: ReturnType<typeof setTimeout>;
  protected _isOpen = false;

  public selectedIds: Set<string> = new Set();

  #externaCloseHandler?: (e: MouseEvent | KeyboardEvent) => void;
  #host: PersonSelectElement;

  constructor(host: PersonSelectElement) {
    this.#host = host;
    this.#host.addController(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  public hostConnected(): void {
    this.resolveSelectedPerson();
    requestAnimationFrame(() => {
      if (this.#host.textInputElement && this.#host.autofocus) {
        this.#host.textInputElement.focus();
      }
    });

    /* add click event to body */
    document.body.addEventListener('click', this._handleGlobalClick);
  }

  public resolveSelectedPerson(): void {
    const { selectedPerson } = this.#host;
    const selectedPersonId = (() => {
      if (selectedPerson === null) {
        return null;
      }
      if (typeof selectedPerson === 'object') {
        return selectedPerson.azureId ?? selectedPerson.upn;
      }
      return selectedPerson;
    })();

    // there are no selected person
    if (selectedPersonId === undefined) return;

    if (!selectedPersonId) {
      return this.clear();
    }
    // check if upn is a valid email
    if (selectedPersonId.match('@')) {
      this.#host.upn = selectedPersonId;
      this.#host.azureId = undefined;
      return;
    }
    // check if azureId is a valid guid
    if (selectedPersonId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      this.#host.azureId = selectedPersonId;
      this.#host.upn = undefined;
      return;
    }
  }

  /* Selects the PersonInfo object as current user */
  public async selectPersonInfo(person: PersonInfo) {
    /* important to await running task */
    await this.#host.updateComplete;

    this.selectedIds.clear();
    this.selectedIds.add(person.azureId);

    this.#firePersonSelectEvent(person);

    this.#host.requestUpdate();
  }

  public hostDisconnected(): void {
    /* remove global event listeners */
    document.body.removeEventListener('click', this._handleGlobalClick);
    document.body.removeEventListener('keyup', this._handleGlobalKeyUp);
  }

  /**
   * Close dropdown when click oustside host id
   */
  private _handleGlobalClick = (e: MouseEvent): void => {
    const t = e.target as HTMLElement;
    if (t && !(this.#host as unknown as HTMLElement).contains(t) && this.isOpen) {
      this.isOpen = false;
    }
  };

  /**
   * Close dropdown on escape key.
   * only called when isOpen === true
   */
  private _handleGlobalKeyUp = (e: KeyboardEvent): void => {
    /* Close on Escape */
    if (e.key === 'Escape') {
      if (this.#host.textInputElement) {
        /* Close element */
        this.isOpen = false;
      }
    } else if (e.key === 'Tab') {
      if (document.activeElement?.id !== this.#host.id) {
        this.isOpen = false;
      }
    }
  };

  /**
   * Fires the select event to listener on host.
   * using the event event from the fwc-list element.
   * @param event fwc-list action event with details property
   * @return SearchableDropdownResult the selected item in array.
   */
  // public handleSelect(event: CustomEvent<eventDetail>): void {
  public handleSelect(event: ExplicitEventTarget): void {
    event.stopPropagation();

    /* dont fire select event when li child checkbox is clicked, for ex. a favourit checkbox */
    if (event.explicitOriginalTarget && event.explicitOriginalTarget.type === 'checkbox') {
      return;
    }

    this.#setSelected(event.detail.index);

    /* Refresh host */
    this.#host.requestUpdate();
  }

  #firePersonSelectEvent(person: PersonInfo | null) {
    /* Dispatch custom select event with our details */
    this.#host.dispatchEvent(
      new PersonSelectEvent({
        detail: {
          selected: person,
        },
        bubbles: true,
      }),
    );
  }

  #setSelected(index: number): void {
    const selectedElement = this.#host.listItems[index];
    if (!selectedElement) {
      console.debug('Missing element at index:', index);
    }

    const { dataSource } = selectedElement;
    const { azureId } = dataSource ?? {};
    if (!azureId) {
      console.warn('This should not be possible, is dataSource missing?');
      return;
    }

    let personData = dataSource || null;

    if (this.#host.multiple) {
      if (this.selectedIds.has(azureId)) {
        this.selectedIds.delete(azureId);
      } else {
        this.selectedIds.add(azureId);
      }
    } else {
      this.isOpen = false;
      if (this.selectedIds.has(azureId)) {
        this.selectedIds.clear();
        personData = null;
      } else {
        this.selectedIds.clear();
        this.selectedIds.add(azureId);
      }
    }

    /* Dispatch custom select event with our details */
    this.#firePersonSelectEvent(personData);

    /* clear component if null */
    if (personData === null || this.#host.selectedPerson === null) {
      this.clearInput();
      this.selectedIds.clear();
    }
  }

  public deSelectPerson(person?: PersonInfo): boolean {
    if (!person?.azureId || !this.selectedIds.has(person.azureId)) {
      return false;
    }

    this.clear();

    this.#host.requestUpdate();
    return true;
  }

  public clearInput() {
    this.#host.value = '';
    this.#host.search = '';
    this.#host.textInputElement.value = '';
    this.#host.azureId = '';
    this.#host.upn = '';
  }

  public clear() {
    this.clearInput();

    if (this.selectedIds.size) {
      this.selectedIds.clear();
    }

    /* Dispatch custom select event with our details */
    this.#firePersonSelectEvent(null);
  }

  /**
   * Fires when triggering close icon in textinput
   * Calls closeHandler callback set in resolver
   */
  public closeClick = (e: MouseEvent | KeyboardEvent): void => {
    if (e.type === 'keydown') {
      /* only close on enter or space not tab */
      const me = e as KeyboardEvent;
      if (me.key !== 'Enter' && me.key !== 'Space') {
        return;
      }

      /* blur closeicon if focused */
      const closeIcon = this.#host.renderRoot.querySelector('.trailing');
      if (closeIcon) {
        (closeIcon as HTMLSpanElement).blur();
      }
    }

    if (this.#host.textInputElement) {
      this.#host.textInputElement.blur();
    }

    /* close dropdown if open */
    if (this.isOpen) {
      this.isOpen = false;
    }

    /* call resolvers handleclick if defined */
    if (this.#externaCloseHandler) {
      this.#externaCloseHandler(e);
    }

    if (this.selectedIds.size) {
      this.clear();
    } else {
      // clear input
      this.clearInput();
    }

    /* fire event for sdd closed */
    const ddClosedEvent = new CustomEvent<{ date: number }>('dropdownClosed', {
      detail: {
        date: Date.now(),
      },
      bubbles: true,
    });
    this.#host.dispatchEvent(ddClosedEvent);
  };

  /* Settter: Open/Closed state for host */
  public set isOpen(state: boolean) {
    this._isOpen = state;

    /* Close on escape key */
    if (this._isOpen) {
      document.body.addEventListener('keyup', this._handleGlobalKeyUp);
      this.#host.textInputElement?.focus();
    } else {
      document.body.removeEventListener('keyup', this._handleGlobalKeyUp);
      this.#host.textInputElement?.blur();
    }

    /* Refresh host */
    this.#host.requestUpdate();
  }

  /* Getter: Open/Closed state for host */
  public get isOpen(): boolean {
    return this._isOpen;
  }

  /**
   * Keyup handler to textinputelement
   * Set the string to filter items by and jump to dropdown list on arrowdown
   * @param event
   */
  public handleKeyup(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    if (event.key === 'ArrowDown') {
      /* focus on the fwc-list' */
      if (this._isOpen && this.#host.listItems.length) {
        this.#host.listElement?.focusItemAtIndex(0);
      }
      return;
    }

    /* Trigger searchQuery task with debounce very 250 ms */
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      const value = target.value.trim().toLowerCase();
      this.#host.search = value;
      this.#host.requestUpdate();
    }, 500);
  }
}
