import { directive, Directive, PartInfo, PartType, AttributePart, DirectiveParameters } from 'lit/directive.js';
import { noChange } from 'lit';
import * as equal from 'fast-deep-equal/es6';

export interface ObserverInfo {
  cb: IntersectionObserverCallback;
  opt?: IntersectionObserverInit;
  disabled?: boolean;
}

class Observer extends IntersectionObserver {
  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {
    super(callback, options);
  }
}

const observerCache = new WeakMap<Element, Observer>();

class ObserveIntersectionDirective extends Directive {
  element?: HTMLElement;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (
      partInfo.type !== PartType.ATTRIBUTE ||
      partInfo.name !== 'intersection' ||
      (partInfo.strings?.length as number) > 2
    ) {
      throw new Error(
        'The `observeIntersection` directive must be used in the `intersection` attribute and must be the only part in the attribute.'
      );
    }
  }

  override render(observerInfo: ObserverInfo): symbol {
    const { cb, disabled, opt } = observerInfo;

    if (this.element) {
      const observer = observerCache.get(this.element);

      // disconnect if disabled or observer options change
      if (observer && (disabled || !equal(observer.options, opt))) {
        observer?.disconnect();
        observerCache.delete(this.element);
      }

      // create new observer if not disabled
      if (!observer && !disabled) {
        this.createObserver(this.element, cb, opt);
      }
    }

    return noChange;
  }

  override update(part: AttributePart, [observerInfo]: DirectiveParameters<this>): symbol {
    this.element = part.element as HTMLElement;
    return this.render(observerInfo);
  }

  createObserver = (el: Element, cb: IntersectionObserverCallback, options?: IntersectionObserverInit): Observer => {
    const observer = new Observer(cb, options);
    observer.options = options;
    observer.observe(el);
    observerCache.set(el, observer);
    return observer;
  };
}

export const observeIntersection = directive(ObserveIntersectionDirective);

export type { ObserveIntersectionDirective };
