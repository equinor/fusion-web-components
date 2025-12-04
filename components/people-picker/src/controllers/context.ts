import { createContext } from '@lit/context';
import type { PersonInfo } from "@equinor/fusion-wc-person";

export type PickerContext = {
  subTitle: keyof PersonInfo;
  secondarySubTitle: keyof PersonInfo;
};

export const pickerContext = createContext<PickerContext>('people-picker');

