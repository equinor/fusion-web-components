import { MarkType } from 'prosemirror-model';
import { Command, EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { MdMenuItemType, getMenuItemByType } from './menuItems';

export type MenuItem = {
  command: Command;
  dom: HTMLButtonElement;
  type: unknown;
};

export class MenuView {
  editorView: EditorView;
  items: MenuItem[];
  dom: Element;

  constructor(items: MenuItem[], editorView: EditorView, menuContainer: Element) {
    this.items = items;
    this.editorView = editorView;

    this.dom = menuContainer;
    items.forEach(({ dom }) => this.dom.appendChild(dom));
    this.update();

    this.dom.addEventListener('mousedown', (e: Event) => {
      e.preventDefault();
      editorView.focus();
      items.forEach(({ command, dom }) => {
        if (dom.contains(e.target as Node)) command(editorView.state, editorView.dispatch, editorView);
      });
    });
  }
  private isMarkActive(state: EditorState, type: MarkType) {
    const { from, $from, to, empty } = state.selection;
    if (!type.isInSet) {
      return false;
    }
    if (empty) {
      return type.isInSet(this.editorView.state.storedMarks || $from.marks());
    }
    return this.editorView.state.doc.rangeHasMark(from, to, type);
  }

  protected updateMeuItem() {
    this.items.forEach(({ command, dom, type }) => {
      const activeMark = this.isMarkActive(this.editorView.state, type as MarkType);
      const applicable = command(this.editorView.state, undefined, this.editorView);

      if (applicable) {
        dom.classList.remove('disabled');
      } else {
        dom.classList.add('disabled');
      }
      if (activeMark) {
        dom.classList.add('active');
      } else {
        dom.classList.remove('active');
      }
    });
  }

  update() {
    this.updateMeuItem();
  }

  destroy() {
    this.dom.remove();
  }
}

export default function menuPlugin(menuContainer: Element, itemTypes: Array<MdMenuItemType>) {
  return new Plugin({
    view(editorView) {
      const items = itemTypes.map((type) => getMenuItemByType(type));
      const menuView = new MenuView(items, editorView, menuContainer);
      return menuView;
    },
  });
}
