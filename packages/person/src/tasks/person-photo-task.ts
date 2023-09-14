import { Task } from '@lit-labs/task';
import { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from '.';
import { RequestResolvePersonPhotoEvent } from '../events';

export type PersonPhotoControllerHostAttributes = {
  azureId?: string;
  upn?: string;
  pictureSrc?: string;
};

export type PersonPhotoControllerHost = PersonPhotoControllerHostAttributes & ReactiveControllerHost & EventTarget;

type TaskArgs = [string | undefined, string | undefined, string | undefined];

export class PersonPhotoTask extends Task<TaskArgs, string> {
  constructor(public host: PersonPhotoControllerHost) {
    super(
      host,
      ([pictureSrc, azureId, upn], { signal }): Promise<string> => {
        if (pictureSrc) {
          return Promise.resolve(pictureSrc);
        }

        if (!azureId || !upn) {
          throw new Error('The host must have either a azureId or a upn property');
        }

        return resolveTaskEvent(host, new RequestResolvePersonPhotoEvent({ azureId, upn, signal }));
      },
      () => [host.pictureSrc, host.azureId, host.upn],
    );
  }
}

export default PersonPhotoTask;
