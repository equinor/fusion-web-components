import { type CSSResult, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { IconElement } from '@equinor/fusion-wc-icon';
import { PersonAvatarElement } from '@equinor/fusion-wc-person';

import type { PersonInfo } from "@equinor/fusion-wc-person";
import { PersonInfoTask } from "@equinor/fusion-wc-person";

import type { ListItemElementProps } from "./types";
import { listItemStyle } from "./element.css";

// register the webcomponents
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

  /**
   * The property from PersonInfo to display as subtitle in the pill
   * Default is department
   */
  @property({ type: String })
  subTitle: keyof PersonInfo = 'jobTitle';

  /**
   * The property from PersonInfo to display as secondary subtitle in the pill
   * Default is department
   */
  @property({ type: String })
  secondarySubTitle: keyof PersonInfo = 'department';

  updated() {
    if (!this.azureId && !this.upn && !this.dataSource) {
      throw new Error('Either azureId, azureUniqueId, upn or dataSource must be provided to PersonPill');
    }
  }

  renderSubTitle(person: Partial<PersonInfo>) {
    if (!this.subTitle) {
      return html``;
    }

    return html`<p>${person[this.subTitle]}</p>`;
  }

  renderSecondarySubTitle(person: Partial<PersonInfo>) {
    if (person.isExpired) {
      return html`<p id="expired">Account expired</p>`;
    }

    if (!this.secondarySubTitle) {
      return html``;
    }

    return html`<p>${person[this.secondarySubTitle]}</p>`;
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
