/* eslint-disable @typescript-eslint/ban-ts-comment */
import { html, TemplateResult, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { ButtonBase } from '@material/mwc-button/mwc-button-base';

import Icon, { IconName } from '@equinor/fusion-wc-icon';

import styles from './element.css';

// persist element
Icon;

export type ButtonColor = 'primary' | 'secondary' | 'danger';

export type ButtonVariant = 'contained' | 'outlined' | 'ghost';

export type ButtonElementProps = Pick<
  ButtonElement,
  'label' | 'variant' | 'color' | 'dense' | 'trailingIcon' | 'expandContent' | 'icon' | 'disabled' | 'fullwidth'
>;
/**
 * @tag fwc-button
 *
 * @attribute {boolean} dense - toggle if button should be dense
 * @attribute {string} label - label of button
 * @attribute {boolean} fullwidth - toggle to make button use full container width
 * @attribute {boolean} disabled - toggle if button is disabled
 * @attribute {boolean} trailingIcon - toggle if icon should be rendered right
 * @attribute {boolean} expandContent - toggle if content should be expanded (center aligned)
 * @attribute {boolean} ariaHasPopup - toggle if button has popup content
 *
 * @fires click
 *
 */
export class ButtonElement extends ButtonBase implements ButtonElementProps {
  /**
   * Leading icon to display in input
   * @See [`fwc-icon`](https://github.com/equinor/fusion-web-components/tree/main/packages/icon)
   *
   * @attribute {IconName}
   */
  // @ts-ignore
  override icon?: IconName;

  /**
   * @type {'primary' | 'secondary' | 'danger'}
   * @default primary
   */
  @property({ type: String, reflect: true })
  color: ButtonColor = 'primary';

  /**
   * @property
   * @type {'contained' | 'outlined' | 'ghost'}
   * @default contained
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'contained';

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('variant')) {
      switch (this.variant) {
        case 'contained': {
          this.unelevated = true;
          this.raised = false;
          this.outlined = false;
          break;
        }
        case 'outlined': {
          this.unelevated = false;
          this.raised = false;
          this.outlined = true;
          break;
        }
        case 'ghost': {
          this.unelevated = false;
          this.raised = false;
          this.outlined = false;
          break;
        }
      }
      this.requestUpdate();
    }
  }

  protected renderIcon(): TemplateResult {
    return html`<fwc-icon class="mdc-button__icon" .icon=${this.icon}></fwc-icon>`;
  }
}

ButtonElement.styles = styles;

export default ButtonElement;
