import { type CSSResult } from 'lit';
import { styles as mdcStyles } from '@material/mwc-textarea/mwc-textarea.css';
import { styles as baseStyles } from '@equinor/fusion-wc-textinput';

export const styles: CSSResult[] = [mdcStyles, ...baseStyles];

export default styles;
