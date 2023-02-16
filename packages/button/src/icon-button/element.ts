import { property } from 'lit/decorators.js';
import style from './element.css';
import { IconButtonBase } from '@material/mwc-icon-button/mwc-icon-button-base';
import { styles as mwcStyle } from '@material/mwc-icon-button/mwc-icon-button.css';
import { CSSResult, html, HTMLTemplateResult } from 'lit';
import Icon, { IconName } from '@equinor/fusion-wc-icon';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IconButtonColor, IconButtonSize } from './types';
import { LinkButtonTarget } from '../link-button';

// Persist element
Icon;

/**
 * Element for rendering an icon button.
 * {@inheritdoc}
 *
 * @tag fwc-icon-button
 *
 * @property {string} href - Sets the link of the icon button element.
 * @property {LinkButtonTarget} target - Sets how it will open link of the icon button element.
 * @property {IconName} icon - Sets the icon of the icon button element.
 * @property {IconButtonSize} size - Sets the size of the icon button element.
 * @property {IconButtonColor} color - Sets the color of the icon button element.
 * @property {boolean} rounded - Sets the shape of the icon button element to rounded or square.
 * @property {boolean} disabled - Sets the icon button to disabled.
 * @property {string} ariaLabel - Sets the accessible label for the button. Uses icon+'_icon-button' when not defined.
 * @property {string} ariaHasPopup - Indicates the availability and type of an interactive popup element, such as menu or dialog, that can be triggered by the button.
 *
 */

export type IconButtonElementProps = {
  /** If not empty, it is going to */
  href?: string;
  /** Target for link */
  target?: LinkButtonTarget;
  /** Icon to display */
  icon?: IconName | string;
  /** Accessible label for the button */
  ariaLabel?: string;
  /** Indicates the availability and type of an interactive popup element */
  ariaHasPopup?: string;
  /** Sets the color */
  color?: IconButtonColor;
  /** Sets the size */
  size?: IconButtonSize;
  /** Sets the shape of ripple */
  rounded?: boolean;
  /** Sets the icon button to disabled */
  disabled?: boolean;
};

export class IconButtonElement extends IconButtonBase implements IconButtonElementProps {
  /* styles object css */
  static styles: CSSResult[] = [style, mwcStyle];

  @property({ type: String })
  href?: string;

  @property({ type: String })
  target?: LinkButtonTarget;

  @property({ type: String })
  public color?: IconButtonColor = IconButtonColor.Primary;

  @property({ type: String })
  public size?: IconButtonSize = IconButtonSize.Medium;

  @property({ type: Boolean })
  public rounded?: boolean;

  /* override icon for the icon type change */
  override icon: IconName | string = '';

  /**
   * override rendering of the ripple
   * @returns the ripple for setting up 'unbounded' as an additional property
   */
  override renderRipple(): HTMLTemplateResult | string {
    return this.shouldRenderRipple
      ? html` <mwc-ripple .disabled="${this.disabled}" .unbounded="${this.rounded}"> </mwc-ripple>`
      : '';
  }

  /**
   * override render of the icon button
   * @returns full render of IconButtonBase with fwc-icon used instead of alredy used material icon
   */
  override render(): HTMLTemplateResult {
    return html`<a
      class="mdc-icon-button mdc-icon-button--display-flex"
      href="${ifDefined(this.href)}"
      target="${ifDefined(this.target)}"
      aria-label="${this.ariaLabel || this.icon + '_icon-button'}"
      aria-haspopup="${ifDefined(this.ariaHasPopup)}"
      ?disabled="${this.disabled}"
      @focus="${this.handleRippleFocus}"
      @blur="${this.handleRippleBlur}"
      @mousedown="${this.handleRippleMouseDown}"
      @mouseenter="${this.handleRippleMouseEnter}"
      @mouseleave="${this.handleRippleMouseLeave}"
      @touchstart="${this.handleRippleTouchStart}"
      @touchend="${this.handleRippleDeactivate}"
      @touchcancel="${this.handleRippleDeactivate}"
    >
      ${this.renderRipple()}
      ${this.icon ? html`<fwc-icon class="mdc-icon-button__icon" .icon=${this.icon}></fwc-icon>` : ''}
      <span><slot></slot></span>
    </a>`;
  }
}

export default IconButtonElement;
