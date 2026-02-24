import { createContext } from '@lit/context';
import type { PersonInfo } from '@equinor/fusion-wc-person';
import type { SelectedController } from './SelectedController';

export type PickerContext = {
  subtitle: keyof PersonInfo;
  secondarySubtitle: keyof PersonInfo;
  editable: boolean;
  selected?: InstanceType<typeof SelectedController>;
  viewMode?: 'list' | 'table';
  tableColumns?: Array<'avatar' | 'name' | 'azureId' | 'type' | 'email' | 'mobilePhone' | 'jobTitle' | 'department' | 'manager' | 'remove'>;
  systemAccounts: boolean;
};

export const pickerContext = createContext<PickerContext>('people-picker');
