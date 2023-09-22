import { toggleMark, setBlockType } from 'prosemirror-commands';
import { wrapInList } from 'prosemirror-schema-list';
import { schema } from 'prosemirror-markdown';
import { MenuItem } from './menu';
import { type IconName } from '@equinor/fusion-wc-icon';

export type MdMenuItemType =
  | 'strong'
  | 'em'
  | 'ordered_list'
  | 'bullet_list'
  | 'paragraph'
  | 'blockquote'
  | 'h1'
  | 'h2'
  | 'h3';

const icon = (text: string, name: string) => {
  const button = document.createElement('button');
  button.className = 'button ' + name;
  button.title = name;
  button.innerHTML = text;
  return button;
};

const MenuIcon = (icon: IconName) => {
  return `<fwc-icon class="menu_icon" icon="${icon}" />`;
};

const heading = (level: number) => ({
  command: setBlockType(schema.nodes.heading, { level }),
  dom: icon('H' + level, 'heading ' + level),
  type: schema.nodes.heading,
});

export const getMenuItemByType = (type: MdMenuItemType): MenuItem => {
  switch (type) {
    case 'em':
      return {
        command: toggleMark(schema.marks.em),
        dom: icon(MenuIcon('format_italics'), 'em'),
        type: schema.marks.em,
      };
    case 'strong':
      return {
        command: toggleMark(schema.marks.strong),
        dom: icon(MenuIcon('format_bold'), 'strong'),
        type: schema.marks.strong,
      };
    case 'ordered_list':
      return {
        command: wrapInList(schema.nodes.ordered_list),
        dom: icon(MenuIcon('format_list_numbered'), 'Ordered list'),
        type: schema.nodes.ordered_list,
      };
    case 'bullet_list':
      return {
        command: wrapInList(schema.nodes.bullet_list),
        dom: icon(MenuIcon('format_list_bulleted'), 'Bullet list'),
        type: schema.nodes.bullet_list,
      };
    case 'blockquote':
      return {
        command: wrapInList(schema.nodes.blockquote),
        dom: icon(MenuIcon('format_quote'), 'blockquote'),
        type: schema.nodes.blockquote,
      };
    case 'paragraph':
      return {
        command: setBlockType(schema.nodes.paragraph),
        dom: icon('p', 'paragraph'),
        type: schema.nodes.paragraph,
      };
    case 'h1':
      return heading(1);
    case 'h2':
      return heading(2);
    case 'h3':
      return heading(3);
  }
};
