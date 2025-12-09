import { html, LitElement, type HTMLTemplateResult, type CSSResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { queryAll } from 'lit/decorators/query-all.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { cache } from 'lit/directives/cache.js';
import { TaskStatus } from '@lit/task';

import { PersonSelectController } from './controller';
import { styles as psStyles } from './element.css';
import { PersonSearchTask, PersonSearchControllerHost, PersonInfoTask } from '../../tasks';

import type { PersonInfo, PersonSearchResult } from '../../types';
import type { SelectedPersonProp } from './index';

import IconElement from '@equinor/fusion-wc-icon';
import ListElement, { ListItemElement } from '@equinor/fusion-wc-list';
import TextInputElement from '@equinor/fusion-wc-textinput';
import { PersonListItemElement } from '../list-item';
import { PersonAvatarElement } from '../avatar';
IconElement;
ListElement;
TextInputElement;
PersonListItemElement;
PersonAvatarElement;

// TODO !!!! clean up when extending fwc-searchable-dropdown
/**
 * Element for SearchableDropdown
 * @tag fwc-person-select
 *
 * @property { boolean } autofocus Focus the fwx-textInput on hostconnect
 * @property { boolean } disabled disable TextInput element
 * @property { string } dropdownHeight Sets max-height of list so user can scroll trough results
 * @property { string } graphic Icon to show before each fwc-list-item. If you want an icon only on one list-item then use the graphic property on the SearchableDropdownResultItem
 * @property { string } initialText Text to display in dropdown before/without querystring in fwc-textinput
 * @property { string } leadingIcon Leading Icon to display in fwc-text-input
 * @property { string } meta Icon to show after each fwc-list-item. If you want an icon only on one list-item then use the meta property on the SearchableDropdownResultItem
 * @property { string } multiple Able to select multiple items
 * @property { string } selectedId ID that should be highlighted in dropdown
 * @property { PersonInfo | PersonInfo.azureId | PersonInfo.upn | null | undefined } selectedPerson Selected Person to resolve or clear afer each selection
 * @property { string } value TextInput value wich triggers personResolver
 * @property { 'page' | 'page-outlined' | 'page-dense' | 'header' | 'header-filled' } variant Set variant to header|page style
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
export class PersonSelectElement extends LitElement implements PersonSearchControllerHost, SelectedPersonProp {
  /* style object css */
  static styles: CSSResult[] = psStyles;

  /**
   * Label passed to the fwc-text-input component
   */
  @property()
  label = '';

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

  /* State for triggering PersonInfo task */
  @state()
  azureId?: string;

  /* State for triggering PersonInfo task */
  @state()
  upn?: string;

  /** State for triggering PersonSearch task */
  @state()
  search = '';

  @property({
    attribute: 'selected-person',
    type: String,
    converter(value) {
      /* converter to allow user to pass personobject as property */
      if (value?.length) {
        try {
          return JSON.parse(value);
        } catch {
          if (value?.match('@')) {
            return { upn: value.toLocaleLowerCase() };
          } else if (value?.length) {
            return { azureId: value.toLocaleLowerCase() };
          }
        }
      }
      return null;
    },
  })
  selectedPerson: PersonInfo | null | undefined = undefined;

  @property()
  autofocus = false;

  @query('fwc-textinput')
  textInputElement!: TextInputElement;

  @query('fwc-list')
  listElement!: ListElement;

  @queryAll('fwc-list-item:not([disabled])')
  listItems!: Array<ListItemElement<PersonInfo>>;

  protected tasks = {
    info: new PersonInfoTask(this),
    search: new PersonSearchTask(this),
  };

  protected controllers = {
    element: new PersonSelectController(this),
  };

  focusTextInput() {
    requestAnimationFrame(() => {
      if (this.textInputElement) {
        this.textInputElement.focus();
      }
    });
  }

  updated(props: Map<string, string | null | undefined>) {
    if (props.has('selectedPerson')) {
      this.controllers.element.resolveSelectedPerson();
    }
  }

  private selectedPersonTask() {
    /* make sure there is no running search task */
    if (!this.search) {
      // task is complete and we have the attribute
      if (this.selectedPerson && this.tasks.info.status === TaskStatus.COMPLETE) {
        // save result in controller if not already there
        if (!this.controllers.element.selectedIds.size) {
          this.controllers.element.selectPersonInfo(this.tasks.info.value as PersonInfo);
        }
      }
    }
  }

  /**
   * Render the dropdown list if state is open
   * @returns HTMLTemplateResult
   */
  protected renderList(): HTMLTemplateResult {
    /* do not render dropdown list when its closed */
    if (!this.controllers.element.isOpen) {
      return html``;
    }

    const pendingListItem = () =>
      html`<fwc-list-item disabled=${true}>
        <fwc-dots-progress size="small" color="primary" />
      </fwc-list-item>`;

    const errorListItem = (e: unknown) =>
      html`<fwc-list-item disabled=${true} class="item-error">
        <span class="item-text"><span class="item-title">${e}</span></span>
      </fwc-list-item>`;

    const renderListItems = (result: PersonSearchResult): HTMLTemplateResult => {
      if (!result.length && this.search.length < 3) {
        return html`
          <fwc-list-item disabled=${true} color="primary" aria-disabled="true"> Start typing to search. </fwc-list-item>
        `;
      } else if (!result.length && this.search.length) {
        return html`
          <fwc-list-item disabled=${true} color="primary" aria-disabled="true">
            No matching person found
          </fwc-list-item>
        `;
      }

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
    };

    return html`<fwc-list activatable=${true} multi=${this.multiple} @action=${this.controllers.element.handleSelect}>
      ${this.tasks.search.render({
      complete: renderListItems,
      pending: pendingListItem,
      error: errorListItem,
    })}
    </fwc-list>`;
  }

  protected selectedPersonsTemplate(): HTMLTemplateResult {
    const { selectedIds } = this.controllers.element;
    /* Empty template when no person is selected */
    if (selectedIds.size < 1 || this.controllers.element.isOpen) {
      return html``;
    }

    // convert selected azureId to PeronInfo for returning to PersonSelectEvent
    const people = Array.from(selectedIds).map((sel) => ({
      azureId: sel,
    }));

    /* show all selected persons */
    return html`${cache(
      html`<ul id="selected-persons">
        ${repeat(
        people,
        (item) => item.azureId,
        (item) => {
          return html`<li>
              <fwc-person-list-item
                size="small"
                azureid="${item.azureId}"
                @click=${() => (this.controllers.element.isOpen = true)}
              ></fwc-person-list-item>
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
      'selected-persons': this.controllers.element.selectedIds.size > 0 && !this.controllers.element.isOpen,
    };

    /** Select person by selectedPerson property on info task */
    this.selectedPersonTask();

    return html`<div id=${this.id} class=${classMap(cssClasses)}>
        <div class="input">
          <slot name="leading"></slot>
          ${this.selectedPersonsTemplate()}
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
            @focus=${() => {
        this.controllers.element.isOpen = true;
      }}
            @keyup=${this.controllers.element.handleKeyup}
          ></fwc-textinput>
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
