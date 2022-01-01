// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FavoriteDB, WorkbookDB, TreeDataDB } = initSchema(schema);

export {
  FavoriteDB,
  WorkbookDB,
  TreeDataDB
};