import * as locales from 'date-fns/locale';

export const resolveLocale = (localeName: string): Locale => {
  return locales[localeName as keyof typeof locales];
};
