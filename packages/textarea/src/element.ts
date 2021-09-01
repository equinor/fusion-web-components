import { CSSResult } from 'lit-element';
import { TextAreaBase } from '@material/mwc-textarea/mwc-textarea-base';
import { styles as mdcStyle } from '@material/mwc-textarea/mwc-textarea.css';
import {
  fwcStyle as fwcTextInputStyle,
  mdcStyle as mdcTextInputStyle,
  TextInputElementProps,
} from '@equinor/fusion-wc-textinput';
import elementStyle from './element.css';

export type TextAreaElementProps = TextInputElementProps & {
  rows?: number;
  cols?: number;
};

export class TextAreaElement extends TextAreaBase implements TextAreaElementProps {
  static styles: CSSResult[] = [mdcStyle, mdcTextInputStyle, fwcTextInputStyle, elementStyle];
}

export default TextAreaElement;
