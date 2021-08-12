import { fusionElement } from '@equinor/fusion-wc-core';
import TextInputElement, { TextInputElementProps } from './element';
export {
  TextInputElement,
  TextInputElementProps,
  TextInputVariant,
  ValidityTransform,
  TextInputType,
  TextInputCharCounter,
} from './element';
export { default as fwcStyle } from './element.css';
export { styles as mdcStyle } from '@material/mwc-textfield/mwc-textfield.css';
export const tag = 'fwc-textinput';
@fusionElement(tag)
export default class _ extends TextInputElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: TextInputElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<TextInputElementProps & React.HTMLAttributes<TextInputElement>>,
        TextInputElement
      >;
    }
  }
}
