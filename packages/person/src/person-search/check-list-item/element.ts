import { html, HTMLTemplateResult, LitElement, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

import { SearchableDropdownResultItem, sddStyles } from '@equinor/fusion-wc-searchable-dropdown';

import { ListItemElement } from '@equinor/fusion-wc-list';
import { IconElement } from '@equinor/fusion-wc-icon';
import { AvatarElement } from '@equinor/fusion-wc-avatar';
ListItemElement;
IconElement;
AvatarElement;

/**
 * Element for SearchableDropdown list item
 * @tag fwc-person-search-list-item
 *
 * @property {SearchableDropdownResultItem} item The result item to list
 */
export class PersonSearchCheckListItemElement extends LitElement {
  /* style object css */
  static styles = [sddStyles];

  @state()
  item: SearchableDropdownResultItem | undefined;

  /* Build fwc-list-items */
  protected render(): HTMLTemplateResult {
    const itemClasses = {
      'list-item': true,
      'item-selected': !!this.item?.isSelected,
      'item-error': !!this.item?.isError,
      'item-multiline': !!this.item?.subTitle,
      'item-avatar':
        (this.item?.graphic ?? '').indexOf('http') === 0 || (this.item?.graphic ?? '').indexOf('blob') === 0,
    };

    const renderItemText = (): TemplateResult => {
      if (!this.item || !this?.item.id) {
        return html``;
      }

      /* Get icon for either meta or graphic slot */
      const getIconSlot = (type: 'meta' | 'graphic') => {
        if (!this.item || !this?.item.id) {
          return html``;
        }

        if (this.item[type]) {
          const iconRef = this.item[type];
          const iconSlot = (): TemplateResult =>
            type === 'graphic'
              ? html`<fwc-person-avatar upn=${iconRef} size="small"></fwc-person-avatar>`
              : html`<fwc-icon icon=${iconRef}></fwc-icon>`;

          return html`<span class="slot-${type}" slot=${type}>${iconSlot()}</span>`;
        }

        return html``;
      };

      return html`${getIconSlot('graphic')}
        <span class="item-text">
          ${this.item.title && html`<span class="item-title">${this.item.title}</span>`}
          ${this.item.subTitle && html`<span slot="secondary" class="item-subtitle">${this.item.subTitle}</span>`}
        </span>
        ${getIconSlot('meta')}`;
    };

    const disabled = this.item?.isDisabled || this.item?.isError ? true : undefined;
    const selected = this.item?.isSelected ? true : undefined;

    /* Sett checkmark on selected items */
    return html`<fwc-check-list-item
      key=${this.item?.id}
      class=${classMap(itemClasses)}
      disabled=${ifDefined(disabled)}
      selected=${ifDefined(selected)}
      twoline=${ifDefined(this.item?.subTitle)}
    >
      ${renderItemText()}
    </fwc-check-list-item>`;
  }
}

export default PersonSearchCheckListItemElement;
