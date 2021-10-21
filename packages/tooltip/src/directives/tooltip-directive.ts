import { HTMLTemplateResult, LitElement, render } from 'lit';
import { Directive, directive, PartInfo, PartType, AttributePart, DirectiveParameters } from 'lit/directive.js';
import { PopperController } from '@equinor/fusion-wc-popper';

export class TooltipDirective extends Directive {
  controller?: PopperController;
  host?: HTMLElement;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (
      partInfo.type !== PartType.ATTRIBUTE ||
      partInfo.name !== 'tooltip' ||
      (partInfo.strings?.length as number) > 2
    ) {
      throw new Error(
        'The `tooltip` directive must be used in the `tooltip` attribute and must be the only part in the attribute.'
      );
    }
  }

  render(tooltip: HTMLTemplateResult) {
    if (this.host) {
      const test = render(tooltip, this.host, { host: this.host });
      //this.controller = new PopperController(this.host as LitElement, tooltip)
      console.log('RootPart', tooltip);
    }
  }

  update(part: AttributePart, [tooltip]: DirectiveParameters<this>) {
    this.host = part.element;
    this.render(tooltip);
  }
}

export const tooltip = directive(TooltipDirective);

export default tooltip;
