import type { PersonInfo } from "@equinor/fusion-wc-person";

export interface PeopleViewerElementProps {
  resolveIds?: string | string[];
  people?: string | PersonInfo[];
  subTitle?: keyof PersonInfo;
  secondarySubTitle?: keyof PersonInfo;
  tableColumns?: ('avatar' | 'name' | 'type' | 'email' | 'mobilePhone' | 'jobTitle' | 'department' | 'manager' | 'remove')[];
  viewMode?: 'list' | 'table';
  showViewMode?: boolean;
}
