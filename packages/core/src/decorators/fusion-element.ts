/* eslint-disable @typescript-eslint/no-explicit-any */
type Constructor<T> = {
  new (...args: any[]): T;
};

// From the TC39 Decorators proposal
interface ClassDescriptor {
  kind: 'class';
  elements: ClassElement[];
  finisher?: <T>(clazz: Constructor<T>) => undefined | Constructor<T>;
}

// From the TC39 Decorators proposal
interface ClassElement {
  kind: 'field' | 'method';
  key: PropertyKey;
  placement: 'static' | 'prototype' | 'own';
  initializer?: (...args: any[]) => void;
  extras?: ClassElement[];
  finisher?: <T>(clazz: Constructor<T>) => undefined | Constructor<T>;
  descriptor?: PropertyDescriptor;
}

const legacyCustomElement = (tagName: string, clazz: Constructor<HTMLElement>) => {
  window.customElements.define(tagName, clazz);
  return clazz as any;
};

const standardCustomElement = (tagName: string, descriptor: ClassDescriptor) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    // This callback is called once the class is otherwise fully defined
    finisher(clazz: Constructor<HTMLElement>) {
      window.customElements.define(tagName, clazz);
    },
  };
};

export const fusionElement =
  (tagName: string) =>
  (classOrDescriptor: Constructor<HTMLElement> | ClassDescriptor): void => {
    if (!window.customElements.get(tagName)) {
      return typeof classOrDescriptor === 'function'
        ? legacyCustomElement(tagName, classOrDescriptor)
        : standardCustomElement(tagName, classOrDescriptor);
    } else {
      console.warn(`${tagName} has been defined twice`);
    }
  };

export default fusionElement;
