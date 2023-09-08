import { html, LitElement, HTMLTemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { query } from 'lit/decorators/query.js';

import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { v4 as uuid } from 'uuid';

import { PersonSearchController } from './controller';
import { PersonSearchHost } from './types';
import { PersonSearchTask } from './task';

import { SearchableDropdownResult, sddStyles } from '@equinor/fusion-wc-searchable-dropdown';

import { CheckListItemElement, ListElement } from '@equinor/fusion-wc-list';
import { TextInputElement } from '@equinor/fusion-wc-textinput';
import { DividerElement } from '@equinor/fusion-wc-divider';
import { IconElement } from '@equinor/fusion-wc-icon';
import { AvatarElement } from '@equinor/fusion-wc-avatar';
import { PersonSearchListItemElement } from './list-item';
import { PersonSearchCheckListItemElement } from './check-list-item';
PersonSearchListItemElement;
PersonSearchCheckListItemElement;
ListElement;
CheckListItemElement;
TextInputElement;
DividerElement;
IconElement;
AvatarElement;

/**
 * Element for SearchableDropdown
 * @tag fwc-searchabledropdown
 *
 * @property {boolean} autofocus Focus the fwx-textInput on hostconnect
 * @property {boolean} disabled disable TextInput element
 * @property {string} dropdownHeight Sets max-height of list so user can scroll trough results
 * @property {string} graphic Icon to show before each fwc-list-item. If you want an icon only on one list-item then use the graphic property on the SearchableDropdownResultItem
 * @property {string} initialText Text to display in dropdown before/without querystring in fwc-textinput
 * @property {string} label Label for fwc-textinput element
 * @property {string} leadingIcon Leading Icon to display in fwc-text-input
 * @property {string} meta Icon to show after each fwc-list-item. If you want an icon only on one list-item then use the meta property on the SearchableDropdownResultItem
 * @property {string} multiple Able to select multiple items
 * @property {string} placeholder Placeholder text for fwc-textinput element
 * @property {string} selectedId ID that should be highlighted in dropdown
 * @property {string} value value for TextInput element
 * @property {'page' | 'page-outlined' | 'page-dense' | 'header' | 'header-filled'} variant Set variant to header|page style
 *
 * @fires action Fires when a selection has been made on the fwc-list element
 */
export class PersonSearchElement extends LitElement implements PersonSearchHost {
  // static shadowRootOptions = { ...Object.assign(LitElement.shadowRootOptions, { delegatesFocus: true }) };

  /* style object css */
  static styles = [sddStyles];

  #task = new PersonSearchTask(this);

  controller = new PersonSearchController(this);

  /* Label passed to the fwc-text-input component */
  @property()
  label = '';
  @state()
  queryString = '';

  /* Placeholder passe to fwc-textinput */
  @property()
  placeholder = '';

  /* Textinput variant passed to the fwc-text-input component */
  @property()
  variant = 'page';

  /* The leading icon to display in fwc-textinput */
  @property()
  leadingIcon = 'search';

  /* The trailing icon to display in fwc-textinput */
  @property({ attribute: false, state: true })
  trailingIcon = '';

  /* The icon string to render in result list items on the meta slot */
  @property()
  meta = '';

  /* value passed to textinput */
  @property()
  value = '';

  /* The icon string to render in result list items on the graphic slot */
  @property()
  graphic = '';

  /* The initial text in the dropdown before keyup event */
  @property()
  initialText = 'Start typing to search';

  /* The leading icon to display in fwc-textinput */
  @property()
  multiple = false;

  /* Label passed to the fwc-text-input component */
  @property()
  dropdownHeight = '250px';

  @property()
  disabled = false;

  @property()
  selectedId = '';

  @property()
  autofocus = false;

  @query('fwc-textinput')
  textInputElement: TextInputElement | undefined;

  @query('fwc-list')
  listElement: ListElement | undefined;

  /**
   * Render the menu if state is open
   * @returns HTMLTemplateResult
   */
  protected renderList(): HTMLTemplateResult {
    if (!this.controller.isOpen) {
      return html``;
    }

    return html`<fwc-list activatable=${true} multi=${this.multiple} @action=${this.controller.handleSelect}>
      ${this.#task.render({
        complete: (result: SearchableDropdownResult) => {
          /*
           * clear previous render items.
           */
          this.controller._listItems = [];

          /* Loop over task result */
          return result.map((item, index) => {
            if (item.type === 'section') {
              if (item.children?.length) {
                const kids = item.children.map((i) => {
                  // we need to save rendered items in state to be able to select them by index from action event
                  this.controller._listItems.push(i.id);

                  // display list item or check list item
                  return i.meta === 'check'
                    ? html`<fwc-person-search-check-list-item .item=${i} />`
                    : html`<fwc-person-search-list-item .item=${i} />`;
                });

                return html`
                  <p key=${uuid()} class="section-title">${item.title}</p>
                  ${kids}
                  ${index + 1 < result.length
                    ? html`<fwc-divider key=${uuid()} variant="list" color="medium"></fwc-divider>`
                    : html``}
                `;
              }
            }

            /* Divider after the selected items stored in controller */
            if (item.type === 'divider') {
              return html`<fwc-divider key=${item.id} variant="list" color="medium"></fwc-divider>`;
            }

            // we need to save rendered item in state to be able to select them by index from action event
            this.controller._listItems.push(item.id);

            // display list item or checklist item
            return item.meta === 'check'
              ? html`<fwc-person-search-check-list-item .item=${item} />`
              : html`<fwc-person-search-list-item .item=${item} />`;
          });
        },
        pending: () =>
          html`<fwc-list-item disabled=${true}><fwc-dots-progress size="small" color="primary" /></fwc-list-item>`,
        /* Error from resolvers searchQuery Promise */
        error: (e: unknown) =>
          html`<fwc-list-item disabled=${true} class="item-error">
            <span class="item-text"><span class="item-title">${e}</span></span>
          </fwc-list-item>`,
      })}
    </fwc-list>`;
  }

  /**
   * The main render function
   * @returns HTMLTemplateResult
   */
  protected render(): HTMLTemplateResult {
    const dense = ['page-dense', 'header', 'header-filled'].indexOf(this.variant) > -1 ? true : undefined;
    const variant = ['header', 'page-outlined'].indexOf(this.variant) > -1 ? 'outlined' : 'filled';
    const disabled = this.disabled ? true : undefined;
    const cssClasses = {
      'fwc-sdd': true,
      'list-open': this.controller.isOpen,
      dense: dense == true,
      'variant-filled': variant === 'filled',
      'variant-outlined': variant === 'outlined',
    };

    return html`<div id=${this.id} class=${classMap(cssClasses)}>
        <div class="input">
          <slot name="leading"></slot>
          <fwc-textinput
            label=${ifDefined(this.label)}
            type="text"
            value=${this.value}
            name="searchabledropdown"
            variant=${variant}
            disabled=${ifDefined(disabled)}
            icon=${this.leadingIcon}
            dense=${ifDefined(dense)}
            placeholder=${this.placeholder}
            @focus=${() => (this.controller.isOpen = true)}
            @keyup=${this.controller.handleKeyup}
          ></fwc-textinput>
          <slot name="trailing">
            <span slot="trailing">
              <fwc-icon
                tabindex=${this.controller.isOpen ? '0' : '-1'}
                class="trailing interactive"
                icon=${this.trailingIcon}
                @click=${this.controller.closeClick}
                @keydown=${this.controller.closeClick}
              ></fwc-icon>
            </span>
          </slot>
        </div>
        <div class="list">
          <div class="list-scroll">${this.renderList()}</div>
        </div>
      </div>
      <style>
        .list-scroll {
          max-height: ${this.dropdownHeight};
        }
      </style>`;
  }
}

export default PersonSearchElement;
