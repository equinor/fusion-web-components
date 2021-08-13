import * as locales from 'date-fns/locale';

export enum DateTimeFormat {
  date = 'dd.MM.yyyy',
  time = 'HH:mm',
  datetime = 'HH:mm dd.MM.yyyy',
  time_with_seconds = 'HH:mm:ss',
  datetime_with_seconds = 'HH:mm:ss dd.MM.yyyy',
}

export type DateRangeVariant = 'distance' | 'relative' | 'datetime';

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const localeNames = Object.keys(locales);

export type LocaleName = keyof typeof localeNames;
