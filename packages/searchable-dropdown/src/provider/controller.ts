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
  protected _selected?: SearchableDropdownResultItem;
  protected resolver?: SearchableDropdownResolver;

  public host: SearchableDropdownControllerHost;
  public result?: SearchableDropdownResult;

  constructor(host: SearchableDropdownControllerHost) {
    this.host = host;
    this.host.addController(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  protected updateResolver = (resolver?: SearchableDropdownResolver): void => {
    this.resolver = resolver;
    this.host.requestUpdate();
  };

  hostConnected(): void {
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

    // add click event to window
    window.addEventListener('click', this._handleWindowClick);
  }

  hostDisconnected(): void {
    if (this.disconnectProvider) {
      this.disconnectProvider();
    }
    // remove click event to window
    window.removeEventListener('click', this._handleWindowClick);
  }

  /**
   * Close dropdown when click oustside host
   */
  private _handleWindowClick = (e: Event): void => {
    // make sure we have a target to check against
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
  handleAction(action: CustomEvent<ActionDetail>): void {
    const { index } = action.detail;
    if (this.result) {
      this._selected = this.result[index];
      this.host.selected = this.result[index].title;
    }

    // close the dropdown
    this.isOpen = false;

    // dont bubble fwc-list action event since we want more details
    action.stopPropagation();

    // re-dispatch action event with our details
    this.host.dispatchEvent(
      new CustomEvent('action', {
        detail: {
          item: this._selected,
        },
        bubbles: true,
      })
    );
  }

  /**
   * Set the string to filter items by
   * @param event
   */
  public handleKeyup(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    this.query = target.value.trim().toLowerCase();
  }

  // Settter: Open/Closed state for host
  set isOpen(state: boolean) {
    this.query = '';
    this._isOpen = state;
    this.host.requestUpdate();
  }

  // Getter: Open/Closed state for host
  get isOpen(): boolean {
    return this._isOpen;
  }

  // set controller query string and bounce 250ms from last keyup
  set query(search: string) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this._query = search;
      this.host.pendingQuery = this._searchQueryTask(this.resolver);
      this.host.requestUpdate();
    }, 250);
  }

  // return controller query string
  get query(): string {
    return this._query;
  }

  /* Open/closed state on host dropdown */
  private _searchQueryTask(resolver?: SearchableDropdownResolver): Task<[string], SearchableDropdownResult> {
    return new Task<[string], SearchableDropdownResult>(
      this.host,
      async ([query]) => {
        if (!query) {
          // See @https://github.com/lit/lit/tree/main/packages/labs/task
          return initialState;
        }
        if (!resolver?.searchQuery) {
          // resolver is not setup the right way
          throw new Error('SeachableDropdownResolver is undefined');
        }
        this.result = await resolver.searchQuery(query);
        return this.result;
      },
      () => [this.query]
    );
  }
}
