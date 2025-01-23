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

  public _listItems: Array<string> = [];
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

        this.result = result;
        this.setIsSelected();
        return this.result;
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
   * Loops over result items and sets isSelected to true on selected items
   * based on items in selectedItems array.
   */
  private setIsSelected() {
    const isMultiple = this.#host.multiple;
    this.result = this.result?.map((item) => {
      if (item.children?.length) {
        item.children = item.children.map((child) => {
          if (this.#host.selectedItems.has(child.id)) {
            child.isSelected = true;
          } else if (!isMultiple) {
            child.isSelected = false;
          }
          return child;
        });
      } else {
        if (this.#host.selectedItems.has(item.id)) {
          item.isSelected = true;
        } else if (!isMultiple) {
          item.isSelected = false;
        }
      }

      return item;
    });
  }

  /**
   * Mutates the initialResult to set parameters like isSelected and selectedItems.
   */
  public initialItemsMutation() {
    const { selectedId } = this.#host;

    // clear any previous selectedItems when changing property
    this.#host.selectedItems.clear();

    // set selectedItems based on selectedId
    if (selectedId !== null) {
      this.result?.forEach((item) => {
        if (item.children?.length) {
          item.children.forEach((child) => {
            if (selectedId === child.id) {
              this.#host.selectedItems.add(child.id);
            }
          });
        } else {
          if (selectedId === item.id) {
            this.#host.selectedItems.add(item.id);
          }
        }
      });
    }

    //set input value based on selectedItems
    this.#host.value = this.allSelectedItems.map((item) => item.title).join(', ');

    // update isSelected in dropdown list
    this.setIsSelected();
  }

  /**
   * Get selectedItems objects from result array.
   */
  public get allSelectedItems(): SearchableDropdownResult {
    const selectedItems: SearchableDropdownResult = [];
    this.result?.forEach((item) => {
      if (item.children?.length) {
        item.children.forEach((child) => {
          if (this.#host.selectedItems.has(child.id)) {
            selectedItems.push(child);
          }
        });
      }
      if (this.#host.selectedItems.has(item.id)) {
        selectedItems.push(item);
      }
    });

    return selectedItems;
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
      const items = this.result.filter((item) => !item.children);
      const kids = this.result
        .filter((item) => item.children)
        .map((item) => item.children as SearchableDropdownResult)
        .flat();
      const results = [...items, ...kids];
      const selectedItem = results.find((item) => item.id === id);

      /* Set Error if none matched the resolver result */
      if (!selectedItem) {
        throw new Error('SearchableDropdownController could not find a match in result provided by resolver.');
      }

      /*  Set active state and save selected item in state */
      if (this.#host.selectedItems.has(selectedItem.id)) {
        /* Unselecting */
        this.#host.selectedItems.delete(selectedItem.id);
      } else {
        /*  Adds new item to selections */
        if (!this.#host.multiple) {
          this.#host.selectedItems.clear();
        }
        this.#host.selectedItems.add(selectedItem.id);
      }
    } else {
      /* Clear selected states if any */
      this.#host.selectedItems.clear();
    }

    // set isSelected based on selectedItems in dropdown list
    this.setIsSelected();

    // set input value based on selectedItems
    this.#host.value = this.allSelectedItems.map((item) => item.title).join(', ');

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
      const closeIcon = this.#host.trailingIconElement;
      if (closeIcon) {
        (closeIcon as HTMLSpanElement).blur();
      }
    }

    /* needed to clear user input */
    if (this.#host.textInputElement) {
      this.#host.textInputElement.value = '';
      this.#host.textInputElement.blur();
    }

    this.#host.selectedItems.clear();
    this.#host.value = '';

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
