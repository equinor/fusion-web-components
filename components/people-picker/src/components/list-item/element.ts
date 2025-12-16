import { type CSSResult, html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ContextConsumer } from "@lit/context";

import { IconElement } from '@equinor/fusion-wc-icon';
import { PersonAvatarElement } from '@equinor/fusion-wc-person';

import type { PersonInfo } from "@equinor/fusion-wc-person";

import type { ListItemElementProps } from "./types";
import { listItemStyle } from "./element.css";
import { pickerContext } from "../../controllers/context";
import { NavigateController } from "./NavigateController";

// register webcomponents
PersonAvatarElement;
IconElement;

export class ListItemElement extends LitElement implements ListItemElementProps {
  static styles: CSSResult[] = [listItemStyle];

  private _context = new ContextConsumer(this, { context: pickerContext, subscribe: true });

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  protected controllers = {
    navigate: new NavigateController(this),
  };

  /**
   * The custom data source of the person to display in the pill
   */
  @property({
    type: Object,
    converter(value) {
      try {
        return JSON.parse(value ?? '{}');
      } catch {
        return value;
      }
    },
  })
  dataSource: PersonInfo = {} as PersonInfo;

  selectAction(): void {
    if (this._context.value?.selected.selectedPeople.has(this.dataSource.azureId)) {
      this._context.value?.selected.removePerson(this.dataSource.azureId);
    } else {
      this._context.value?.selected.addPerson(this.dataSource);
    }
  }

  handleSelectClick(): void {
    this.selectAction();
  }

  handleSelectKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectAction();
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      this.controllers.navigate.navigateToAdjacentItem(direction);
      return;
    }
  }

  renderSubTitle(person: Partial<PersonInfo>): TemplateResult {
    const subTitle = this._context.value?.subTitle ?? '';

    if (!subTitle) {
      return html``;
    }

    if (subTitle in person) {
      return html`<p>${person[subTitle]}</p>`;
    }

    console.warn(`The subTitle field '${subTitle}' is not a valid property of the person`);
    return html``;
  }

  renderSecondarySubTitle(person: Partial<PersonInfo>): TemplateResult {
    if (person.isExpired) {
      return html`<p id="expired">Account expired</p>`;
    }

    const secondarySubTitle = this._context.value?.secondarySubTitle ?? '';

    if (!secondarySubTitle) {
      return html``;
    }

    if (secondarySubTitle in person) {
      return html`<p>${person[secondarySubTitle]}</p>`;
    }

    console.warn(`The secondarySubTitle field '${secondarySubTitle}' is not a valid property of the person`);
    return html``;
  }

  renderServicePrincipalType(person: Partial<PersonInfo>): TemplateResult {
    if (!person.servicePrincipalType) {
      return html``;
    }

    return html`<p>${person.servicePrincipalType}</p>`;
  }

  render(): TemplateResult {
    const cssClasses = {
      selected: this._context.value?.selected.selectedPeople.has(this.dataSource.azureId) ?? false,
    };
    return html`
      <div id="item"
        tabindex="0"
        class=${classMap(cssClasses)}
        @click=${this.handleSelectClick}
        @keydown=${this.handleSelectKeyDown}>
        <div id="item-avatar">
          <fwc-person-avatar .dataSource=${this.dataSource} size="small" showLetter=${ifDefined(this.dataSource.applicationId)} customColor=${this.dataSource.avatarColor}></fwc-person-avatar>
        </div>
        <div id="item-name">
          <p>${this.dataSource.name}</p>
          ${this.renderSubTitle(this.dataSource)}
          ${this.renderSecondarySubTitle(this.dataSource)}
          ${this.renderServicePrincipalType(this.dataSource)}
        </div>
      </div>
    `;
  }
}

export default ListItemElement;
