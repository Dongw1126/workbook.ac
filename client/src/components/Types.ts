import { NodeModel } from "@minoru/react-dnd-treeview";
import * as Constants from "../constants";

export type ProblemData = {
  level: number;
  problemId: number;
  // tierShown, etc
};


class Node {
  data: NodeModel<ProblemData> | undefined;
  child: any[];
  constructor() {
    this.data = undefined;
    this.child = [];
  }
};

export class Tree {
  root: Node[];
  constructor(_treeData: NodeModel<ProblemData>[]) {
    this.root = [];
    for (let i = 0; i < Constants.MAX_FOLDER_NUM; i++) {
      this.root.push(new Node());
    }

    _treeData.forEach((element) => {
      if (element.droppable) {
        this.root[Number(element.id)].data = element;
        this.root[Number(element.parent)].child.push(element);
      }
      else {
        this.root[Number(element.parent)].child.push(element);
      }
    });

    console.log(this.root);
  }

};

