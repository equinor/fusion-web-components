import { RadioBase } from '@material/mwc-radio/mwc-radio-base';
import styles from './element.css';

export type RadioElementProps = {
  disabled?: boolean;
  checked?: boolean;
};

/**
 * @tag fwc-radio
 *
 * @property {boolean} checked - checked if true
 * @property {string} name - name of element
 * @property {boolean} disabled - disable interactivity of element
 * @property {boolean} reducedTouchTarget - reduce touch size of lement
 *
 * @cssprop {18px default, 14px reducedTouchTarget} --fwc-radio-size  - size of radio. **note** setting size will override `reducedTouchTarget`
 * @cssprop {--fwc-radio-size / 2} --fwc-radio-spacing - Number of pixels padding around radio
 * @cssprop {theme.colors.interactive.primary__resting} --fwc-radio-color - Color of radio
 *
 */
export class RadioElement extends RadioBase implements RadioElementProps {}

RadioElement.styles = styles;

export default RadioElement;
