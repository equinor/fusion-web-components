import { CSSResult } from 'lit';
import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base';
import { styles as mdcStyle } from '@material/mwc-checkbox/mwc-checkbox.css';
import style from './element.css';

export type CheckboxElementProps = {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  reducedTouchTarget?: boolean;
  value?: string;
};

export class CheckboxElement extends CheckboxBase implements CheckboxElementProps {
  static styles: CSSResult[] = [mdcStyle, style];
}

export default CheckboxElement;
