import { property } from 'lit/decorators.js';
import styles from './element.css';
import { IconButtonBase } from '@material/mwc-icon-button/mwc-icon-button-base';
import { IconElement } from '@equinor/fusion-wc-icon';
// import { IconName } from '@equinor/fusion-wc-icon';

// Persist element
IconElement;

/**
 * Element for rendering an icon button.
 * {@inheritdoc}
 *
 * @tag fwc-icon-button
 *
 * @property {IconName} icon - Sets the icon of the icon button element.
 * @property {ButtonColor} color - Sets the color of the icon button element.
 * @property {String} shape - Sets the shape of the icon button element to rounded or square.
 * @property {boolean} disabled - Sets the icon button to disabled.
 *
 * @cssprop {theme.colors.text.static_icons__primary_white} --fwc-avatar-ink-color - text color of the element.
 * @cssprop {theme.colors.interactive.primary__resting} --fwc-avatar-base-color - base color of the element.
 *
 * @fires click - When the element is clicked
 *
 * Content can be slotted in with a slot named 'icon'.
 */

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled';
export type ButtonSize = 'x-small' | 'small' | 'medium' | 'large';

export type IconButtonElementProps = {
  ariaLabel?: string;
  ariaHasPopup?: string;
  color?: ButtonColor;
  shape?: 'rounded' | 'square';
  disabled?: boolean;
};

export class IconButtonElement extends IconButtonBase implements IconButtonElementProps {
  /**
   * Leading icon to display in input
   * @See [`fwc-icon`](https://github.com/equinor/fusion-web-components/tree/main/packages/icon)
   * @override
   */

  @property({ type: String })
  public color?: ButtonColor = 'primary';

  @property({ type: String })
  public size?: ButtonSize = 'medium';

  @property({ type: String })
  public shape?: 'rounded' | 'square' = 'rounded';
}

IconButtonElement.styles = styles;

export default IconButtonElement;
