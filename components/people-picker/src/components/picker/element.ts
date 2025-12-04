import { type CSSResult, html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { ContextProvider } from '@lit/context';
import { PersonInfo, PersonSuggestResult, PersonSuggestResults, PersonSuggestTask } from "@equinor/fusion-wc-person";

import type { PeoplePickerElementProps } from "./types";
import { pickerStyle } from "./element.css";
import { SelectedIdsController } from "../../controllers/SelectedIdsController";
import { AddPersonEvent, RemovePersonEvent } from "../../controllers/SelectController";
import { pickerContext } from "../../controllers/context";

/* Other personComponents */
import { default as PillElement } from "../pill";
import { default as SearchElement } from "../search";
import { default as ListElement } from "../list";
/* Register the webcomponents */
PillElement;
SearchElement;
ListElement;

export class PeoplePickerElement extends LitElement implements PeoplePickerElementProps {
  static styles: CSSResult[] = [pickerStyle];

  protected tasks = {
    search: new PersonSuggestTask(this),
  };

  protected controllers = {
    selectedIds: new SelectedIdsController(this),
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
    this.value = this.controllers.selectedIds.selectedIds.join(',');

    this._provider.setValue({
      subTitle: this.subTitle,
      secondarySubTitle: this.secondarySubTitle,
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

  handleSelect(event: AddPersonEvent) {
    const { azureId } = event.detail;
    if (azureId) {
      if (this.multiple) {
        this.controllers.selectedIds.add(azureId);
      } else {
        this.controllers.selectedIds.selectedIds = [azureId];
      }
    }
  }

  handleDeselect(event: RemovePersonEvent) {
    const { azureId } = event.detail;
    if (azureId) {
      this.controllers.selectedIds.remove(azureId);
    }
  }

  keyboardHandler(event: KeyboardEvent) {
    // delete pills when backspacing empty input and there are selected pills
    if (event.key === 'Backspace') {
      if (!this.search && this.controllers.selectedIds.selectedIds.length) {
        const lastItem = this.controllers.selectedIds.selectedIds[this.controllers.selectedIds.selectedIds.length - 1];
        this.controllers.selectedIds.remove(lastItem ?? '');
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
      upn: person.person?.upn,
      mobilePhone: person.person?.mobilePhone,
      accountType: person.person?.accountType,
    };
  }

  handleKeyDownSearchInput(event: KeyboardEvent) {
    console.log(event.key);

    // add/remove first person from searchresults
    if (event.key === 'Enter') {
      const { value: people } = this.tasks.search.value ?? {};
      if (!people?.length) {
        return;
      }

      const firstPerson = people[0];

      if (this.controllers.selectedIds.selectedIds.includes(firstPerson.azureUniqueId)) {
        this.controllers.selectedIds.remove(firstPerson.azureUniqueId);
      } else {
        this.controllers.selectedIds.add(firstPerson.azureUniqueId);
      }
    }
  }

  renderPills() {
    return this.controllers.selectedIds.selectedIds.map((azureId) => html`
      <fwc-people-picker-pill
        azureId=${azureId}
        @removeperson=${this.handleDeselect}
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
            .multiple=${this.multiple}
            .selectedIds=${this.controllers.selectedIds.selectedIds}
            totalCount=${`${people.count}/${people.totalCount}`}
            @addperson=${this.handleSelect}
            @removeperson=${this.handleDeselect}
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
