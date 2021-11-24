import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type WorkbookDataMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class WorkbookData {
  readonly id: string;
  readonly author: string;
  readonly title: string;
  readonly favorite: number;
  readonly image?: string;
  readonly treeData?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<WorkbookData, WorkbookDataMetaData>);
  static copyOf(source: WorkbookData, mutator: (draft: MutableModel<WorkbookData, WorkbookDataMetaData>) => MutableModel<WorkbookData, WorkbookDataMetaData> | void): WorkbookData;
}