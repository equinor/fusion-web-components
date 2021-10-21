import { LitElement, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { PopperController } from '@equinor/fusion-wc-popper';
import { Placement } from 'tippy.js/headless';
import style from './element.css';

export type TooltipElementProps = {
  anchor?: LitElement;
  placement?: Placement;
  content?: string;
};

export class TooltipElement extends LitElement implements TooltipElementProps {
  static styles = [style];

  @property({ type: Object })
  anchor!: LitElement;

  @property({ type: String })
  content?: string;

  @property({ type: String, reflect: true })
  placement: Placement = 'top';

  controller?: PopperController;

  firstUpdated() {
    if (this.anchor) {
      this.controller = new PopperController(this.anchor, this, { placement: this.placement });
    }
  }

  render(): TemplateResult {
    return html`<slot name="tooltip">${this.content}</slot>`;
  }
}

export default TooltipElement;
