import { MenuBase, MenuCorner, Corner } from '@material/mwc-menu/mwc-menu-base';
import { html, HTMLTemplateResult } from 'lit-html';
import styles from './element.css';
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
 * @tag fwc-menu
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
    return html` <mwc-menu-surface
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
      ${this.renderList}
    </mwc-menu-surface>`;
  }
  protected renderList(): HTMLTemplateResult {
    const itemRoles = this.innerRole === 'menu' ? 'menuitem' : 'option';
    return html` <fwc-list
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

MenuElement.styles = styles;

export default MenuElement;
