import { NodeModel } from "@minoru/react-dnd-treeview";

export type ProblemData = {
  level: number;
  problemId: number;
  // tierShown, etc
};

export class ProblemList {
  folderId = 100;
  problemList: NodeModel<ProblemData>[] = [];

  constructor(json = []) {
    json.forEach((item) => {
      this.problemList.push(item);
    })
    console.log(this.problemList);
  }

  addFolder() {
    this.folderId += 1;
  }
}


  