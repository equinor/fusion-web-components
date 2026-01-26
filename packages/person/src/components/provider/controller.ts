import { ReactiveController } from 'lit';
import { PersonResolver, PersonResolverHost } from './types';
import {
  RequestResolvePersonDetailEvent,
  RequestResolvePersonInfoEvent,
  RequestResolvePersonSearchEvent,
  RequestResolvePersonPhotoEvent,
  ResolveEventDetail,
  RequestResolvePersonSuggestEvent,
  RequestResolvePersonResolveEvent,
} from '../../events';

type PersonResolverEventMap = Record<string, keyof PersonResolver>;

/** default mapping of events to resolver function */
const defaultEventMap: PersonResolverEventMap = {
  [RequestResolvePersonDetailEvent.eventName]: 'getDetails',
  [RequestResolvePersonInfoEvent.eventName]: 'getInfo',
  [RequestResolvePersonPhotoEvent.eventName]: 'getPhoto',
  [RequestResolvePersonSearchEvent.eventName]: 'search',
  [RequestResolvePersonSuggestEvent.eventName]: 'suggest',
  [RequestResolvePersonResolveEvent.eventName]: 'resolve',
};

const processEvent = (
  event: CustomEvent<ResolveEventDetail>,
  resolver: PersonResolver,
  fnName: keyof PersonResolver,
) => {
  const fn = resolver[fnName];
  if (fn) {
    event.detail.result = (fn as (args: unknown) => unknown)(event.detail);
    event.stopPropagation();
  }
};

const eventFactory = (host: PersonResolverHost, options?: AddEventListenerOptions | boolean) => {
  return (eventName: string, fnName: keyof PersonResolver) => {
    host.addEventListener(
      eventName,
      (event) => {
        if (host.resolver) {
          processEvent(event as CustomEvent<ResolveEventDetail>, host.resolver, fnName);
        }
      },
      options,
    );
  };
};

const addEventListeners = (host: PersonResolverHost, eventMap: PersonResolverEventMap) => {
  const controller = new AbortController();
  const addEventListener = eventFactory(host, {
    capture: false,
    passive: true,
    signal: controller.signal,
  });
  Object.entries(eventMap).forEach(([eventName, fnName]) => {
    addEventListener(eventName, fnName);
  });
  return controller;
};

export class PersonResolverController implements ReactiveController {
  public resolver: PersonResolver | undefined = undefined;

  #host: PersonResolverHost;
  #controller?: AbortController;
  #options: {
    events: PersonResolverEventMap;
  };

  constructor(
    host: PersonResolverHost,
    options?: {
      events?: PersonResolverEventMap;
    },
  ) {
    this.#host = host;
    this.#host.addController(this);
    this.#options = { events: defaultEventMap, ...options };
  }

  hostConnected(): void {
    this.#controller = addEventListeners(this.#host, this.#options.events);
  }

  hostDisconnected() {
    this.#controller?.abort();
  }
}
