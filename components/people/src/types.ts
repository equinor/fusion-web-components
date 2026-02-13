import type { PersonInfo } from "@equinor/fusion-wc-person";

export type TableColumns = Array<'avatar' | 'name' | 'azureId' | 'type' | 'email' | 'mobilePhone' | 'jobTitle' | 'department' | 'manager' | 'remove'>;

export interface PeopleProps {
  value?: string;
  resolveIds?: string[] | string;
  people?: PersonInfo[] | string;
  multiple?: boolean;
  subtitle?: keyof PersonInfo;
  secondarySubtitle?: keyof PersonInfo;
  tableColumns?: TableColumns | string;
  viewMode?: 'list' | 'table';
  showViewMode?: boolean;
  editable?: boolean;
}
