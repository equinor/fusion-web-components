import { type CSSResult, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ContextConsumer } from "@lit/context";

import { IconElement } from '@equinor/fusion-wc-icon';
import { PersonAvatarElement } from '@equinor/fusion-wc-person';

import type { PersonInfo } from "@equinor/fusion-wc-person";
import { PersonInfoTask } from "@equinor/fusion-wc-person";

import type { ListItemElementProps } from "./types";
import { listItemStyle } from "./element.css";
import { pickerContext } from "../../controllers/context";

// register webcomponents
PersonAvatarElement;
IconElement;

export class ListItemElement extends LitElement implements ListItemElementProps {
  static styles: CSSResult[] = [listItemStyle];

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  tasks = {
    info: new PersonInfoTask(this),
  };

  private _context = new ContextConsumer(this, { context: pickerContext, subscribe: true });

  /**
   * The Azure ID of the person to resolve person info for
   */
  @property({ type: String })
  azureId?: string;

  /**
   * The unique email(upn) of the person to resolve person info for
   */
  @property({ type: String })
  upn?: string;

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
  dataSource?: PersonInfo;

  /**
   * Whether the item is selected
   */
  @property({
    type: Boolean, converter(value) {
      return value === 'true' ? true : false;
    }
  })
  selected?: boolean;

  updated() {
    if (!this.azureId && !this.upn && !this.dataSource) {
      throw new Error('Either azureId, azureUniqueId, upn or dataSource must be provided to PersonPill');
    }
  }

  renderSubTitle(person: Partial<PersonInfo>) {
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

  renderSecondarySubTitle(person: Partial<PersonInfo>) {
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

  render() {
    return this.tasks.info.render({
      complete: (person: Partial<PersonInfo>) => {
        return html`<div id="item" tabindex="0" class=${this.selected ? 'selected' : ''}>
          <div id="item-avatar">
            <fwc-person-avatar azureId=${person.azureId} size="small"></fwc-person-avatar>
          </div>
          <div id="item-name">
            <p>${person.name}</p>
            ${this.renderSubTitle(person)}
            ${this.renderSecondarySubTitle(person)}
          </div>
        </div>`;
      },
      pending: () => html`<p>Resolving person info...</p>`,
      error: () => html`<p>Error resolving personInfo</p>`,
    });
  }
}

export default ListItemElement;
