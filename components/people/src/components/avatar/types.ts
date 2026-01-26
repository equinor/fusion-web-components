import type { PersonInfo } from "@equinor/fusion-wc-person";

export type PeopleAvatarElementProps = {
  dataSource: PersonInfo | string;
  disabled?: boolean;
};
