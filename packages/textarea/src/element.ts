import { CSSResult } from 'lit-element';
import { TextAreaBase } from '@material/mwc-textarea/mwc-textarea-base';
import { styles as mdcStyle } from '@material/mwc-textarea/mwc-textarea.css';
import { style as fwcTextInputStyle, mdcStyle as mdcTextInputStyle } from '@equinor/fusion-wc-textinput';
import elementStyle from './element.css';
import { TextInputElementProps } from 'textinput/src/element';

export type TextAreaElementProps = TextInputElementProps & {
  rows?: number;
  cols?: number;
};

export class TextAreaElement extends TextAreaBase implements TextAreaElementProps {
  static styles: CSSResult[] = [mdcStyle, mdcTextInputStyle, fwcTextInputStyle, elementStyle];
}

export default TextAreaElement;
