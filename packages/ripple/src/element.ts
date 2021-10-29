import { CSSResult } from 'lit';
import { RippleBase } from '@material/mwc-ripple/mwc-ripple-base';
import { RippleElementProps } from './types';
import { styles as mdcStyle } from '@material/mwc-ripple/mwc-ripple.css';

export { RippleHandlers } from '@material/mwc-ripple/ripple-handlers';

/**
 * Ripple provides the JavaScript and CSS required to provide components (or any element at all) with a material "ink ripple" interaction effect.
 * See [`MWC Ripple`](https://github.com/material-components/material-web/tree/master/packages/ripple) for more information.
 *
 * {@inheritdoc}
 *
 * @tag fwc-ripple
 * @property {boolean} primary - When true, sets the ripple color to --fwc-theme-primary. Will be overridden by --fwc-ripple-color if set.
 * @property {boolean} accent - When true, sets the ripple color to --fwc-theme-secondary. Will be overridden by --fwc-ripple-color if set.
 * @property {boolean} unbounded	- When true, the ripple will flow outside the component in a circle.
 * @property {boolean} activated - Set true when the container of the ripple should be in an `activated` state.
 * @property {boolean} selected - Set true when the container of the ripple should be in a `selected` state.
 * @property {string} disabled - Set true to disable the ripple when the container of the ripple is disabled.
 *
 * @cssprop {#000} --mdc-ripple-color - Base color of the ripple
 * @cssprop {0.1} --fwc-ripple-hover-opacity - Opacity of the ripple
 */
export class RippleElement extends RippleBase implements RippleElementProps {
  static styles: CSSResult[] = [mdcStyle];
}

export default RippleElement;
