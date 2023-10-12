import Case from 'case';
import contentful from 'contentful-management';
import { transformLinksToReferences } from './transformLinksToReferences';
import { EntryLike } from './types';

export type GroqSysFields = {
  _id: string;
  _type: string;
  _updatedAt: string;
  _publishedAt?: string;
  _createdAt: string;
};

export function transformContentfulEntry<
  Fields extends contentful.KeyValueMap,
  Entry extends EntryLike<Fields>
>(entry: Entry): Entry & GroqSysFields {
  const obj = {
    _id: entry.sys.id,
    _type: entry.sys.contentType?.sys.id ?? Case.camel(entry.sys.type),
    _updatedAt: entry.sys.updatedAt,
    _createdAt: entry.sys.createdAt,
    _publishedAt: entry.sys.publishedAt,
    ...entry,
  } as Entry & {
    _id: string;
    _type: string;
    _updatedAt: string;
    _createdAt: string;
  };

  return transformLinksToReferences(obj);
}
