import { AttributePart, directive, Part, PropertyPart } from 'lit-html';

import * as equal from 'fast-deep-equal/es6';

const observerCache = new WeakMap<Element, Observer>();

class Observer extends IntersectionObserver {
  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {
    super(callback, options);
  }
}

const createObserver = (
  el: Element,
  cb: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): Observer => {
  const observer = new Observer(cb, options);
  observer.options = options;
  observer.observe(el);
  observerCache.set(el, observer);
  return observer;
};

export interface ObserverProps {
  cb: IntersectionObserverCallback;
  opt?: IntersectionObserverInit;
  disabled?: boolean;
}

export const observeIntersection = directive(({ cb, disabled, opt }: ObserverProps) => (part: Part): void => {
  if (
    !(part instanceof AttributePart) ||
    part instanceof PropertyPart ||
    part.committer.name !== 'intersection' ||
    part.committer.parts.length > 1
  ) {
    throw new Error(
      'The `observeIntersection` directive must be used in the style attribute ' +
        'and must be the only part in the attribute.'
    );
  }

  const element = part.committer.element as HTMLElement;
  const observer = observerCache.get(element);

  // disconnect if disabled or observer options change
  if (observer && (disabled || !equal(observer.options, opt))) {
    observer?.disconnect();
    observerCache.delete(element);
  }

  // create new observer if not disabled
  if (!observer && !disabled) {
    createObserver(element, cb, opt);
  }
});

export default observeIntersection;
