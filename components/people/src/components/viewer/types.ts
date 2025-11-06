import type { PeopleProps } from "../../types";

export interface PeopleViewerElementProps extends PeopleProps {
  tableColumns?: Array<'avatar' | 'name' | 'type' | 'email' | 'mobilePhone' | 'jobTitle' | 'department' | 'manager' | 'remove'> | string;
  viewMode?: 'list' | 'table';
  showViewMode?: boolean;
}
