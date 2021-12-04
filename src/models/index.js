// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { WorkbookDB, TreeDataDB } = initSchema(schema);

export {
  WorkbookDB,
  TreeDataDB
};