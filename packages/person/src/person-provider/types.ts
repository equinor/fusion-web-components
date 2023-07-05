import { ReactiveControllerHost } from 'lit';
import { Task } from '@lit-labs/task';
import { PersonPresence, PersonDetails, PersonSearchResult, PersonPicture } from '../types';
export interface PersonHost extends ReactiveControllerHost {
  azureId: string;
  dispatchEvent(event: Event): boolean;
  details?: Task<[string], PersonDetails>;
  presence?: Task<[string], PersonPresence>;
}
export interface PersonResolver {
  getPerson: (query: string) => Promise<PersonSearchResult> | PersonSearchResult;
  getPhoto: (azureId: string) => Promise<PersonPicture> | PersonPicture;
  getDetails: (azureId: string) => Promise<PersonDetails> | PersonDetails;
  getPresence: (azureId: string) => Promise<PersonPresence> | PersonPresence;
}
