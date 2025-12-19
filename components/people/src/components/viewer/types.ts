import type { PersonInfo } from "@equinor/fusion-wc-person";

export interface PeopleViewerElementProps {
  resolveIds?: string | string[];
  people?: string | PersonInfo[];
  subTitle?: keyof PersonInfo;
  secondarySubTitle?: keyof PersonInfo;
  viewMode?: 'list' | 'table';
}
