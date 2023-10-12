import * as contentful from 'contentful-management';

export type EntryLike<T extends contentful.KeyValueMap> = Pick<contentful.EntryProps<T>, 'sys' | 'fields'>;
