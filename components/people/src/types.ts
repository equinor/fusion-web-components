import type { PersonInfo } from "@equinor/fusion-wc-person";

export interface PeopleProps {
  value?: string;
  resolveIds?: string[] | string;
  people?: PersonInfo[] | string;
  multiple?: boolean;
  subtitle?: keyof PersonInfo;
  secondarySubtitle?: keyof PersonInfo;
}
