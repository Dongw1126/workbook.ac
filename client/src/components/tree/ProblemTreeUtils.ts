import { NodeModel } from "@minoru/react-dnd-treeview";
import * as Constants from "../../constants"
import { ProblemData, Tree, Node } from "../Types";

// selectedNode 하위에 새로운 폴더 객체 반환
export function getNewFolder(_treeData: NodeModel<ProblemData>[], _selectedNode?: NodeModel) {
    console.log("getNewFolderId call");

    let idArray = Array.from({ length: Constants.MAX_FOLDER_NUM }, () => false);
    _treeData.forEach((element) => {
        if (element.droppable) {
            idArray[Number(element.id)] = true;
        }
    });

    let newId = -1;
    for (let i = 1; i < Constants.MAX_FOLDER_NUM; i++) {
        if (!idArray[i]) {
            newId = i;
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

    return newFolder;
}


// 트리 순회를 위한 재귀 서브 함수
function deleteFolderSub(tree:Tree, n: Node, ret: NodeModel<ProblemData>[], del?: NodeModel) {
    if(n.child.length === 0) return;

    n.child.forEach(element => {
        if(element.id !== del?.id) {
            ret.push(element);
            if(element.droppable) {
                deleteFolderSub(tree, tree.root[element.id], ret, del);
            }
        }
    });
}

// 폴더와 하위 노드를 삭제한 새 treeData 반환
export function deleteFolder(_treeData: NodeModel<ProblemData>[], toBeDeletedNode?: NodeModel) {
    console.log("deleteFolder call");

    let newTree = new Tree(_treeData);
    let retTree: NodeModel<ProblemData>[] = [];
    deleteFolderSub(newTree, newTree.root[0], retTree, toBeDeletedNode);

    return retTree;
}

