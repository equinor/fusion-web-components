import { PersonInfo } from "@equinor/fusion-wc-person";

export interface PeoplePickerElementProps {
  value: string;
  placeholder: string;
  multiple: boolean;
  subTitle: keyof PersonInfo;
  secondarySubTitle: keyof PersonInfo;
}
