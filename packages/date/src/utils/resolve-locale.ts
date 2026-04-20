import * as locales from 'date-fns/locale';
import type { Locale } from 'date-fns/locale';

export const resolveLocale = (localeName: string): Locale => {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: locales are intentionally resolved dynamically from the date-fns locale registry
  return locales[localeName as keyof typeof locales];
};
