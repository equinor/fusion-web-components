import { createPopper, Modifier, OptionsGeneric, StrictModifiers, Instance } from '@popperjs/core';
import { AttributePart, directive, Part, PropertyPart } from 'lit-html';

type PopperInstance = Instance & {
  resizeObserver: ResizeObserver
}

export type Options<TModifier extends Partial<Modifier<any, any>> = StrictModifiers> = Partial<OptionsGeneric<TModifier>> & {
  enabled?: boolean;
}

const instances = new WeakMap<HTMLElement, PopperInstance>();

export const popperjs = directive(<TElement extends HTMLElement = HTMLElement, TModifier extends Partial<Modifier<any, any>> = StrictModifiers>(
  popper: TElement | Promise<TElement>,
  options?: Options<TModifier>
) => async (part: Part): Promise<void> => {
  if (
    !(part instanceof AttributePart) ||
    part instanceof PropertyPart ||
    part.committer.name !== 'popperjs' ||
    part.committer.parts.length > 1
  ) {
    throw new Error(
      'The `popperjs` directive must be used in the popperjs attribute and must be the only part in the attribute.'
    );
  }


  const reference = part.committer.element as HTMLElement;
  const target = await Promise.resolve(popper);

  const { enabled, ...popperArgs } = options || {};

  if (enabled) {
    if (!instances.has(reference)) {
      const instance = createPopper(reference, target, popperArgs) as PopperInstance;

      // request update of posistion when size of reference or target changes
      instance.resizeObserver = new ResizeObserver(() => instance.update());
      instance.resizeObserver.observe(reference);
      instance.resizeObserver.observe(target);

      instances.set(reference, instance);
    }

    const instance = instances.get(reference);

    // TODO: options are mutable and will always hit.
    if (instance && popperArgs && instance.state.options !== popperArgs) {
      instance.setOptions(popperArgs);
    }
  // disabled, remove instance and clean up
  } else {
    const instance = instances.get(reference);
    instance?.destroy();
    instance?.resizeObserver.disconnect()
    instances.delete(reference);
  }
});

export default popperjs;