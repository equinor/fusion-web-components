import { eventOptions, html, LitElement, property, queryAsync, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { Modifier, Placement } from '@popperjs/core';

import style from './element.css';
import { popperjs, Options } from './directories/popperjs';

export interface PopoverElementProps {
  disabled?: boolean;
  placement?: Placement;
  show?: boolean;
  flip?: boolean;
  offset?: [number, number];
  triggers?: ShowTrigger[];
}

export type ShowTrigger = 'hover' | 'click';

/**
 * Element wrapper for PopperJS
 */
export class PopoverElement extends LitElement implements PopoverElementProps {
  static styles = [style];

  @property({ reflect: true })
  placement?: Placement;

  @property({ type: Boolean })
  disabled?: boolean;

  @property({ type: Boolean })
  show?: boolean;

  @property({ type: Boolean })
  flip?: boolean;

  @property({ type: Array })
  offset?: [number, number];

  @property({ type: Array })
  triggers: ShowTrigger[] = [];

  @queryAsync('#popper')
  popper!: Promise<HTMLSpanElement>;

  get options(): Options {
    const { placement, disabled, modifiers } = this;
    const enabled = !disabled && (this.triggers.includes('hover') || this.show);
    return { placement, enabled, modifiers };
  }

  private _modifiers: Partial<Modifier<any, any>>[] = [];
  get modifiers(): Partial<Modifier<any, any>>[] {
    return [
      {
        name: 'flip',
        enabled: !!this.flip || !!this.placement?.match(/auto/),
      },
      {
        name: 'offset',
        options: {
          offset: this.offset,
        },
      },
      ...this._modifiers,
    ];
  }

  /** Set popper modifiers for element */
  set modifiers(modifiers: Partial<Modifier<any, any>>[]) {
    this._modifiers = modifiers;
    this.requestUpdate();
  }

  render(): TemplateResult {
    const popperClasses = this.disabled
      ? 'disabled'
      : classMap({
          show: !!this.show,
          hover: this.triggers.includes('hover'),
        });
    return html`
      <span id="content" popperjs=${popperjs(this.popper, this.options)} @click=${this.handleClick}>
        <slot></slot>
      </span>
      <span id="popper" class=${popperClasses}>
        <slot name="popover"></slot>
      </span>
    `;
  }

  @eventOptions({ passive: true })
  protected handleClick(): void {
    if (this.triggers.includes('click')) {
      this.show = !this.show;
    }
  }
}

export default PopoverElement;
