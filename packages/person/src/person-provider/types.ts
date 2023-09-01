import { ReactiveControllerHost } from 'lit';
import { Task } from '@lit-labs/task';
import { PersonPresence, PersonDetails, PersonQueryDetails } from '../types';
import { AvatarData } from '../person-avatar/task';

export interface PersonHost extends ReactiveControllerHost {
  azureId: string;
  dispatchEvent(event: Event): boolean;
  presence?: Task<[string], PersonPresence>;
  details?: Task<[string], PersonDetails>;
}

export interface PersonResolver {
  getQuery: (query: string, controller?: AbortController) => Promise<PersonQueryDetails> | PersonQueryDetails;
  getPresence: (azureId: string, controller?: AbortController) => Promise<PersonPresence> | PersonPresence;
  getDetails: (azureId: string, controller?: AbortController) => Promise<PersonDetails> | PersonDetails;
  getImageByAzureId: (azureId: string, controller?: AbortController) => Promise<AvatarData> | AvatarData;
  getImageByUpn: (upn: string, controller?: AbortController) => Promise<AvatarData> | AvatarData;
}
