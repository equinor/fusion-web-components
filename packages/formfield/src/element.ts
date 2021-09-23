import { CSSResult } from 'lit';
import { FormfieldBase } from '@material/mwc-formfield/mwc-formfield-base';
import { styles as mdcStyle } from '@material/mwc-formfield/mwc-formfield.css';
import style from './element.css';

export type FormfieldElementProps = {
  label?: string;
  alignEnd?: boolean;
  spaceBetween?: boolean;
  nowrap?: boolean;
};

export class FormfieldElement extends FormfieldBase implements FormfieldElementProps {
  static styles: CSSResult[] = [mdcStyle, style];
}

export default FormfieldElement;
