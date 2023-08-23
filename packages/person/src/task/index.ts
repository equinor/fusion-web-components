export const resolveTaskEvent = async <TData>(
  host: EventTarget,
  event: CustomEvent<{ result?: TData | Promise<TData> }>,
): Promise<TData> => {
  const job = new Promise<TData>((res, rej): void => {
    host.dispatchEvent(event);
    if (event.defaultPrevented) {
      rej(new Error('Resolve prevented'));
    }

    if (event.detail.result) {
      res(Promise.resolve(event.detail.result));
    } else {
      rej(new Error('No resolver resolved the request'));
    }
  });

  const result = await job;
  if (result) {
    return result;
  } else {
    throw new Error('Could not resolve request result');
  }
};
