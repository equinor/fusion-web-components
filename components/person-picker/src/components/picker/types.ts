import { PersonInfo } from "@equinor/fusion-wc-person";

export interface PersonPickerElementProps {
  value: string;
  placeholder: string;
  multiple: boolean;
  subtitle: keyof PersonInfo;
  secondarySubTitle: keyof PersonInfo;
}
