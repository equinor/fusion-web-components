import { CSSResult } from 'lit';
import { SwitchBase } from '@material/mwc-switch/mwc-switch-base';
import { styles as mdcStyle } from '@material/mwc-switch/styles.css';
import style from './element.css';

export type SwitchElementProps = {
  selected?: boolean;
  disabled?: boolean;
};

export class SwitchElement extends SwitchBase implements SwitchElementProps {
  static styles: CSSResult[] = [mdcStyle, style];
}

export default SwitchElement;
