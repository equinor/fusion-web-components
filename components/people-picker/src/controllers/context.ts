import { createContext } from '@lit/context';
import type { PersonInfo } from "@equinor/fusion-wc-person";
import { SelectedController } from './SelectedController';

export type PickerContext = {
  subTitle: keyof PersonInfo;
  secondarySubTitle: keyof PersonInfo;
  selected: SelectedController;
};

export const pickerContext = createContext<PickerContext>('people-picker');
