import { ReactiveControllerHost } from 'lit';
import { PersonDetails, AzureIdOrUpnObj, PersonInfo, PersonSearchResult } from '../../types';

type ResolverArgs<T = unknown> = T extends object
  ? { [K in keyof T]: T[K] } & { signal?: AbortSignal }
  : { signal?: AbortSignal };

type ResolverResult<T = unknown> = T | Promise<T>;

export interface PersonHost extends ReactiveControllerHost {
  azureId: string;
  dispatchEvent(event: Event): boolean;
}

export interface PersonResolver {
  getDetails: (args: ResolverArgs<AzureIdOrUpnObj>) => ResolverResult<PersonDetails>;
  getInfo: (args: ResolverArgs<AzureIdOrUpnObj>) => ResolverResult<PersonInfo>;
  getPhoto: (args: ResolverArgs<AzureIdOrUpnObj>) => ResolverResult<string>;
  search: (args: ResolverArgs<{ search: string }>) => ResolverResult<PersonSearchResult>;
}
