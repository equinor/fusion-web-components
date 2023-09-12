/* eslint-disable prettier/prettier */
import { html, HTMLTemplateResult, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { sddStyles } from '@equinor/fusion-wc-searchable-dropdown';

import { ListItemElement } from '@equinor/fusion-wc-list';
import { IconElement } from '@equinor/fusion-wc-icon';
import { AvatarElement } from '@equinor/fusion-wc-avatar';
import { PersonInfo } from '../../../types';
ListItemElement;
IconElement;
AvatarElement;

/**
 * Element for SearchableDropdown list item
 * @tag fwc-person-search-list-item
 *
 * @property {SearchableDropdownResultItem} item The result item to list
 */
export class PersonSearchListItemElement extends LitElement {
  /* style object css */
  static styles = [sddStyles];

  @property()
  dataSource?: PersonInfo;

  @property()
  selected = false;

  @property()
  disabled = false;
  
  constructor() {
    super();
    this.setAttribute('mwc-list-item', '');
  }

  get azureId(): string | undefined {
    return this.dataSource?.azureId;
  }

  get itemTitle(): string | undefined {
    return this.dataSource?.name;
  }

  get itemSubTitle(): string | undefined {
    return this.dataSource?.mail;
  }

  /* Build fwc-list-items */
  protected render(): HTMLTemplateResult | void {
    if (!this.dataSource) {
      return;
    }

    const itemClasses = {
      'list-item': true,
      'item-selected': !!this.selected,
      'item-multiline': !!this.itemSubTitle,
      'item-disabled': this.disabled,
    };

    const selected = this.selected || undefined;
    const disabled = this.disabled || undefined;

    /* Sett checkmark on selected items */
    return html`<fwc-list-item
      .rootTabbable=${true}
      .wrapFocus=${true}
      .selected=${selected}
      .activated=${selected}
      .disabled=${disabled}
      graphic="avatar"
      key=${this.azureId}
      class=${classMap(itemClasses)}
    >
      <fwc-person-avatar
        .azureId=${this.azureId}
        .dataSource=${this.dataSource}
        size="small"
        slot="graphic">
      </fwc-person-avatar>
      <span class="item-text">
        ${this.itemTitle && html`<span class="item-title">${this.itemTitle}</span>`}
        ${this.itemSubTitle && html`<span class="item-subtitle">${this.itemSubTitle}</span>`}
      </span>
    </fwc-list-item>`;
  }
}

export default PersonSearchListItemElement;
