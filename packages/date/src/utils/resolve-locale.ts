import { LocaleName } from '../types';
import * as locales from 'date-fns/locale';

export const resolveLocale = (localeName: LocaleName): Locale => {
  return locales[localeName as keyof typeof locales];
};
