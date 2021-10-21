import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { Ref } from 'lit/directives/ref.js';
import PopperController from '../controllers/popper-controller';
import style from './element.css';

export type TooltipElementProps = {
  anchorRef?: Ref<LitElement>;
};

export class TooltipElement extends LitElement implements TooltipElementProps {
  static styles = [style];

  controller?: PopperController;

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('anchorRef')) {
      if (this.anchorRef?.value) {
        this.controller = new PopperController(this.anchorRef?.value, this);
      } else {
        this.controller = undefined;
      }
    }
  }

  @property({ type: Object })
  anchorRef?: Ref<LitElement>;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

export default TooltipElement;
