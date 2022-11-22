import { ReactiveController } from 'lit';
import { Task } from '@lit-labs/task';
import {
  SearchableDropdownResult,
  SearchableDropdownResolver,
  SearchableDropdownControllerHost,
  SearchableDropdownResultItem,
} from '../types';
import { SearchableDropdownConnectEvent } from '../events';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';

export class SearchableDropdownController implements ReactiveController {
  protected disconnectProvider?: VoidFunction;
  protected timer?: ReturnType<typeof setTimeout>;
  protected _isOpen = false;
  protected resolver?: SearchableDropdownResolver;

  public _listItems: Array<string> = [];
  public _selectedItems: SearchableDropdownResult = [];
  public result?: SearchableDropdownResult;
  public task!: Task<[string], SearchableDropdownResult>;

  #queryString = '';
  #host: SearchableDropdownControllerHost;

  constructor(host: SearchableDropdownControllerHost) {
    this.#host = host;
    this.#host.addController(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);

    this.task = new Task<[string], SearchableDropdownResult>(
      this.#host,
      async ([qs]: [string]): Promise<SearchableDropdownResult> => {
        if (!qs) {
          return [{ id: 'initial', title: this.#host.initialText, isDisabled: true }];
        }
        if (!this.resolver?.searchQuery) {
          /* resolver is not setup the right way */
          throw new Error('SeachableDropdownResolver is missing searchQuery handler');
        }
        this.result = await this.resolver.searchQuery(qs);
        return this.result;
      },
      () => [this.#queryString]
    );
  }

  protected updateResolver = (resolver?: SearchableDropdownResolver): void => {
    this.resolver = resolver;
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
   * Fires the select event to listener on host.
   * using the action event from the fwc-list element.
   * @param action Customevent with details property
   * @return SearchableDropdownResult the selected item in array.
   */
  public handleSelect(action: CustomEvent<ActionDetail>): void {
    action.stopPropagation();

    if (this.result && this._listItems) {
      const id = this._listItems[action.detail.index];

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
        throw new Error(
          'SearchableDropdownControlloer could not find match  in selectedItem to result provided by resolver.'
        );
      }

      /*  Set active state and save selected item in state */
      if (this.#host.multiple) {
        if (this._selectedItems.find((si) => si.id === selectedItem?.id)) {
          /*  Already selected so clear it from selections */
          selectedItem.isSelected = false;
          this._selectedItems = this._selectedItems.filter((i) => i.id !== selectedItem?.id);
          this.#host.selected = '';
        } else {
          /*  Adds new item to selections */
          selectedItem.isSelected = true;
          this._selectedItems.push(selectedItem);
          this.#host.selected = selectedItem?.title || '';
        }
      } else {
        /*  Adds new item to selections */
        this._selectedItems = [selectedItem];
        this.#host.selected = selectedItem?.title || '';
      }
    } else {
      /* Clear selected states */
      this._selectedItems = [];
      this.#host.selected = '';
    }

    /* Dispatch custom select event with our details */
    this.#host.dispatchEvent(
      new CustomEvent('select', {
        detail: {
          selected: this._selectedItems,
        },
        bubbles: true,
      })
    );

    /* Refresh host */
    this.#host.requestUpdate();
  }

  /* Settter: Open/Closed state for host */
  public set isOpen(state: boolean) {
    this.#queryString = '';
    this._isOpen = state;
    this.#host.trailingIcon = state ? 'close' : '';
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
