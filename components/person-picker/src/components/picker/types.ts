import { PersonInfo } from "@equinor/fusion-wc-person";

export interface PersonPickerElementProps {
  value: string;
  placeholder: string;
  multiple: boolean;
  subTitle: keyof PersonInfo;
  secondarySubTitle: keyof PersonInfo;
}
