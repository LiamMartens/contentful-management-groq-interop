import Case from 'case';

// @README the typing of this is very loose because the Contentful schema can be very loose
export const transformLinksToReferences = <O extends Record<string, any>>(
  obj: O
): O => {
  if (obj && typeof obj === 'object') {
    if (obj.type === 'Link' && obj.id) {
      return {
        ...obj,
        _type: 'reference',
        _ref: obj.id,
      }
    }

    if (Array.isArray(obj)) {
      return obj.map((value) => transformLinksToReferences(value)) as typeof obj
    }

    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        // @README GROQ compliant field names can not contain dashes
        return [Case.snake(key), transformLinksToReferences(value)]
      })
    ) as O
  }

  return obj
}
