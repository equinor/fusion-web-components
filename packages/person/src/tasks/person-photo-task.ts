import { Task } from '@lit-labs/task';
import type { ReactiveControllerHost } from 'lit';
import { resolveTaskEvent } from './resolve-task-event';
import { type AbortableEventDetail, RequestResolvePersonPhotoEvent } from '../events';
import type { AzureIdOrUpnObj } from '../types';

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
      ([pictureSrc, azureId, upn], options): Promise<string> => {
        const { signal } = options ?? {};

				if (pictureSrc === "") {
					throw new Error("No picture source provided - show letter avatar");
				}

        if (pictureSrc) {
          return Promise.resolve(pictureSrc);
        }

        if (!(azureId || upn)) {
          throw new Error('The host must have either a azureId or a upn property');
        }

        const event = new RequestResolvePersonPhotoEvent({
          azureId,
          upn,
          signal,
        } as AbortableEventDetail<AzureIdOrUpnObj>);

        return resolveTaskEvent(host, event);
      },
      () => [host.pictureSrc, host.azureId, host.upn],
    );
  }
}

export default PersonPhotoTask;
