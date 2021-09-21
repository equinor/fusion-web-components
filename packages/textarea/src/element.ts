import { CSSResult } from 'lit-element';
import { TextAreaBase } from '@material/mwc-textarea/mwc-textarea-base';
import { styles as mdcStyle } from '@material/mwc-textarea/mwc-textarea.css';
import {
  fwcStyle as fwcTextInputStyle,
  mdcStyle as mdcTextInputStyle,
  TextInputElementProps,
} from '@equinor/fusion-wc-textinput';
import elementStyle from './element.css';

export type TextAreaElementProps = Omit<TextInputElementProps, 'type'> & {
  /** number of row span (width) */
  rows?: number;
  /** number of col span (height) */
  cols?: number;
  /**
   * reset components validity
   */
  clearValidity: VoidFunction;
};

export class TextAreaElement extends TextAreaBase implements TextAreaElementProps {
  static styles: CSSResult[] = [mdcStyle, mdcTextInputStyle, fwcTextInputStyle, elementStyle];
  setCustomValidity(txt: string): void {
    super.setCustomValidity(txt);
    !txt && this.clearValidity();
  }

  clearValidity(): void {
    this.mdcFoundation.setValid(true);
    this.isUiValid = true;
  }
}

export default TextAreaElement;
