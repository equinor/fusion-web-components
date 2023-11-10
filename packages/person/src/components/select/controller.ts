import { ReactiveController } from 'lit';
import { PersonSelectElement } from './element';

import { ExplicitEventTarget } from '@equinor/fusion-wc-searchable-dropdown';
import { PersonInfo } from '../../types';

type PersonSelectEventDetail = {
  selected: PersonInfo;
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
  public _listItems: Array<string> = [];
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
    requestAnimationFrame(() => {
      if (this.#host.textInputElement && this.#host.autofocus) {
        this.#host.textInputElement.focus();
      }
    });

    /* add click event to body */
    document.body.addEventListener('click', this._handleGlobalClick);
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
    if (t && !(this.#host as unknown as HTMLElement).contains(t)) {
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

    const selectedElement = this.#host.listItems[event.detail.index];
    if (!selectedElement) {
      console.debug('Missing element at index:', event.detail.index);
    }

    const { dataSource } = selectedElement;
    const { azureId } = dataSource ?? {};

    if (!azureId) {
      console.warn('This should not be spossible, missing dataSource?');
      return;
    }

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
      } else {
        this.selectedIds.clear();
        this.selectedIds.add(azureId);
      }
    }

    /* Dispatch custom select event with our details */
    this.#host.dispatchEvent(
      new PersonSelectEvent({
        detail: {
          selected: dataSource!,
        },
        bubbles: true,
      }),
    );

    /* Refresh host */
    this.#host.requestUpdate();
  }

  public deSelectId(azureId: string): boolean {
    if (!azureId || !this.selectedIds.has(azureId)) {
      return false;
    }

    this.selectedIds.delete(azureId);
    this.#host.textInputElement.focus();
    this.#host.requestUpdate();
    return true;
  }

  /**
   * Fires on click on close icon in textinput
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

    /* needed to clear user input */
    if (this.#host.textInputElement) {
      this.#host.textInputElement.value = '';
      this.#host.textInputElement.blur();
    }

    this.#host.value = '';
    this.selectedIds.clear();
    // this.#search = '';
    this.#host.search = '';

    /* also runs task */
    this.isOpen = false;

    /* call resolvers handleclick if defined */
    if (this.#externaCloseHandler) {
      this.#externaCloseHandler(e);
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
    } else {
      document.body.removeEventListener('keyup', this._handleGlobalKeyUp);

      /* unfocus */
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
        // this.#host.listElement?.focus();
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
      // this.#search = value;
      this.#host.search = value;
      this.#host.requestUpdate();
    }, 500);
  }
}
