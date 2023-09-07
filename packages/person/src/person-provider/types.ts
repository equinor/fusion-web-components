import { ReactiveControllerHost } from 'lit';
import { Task } from '@lit-labs/task';
import { PersonPresence, PersonDetails } from '../types';
import { AvatarData } from '../person-avatar';
import { CardData } from '../person-card';
import { ListItemData } from '../person-list-item';

export interface PersonHost extends ReactiveControllerHost {
  azureId: string;
  dispatchEvent(event: Event): boolean;
  presence?: Task<[string], PersonPresence>;
  details?: Task<[string], PersonDetails>;
}

export interface PersonResolver {
  getPresence: (azureId: string) => Promise<PersonPresence> | PersonPresence;
  getDetails: (azureId: string) => Promise<PersonDetails> | PersonDetails;
  getImageByAzureId: (azureId: string) => Promise<AvatarData> | AvatarData;
  getImageByUpn: (upn: string) => Promise<AvatarData> | AvatarData;
  getCardDetailsByAzureId: (azureId: string) => Promise<CardData> | CardData;
  getCardDetailsByUpn: (upn: string) => Promise<CardData> | CardData;
  getListItemDetailsByAzureId: (azureId: string) => Promise<ListItemData> | ListItemData;
  getListItemDetailsByUpn: (upn: string) => Promise<ListItemData> | ListItemData;
}
