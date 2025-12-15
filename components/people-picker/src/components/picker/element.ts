import { type CSSResult, html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { ContextProvider } from '@lit/context';
import { PersonInfo, PersonResolveTask, PersonSuggestResult, PersonSuggestResults, PersonSuggestTask } from "@equinor/fusion-wc-person";
import { DotsProgressElement } from "@equinor/fusion-wc-progress-indicator";

import type { PickerElementProps } from "./types";
import { pickerStyle } from "./element.css";
import { SelectedController } from "../../controllers/SelectedController";
import { pickerContext } from "../../controllers/context";
import { NavigateController } from "./NavigateController";

/* Other personComponents */
import { default as PillElement } from "../pill";
import { default as SearchElement } from "../search";
import { default as ListElement } from "../list";

/* Register the webcomponents */
SearchElement;
ListElement;
PillElement;
DotsProgressElement;

export class PickerElement extends LitElement implements PickerElementProps {
  static styles: CSSResult[] = [pickerStyle];

  protected tasks = {
    suggest: new PersonSuggestTask(this),
    resolve: new PersonResolveTask(this),
  };

  protected controllers = {
    selectedPeople: new SelectedController(this),
    navigate: new NavigateController(this),
  };

  private _provider = new ContextProvider(this, {
    context: pickerContext,
  });

  #timeoutId: ReturnType<typeof setTimeout> | null = null;

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
  @property({ attribute: 'subtitle', type: String })
  subTitle: keyof PersonInfo = 'jobTitle';

  /**
   * The property from PersonInfo to display as secondary subtitle in the pill
   * Default is department
   */
  @property({ attribute: 'secondarysubtitle', type: String })
  secondarySubTitle: keyof PersonInfo = 'department';

  /**
   * The Azure IDs of the selected people.
   * should be a comma seperated string of Azure IDs.
   * The ids will be resolved on mount only.
   * 
   */
  @property({ attribute: 'preselectedids', type: Array, converter: (value: string | null) => value ? JSON.parse(value) : [] })
  preselectedIds: string[] = [];

  /**
   * The PersonInfo objects of the selected people
   * should be a JSON string of PersonInfo objects.
   * The people will be resolved on mount only.
   */
  @property({ attribute: 'preselectedpeople', type: Array, converter: (value: string | null) => value ? JSON.parse(value) : [] })
  preselectedPeople: PersonInfo[] = [];

  @state()
  search: string = '';

  @query('fwc-people-picker-search')
  searchElement?: SearchElement;

  @query('fwc-people-picker-list')
  listElement?: ListElement;

  connectedCallback() {
    super.connectedCallback();

    // throw error if both preselectedIds and preselectedPeople are set
    if (this.preselectedIds.length && this.preselectedPeople.length) {
      throw new Error('preselectedIds and preselectedPeople cannot be used together, choose one.');
    }

    // if preselectedPeople is set, convert it to preselectedIds to trigger task
    if (this.preselectedPeople.length) {
      this.controllers.selectedPeople.addPeople(this.preselectedPeople);
    }
  }

  updated() {
    // update value attribute twith controlles selected ids
    this.value = this.controllers.selectedPeople.selectedIds.join();

    // populate preselected items if not already done
    if (this.tasks.resolve.value?.length && this.controllers.selectedPeople.selectedIds.length === 0) {
      // add successfully resolved people to selected people
      this.controllers.selectedPeople.addPeople(
        this.tasks.resolve.value.filter((person) => person.success)
          .map((person) => this.mapToPersonInfo(person.account!))
      );

      // reset task value since we already have populated the people
      this.preselectedIds = [];
    }

    // update provider context
    this._provider.setValue({
      subTitle: this.subTitle,
      secondarySubTitle: this.secondarySubTitle,
      selected: this.controllers.selectedPeople,
    });
  }

  handleInput(event: InputEvent) {
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
    }

    const value = (event.target as HTMLInputElement).value;

    this.#timeoutId = setTimeout(() => {
      this.search = value;
    }, 300);
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
      avatarColor: person.avatarColor,
      applicationId: person.application?.applicationId,
      applicationName: person.application?.applicationName,
      servicePrincipalType: person.application?.servicePrincipalType,
    };
  }

  handleKeyDownSearchInput(event: KeyboardEvent) {
    // add/remove first person from searchresults
    if (event.key === 'Enter') {
      const { value: people } = this.tasks.suggest.value ?? {};
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
      // Important: Prevent page scrolling when focusing the list item
      event.preventDefault();
      this.listElement?.controllers.navigate.focusItemAtIndex(0);
    }
  }

  renderPills() {
    return [...this.controllers.selectedPeople.selectedPeople.values()].map((person) => html`
      <fwc-people-picker-pill
        .dataSource=${person}>
      </fwc-people-picker-pill>
    `);
  }

  renderPickerList() {
    return this.tasks.suggest.render({
      complete: (people: PersonSuggestResults) => {

        if (this.search.length > 0) {
          if (this.search.length < 3) {
            return html`<p>Please enter at least 3 characters</p>`;
          }

          if (people.totalCount === 0) {
            return html`<p>No results found</p>`;
          }
        }

        return html`
          <fwc-people-picker-list
            .dataSources=${people.value.map((person) => this.mapToPersonInfo(person))}
            totalCount=${`${people.count}/${people.totalCount}`}>
          </fwc-people-picker-list>`;
      },
      pending: () => html`<p><fwc-dots-progress size="small" color="primary" /></p>`,
      error: () => html`<p class="error">Error while resolving people api</p>`,
    })
  }

  render() {
    return html`
      <div id="person-picker" @keydown=${this.keyboardHandler}>
        <div id="picker">
          ${this.renderPills()}
          
          <fwc-people-picker-search
            placeholder=${this.placeholder}
            @input=${this.handleInput}
            @clearinput=${this.handleClearInput}
            @keydown=${this.handleKeyDownSearchInput}>
          </fwc-people-picker-search>
        </div>

        <div id="search-results">
          ${this.renderPickerList()}
        </div>
      </div>
    `;
  };
}

export default PickerElement;
