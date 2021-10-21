import { createPopper, Modifier, OptionsGeneric, StrictModifiers, Instance } from '@popperjs/core';
import { directive, PartInfo, PartType, AttributePart, Directive, DirectiveParameters } from 'lit/directive.js';
import { noChange } from 'lit';

type PopperInstance = Instance & {
  resizeObserver: ResizeObserver;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PopperModifier = Partial<Modifier<any, any>>;

export type Options<TModifier extends PopperModifier = StrictModifiers> = Partial<OptionsGeneric<TModifier>> & {
  enabled?: boolean;
};

const instances = new WeakMap<HTMLElement, PopperInstance>();

class PopperJSDirective extends Directive {
  reference?: HTMLElement;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (
      partInfo.type !== PartType.ATTRIBUTE ||
      partInfo.name !== 'popperjs' ||
      (partInfo.strings?.length as number) > 2
    ) {
      throw new Error(
        'The `observeIntersection` directive must be used in the `popperjs` attribute and must be the only part in the attribute.'
      );
    }
  }

  override async render<TElement extends HTMLElement = HTMLElement, TModifier extends PopperModifier = StrictModifiers>(
    popper: TElement | Promise<TElement>,
    options?: Options<TModifier>
  ) {
    if (this.reference) {
      const target = await Promise.resolve(popper);
      const { enabled, ...popperArgs } = options || {};

      if (enabled) {
        if (!instances.has(this.reference)) {
          const instance = createPopper(this.reference, target, popperArgs) as PopperInstance;

          // request update of posistion when size of reference or target changes
          instance.resizeObserver = new ResizeObserver(() => instance.update());
          instance.resizeObserver.observe(this.reference);
          instance.resizeObserver.observe(target);

          instances.set(this.reference, instance);
        }

        const instance = instances.get(this.reference);

        // TODO: options are mutable and will always hit.
        if (instance && popperArgs && instance.state.options !== popperArgs) {
          instance.setOptions(popperArgs);
        }
        // disabled, remove instance and clean up
      } else {
        const instance = instances.get(this.reference);
        instance?.destroy();
        instance?.resizeObserver.disconnect();
        instances.delete(this.reference);
      }
    }

    return noChange;
  }

  override update(part: AttributePart, [observerInfo]: DirectiveParameters<this>) {
    this.reference = part.element as HTMLElement;
    return this.render(observerInfo);
  }
}

export const popperjs = directive(PopperJSDirective);

export default popperjs;
