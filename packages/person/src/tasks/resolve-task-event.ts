export const resolveTaskEvent = async <TData>(
  host: EventTarget,
  event: CustomEvent<{ result?: TData | Promise<TData> }>,
): Promise<TData> => {
  // Create a promise that will resolve when the event is resolved
  const job = new Promise<TData>((res, rej): void => {
    // Dispatch the event
    host.dispatchEvent(event);

    // If the event was prevented, reject
    if (event.defaultPrevented) {
      return rej(new Error('Resolve prevented'));
    }

    // If a resolver has committed to resolving the request, resolve
    if (event.detail.result) {
      return res(Promise.resolve(event.detail.result));
    }

    // If no resolver has committed to resolving the request, reject
    rej(new Error('No resolver resolved the request'));
  });

  // Wait for the next frame to allow providers to connect and setup
  await new Promise<void>((res): void => {
    window.requestAnimationFrame(() => res());
  });

  // Wait for the result of the request
  const result = await job;

  if (result) {
    return result;
  }

  // If the resolver failed to resolve the request, throw an error
  throw new Error('Could not resolve request result');
};

export default resolveTaskEvent;
