import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type WorkbookDBMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TreeDataDBMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class WorkbookDB {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly favorite: number;
  readonly image?: string;
  readonly treeDataId?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<WorkbookDB, WorkbookDBMetaData>);
  static copyOf(source: WorkbookDB, mutator: (draft: MutableModel<WorkbookDB, WorkbookDBMetaData>) => MutableModel<WorkbookDB, WorkbookDBMetaData> | void): WorkbookDB;
}

export declare class TreeDataDB {
  readonly id: string;
  readonly treeData?: string;
  readonly workbookId?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TreeDataDB, TreeDataDBMetaData>);
  static copyOf(source: TreeDataDB, mutator: (draft: MutableModel<TreeDataDB, TreeDataDBMetaData>) => MutableModel<TreeDataDB, TreeDataDBMetaData> | void): TreeDataDB;
}