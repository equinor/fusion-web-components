import type { MenuSizes } from '../types';
import type { MdMenuItemType } from './menuItems';

export type MarkdownEditorElementProps = {
  menuItems?: Array<MdMenuItemType>;
  minHeight?: string;
  menuSize?: MenuSizes;
};
