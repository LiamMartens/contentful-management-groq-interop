import * as contentful from 'contentful-management';

export type EntryLike<T extends contentful.KeyValueMap> = {
  sys: contentful.EntityMetaSysProps;
  fields: T;
};
