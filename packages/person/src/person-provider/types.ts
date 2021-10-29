import { ReactiveControllerHost } from 'lit';
import { Task } from '@lit-labs/task';
import { PersonPresence, PersonDetails } from '../types';

export interface PersonHost extends ReactiveControllerHost {
  azureId: string;
  dispatchEvent(event: Event): boolean;
  presence?: Task<[string], PersonPresence>;
  details?: Task<[string], PersonDetails>;
}

export interface PersonResolver {
  getPresence: (azureId: string) => Promise<PersonPresence> | PersonPresence;
  getDetails: (azureId: string) => Promise<PersonDetails> | PersonDetails;
}
