import type { PeopleProps } from "../../types";

export interface PickerElementProps extends PeopleProps {
  placeholder?: string;
  showSelectedPeople?: boolean;
}
