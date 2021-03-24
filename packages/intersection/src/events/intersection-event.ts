/**
 * Defenition of the [[CustomEvent]] detail
 */
export interface IntersectionEventDetail {
  entry: IntersectionObserverEntry;
}

/**
 * Type of object to initializing [[IntersectionEvent]]
 */
export type IntersectionEventInit = CustomEventInit<IntersectionEventDetail>;

/**
 * Intersection types
 */
export type IntersectionEventType = 'intersection' | 'intersect-in' | 'intersect-out';

/**
 * Event triggered when intersecting.
 * @typeparam T type of intersection
 */
export class IntersectionEvent<T extends IntersectionEventType> extends CustomEvent<IntersectionEventDetail> {
  constructor(type: T, eventInit?: IntersectionEventInit) {
    super(type, eventInit);
  }
}

declare global {
  interface ElementEventMap {
    intersection: IntersectionEvent<'intersection'>;
    'intersect-in': IntersectionEvent<'intersect-in'>;
    'intersect-out': IntersectionEvent<'intersect-out'>;
  }
}

export default IntersectionEvent;
