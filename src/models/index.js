// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { WorkbookDB } = initSchema(schema);

export {
  WorkbookDB
};