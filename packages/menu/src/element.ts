import { MenuBase, type MenuCorner, type Corner } from '@material/mwc-menu/mwc-menu-base';
import { html, type HTMLTemplateResult } from 'lit';
import { ListElement } from '@equinor/fusion-wc-list';

export type MenuElementProps = {
  anchor?: HTMLElement | null;
  open?: boolean;
  quick?: boolean;
  wrapFocus?: boolean;
  innerRole?: 'menu' | 'listbox';
  innerAriaLabel?: string | null;
  corner?: Corner;
  x?: number | null;
  y?: number | null;
  absolute?: boolean;
  multi?: boolean;
  activatable?: boolean;
  fixed?: boolean;
  forceGroupSelection?: boolean;
  fullWidth?: boolean;
  menuCorner?: MenuCorner;
  stayOpenOnBodyClick?: boolean;
};

/**
 * Element for menu
 * {@inheritdoc}
 *
 * @remarks This element is based on [Material Web Component](https://github.com/material-components/material-web/tree/master/packages/menu)
 *
 * @tag fwc-menu
 *
 * @property {boolean} open - Whether the menu should open and display.
 * @property {HTMLElement|null} anchor - Determines from which element the floating menu should calculate sizing and position offsets. In the default case, both `fwc-menu` and the anchor should share a parent with `position:relative`. Changing anchor typically requires `absolute` or `fixed`.
 * @property {Corner`*`} corner - Corner of the anchor from which the menu should position itself.
 * @property {MenuCorner`**`} menuCorner - Horizontal corner of the menu from which the menu should position itself. `NOTE`: Only horizontal corners are supported.
 * @property {boolean} quick - Whether to skip the opening animation.
 * @property {boolean} absolute - Makes the menu's position `absolute` which will be relative to whichever ancestor has `position:relative`. Setting `x` and `y` will modify the menu's `left` and `top`. Setting `anchor` will attempt to position the menu to the `anchor`.
 * @property {boolean} fixed - Makes the menu's position `fixed` which will be relative to the window. Setting `x` and `y` will modify the menu's left and top. Setting `anchor` will attempt to position the menu to the `anchor`'s immediate position before opening.
 * @property {number|null} x - Sets horizontal position when `absolute`. When given an `anchor`, sets horizontal position relative to `anchor` at given `corner`. Requires `y` not to be null.
 * @property {number|null} y - Sets vertical position when `absolute`. When given an `anchor`, sets vertical position relative to `anchor` at given `corner`. Requires `x` not to be null.
 * @property {boolean} forceGroupSelection - Forces a menu group to have a selected item by preventing deselection of menu items in menu groups via user interaction.
 * @property {DefaultFocusState`***`} defaultFocus - Item to focus upon menu open.
 * @property {boolean} fullwidth - Sets surface width to 100%.
 * @property {boolean} stayOpenOnBodyClick - Prevents the menu from closing when clicking outside the menu.
 *
 * @property {boolean} wrapFocus - Proxies to [fwc-list](https://github.com/equinor/fusion-web-components/tree/main/packages/list#propertiesattributes)'s wrapFocus property.
 * @property {string|null} innerAriaLabel - Proxies to [fwc-list](https://github.com/equinor/fusion-web-components/tree/main/packages/list#propertiesattributes)'s innerAriaLabel property.
 * @property {"menu"|"listbox"} innerRole - Proxies to [fwc-list](https://github.com/equinor/fusion-web-components/tree/main/packages/list#propertiesattributes)'s innerRole property.
 * @property {boolean} multi - Proxies to [fwc-list](https://github.com/equinor/fusion-web-components/tree/main/packages/list#propertiesattributes)'s multi property.
 * @property {boolean} activatable - Proxies to [fwc-list](https://github.com/equinor/fusion-web-components/tree/main/packages/list#propertiesattributes)'s activatable property.
 *
 * @property {ListItemBase[]} items - (readonly) All list items that are available for selection. Eligible items have the `[mwc-list-item]` attribute which `ListItemBase` applies automatically.
 * @property {MWCListIndex`****`} index - (readonly) Index / indices of selected item(s). When `multi` is `true`, `index` is of type `number` and when `false`, `index` is of type `Set<number>`. Unset indicies are `-1` and empty `Set<number>` for single and multi selection respectively.
 * @property {SelectedType`*****`} selected - (readonly) Currently-selected list item(s). When `multi` is `true`, `selected` is of type `ListItemBase[]` and when `false`, `selected` is of type `ListItemBase`. `selected` is `null` when no item is selected.
 *
 * `*` Corner is equivalent to type "TOP_LEFT"|"TOP_RIGHT"|"BOTTOM_LEFT"|"BOTTOM_RIGHT"|"TOP_START"|"TOP_END" |"BOTTOM_START"|"BOTTOM_END"
 *
 * `**` MenuCorner  is equivalent to type "START"|"END"
 *
 * `***` DefaultFocusState is equivalent to type "NONE"|"LIST_ROOT"|"FIRST_ITEM"|"LAST_ITEM"
 *
 * `****` MWCListIndex is equivalent to type number|Set<number>
 *
 * `*****` SelectedType is equivalent to type ListItemBase|ListItemBase[]|null. ListItemBase is the base class of fwc-list-item of which both fwc-check-list-item and fwc-radio-list-item also inherit from.
 *
 * @function show() => void - Sets `open` to true.
 * @function close() => void - Sets `open` to false.
 * @function select(index: MWCMenuIndex) => void - Selects the elements at the given index / indices.
 * @function getFocusedItemIndex() => number - Returns the index of the currently-focused item. `-1` if none are focused.
 * @function focusItemAtIndex(index) => void - Focuses the item at the given index and manages tabindex on all other items.
 * @function layout(updateItems = true) => void - Resets tabindex on all items and will update `items` model if provided true. It may be required to call layout if selectability of an element is dynamically changed. e.g. `[mwc-list-item]` attribute is removed from a list item or `noninteractive` is dynamically set on a list item.
 *
 * @fires opened - Targets mwc-menu-surface. Fired when opened.
 * @fires closing - Targets mwc-menu-surface. Fired when closing but animation may not have completed yet. Use for time-sensitive logic that must be run immediately upon close.
 * @fires closed - Targets mwc-menu-surface. Fired when closed.
 * @fires action - Targetsfwc-list. Fired when a selection has been made via click or keyboard aciton.
 * @fires selected - Targets fwc-list. Fired when a selection has been made. `index` is the selected index (will be of type `Set<number>` if multi and `number` if single), and diff (of type IndexDiff**) represents the diff of added and removed indices from previous selection.
 *
 */
