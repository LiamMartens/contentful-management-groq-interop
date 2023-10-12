import flush from 'just-flush';
import contentful from 'contentful-management';
import { EntryLike } from './types';

export function splitIntoLocalizedDatasets<
  Fields extends contentful.KeyValueMap,
  Entry extends EntryLike<Fields>
>(locales: string[], entries: Entry[], defaultLocale: string) {
  const localized: Record<string, typeof entries> = Object.fromEntries(
    locales.map((locale) => [locale, []])
  );
  entries.forEach((entry) => {
    locales.forEach((locale) => {
      localized[locale].push({
        ...entry,
        fields: Object.fromEntries(
          flush(
            Object.entries(entry.fields).map(([name, fieldValue]) => {
              const value = fieldValue[locale] ?? fieldValue[defaultLocale];
              const canBeOmitted =
                typeof value === 'undefined' || value === null || value === '';
              if (!canBeOmitted) {
                return [name, value];
              }
              return null;
            })
          )
        ),
      });
    });
  });
  return localized;
}
