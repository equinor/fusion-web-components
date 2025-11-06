import { createContext } from '@lit/context';
import type { PersonInfo } from "@equinor/fusion-wc-person";
import type { SelectedController } from './SelectedController';

export type PickerContext = {
  subtitle: keyof PersonInfo;
  secondarySubtitle: keyof PersonInfo;
  selected?: InstanceType<typeof SelectedController>;
};

export const pickerContext = createContext<PickerContext>('people-picker');
