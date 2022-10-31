import { ReactiveController } from 'lit';
import { Task, initialState } from '@lit-labs/task';
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
  protected _query = '';
  public _listItems: Array<string> = [];
  public _selectedItems: SearchableDropdownResult = [];
  protected resolver?: SearchableDropdownResolver;

  public host: SearchableDropdownControllerHost;
  public result?: SearchableDropdownResult;

  constructor(host: SearchableDropdownControllerHost) {
    this.host = host;
    this.host.addController(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  protected updateResolver = (resolver?: SearchableDropdownResolver): void => {
    this.resolver = resolver;
    this.host.requestUpdate();
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
    this.host.dispatchEvent(event);

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
    if ((e.target as HTMLElement).nodeName !== this.host.nodeName) {
      this.isOpen = false;
    }
  };

  /**
   * Sets the value on fwc-textinput when user selects an item
   * Fires on the action event for fwc-list
   * @param action Custonevent with details property
   */
  public handleAction(action: CustomEvent<ActionDetail>): void {
    // dont bubble fwc-list action event since we want more details
    action.stopPropagation();
  }

  public handleSelect(action: CustomEvent<ActionDetail>): void {
    // e.stopPropagation();
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
              item.section = { id: item.id, title: item.title };
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
      if (this._selectedItems.find((si) => si.id === selectedItem?.id)) {
        selectedItem.isSelected = false;
        this._selectedItems = this._selectedItems.filter((i) => i.id !== selectedItem?.id);
        this.host.selected = '';
        console.log('unSelecting', selectedItem);
      } else {
        selectedItem.isSelected = true;
        this._selectedItems.push(selectedItem);
        this.host.selected = selectedItem?.title || '';
        console.log('Selecting', selectedItem);
      }
    } else {
      /* Clear selected states */
      this._selectedItems = [];
      this.host.selected = '';
    }

    console.log('selectedItems', this._selectedItems);

    /* Dispatch custom select event with our details */
    this.host.dispatchEvent(
      new CustomEvent('select', {
        detail: {
          selected: this._selectedItems,
        },
        bubbles: true,
      })
    );

    /* Refresh host */
    this.host.requestUpdate();
  }

  /* Settter: Open/Closed state for host */
  public set isOpen(state: boolean) {
    this.query = '';
    this._isOpen = state;
    this.host.requestUpdate();
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
    this.query = target.value.trim().toLowerCase();
  }

  /* set controller query string and bounce 250ms from last keyup */
  public set query(search: string) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this._query = search;
      this.host.pendingQuery = this._searchQueryTask(this.resolver);
      this.host.requestUpdate();
    }, 250);
  }

  /* return controller query string */
  public get query(): string {
    return this._query;
  }

  /* Setup task to handle resolvers searchQuery */
  private _searchQueryTask(resolver?: SearchableDropdownResolver): Task<[string], SearchableDropdownResult> {
    return new Task<[string], SearchableDropdownResult>(
      this.host,
      async ([query]) => {
        if (!query) {
          /* See @https://github.com/lit/lit/tree/main/packages/labs/task */
          return initialState;
        }
        if (!resolver?.searchQuery) {
          /* resolver is not setup the right way */
          throw new Error('SeachableDropdownResolver is missing searchQuery handler');
        }
        this.result = await resolver.searchQuery(query);
        return this.result;
      },
      () => [this._query]
    );
  }
}
