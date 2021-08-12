import { CSSResult } from 'lit-element';
import { SwitchBase } from '@material/mwc-switch/mwc-switch-base';
import { styles as mdcStyle } from '@material/mwc-switch/mwc-switch.css';
import style from './element.css';

export type SwitchElementProps = {
  checked?: boolean;
  disabled?: boolean;
};

export class SwitchElement extends SwitchBase implements SwitchElementProps {
  static styles: CSSResult[] = [mdcStyle, style];
}

export default SwitchElement;
