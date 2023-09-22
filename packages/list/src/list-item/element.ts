import { CSSResult, HTMLTemplateResult, html } from 'lit';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { styles as mdcStyle } from '@material/mwc-list/mwc-list-item.css';
import style from './element.css';

/**
 * Element for list item
 * {@inheritdoc}
 *
 * @tag fwc-list-item
 *
 * @property {string} value - Value associated with this list item (used by fwc-select).
 * @property {string|null} group - Used to group items together (used by mwc-menu for menu selection groups and mwc-radio-list-element).
 * @property {number} tabindex - Reflects tabindex and sets internal tab indices.
 * @property {boolean} disabled - Reflects disabled and sets internal disabled attributes.
 * @property {boolean} twoline - Activates the two-line variant and enables the secondary slot.
 * @property {boolean} activated - Activates focus-persistent ripple.
 * @property {GraphicType} graphic - Determines which graphic layout to show and enables the graphic slot.
 * @property {boolean} hasMeta - Activates the meta layout tile and enables the meta slot.
 * @property {boolean} noninteractive - Disables focus and pointer events for the list item.
 * @property {boolean} selected - Denotes that the list item is selected.
 *
 * @property {string} text - (readonly*) Trimmed textContent of the list item.
 *
 * @cssprop {theme.spacing.comfortable.medium} --fwc-list-side-padding - Adjusts the padding of the [padded] list dividers (also propagates to fwc-list-item).
 * @cssprop {theme.typography.paragraph.body_short.color} --fwc-list-item-ink-color - Sets the primary text color.
 * @cssprop {theme.typography.paragraph.caption.color} --fwc-list-item-secondary-ink-color - Sets the secondary text color.
 * @cssprop {theme.typography.paragraph.meta.color} --fwc-list-item-meta-color - Sets the meta color.
 * @cssprop {theme.typography.paragraph.body_short.fontSize} --fwc-list-item-font-size - Sets primary text font size.
 * @cssprop {theme.typography.paragraph.body_short.fontWeight} --fwc-list-item-font-weight - Sets primary text font weight.
 * @cssprop {theme.typography.paragraph.caption.fontSize} --fwc-list-item-secondary-font-weight - Sets secondary text font size.
 *
 * @fires request-selected - Fired upon click and when selected property is changed. Requests selection from the mwc-list.
 * @fires list-item-rendered - When a list item has been rendered
 *
 * @summary Enhanced list item element, based on [Material Web Component](https://github.com/material-components/material-web/tree/master/packages/list)
 */
export class ListItemElement<TDataSource = unknown>
  extends ListItemBase
  implements Omit<ListItemBase, 'multipleGraphics'>
{
  static styles: CSSResult[] = [mdcStyle, style];

  dataSource?: TDataSource;

  /**
   * Render text slot
   */
  protected override renderText(): HTMLTemplateResult {
    const inner = this.twoline ? this.renderTwoLines() : this.renderSingleLine();
    return html` <span class="fwc-list-item__text"> ${inner}</span>`;
  }

  /**
   * Render text as two lines (default and secondary slots)
   */
  protected renderTwoLines(): HTMLTemplateResult {
    return html`
      <span class="fwc-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="fwc-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `;
  }

  protected override renderGraphic(): HTMLTemplateResult {
    return html`<span class="fwc-list-item__graphic"><slot name="graphic"></slot></span>`;
  }

  protected override renderMeta(): HTMLTemplateResult {
    return html`<slot class="fwc-list-item__meta" name="meta"></slot>`;
  }
}

export default ListItemElement;
