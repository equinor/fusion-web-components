import { CSSResult } from 'lit';
import { ListBase } from '@material/mwc-list/mwc-list-base';
import { styles as mdcStyle } from '@material/mwc-list/mwc-list.css';
import style from './element.css';

export type ListElementProps = {
  activatable?: boolean;
  multi?: boolean;
  emptyMessage?: string;
  wrapFocus?: boolean;
  itemRoles?: string | null;
  innerRole?: string | null;
  innerAriaLabel?: string | null;
  rootTabbable?: boolean;
  noninteractive?: boolean;
};

/**
 * Element for list
 * {@inheritdoc}
 *
 * @tag fwc-list
 *
 * @property {boolean} activatable - Sets activated attribute on selected items which provides a focus-persistent highlight.
 * @property {boolean} rootTabbable - When `true`, sets `tabindex="0"` on the internal list. Otherwise sets `tabindex="-1"`.
 * @property {boolean} multi - When `true`, enables selection of multiple items. This will result in `index` being of type `Set<number>` and selected returning `ListItemBase[]`.
 * @property {boolean} wrapFocus - When `true`, pressing `up` on the keyboard when focused on the first item will focus the last item and `down` when focused on the last item will focus the first item.
 * @property {string} itemRoles - Determines what `role` attribute to set on all list items.
 * @property {string} innerAriaLabel - ARIA label of the internal `<ul>` element.
 * @property {string} innerRole - Role of the internal `<ul>` element.
 * @property {boolean} noninteractive - When `true`, disables focus and pointer events (thus ripples) on the list. Used for display-only lists.
 *
 * @property {ListItemBase[]} items - (readonly*) All list items that are available for selection. Eligible items have the `[mwc-list-item]` attribute which `ListItemBase` applies automatically.
 * @property {SelectedType} selected - (readonly*) Currently-selected list item(s). When `multi` is `true`, `selected` is of type `ListItemBase[]` and when `false`, `selected` is of type `ListItemBase`. `selected` is `null` when no item is selected.
 * @property {MWCListIndex} index - (readonly*) Index / indices of selected item(s). When `multi` is `true`, `index` is of type `number` and when `false`, `index` is of type `Set<number>`. Unset indicies are `-1` and empty `Set<number>` for single and multi selection respectively.
 *
 * @function items - Selects the elements at the given index / indices.
 * @function toggle - Toggles the selected index, and forcibly selects or deselects the value of force if attribute is provided.
 * @function getFocusedItemIndex - Returns the index of the currently-focused item. -1 if none are focused.
 * @function focusItemAtIndex - Focuses the item at the given index and manages tabindex on all other items.
 * @function layout - Resets tabindex on all items and will update items model if provided true. It may be required to call layout if selectability of an element is dynamically changed. e.g. [mwc-list-item] attribute is removed from a list item or noninteractive is dynamically set on a list item.
 *
 * @cssprop {theme.spacing.comfortable.small} --fwc-list-vertical-padding - Padding before and after the first and last list items.
 * @cssprop {theme.spacing.comfortable.medium} --fwc-list-side-padding - Adjusts the padding of the [padded] list dividers (also propagates to fwc-list-item).
 * @cssprop {4.5 * theme.spacing.comfortable.medium} --fwc-list-inset-margin - Adjusts the left inset padding of an [inset] list divider. Typically used for dividing list items with icons.
 *
 * @fires selected - Selects the elements at the given index / indices.
 * @fires action - When a selection has been made via click or keyboard aciton.
 * @fires items-updated - When any of the child items are updated
 *
 * @summary Enhanced list element, based on [Material Web Component](https://github.com/material-components/material-web/tree/master/packages/list)
 */
export class ListElement extends ListBase implements ListElementProps {
  static styles: CSSResult[] = [mdcStyle, style];
}

export default ListElement;
