import { CSSResult } from 'lit-element';
import { TextAreaBase } from '@material/mwc-textarea/mwc-textarea-base';
import { style as mdcStyle } from '@material/mwc-textarea/mwc-textarea-css';
import { style as fwcTextInputStyle } from '@equinor/fusion-wc-textinput';
import { style as mdcTextFieldStyle } from '@material/mwc-textfield/mwc-textfield-css';
import elementStyle from './element.css';

export class TextAreaElement extends TextAreaBase {
  static styles: CSSResult[] = [mdcTextFieldStyle, mdcStyle, fwcTextInputStyle, elementStyle];
}

export default TextAreaElement;
