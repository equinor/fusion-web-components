import { html, type CSSResult, type TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { type PersonSuggestResults, PersonSuggestTask } from '@equinor/fusion-wc-person';
import { DotsProgressElement } from '@equinor/fusion-wc-progress-indicator';

import type { PickerElementProps } from './types';
import { pickerStyle } from './element.css';
import { NavigateController } from './NavigateController';
import { mapToPersonInfo } from '../../utils';
import { ClickOutsideController } from '../../controllers/ClickOutsideController';
import { PeopleBaseElement } from '../base';
import { peopleBaseStyle } from '../base';

/* Other WebComponents */
import { default as ListElement } from '../list';
import { default as PillElement } from '../pill';
import { default as SearchElement } from '../search';

/* Register the WebComponents */
DotsProgressElement;
ListElement;
PillElement;
SearchElement;

/**
 * The person picker component.
 * This component is used to search for people and select them.
 */
export class PickerElement extends PeopleBaseElement implements PickerElementProps {
  static styles: CSSResult[] = [peopleBaseStyle, pickerStyle];

  private _timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    this.tasks.suggest = new PersonSuggestTask(this);
    this.controllers.navigate = new NavigateController(this);
    this.controllers.clickOutside = new ClickOutsideController(this);
  }

  /**
   * The placeholder text to display in the search input
   * Default is 'Start typing name'
   */
  @property()
  placeholder: string = 'Search for...';

  /**
   * Whether to show the selected people pills.
   * If false, the selected people will not be shown but the value will be set to the selected people's azureId.
   * @ps The multiple property must be false for this to make any effect.
   */
  @property({
    type: Boolean,
    converter: (value: string | null) => value === 'true'
  })
  showSelectedPeople: boolean = true;
  /**
   * Whether to include system accounts in the search results
   * Default is false
   */
  @property({ type: Boolean })
  systemAccounts: boolean = false;

  /**
   * The title to show when there are no results found. 
   * This is useful to provide a better user experience when the search returns no results, 
   * as it can be used to provide guidance to the user on how to get better results.
   */
  @property({ type: String })
  noResultTitle: string = '';

  /**
   * The subtitle to show when there are no results found.
   * This is useful to provide a better user experience when the search returns no results, 
   * as it can be used to provide guidance to the user on how to get better results.
   */
  @property({ type: String })
  noResultSubtitle: string = '';

  @state()
  search: string = '';

  @query('fwc-people-picker-search')
  searchElement?: SearchElement;

  @query('fwc-people-picker-list')
  listElement?: ListElement;

  handleInput(event: InputEvent) {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    const searchQuery = (event.target as HTMLInputElement).value;
    this._timeoutId = setTimeout(() => {
      this.search = searchQuery;
    }, 300);
  }

  handleClearInput() {
    this.search = '';
  }

  clearSearch() {
    this.handleClearInput();
    this.searchElement?.clear();
  }

  /**
   * Clears the search and blurs the search input
   * Mostly used for clicks outside the picker element
   */
  public close() {
    this.clearSearch();
    this.searchElement?.blur();
  }

  renderPills() {
    if (!this.showSelectedPeople && !this.multiple) {
      return;
    };

    return repeat([...this.controllers.selected.selectedPeople.values()], (person) => person.azureId, (person) => html`
      <fwc-people-pill .dataSource=${person}></fwc-people-pill>
    `);
  }

  renderPickerList() {
    return this.tasks.suggest?.render({
      complete: (people: PersonSuggestResults) => {

        if (people.value.length === 1 && people.value[0].azureUniqueId === 'no-results-found') {
          if (this.noResultTitle) {
            people.value[0].name = this.noResultTitle;
          }
          if (this.noResultSubtitle) {
            people.value[0].accountLabel = this.noResultSubtitle;
          }
        }

        return html`
          <fwc-people-picker-list
            .dataSources=${people.value.map((person) => mapToPersonInfo(person))}
            totalCount=${`${people.count}/${people.totalCount}`}
            @toggle-system-accounts=${(e: CustomEvent) => {
            this.systemAccounts = e.detail.systemAccounts;
          }}></fwc-people-picker-list>
        `;
      },
      pending: () => html`<p><fwc-dots-progress size="small" color="primary" /></p>`,
      error: () => this.errors.push('Failed to suggest people from people api'),
    })
  }

  renderContentMode(): TemplateResult {
    const renderPicker = ({ pills = true }: { pills?: boolean } = {}) => html`
      <div
        id="person-picker"
        tabindex="0"
        @keydown=${this.controllers.navigate?.handlePickerKeyDown}
        class=${this.viewMode}
      >
        <div id="picker">
          ${pills ? this.renderPills() : ''}
          <fwc-people-picker-search
            placeholder=${this.placeholder}
            @focusin=${() => this.controllers.clickOutside?.addClickOutsideListener()}
            @input=${this.handleInput}
            @clearinput=${this.handleClearInput}
            @keydown=${this.controllers.navigate?.handleKeyDownSearchInput}>
          </fwc-people-picker-search>
        </div>
        <div id="search-results">
          ${this.renderPickerList()}
        </div>
      </div>
    `;

    if (this.viewMode === 'list') {
      return renderPicker();
    }

    return html`
      <div id="table">
        <table>
          <thead>
            <tr>
              ${this.renderTableColumns()}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan=${this.tableColumns.length}>
                ${renderPicker({ pills: false })}
              </td>
            </tr>
            ${this.renderTableRows()}
          </tbody>
        </table>
      </div>
    `;
  }

  render() {
    return html`
      <div id="root">
        ${this.renderViewMode()}
        ${this.renderContentMode()}
        ${this.renderErrors()}
      </div>
    `;
  };
}

export default PickerElement;
