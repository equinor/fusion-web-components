import { property } from 'lit/decorators.js';
import style from './element.css';
import { IconButtonToggleBase } from '@material/mwc-icon-button-toggle/mwc-icon-button-toggle-base';
import { styles as mwcStyle } from '@material/mwc-icon-button/mwc-icon-button.css';
import { CSSResult, html, HTMLTemplateResult } from 'lit';
import Icon, { IconName } from '@equinor/fusion-wc-icon';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IconButtonToggleColor, IconButtonToggleSize } from './types';
import { classMap } from 'lit/directives/class-map.js';

// Persist element
Icon;

/**
 * Element for rendering an icon button toggle with on/off state.
 * {@inheritdoc}
 *
 * @tag fwc-icon-button-toggle
 *
 * @property {boolean} on - true to use whether the toggle is activated.
 * @property {IconName} onIcon - Sets the icon of the icon buttons element "on" state.
 * @property {IconName} offIcon - Sets the icon of the icon button element "off" state.
 * @property {IconButtonToggleSize} size - Sets the size of the icon button element.
 * @property {IconButtonToggleColor} onColor - Sets the color of the on icon buttons element "on" state.
 * @property {IconButtonToggleColor} offColor - Sets the color of the on icon buttons element "off" state. Used for primary color change.
 * @property {boolean} rounded - Sets the shape of the icon button element to rounded or square.
 * @property {boolean} disabled - Sets the icon button to disabled.
 * @property {string} ariaLabel - Accessible label for the button. Used if ariaLabelOn and ariaLabelOff is set.
 * @property {string} ariaLabelOn - aria-label of the button when on is true. If set, ariaLabelOff must also be set.
 * @property {string} ariaLabelOff - aria-label of the button when on is false. If set, ariaLabelOn must also be set.
 *
 * @fires icon-button-toggle-change - Indicates the button has been toggled. isOn indicates the on value of the toggle button.
 *
 */

export type IconButtonToggleElementProps = {
  on?: boolean;
  onIcon?: IconName | string;
  offIcon?: IconName | string;
  ariaLabel?: string;
  ariaLabelOn?: string;
  ariaLabelOff?: string;
  onColor?: IconButtonToggleColor;
  offColor?: IconButtonToggleColor;
  size?: IconButtonToggleSize;
  rounded?: boolean;
  disabled?: boolean;
};

export class IconButtonToggleElement extends IconButtonToggleBase implements IconButtonToggleElementProps {
  /* styles object css */
  static styles: CSSResult[] = [style, mwcStyle];

  @property({ type: String })
  public onColor?: IconButtonToggleColor = IconButtonToggleColor.Primary;

  @property({ type: String })
  public offColor?: IconButtonToggleColor = IconButtonToggleColor.Primary;

  @property({ type: String })
  public size?: IconButtonToggleSize = IconButtonToggleSize.Medium;

  @property({ type: Boolean })
  public rounded?: boolean;

  /* override on/off icons for the icon type change */
  override onIcon: IconName | string = '';
  override offIcon: IconName | string = '';

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
    /** @classMap */
    const classes = {
      'mdc-icon-button--on': this.on,
    };
    const hasToggledAriaLabel = this.ariaLabelOn !== undefined && this.ariaLabelOff !== undefined;
    const ariaPressedValue = hasToggledAriaLabel ? undefined : this.on;
    const ariaLabelValue = hasToggledAriaLabel ? (this.on ? this.ariaLabelOn : this.ariaLabelOff) : this.ariaLabel;
    return html`<button
      class="mdc-icon-button mdc-icon-button--display-flex ${classMap(classes)}"
      aria-pressed="${ifDefined(ariaPressedValue)}"
      aria-label="${ifDefined(ariaLabelValue)}"
      @click="${this.handleClick}"
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
      <span class="mdc-icon-button__icon"
        ><slot name="offIcon"><fwc-icon .icon=${this.offIcon} /></span
      >
      <span class="mdc-icon-button__icon mdc-icon-button__icon--on"
        ><slot name="onIcon"><fwc-icon .icon=${this.onIcon} /></span
      >
    </button>`;
  }
}

export default IconButtonToggleElement;
