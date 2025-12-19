import { PersonInfo } from "@equinor/fusion-wc-person";

export interface PickerElementProps {
  value?: string;
  preselectedIds?: string | string[];
  preselectedPeople?: string | PersonInfo[];
  placeholder?: string;
  multiple?: boolean;
  subTitle?: keyof PersonInfo;
  secondarySubTitle?: keyof PersonInfo;
  showSelectedPeople?: boolean;
}
