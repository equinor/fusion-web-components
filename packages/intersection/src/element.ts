import { LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { IntersectionEvent, IntersectionEventInit } from './events/intersection-event';

// convert cvs to float array
const converter = (s: string | null) => s?.split(',').map((v) => parseFloat(v));

export type IntersectionElementProps = {
  disabled?: boolean;
  once?: boolean;
  margin?: string;
  threshold?: number | number[];
};

/**
 * Custom element for registering intersections
 */
@customElement('cwc-intersection')
export class IntersectionElement extends LitElement implements IntersectionElementProps {
  /**
   * Enable or disable element
   */
  @property({ type: Boolean, reflect: true })
  public disabled?: boolean;

  /**
   * Only observe first intersection
   */
  @property({ type: Boolean })
  public once?: boolean;

  /**
   * Margin for intersection ([ <length> | <percentage> | auto ]{1,4})
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/margin
   */
  @property()
  public margin?: string;

  /**
   * Threshold which trigger intersection ([ <number>, ... ]{1,?})
   * Comman seperated string value.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   */
  @property({ type: Array, converter })
  public threshold?: number | number[];

  public observer?: IntersectionObserver;

  /**
   * Intersection state.
   */
  get intersected(): boolean {
    return this.hasAttribute('intersected');
  }

  /**
   * Intersection options
   */
  get options(): IntersectionObserverInit {
    const { margin: rootMargin, threshold } = this;
    return { rootMargin, threshold };
  }

  /**
   * This element is a light element, no shadow root required.
   */
  createRenderRoot(): HTMLElement {
    return this;
  }

  connectedCallback(): void {
    super.disconnectedCallback();
    this.disabled || this._createAdapter();
  }

  /**
   * When element is removed from DOM, remove adapter and clear state.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.setAttribute('intersected', '');
    this._removeAdapter();
  }

  /**
   * When intersection option attriubtes changes, the adapter need to be disconnected and reattached.
   * @param name Name of attribute.
   * @param old Previous value.
   * @param value New value.
   */
  attributeChangedCallback(name: string, old: string, value: string): void {
    super.attributeChangedCallback(name, old, value);
    if (['disabled', 'margin', 'threshold'].includes(name) && old !== value) {
      this.disabled ? this._removeAdapter() : this._createAdapter();
    }
  }

  /**
   * Create intersection observer and monitor element for intersection.
   */
  protected _createAdapter(): void {
    this.observer && this._removeAdapter();
    this.observer = new IntersectionObserver(this._onIntersection.bind(this), this.options);
    this.observer.observe(this);
  }

  /**
   * Remove current observer (if any) and stop monitoring intersections.
   */
  protected _removeAdapter(): void {
    if (this.observer instanceof IntersectionObserver) {
      this.removeAttribute('intersecting');
      this.observer.disconnect();
      delete this.observer;
    }
  }

  /**
   * When intersected an event is fired, if not prevented, the intersection state will change ([in|out] <boolean>)
   * If the intersection option [once] is set, future observations are disabled.
   * @param entries Should only contain one entry.
   */
  protected _onIntersection(entries: IntersectionObserverEntry[]): void {
    const [entry] = entries;
    if (this._emitEntryEvent(entry, { bubbles: true })) {
      const { isIntersecting } = entry;
      this.toggleAttribute('intersecting', isIntersecting);
      if (isIntersecting) {
        isIntersecting && this.setAttribute('intersected', '');
        this.once && (this.disabled = true);
      }
    }
  }

  /**
   * Create an Intersection event and emit, returns event cancel state.
   * Observation of [intersectionin|intersectionout] should be [passive]
   * @param entry Intersected entry.
   * @param args Event args.
   */
  protected _emitEntryEvent(entry: IntersectionObserverEntry, args?: CustomEventInit): boolean {
    const { isIntersecting } = entry;
    const type = isIntersecting ? 'intersect-in' : 'intersect-out';
    const eventInit: IntersectionEventInit = { ...args, detail: { entry } };
    const event = new IntersectionEvent(type, eventInit);
    this.dispatchEvent(event);
    return !event.defaultPrevented;
  }
}

export default IntersectionElement;
