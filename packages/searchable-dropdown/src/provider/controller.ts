import { ReactiveController } from 'lit';
import { Task } from '@lit-labs/task';

import {
  SearchableDropdownResult,
  SearchableDropdownResolver,
  SearchableDropdownControllerHost,
  SearchableDropdownSelectEvent,
} from '../types';
import { SearchableDropdownConnectEvent, ExplicitEventTarget } from '../types';

export class SearchableDropdownController implements ReactiveController {
  protected disconnectProvider?: VoidFunction;
  protected timer?: ReturnType<typeof setTimeout>;
  protected _isOpen = false;
  protected resolver?: SearchableDropdownResolver;

  public result?: SearchableDropdownResult;
  public task!: Task<[string], SearchableDropdownResult>;

  #externaCloseHandler?: (e: MouseEvent | KeyboardEvent) => void;
  #host: SearchableDropdownControllerHost;
  #queryString = '';
  #initialItems: SearchableDropdownResult = [];

  constructor(host: SearchableDropdownControllerHost) {
    this.#host = host;
    this.#host.addController(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);

    this.task = new Task<[string], SearchableDropdownResult>(
      this.#host,
      async ([qs]: [string]): Promise<SearchableDropdownResult> => {
        if (!this.resolver?.searchQuery) {
          /* resolver is not available */
          return [];
        }
        let result;
        if (!qs) {
          if (this.#initialItems.length) {
            result = this.#initialItems;
          } else {
            result = [{ id: 'initial', title: this.#host.initialText, isDisabled: true }];
          }
        } else {
          result = await this.resolver.searchQuery(qs);
          if (!result.length) {
            result = [{ id: 'no-result', title: this.#host.noContentText, isDisabled: true }];
          }
        }

        this.result = result;

        return result;
      },
      () => [this.#queryString],
    );
  }

  protected updateResolver = (resolver?: SearchableDropdownResolver): void => {
    this.resolver = resolver;

    if (resolver?.initialResult) {
      this.#initialItems = resolver.initialResult;
      this.task.run();
    }

    if (resolver?.closeHandler) {
      this.#externaCloseHandler = resolver.closeHandler;
    }

    this.#host.requestUpdate();
  };

  public hostConnected(): void {
    requestAnimationFrame(() => {
      if (this.#host.textInputElement && this.#host.autofocus) {
        this.#host.textInputElement.focus();
      }
    });

    const event = new SearchableDropdownConnectEvent({
      detail: {
        disconnectedCallback: (callback) => {
          this.disconnectProvider = callback;
        },
        updateResolver: this.updateResolver,
      },
      bubbles: true,
      composed: true,
      cancelable: false,
    });
    this.#host.dispatchEvent(event);

    /* add click event to body */
    document.body.addEventListener('click', this._handleGlobalClick);
  }

  public hostDisconnected(): void {
    if (this.disconnectProvider) {
      this.disconnectProvider();
    }
    /* remove global event listeners */
    document.body.removeEventListener('click', this._handleGlobalClick);
    document.body.removeEventListener('keyup', this._handleGlobalKeyUp);
  }

  /**
   * Close dropdown when click oustside host id
   */
  private _handleGlobalClick = (e: MouseEvent): void => {
    const { target } = e;
    if (target && target !== this.#host) {
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
   * Mutates the initialResult to set parameters like isSelected and selectedItems.
   */
  public updateSelectedByProp() {
    const { selectedId } = this.#host;

    // clear any previous selectedItems when changing property
    this.#host.selectedItems.clear();

    // set selectedItems based on selectedId
    if (selectedId !== null) {
      const results = this.flatResult;
      const item = results.find((item) => item.id === selectedId);
      if (item) {
        this.#host.selectedItems.add(item.id);
      }
    }

    //set input value based on selectedItems
    this.setHostValue();
  }

  /**
   * Set host value based on selectedItems
   */
  private setHostValue(): void {
    this.#host.value = this.allSelectedItems.map((item) => item.title).join(', ');
  }

  /**
   * Get selectedItems objects from result array.
   */
  private get allSelectedItems(): SearchableDropdownResult {
    return this.flatResult.filter((item) => this.#host.selectedItems.has(item.id));
  }

  /**
   * Helper that flattens result array to a single array.
   * used to easily find selected items in result array and set isSelected by index.
   * @important This method must return results in the same order as resolvers result
   * to be able to use index to set selectedItems.
   * @returns SearchableDropdownResult
   */
  private get flatResult(): SearchableDropdownResult {
    if (!this.result) {
      return [];
    }

    /**
     * Create SearchableDropdownResult with all toplevel and child items
     * excluding dividers and sections.
     */
    return this.result.reduce((acc: SearchableDropdownResult, item) => {
      // do not add dividers to acc
      if (item.type === 'divider') {
        return acc;
      }

      // add sectioned children flatlist
      if (item.type === 'section' && item.children) {
        return [...acc, ...item.children];
      }

      return [...acc, item];
    }, []);
  }

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

    // get a flat list of result to select by index
    const results = this.flatResult;
    if (!results.length) {
      throw new Error('SearchableDropdownController could not find result set in resolver');
    }

    // extract id from results by index
    const { id } = results[event.detail.index];
    if (!id) {
      throw new Error('SearchableDropdownController could not find selected item in resolver');
    }

    /* De-select if already selected */
    if (this.#host.selectedItems.has(id)) {
      this.#host.selectedItems.delete(id);
    } else {
      if (!this.#host.multiple) {
        this.#host.selectedItems.clear();
      }
      this.#host.selectedItems.add(id);
    }

    // set input value based on selectedItems
    this.setHostValue();

    if (!this.#host.multiple) {
      this.isOpen = false;
    }

    /* Dispatch custom select event with our details */
    this.#host.dispatchEvent(
      new SearchableDropdownSelectEvent({
        detail: {
          selected: this.allSelectedItems,
        },
        bubbles: true,
      }),
    );
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
      const closeIcon = this.#host.trailingIconElement;
      if (closeIcon) {
        (closeIcon as HTMLSpanElement).blur();
      }
    }

    /* needed to clear user input */
    if (this.#host.textInputElement) {
      this.#host.textInputElement.blur();
    }

    this.#host.selectedItems.clear();
    this.setHostValue();

    this.#queryString = '';

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

    /* syncs dropdown list with textinput */
    if (this.#host.selectedItems.size) {
      this.task.run();
    }

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
    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      /* focus on the fwc-list' */
      if (this._isOpen && this.result?.length) {
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
      this.#queryString = target.value.trim().toLowerCase();
      this.#host.requestUpdate();
    }, 250);
  }
}
