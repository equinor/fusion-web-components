import { CSSResult } from 'lit-element';
import { RadioBase } from '@material/mwc-radio/mwc-radio-base';
import { styles as mdcStyle } from '@material/mwc-radio/mwc-radio.css';
import { style } from './element.css';

export type RadioElementProps = {
  checked?: boolean;
  disabled?: boolean;
  formElementTabIndex?: number;
  global?: boolean;
  indeterminate?: boolean;
  name?: string;
  reducedTouchTarget?: boolean;
  value?: string;
};

export class RadioElement extends RadioBase implements RadioElementProps {
  static styles: CSSResult[] = [mdcStyle, style];
}

export default RadioElement;
