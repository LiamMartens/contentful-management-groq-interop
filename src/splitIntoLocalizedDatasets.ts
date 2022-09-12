import contentful from 'contentful-management'

export function splitIntoLocalizedDatasets(
  locales: string[], 
  entries: contentful.EntryProps[],
  defaultLocale: string
) {
  const localized: Record<string, typeof entries> = Object.fromEntries(
    locales.map((locale) => ([locale, []]))
  )
  entries.forEach((entry) => {
    locales.forEach((locale) => {
      localized[locale].push({
        ...entry,
        fields: Object.fromEntries(
          Object.entries(entry.fields).map(([name, localized]) => {
            const value = localized[locale] ?? localized[defaultLocale]
            return [name, value]
          })
        ),
      })
    })
  })
  return localized
}