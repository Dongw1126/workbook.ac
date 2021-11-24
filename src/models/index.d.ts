import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type WorkbookDBMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class WorkbookDB {
  readonly id: string;
  readonly author: string;
  readonly title: string;
  readonly favorite: number;
  readonly image?: string;
  readonly treeData?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<WorkbookDB, WorkbookDBMetaData>);
  static copyOf(source: WorkbookDB, mutator: (draft: MutableModel<WorkbookDB, WorkbookDBMetaData>) => MutableModel<WorkbookDB, WorkbookDBMetaData> | void): WorkbookDB;
}