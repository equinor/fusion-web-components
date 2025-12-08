import { type CSSResult, html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { ContextProvider } from '@lit/context';
import { PersonInfo, PersonSuggestResult, PersonSuggestResults, PersonSuggestTask } from "@equinor/fusion-wc-person";

import type { PeoplePickerElementProps } from "./types";
import { pickerStyle } from "./element.css";
import { SelectedController } from "../../controllers/SelectedController";
import { pickerContext } from "../../controllers/context";

/* Other personComponents */
import { default as PillElement } from "../pill";
import { default as SearchElement } from "../search";
import { default as ListElement } from "../list";
/* Register the webcomponents */
SearchElement;
ListElement;
PillElement;

export class PeoplePickerElement extends LitElement implements PeoplePickerElementProps {
  static styles: CSSResult[] = [pickerStyle];

  protected tasks = {
    search: new PersonSuggestTask(this),
  };

  protected controllers = {
    selectedPeople: new SelectedController(this),
  };

  private _provider = new ContextProvider(this, {
    context: pickerContext,
  });

  /**
   * The value of the person picker
   * Contains a comma separated list of azureIds of the selected persons
   * Default is empty string
   */
  @property({ type: String, reflect: true })
  value: string = '';

  /**
   * The placeholder text to display in the search input
   * Default is 'Start typing name'
   */
  @property()
  placeholder: string = 'Search for...';

  /**
   * Whether the person picker should allow multiple selections.
   */
  @property({ type: Boolean, converter: (value: string | null) => !!value })
  multiple: boolean = false;

  /**
   * The property from PersonInfo to display as subtitle in the pill
   * Default is jobTitle
   */
  @property({ type: String })
  subTitle: keyof PersonInfo = 'jobTitle';

  /**
   * The property from PersonInfo to display as secondary subtitle in the pill
   * Default is department
   */
  @property({ type: String })
  secondarySubTitle: keyof PersonInfo = 'department';

  @state()
  search: string = '';

  @query('fwc-people-picker-search')
  searchElement?: SearchElement;

  @query('fwc-people-picker-list')
  listElement?: ListElement;

  updated() {
    this.value = this.controllers.selectedPeople.selectedIds.join();

    this._provider.setValue({
      subTitle: this.subTitle,
      secondarySubTitle: this.secondarySubTitle,
      selected: this.controllers.selectedPeople,
    });
  }

  handleInput(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.search = value;
  }

  handleClearInput() {
    this.search = '';
  }

  clearSearch() {
    this.handleClearInput();
    this.searchElement?.clear();
  }

  keyboardHandler(event: KeyboardEvent) {
    // delete pills when backspacing empty input and there are selected pills
    if (event.key === 'Backspace') {
      const { selectedPeople } = this.controllers.selectedPeople;
      if (!this.search && selectedPeople.size > 0) {
        const lastId = [...selectedPeople.keys()][selectedPeople.size - 1];
        this.controllers.selectedPeople.removePerson(lastId);
      }
    }

    if (event.key === 'Escape') {
      this.clearSearch();
    }
  }

  mapToPersonInfo(person: PersonSuggestResult): PersonInfo {
    return {
      azureId: person.azureUniqueId,
      name: person.name,
      jobTitle: person.person?.jobTitle,
      department: person.person?.department,
      managerAzureUniqueId: person.person?.managerAzureUniqueId,
      upn: person.person?.upn,
      mobilePhone: person.person?.mobilePhone,
      accountType: person.person?.accountType,
      isExpired: person.isExpired,
      avatarUrl: person.avatarUrl,
    };
  }

  handleKeyDownSearchInput(event: KeyboardEvent) {
    // add/remove first person from searchresults
    if (event.key === 'Enter') {
      const { value: people } = this.tasks.search.value ?? {};
      if (!people?.length) {
        return;
      }

      const firstPerson = people[0];
      if (this.controllers.selectedPeople.selectedPeople.has(firstPerson.azureUniqueId)) {
        this.controllers.selectedPeople.removePerson(firstPerson.azureUniqueId);
      } else {
        this.controllers.selectedPeople.addPerson(this.mapToPersonInfo(firstPerson));
      }
    }

    if (event.key === 'ArrowDown') {
      this.listElement?.focus();
    }
  }

  renderPills() {
    return [...this.controllers.selectedPeople.selectedPeople.values()].map((person) => html`
      <fwc-people-picker-pill
        .dataSource=${person}
      </fwc-people-picker-pill>
    `);
  }

  renderSearch() {
    return html`
      <fwc-people-picker-search
        placeholder=${this.placeholder}
        @input=${this.handleInput}
        @clearinput=${this.handleClearInput}
        @keydown=${this.handleKeyDownSearchInput}>
      </fwc-people-picker-search>
    `;
  }

  renderPickerList() {
    return this.tasks.search.render({
      complete: (people: PersonSuggestResults) => {
        return html`
          <fwc-people-picker-list
            .dataSources=${people.value.map((person) => this.mapToPersonInfo(person))}
            totalCount=${`${people.count}/${people.totalCount}`}
          </fwc-people-picker-list>`;
      },
      pending: () => html`<p>Loading...</p>`,
      error: () => html`<p id="error">Error while resolving people api</p>`,
    })
  }

  render() {
    return html`
      <div id="person-picker" @keydown=${this.keyboardHandler}>
        <div id="picker">
          ${this.renderPills()}
          ${this.renderSearch()}
        </div>

        <div id="search-results">
          ${this.renderPickerList()}
        </div>
      </div>
    `;
  };
}

export default PeoplePickerElement;
