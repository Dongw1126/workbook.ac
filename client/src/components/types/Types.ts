import { makeAutoObservable } from 'mobx';
import { NodeModel } from "@minoru/react-dnd-treeview";
import * as Constants from "../../constants";

export type ProblemData = {
  level: number;
  problemId: number;
  // tierShown, etc
};

export class Node {
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
  }
};

export class ProblemList {
  data: NodeModel<ProblemData>[] = []
  idArray: boolean[] = []
  tree: Tree = new Tree([]);

  constructor() {
    makeAutoObservable(this);
    this.idArray = Array.from({ length: Constants.MAX_FOLDER_NUM }, () => false);
  }

  updateIdArray() {
    this.idArray = Array.from({ length: Constants.MAX_FOLDER_NUM }, () => false);
    this.data.forEach((element) => {
      if (element.droppable) {
        this.idArray[Number(element.id)] = true;
      }
    });
  }

  setData(_treeData: NodeModel<ProblemData>[]) {
    this.data = _treeData;
    this.updateIdArray();
  }

  // selectedNode 하위에 새로운 폴더 추가
  addFolder(_selectedNode?: NodeModel) {
    console.log("addFolder call");

    let newId = -1;
    for (let i = 1; i < Constants.MAX_FOLDER_NUM; i++) {
      if (!this.idArray[i]) {
        newId = i;
        this.idArray[i] = true;
        break;
      }
    }

    let parentId: string | number;
    if (typeof _selectedNode === "undefined" || !_selectedNode) {
      parentId = 0;
    } else {
      if (_selectedNode.droppable) {
        parentId = _selectedNode.id;
      } else {
        parentId = _selectedNode.parent;
      }
    }

    const newFolder = {
      "id": newId,
      "parent": parentId,
      "droppable": true,
      "text": "New Folder",
      "data": {
        "level": -1,
        "problemId": -1,
      }
    };

    this.data.push(newFolder);

    return newId;
  }

  // 트리 순회를 위한 서브 함수
  deleteNodeSub(n: Node, _del?: NodeModel) {
    if (n.child.length === 0) return;

    n.child.forEach(element => {
      if (element.id !== _del?.id) {
        this.data.push(element);
        if (element.droppable) {
          this.deleteNodeSub(this.tree.root[element.id], _del);
        }
      }
    });
  }

  // 해당 노드와 하위 노드를 삭제
  deleteNode(_del?: NodeModel) {
    console.log("deleteNode call");

    this.tree = new Tree(this.data);
    this.data = [];
    this.deleteNodeSub(this.tree.root[0], _del);
    this.updateIdArray();
  }
};


