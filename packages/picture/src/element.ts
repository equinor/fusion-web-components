import { html, LitElement, TemplateResult } from 'lit';
import { property, state, eventOptions } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { observeIntersection, ObserverInfo } from '@equinor/fusion-wc-intersection';

import PictureEvent from './events/picture-event';
import style from './element.css';

export type PictureAlignment = 'center' | 'top' | 'bottom' | 'left' | 'right';

export type PictureElementProps = {
  src?: string;
  position?: PictureAlignment;
  cover?: boolean;
  lazy?: boolean;
};

export class PictureElement extends LitElement implements PictureElementProps {
  static styles = [style];

  /**
   * Set the picture source
   * This will be updated if <source> is provided
   * Use of a data-URI for src is encouraged for instant rendering.
   */
  @property()
  public src = '//:0';

  /**
   * position of image
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-position
   */
  @property({ reflect: true })
  public position: PictureAlignment = 'center';

  /**
   * Toggle between cover and contain
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-size
   */
  @property({ type: Boolean })
  public cover?: boolean;

  /**
   * When tag is applied the picure does not load resources until intersected
   */
  @property({ type: Boolean })
  public lazy?: boolean;

  /**
   * Set the picture height
   * Updated with the img natural height when loaded
   */
  @state()
  public currentSrc?: string;

  /**
   * Set the picture height
   * Updated with the img natural height when loaded
   */
  @state()
  public height?: number;

  /**
   * Set the picture width
   * Updated with the img natural width when loaded
   */
  @state()
  public width?: number;

  /**
   * indicate if picture is intersected
   */
  @state()
  public intersected?: boolean;

  /**
   * Return the current source sets
   * Since [[HTMLPictureElement]] is not slottable, [[HTMLSourceElement]] provided
   * by light dom is moved inside the shadow.
   */
  public get srcSets(): HTMLSourceElement[] {
    return [...this.querySelectorAll<'source'>('source')].concat([
      ...(this.renderRoot as ShadowRoot).querySelectorAll<'source'>('source'),
    ]);
  }

  public get loaded(): boolean {
    return this.hasAttribute('loaded');
  }

  protected render(): TemplateResult {
    const style = {
      backgroundImage: this.loaded ? `url(${this.currentSrc})` : '',
      backgroundPosition: this.position || '',
      backgroundSize: this.cover ? 'cover' : 'contain',
      width: this.cover ? '100%' : undefined,
      height: this.cover ? `'100%` : undefined,
    };

    const observerInfo: ObserverInfo = {
      cb: ([entry]) => {
        this.intersected = entry.isIntersecting;
      },
      disabled: this.intersected,
    };

    return html`
      <picture style=${styleMap(style)} intersection=${observeIntersection(observerInfo)}>
        ${this.loaded ? '' : html`<slot name="loader"></slot>`}
        ${this.lazy && !this.intersected ? '' : this.renderImage()}
      </picture>
    `;
  }

  protected renderImage(): TemplateResult {
    return html`
      ${repeat(
        this.srcSets,
        (src) => src.srcset || src.src,
        (src) => src
      )}
      <img
        src="${this.src}"
        height="${ifDefined(this.width)}"
        width="${ifDefined(this.height)}"
        @load="${this._onSourceChange}"
      />
    `;
  }

  @eventOptions({ passive: true })
  protected _onSourceChange(e: Event): void {
    const img = e.target as HTMLImageElement;
    const { naturalHeight, naturalWidth, currentSrc } = img;
    if (this.currentSrc !== currentSrc && this._emitChange(img)) {
      this.currentSrc = currentSrc;
      this.height = naturalHeight;
      this.width = naturalWidth;
      this.setAttribute('loaded', '');
    }
  }

  protected _emitChange(img: HTMLImageElement, args?: CustomEventInit): boolean {
    const { naturalHeight, naturalWidth, currentSrc } = img;
    const detail = { naturalHeight, naturalWidth, currentSrc };
    const event = new PictureEvent('picture-load', { ...args, detail });
    this.dispatchEvent(event);
    return !event.defaultPrevented;
  }
}

export default PictureElement;
