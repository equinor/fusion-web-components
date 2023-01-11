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
import { TextInputElement } from '@equinor/fusion-wc-textinput';

export class SearchableDropdownController implements ReactiveController {
  protected disconnectProvider?: VoidFunction;
  protected timer?: ReturnType<typeof setTimeout>;
  protected _isOpen = false;
  protected resolver?: SearchableDropdownResolver;

  public _listItems: Array<string> = [];
  public _selectedItems: SearchableDropdownResult = [];
  public result?: SearchableDropdownResult;
  public task!: Task<[string], SearchableDropdownResult>;

  #externaCloseHandler?: (e: MouseEvent) => void;
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
    /* add click event to window */
    window.addEventListener('click', this._handleWindowClick);
  }

  public hostDisconnected(): void {
    if (this.disconnectProvider) {
      this.disconnectProvider();
    }
    /* remove click event to window */
    window.removeEventListener('click', this._handleWindowClick);
  }

  /**
   * Close dropdown when click oustside host
   */
  private _handleWindowClick = (e: Event): void => {
    /* make sure we have a target to check against */
    if (!e.target) return;
    if ((e.target as HTMLElement).nodeName !== this.#host.nodeName) {
      this.isOpen = false;
    }
  };

  /**
   * Mutates result to set parameters like isSelected.
   * @param result SearchableDropdownResult
   * @returns result
   */
  private mutateResult(result: SearchableDropdownResult) {
    if (this._selectedItems.length && result) {
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        if (item.type === 'section' && item.children?.length) {
          for (let x = 0; x < item.children.length; x++) {
            const kid = item.children[x];
            if (this._selectedItems.find((s) => s.id === kid.id)) {
              kid.isSelected = true;
            } else {
              kid.isSelected = false;
            }
          }
        } else {
          if (this._selectedItems.find((s) => s.id === item.id)) {
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
        } else if (item.children) {
          for (const childItem of item.children) {
            if (childItem.id === id) {
              selectedItem = childItem;
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
  public closeClick = (e: MouseEvent): void => {
    this.#host.value = '';
    /* needed to clear user input */
    const input: TextInputElement | null = this.#host.renderRoot.querySelector('fwc-textinput');
    if (input) {
      input.value = '';
    }
    this.isOpen = false;
    /* call resolvers handleclick if defined */
    if (this.#externaCloseHandler) {
      this.#externaCloseHandler(e);
    }
  };

  /* Settter: Open/Closed state for host */
  public set isOpen(state: boolean) {
    this._isOpen = state;
    this.#host.trailingIcon = state ? 'close' : '';

    /* Sets items isSelected in result list */
    if (this._selectedItems) {
      this.task.run();
    }

    /* Refresh host */
    this.#host.requestUpdate();
  }

  /* Getter: Open/Closed state for host */
  public get isOpen(): boolean {
    return this._isOpen;
  }

  /**
   * Set the string to filter items by
   * @param event
   */
  public handleKeyup(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    if (event.key === 'ArrowDown') {
      if (this._isOpen && this.result?.length) {
        // focus on the fwc-list
        this.#host.renderRoot.querySelector('fwc-list')?.focus();
      }
      return;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.#queryString = target.value.trim().toLowerCase();
      this.#host.requestUpdate();
    }, 250);
  }
}
