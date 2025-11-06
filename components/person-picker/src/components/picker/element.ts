import { type CSSResult, html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";

import type { PersonPickerElementProps } from "./types";
import { pickerStyle } from "./element.css";
import { PersonInfo, PersonSearchTask } from "@equinor/fusion-wc-person";
import { PersonSearchResult } from "@equinor/fusion-wc-person";
import { SelectedIdsController } from "../../controllers/SelectedIdsController";

/* Other personComponents */
import { default as SearchElement } from "../search";
import { default as ListElement } from "../list";
import { default as PillContainerElement } from "../pill-container";

import { AddPersonEvent, RemovePersonEvent } from "../../controllers/SelectController";

/* Register the webcomponents */
SearchElement;
ListElement;
PillContainerElement;

export class PersonPickerElement extends LitElement implements PersonPickerElementProps {
  static styles: CSSResult[] = [pickerStyle];

  protected tasks = {
    search: new PersonSearchTask(this),
  };

  protected controllers = {
    selectedIds: new SelectedIdsController(this),
  };

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
  placeholder: string = 'Start typing name';

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
  subtitle: keyof PersonInfo = 'jobTitle';

  /**
   * The property from PersonInfo to display as secondary subtitle in the pill
   * Default is department
   */
  @property({ type: String })
  secondarySubTitle: keyof PersonInfo = 'department';

  @state()
  search: string = '';

  @query('fwc-person-picker-search')
  searchElement?: SearchElement;

  @query('fwc-person-picker-list')
  listElement?: ListElement;

  updated() {
    this.value = this.controllers.selectedIds.selectedIds.join(',');
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
        const selectedIds = [...this.controllers.selectedIds.selectedIds];
        const lastItem = selectedIds.pop();
        this.controllers.selectedIds.remove(lastItem ?? '');
      }
    }

    if (event.key === 'Escape') {
      this.clearSearch();
    }
  }

  renderPills() {
    return this.controllers.selectedIds.selectedIds.map((azureId) => html`
      <fwc-person-picker-pill
        azureId=${azureId}
        subTitle="department"
        @removeperson=${this.handleDeselect}
      </fwc-person-picker-pill>
    `);
  }

  renderPickerList() {
    return this.tasks.search.render({
      complete: (people: PersonSearchResult) => {
        return html`
          <fwc-person-picker-list
            .dataSources=${people}
            .multiple=${this.multiple}
            .selectedIds=${this.controllers.selectedIds.selectedIds}
            subtitle=${this.subtitle}
            secondarySubTitle=${this.secondarySubTitle}
            @addperson=${this.handleSelect}
            @removeperson=${this.handleDeselect}
          </fwc-person-picker-list>`;
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
          <fwc-person-picker-search
            placeholder="Search for..."
            @input=${this.handleInput}
            @clearinput=${this.handleClearInput}>
          </fwc-person-picker-search>
        </div>

        <div id="search-results">
          ${this.renderPickerList()}
        </div>
      </div>
    `;
  };
}

export default PersonPickerElement;
