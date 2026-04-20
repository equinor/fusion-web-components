export interface PictureEventDetail {
  naturalHeight: number;
  naturalWidth: number;
  currentSrc: string;
}

export type PictureEventInit = CustomEventInit<PictureEventDetail>;

export type PictureEventType = 'picture-load';

/**
 * Event triggered when picture source change.
 * @typeparam T type of [[PictureEventType]]
 */
export class PictureEvent<T extends PictureEventType> extends CustomEvent<PictureEventDetail> {
  // biome-ignore lint/complexity/noUselessConstructor: needed to preserve generic type inference from event type
  constructor(type: T, eventInit?: PictureEventInit) {
    super(type, eventInit);
  }
}

declare global {
  interface ElementEventMap {
    'picture-load': PictureEvent<'picture-load'>;
  }
}

export default PictureEvent;
