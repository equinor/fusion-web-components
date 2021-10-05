import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base';
import styles from './element.css';

/**
 * @tag fwc-checkbox
 *
 * @property {boolean} checked - checked if true
 * @property {boolean} indeterminate - indicate that not touched
 * @property {string} name - name of element
 * @property {boolean} disabled - disable interactivity of element
 * @property {boolean} reducedTouchTarget - reduce touch size of lement
 *
 * @cssprop {18px default, 14px reducedTouchTarget} --fwc-checkbox-size  - size of checkbox. **note** setting size will override `reducedTouchTarget`
 * @cssprop {--fwc-checkbox-size / 2} --fwc-checkbox-spacing - Number of pixels padding around checkbox
 */
export class CheckboxElement extends CheckboxBase {}

CheckboxElement.styles = styles;

export default CheckboxElement;
