import { makeAutoObservable } from 'mobx';
import { NodeModel } from "@minoru/react-dnd-treeview";
import * as Constants from "../../constants";

export type ProblemData = {
  level?: number;
  problemId?: number;
  voteCnt?: number;
  // tierShown, etc
};

export type WorkbookData = {
  id: number;
  title: string;
  author: string;
  favorite: number;
  img: string;
}

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


/**
 * (Mobx 적용) 트리 문제집 데이터 클래스
 */
export class ProblemList {
  data: NodeModel<ProblemData>[] = []
  idArray: boolean[] = []
  tree: Tree = new Tree([]);
  problemNum: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.idArray = Array.from({ length: Constants.MAX_FOLDER_NUM }, () => false);
  }

  updateProblemNum() {
    this.problemNum = 0;
    this.data.forEach((element) => {
      if (!element.droppable) {
        this.problemNum++;
      }
    });
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
    console.log("setData");
    this.data = _treeData;

    this.updateIdArray();
    this.updateProblemNum();
  }

  /** selectedNode 하위에 새로운 폴더 추가 */
  addFolder(folderName: string, _selectedNode?: NodeModel) {
    console.log("addFolder call");

    let newId = -1;
    for (let i = 1; i < Constants.MAX_FOLDER_NUM; i++) {
      if (!this.idArray[i]) {
        newId = i;
        this.idArray[i] = true;
        break;
      }
    }

    // 최대 폴더 개수 도달
    if (newId === -1) return newId;

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
      "text": folderName,
    };

    this.data.push(newFolder);

    return newId;
  }

  /** selectedNode 하위에 새로운 문제 추가 */
  addProblem(_problemId: number, _level: number, _text: string, _voteCnt?: number, _selectedNode?: NodeModel) {
    console.log("addProblem call");

    let isDup = false;
    this.data.forEach((element) => {
      if (element.id === _problemId) {
        // 이미 존재하는 문제
        isDup = true;
        return;
      }
    });

    if(isDup) return false;

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

    const newProblem = {
      "id": _problemId,
      "parent": parentId,
      "droppable": false,
      "text": _text,
      "data": {
        "level": _level,
        "problemId": _problemId,
        "voteCnt": _voteCnt
      }
    };

    this.data.push(newProblem);
    this.problemNum++;

    console.log(this.problemNum);
    return true;
  }

  editFolderName(folderName: string, _selectedNode?: NodeModel) {
    console.log("editFolderName call");
    if (typeof _selectedNode !== 'undefined') {
      this.data.forEach((element) => {
        if (element.id === _selectedNode.id) {
          element.text = folderName;
        }
      });
    }
  }

  /** 트리 순회를 위한 서브 함수 */
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

  /** 해당 노드와 하위 노드를 삭제 */
  deleteNode(_del?: NodeModel) {
    console.log("deleteNode call");

    this.tree = new Tree(this.data);
    this.data = [];
    this.deleteNodeSub(this.tree.root[0], _del);

    this.updateIdArray();
    this.updateProblemNum();
  }
};


