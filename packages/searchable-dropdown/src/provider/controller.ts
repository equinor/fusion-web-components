import { ReactiveController } from 'lit';
import { Task } from '@lit-labs/task';

import {
  SearchableDropdownResult,
  SearchableDropdownResolver,
  SearchableDropdownControllerHost,
  SearchableDropdownResultItem,
  SearchableDropdownSelectEvent,
} from '../types';
import { SearchableDropdownConnectEvent, ExplicitEventTarget } from '../types';

export class SearchableDropdownController implements ReactiveController {
  protected disconnectProvider?: VoidFunction;
  protected timer?: ReturnType<typeof setTimeout>;
  protected _isOpen = false;
  protected resolver?: SearchableDropdownResolver;

  public _listItems: Array<string> = [];
  public _selectedItems: SearchableDropdownResult = [];
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
        }
        // set isSelected on result items
        this.result = this.mutateResult(result);
        return this.result;
      },
      () => [this.#queryString]
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
    if (e.target && (e.target as HTMLElement).id !== this.#host.id) {
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
   * Mutates result to set parameters like isSelected.
   * @param result SearchableDropdownResult
   * @returns result
   */
  private mutateResult(result: SearchableDropdownResult) {
    if (result) {
      const { selectedId } = this.#host;
      for (let i = 0; i < result.length; i++) {
        const item = result[i];

        if (item.type === 'section' && item.children?.length) {
          for (let x = 0; x < item.children.length; x++) {
            const kid = item.children[x];
            if (this._selectedItems.find((s) => s.id === kid.id) || selectedId === kid.id) {
              kid.isSelected = true;
            } else {
              kid.isSelected = false;
            }
          }
        } else {
          if (this._selectedItems.find((s) => s.id === item.id) || selectedId === item.id) {
            item.isSelected = true;
          } else {
            item.isSelected = false;
          }
        }
      }
    }

    return result;
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

    if (this.result && this._listItems) {
      const id = this._listItems[event.detail.index];

      /* Find selected item in resolver result list */
      let selectedItem: SearchableDropdownResultItem | undefined;

      // get selected item from result
      for (const item of this.result) {
        if (item.id === id) {
          selectedItem = item;
          break;
        } else if (item.children) {
          for (const childItem of item.children) {
            if (childItem.id === id) {
              selectedItem = childItem;
              break;
            }
          }
        }
      }

      /* Set Error if none matched the resolver result */
      if (!selectedItem?.id) {
        throw new Error('SearchableDropdownController could not find match  in result provided by resolver.');
      }

      /*  Set active state and save selected item in state */
      if (this.#host.multiple) {
        if (this._selectedItems.find((si) => si.id === selectedItem?.id)) {
          /*  Already selected so clear it from selections */
          selectedItem.isSelected = false;
          this._selectedItems = this._selectedItems.filter((i) => i.id !== selectedItem?.id);
          this.#host.value = '';
        } else {
          /*  Adds new item to selections */
          selectedItem.isSelected = true;
          this._selectedItems.push(selectedItem);
          this.#host.value = selectedItem?.title || '';
        }
      } else {
        /*  Adds new item to selections */
        this._selectedItems = [selectedItem];
        this.#host.value = selectedItem?.title || '';
      }
    } else {
      /* FALSE === this.result && this._listItems */
      /* Clear selected states */
      this._selectedItems = [];
      this.#host.value = '';
    }

    if (!this.#host.multiple) {
      this.isOpen = false;
    }

    /* Dispatch custom select event with our details */
    this.#host.dispatchEvent(
      new SearchableDropdownSelectEvent({
        detail: {
          selected: this._selectedItems,
        },
        bubbles: true,
      })
    );

    /* Sets items isSelected in task */
    this.task.run();

    /* Refresh host */
    this.#host.requestUpdate();
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
    this._selectedItems = [];
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
    // toogle close icon
    this.#host.trailingIcon = state ? 'close' : '';

    /* syncs dropdown list with textinput */
    if (this._selectedItems) {
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
    if (event.key === 'ArrowDown') {
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
