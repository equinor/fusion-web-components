import { MenuSizes } from '../types';
import { MdMenuItemType } from './menuItems';

export type MarkdownEditorElementProps = {
  menuItems?: Array<MdMenuItemType>;
  minHeight?: string;
  menuSize?: MenuSizes;
};
