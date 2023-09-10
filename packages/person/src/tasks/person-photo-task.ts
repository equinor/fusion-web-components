
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
      ([pictureSrc, azureId, upn]: TaskArgs): Promise<string> => {
        if (pictureSrc) {
          return Promise.resolve(pictureSrc);
        }

        const data = azureId ? { azureId } : upn ? { upn } : undefined;
        if (!data) {
          throw new Error('The host must have either a azureId or a upn property');
        }

        return resolveTaskEvent(host, new RequestResolvePersonPhotoEvent(data));
      },
      (): TaskArgs => [host.pictureSrc, host.azureId, host.upn],
    );
  }
}

export default PersonPhotoTask;
