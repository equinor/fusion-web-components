import { html, LitElement, type HTMLTemplateResult, type CSSResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { queryAll } from 'lit/decorators/query-all.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { cache } from 'lit/directives/cache.js';

import { PersonSelectController } from './controller';
import { styles as psStyles } from './element.css';
import { PersonSearchTask, PersonSearchControllerHost } from '../../tasks/person-search-task';

import { SearchableDropdownControllerHost } from '@equinor/fusion-wc-searchable-dropdown';

import type { PersonInfo } from '../../types';

import AvatarElement from '@equinor/fusion-wc-avatar';
import IconElement from '@equinor/fusion-wc-icon';
import ListElement, { ListItemElement } from '@equinor/fusion-wc-list';
import TextInputElement from '@equinor/fusion-wc-textinput';
import { PersonListItemElement } from '../list-item';
import { IconButtonElement } from '@equinor/fusion-wc-button';
AvatarElement;
IconElement;
ListElement;
TextInputElement;
PersonListItemElement;
IconButtonElement;

// TODO !!!! clean up when extending fwc-searchable-dropdown

/**
 * Element for SearchableDropdown
 * @tag fwc-person-select
 *
 * @property {boolean} autofocus Focus the fwx-textInput on hostconnect
 * @property {boolean} disabled disable TextInput element
 * @property {string} dropdownHeight Sets max-height of list so user can scroll trough results
 * @property {string} graphic Icon to show before each fwc-list-item. If you want an icon only on one list-item then use the graphic property on the SearchableDropdownResultItem
 * @property {string} initialText Text to display in dropdown before/without querystring in fwc-textinput
 * @property {string} leadingIcon Leading Icon to display in fwc-text-input
 * @property {string} meta Icon to show after each fwc-list-item. If you want an icon only on one list-item then use the meta property on the SearchableDropdownResultItem
 * @property {string} multiple Able to select multiple items
 * @property {string} selectedId ID that should be highlighted in dropdown
 * @property {string} value value for TextInput element
 * @property {'page' | 'page-outlined' | 'page-dense' | 'header' | 'header-filled'} variant Set variant to header|page style
 *
 * @fires action Fires when a selection has been made on the fwc-list element
 *
 * @todo
 * @eikeland
 * This should extend `SearchableDropdownElement`.
 *
 * the only difference i see here is `PersonSearchTask` which can be overridden.
 * the base class should have a function for rendering result:
 * ```ts
 * interface renderListItems(items: TResult): HTMLTemplateResult;
 * ```
 */
export class PersonSelectElement
  extends LitElement
  implements SearchableDropdownControllerHost, PersonSearchControllerHost
{
  /* style object css */
  static styles: CSSResult[] = psStyles;

  /**
   * Label passed to the fwc-text-input component
   */
  @property()
  label = '';

  /**
   * @internal
   */
  @state()
  search = '';

  /**  Placeholder passe to fwc-textinput */
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
  trailingIcon = 'close';

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
  textInputElement!: TextInputElement;

  @query('fwc-list')
  listElement!: ListElement;

  @queryAll('fwc-list-item:not([disabled])')
  listItems!: Array<ListItemElement<PersonInfo>>;

  private tasks = {
    search: new PersonSearchTask(this),
  };

  protected controllers = {
    element: new PersonSelectController(this),
  };

  /**
   * Render the menu if state is open
   * @returns HTMLTemplateResult
   */
  protected renderList(): HTMLTemplateResult {
    if (!this.controllers.element.isOpen) {
      return html``;
    }

    return html`<fwc-list activatable=${true} multi=${this.multiple} @action=${this.controllers.element.handleSelect}>
      ${this.tasks?.search.render({
        complete: (result) => {
          if (!result.length && this.search.length < 3) {
            return html`
              <fwc-list-item disabled=${true} color="primary" aria-disabled="true">
                Start typing to search.
              </fwc-list-item>
            `;
          } else if (!result.length && this.search.length) {
            return html`
              <fwc-list-item disabled=${true} color="primary" aria-disabled="true">
                No matching person found
              </fwc-list-item>
            `;
          }

          this.controllers.element._listItems = result.map((item) => item.azureId);

          return html`
            ${repeat(
              result,
              (item) => item.azureId,
              (item) => {
                return html`
                  <fwc-list-item
                    graphic="avatar"
                    .activated=${this.controllers.element.selectedIds.has(item.azureId)}
                    .dataSource=${item}
                  >
                    <fwc-person-avatar
                      .azureId=${item.azureId}
                      .dataSource=${item}
                      size="small"
                      slot="graphic"
                      trigger="none"
                    ></fwc-person-avatar>
                    <span class="item-text">
                      ${item.name && html`<span class="item-title">${item.name}</span>`}
                      ${item.mail && html`<span class="item-subtitle" slot="secondary">${item.mail}</span>`}
                    </span>
                  </fwc-list-item>
                `;
              },
            )}
          `;
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

  protected selectedPersonsTemplate(): HTMLTemplateResult {
    const { selectedIds } = this.controllers.element;
    /* Empty template when no person is selected */
    if (selectedIds.size < 1 || this.controllers.element.isOpen) {
      return html``;
    }

    const people = Array.from(selectedIds).map((item) => ({ azureId: item }));

    /* show all selected persons */
    return html`${cache(
      html`<ul id="selected-persons">
        ${repeat(
          people,
          (item) => item.azureId,
          (item) => {
            return html`<li>
              <fwc-person-list-item size="small" azureid="${item.azureId}"></fwc-person-list-item>
              <fwc-icon-button
                icon="close_circle_outlined"
                size="x-small"
                color="secondary"
                @click=${() => this.controllers.element.deSelectId(item.azureId)}
              ></fwc-icon-button>
            </li>`;
          },
        )}
      </ul>`,
    )}`;
  }

  /**
   * The main render functions
   * @returns HTMLTemplateResult
   */
  protected render(): HTMLTemplateResult {
    const dense = ['page-dense', 'header', 'header-filled'].indexOf(this.variant) > -1 ? true : undefined;
    const variant = ['header', 'page-outlined'].indexOf(this.variant) > -1 ? 'outlined' : 'filled';
    const disabled = this.disabled ? true : undefined;

    const cssClasses = {
      'fwc-sdd': true,
      'list-open': this.controllers.element.isOpen,
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
            @focus=${() => (this.controllers.element.isOpen = true)}
            @keyup=${this.controllers.element.handleKeyup}
          ></fwc-textinput>
          ${this.selectedPersonsTemplate()}
          <slot name="trailing">
            <span slot="trailing">
              ${this.controllers.element.selectedIds.size || this.controllers.element.isOpen
                ? html`<fwc-icon
                    tabindex=${this.controllers.element.isOpen ? '0' : '-1'}
                    class="trailing interactive"
                    icon=${this.trailingIcon}
                    @click=${this.controllers.element.closeClick}
                    @keydown=${this.controllers.element.closeClick}
                  ></fwc-icon>`
                : html``}
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

export default PersonSelectElement;
