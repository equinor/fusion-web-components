import { CSSResult } from 'lit';
import { SwitchBase } from '@material/mwc-switch/mwc-switch-base';
import { styles as mdcStyle } from '@material/mwc-switch/styles.css';
import style from './element.css';

export type SwitchElementProps = {
  selected?: boolean;
  disabled?: boolean;
};

/**
 * @tag fwc-switch
 *
 * @attribute {boolean} selected - Sets the switch to selected.
 * @attribute {boolean} disabled - Sets the switch to disabled.
 */
export class SwitchElement extends SwitchBase implements SwitchElementProps {
  static styles: CSSResult[] = [mdcStyle, style];
}

export default SwitchElement;
