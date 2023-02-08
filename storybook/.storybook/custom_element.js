/**
 * When defining a custom element the browser would throw an error if already defined.
 * We would like the storybook to provide the latest components
 */
const _customElementsDefine = window.customElements.define;
window.customElements.define = (name, cl, conf) => {
  if (!customElements.get(name)) {
    _customElementsDefine.call(window.customElements, name, cl, conf);
  }
};