import { CSSResult } from 'lit';
import { ListBase } from '@material/mwc-list/mwc-list-base';
import { styles as mdcStyle } from '@material/mwc-list/mwc-list.css';
import style from './element.css';

export type ListElementProps = {
  activatable?: boolean;
  multi?: boolean;
  emptyMessage?: string;
  wrapFocus?: boolean;
  innerRole?: string | null;
  innerAriaLabel?: string | null;
  rootTabbable?: boolean;
  noninteractive?: boolean;
  hasMeta?: boolean;
};

export class ListElement extends ListBase implements ListElementProps {
  static styles: CSSResult[] = [mdcStyle, style];
}

export default ListElement;