export class MenuElement extends MenuBase implements MenuElementProps {
  protected override get listElement(): ListElement | null {
    if (!this.listElement_) {
      this.listElement_ = this.renderRoot.querySelector('fwc-list');
      return this.listElement_;
    }
    return this.listElement_;
  }
  override render(): HTMLTemplateResult {
    return html`<mwc-menu-surface
      ?hidden=${!this.open}
      .anchor=${this.anchor}
      .open=${this.open}
      .quick=${this.quick}
      .corner=${this.corner}
      .x=${this.x}
      .y=${this.y}
      .absolute=${this.absolute}
      .fixed=${this.fixed}
      .fullwidth=${this.fullwidth}
      .menuCorner=${this.menuCorner}
      ?stayOpenOnBodyClick=${this.stayOpenOnBodyClick}
      class="mdc-menu mdc-menu-surface"
      @closed=${this.onClosed}
      @opened=${this.onOpened}
      @keydown=${this.onKeydown}
    >
      ${this.renderList()}
    </mwc-menu-surface>`;
  }
  protected renderList(): HTMLTemplateResult {
    const itemRoles = this.innerRole === 'menu' ? 'menuitem' : 'option';
    return html`<fwc-list
      rootTabbable
      .innerAriaLabel=${this.innerAriaLabel}
      .innerRole=${this.innerRole}
      .multi=${this.multi}
      class="mdc-deprecated-list"
      .itemRoles=${itemRoles}
      .wrapFocus=${this.wrapFocus}
      .activatable=${this.activatable}
      @action=${this.onAction}
    >
      <slot></slot>
    </fwc-list>`;
  }
}

export default MenuElement;
