import { NodeModel } from "@minoru/react-dnd-treeview";
import * as Constants from "../../constants"
import { ProblemData, Tree } from "../Types";

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


export function deleteFolder(_treeData: NodeModel<ProblemData>[], toBeDeletedNode?: NodeModel) {
    let newTree = new Tree(_treeData);
}

