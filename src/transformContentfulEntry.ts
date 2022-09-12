import * as contentful from 'contentful-management';
import { transformLinksToReferences } from './transformLinksToReferences';

type GroqSysFields = {
  _id: string
  _type: string
  _updatedAt: string
  _createdAt: string
}

export const transformContentfulEntry = <Entry extends contentful.EntryProps>(
  entry: Entry
): Entry & GroqSysFields => {
  const obj = {
    _id: entry.sys.id,
    _type: entry.sys.contentType?.sys.id ?? entry.sys.type,
    _updatedAt: entry.sys.updatedAt,
    _createdAt: entry.sys.createdAt,
    ...entry,
  } as Entry & {
    _id: string
    _type: string
    _updatedAt: string
    _createdAt: string
  }

  return transformLinksToReferences(obj)
}