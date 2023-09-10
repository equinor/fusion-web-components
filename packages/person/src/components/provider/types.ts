import { ReactiveControllerHost } from 'lit';
import { PersonDetails, AzureIdOrUpnObj, PersonInfo, PersonSearchResult } from '../../types';

export interface PersonHost extends ReactiveControllerHost {
  azureId: string;
  dispatchEvent(event: Event): boolean;
}

export interface PersonResolver {
  getDetails: (args: AzureIdOrUpnObj) => Promise<PersonDetails> | PersonDetails;
  getInfo: (args: AzureIdOrUpnObj) => Promise<PersonInfo> | PersonInfo;
  getPhoto: (args: AzureIdOrUpnObj) => Promise<string> | string;
  search: (args: { search: string }) => Promise<PersonSearchResult> | PersonSearchResult;
}
