import { CSSResult } from 'lit';
import { RippleBase } from '@material/mwc-ripple/mwc-ripple-base';
import { styles as mdcStyle } from '@material/mwc-ripple/mwc-ripple.css';
import style from './element.css';

export { RippleHandlers } from '@material/mwc-ripple/ripple-handlers';

export type RippleElementProps = {
  primary?: boolean;
  accent?: boolean;
  unbounded?: boolean;
  activated?: boolean;
  selected?: boolean;
  disabled?: boolean;
  startPress?: (e?: Event) => void;
  endPress?: () => void;
  startFocus?: () => void;
  endFocus?: () => void;
  startHover?: () => void;
  endHover?: () => void;
};

export class RippleElement extends RippleBase implements RippleElementProps {
  static styles: CSSResult[] = [mdcStyle, style];
}

export default RippleElement;
