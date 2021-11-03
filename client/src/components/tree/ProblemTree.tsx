import React, { useState, useRef, useEffect, useCallback } from "react";
import { Tree, NodeModel, TreeMethods } from "@minoru/react-dnd-treeview";
import { ProblemData } from "../Types";
import ProblemNode from "./ProblemNode";
import Placeholder from "./Placeholder";
import styles from "./ProblemTree.module.css";
import * as Constants from "../../constants"

type Props = {
  data: NodeModel<ProblemData>[];
  canSort: boolean;
};

/**
 * 문제집 트리 컴포넌트 
 * ProblemData의 배열로 트리 데이터 구성
 * 폴더 ID : 1 ~ 100
 * 문제 ID : 1000 ~
 */
function ProblemTree(props: Props) {
  const [treeData, setTreeData] = useState<NodeModel<ProblemData>[]>(props.data);

  const [newOpenIds, setNewOpenIds] = useState<NodeModel["id"][]>(
    () => JSON.parse(window.localStorage.getItem("openIds") || "[]")
  );
  
  const [folderIdArray, setFolderIdArray] = useState([false]);

  const [selectedNode, setSelectedNode] = useState<NodeModel>();

  const ref = useRef<TreeMethods>(null);

  const handleOpen = useCallback(() => {
    console.log("handleOpen call");
    
    if (ref.current?.open) {
      ref.current.open(newOpenIds);
    }
  }, [newOpenIds])

  useEffect(() => {
    console.log("useEffect call");

    handleOpen();
    let newFolderArray = Array.from({length: Constants.MAX_FOLDER_NUM + 1}, () => false);
    treeData.forEach((element) => {
      let curr_id = 0;
      if (typeof element.id === 'number' && element.droppable) {
        curr_id = element.id;
        //console.log(curr_id)
      }
      newFolderArray[curr_id] = true;
    })
    setFolderIdArray(newFolderArray);
  }, []);


  const handleSelect = useCallback((node: NodeModel) => {
    console.log("handleSelect call");

    setSelectedNode(node);
    window.localStorage.setItem("selectedId", node.id.toString());
  }, [setSelectedNode]);

  const resetSelect = useCallback(() => {
    console.log("resetSelect call");

    setSelectedNode(undefined);
  }, [setSelectedNode]);


  const handleDrop = useCallback((newTree: NodeModel<ProblemData>[]) => {
    console.log("handleDrop call");

    setTreeData(newTree);
  }, [setTreeData]);

  const handleChangeOpen = useCallback((_newOpenIds: NodeModel["id"][]) => {
    console.log("handleChangeOpen call");

    setNewOpenIds(_newOpenIds);
    window.localStorage.setItem("openIds", JSON.stringify(_newOpenIds));
  }, [setNewOpenIds]);

  
  const addNode = useCallback((newNode: NodeModel<ProblemData>) => {
    console.log("addNode call");

    setTreeData(prevData => [...prevData, newNode]);
  }, [setTreeData]);

  const addFolder = useCallback(() => {
    console.log("addFolder call");

    let newId = -1;
    for(let i = 1; i <= Constants.MAX_FOLDER_NUM; i++) {
      if(!folderIdArray[i]) {
        let newFolderArray = [...folderIdArray];
        newFolderArray[i] = true;
        setFolderIdArray(newFolderArray);
        newId = i;
        break;
      }
    }

    if(newId === -1) {
      console.log("폴더 꽉 참");
      return;
    }

    console.log(newId);

    let parentId;
    if(typeof selectedNode === "undefined" || !selectedNode) {
      parentId = 0;
    } else {
      if(selectedNode.droppable) {
        parentId = selectedNode.id;
      } else {
        parentId = selectedNode.parent;
      }
    }

    addNode(
      {
        "id": newId,
        "parent": parentId,
        "droppable": true,
        "text": "New Folder",
        "data": {
          "level": -1,
          "problemId": -1,
        }
      }
    )
  }, [folderIdArray, setFolderIdArray, selectedNode, addNode]);

  return (
    <div className={styles.treeapp} onClick={resetSelect}>
      <button onClick={addFolder}>add folder</button>
      <Tree
        ref={ref}
        tree={treeData}
        rootId={0}
        render={(
          node: NodeModel<ProblemData>,
          { depth, isOpen, onToggle }
        ) => (
          <ProblemNode
            node={node}
            depth={depth}
            isOpen={isOpen}
            isSelected={node.id === selectedNode?.id}
            onToggle={onToggle}
            onSelect={handleSelect}
          />
        )}
        onDrop={handleDrop}
        onChangeOpen={handleChangeOpen}
        classes={{
          root: styles.treeRoot,
          draggingSource: styles.draggingSource,
          dropTarget: styles.dropTarget,
          placeholder: styles.placeholder
        }}
        canDrop={props.canSort ?
          (tree, { dragSource, dropTargetId, dropTarget }) => {
            if (dragSource?.parent === dropTargetId) {
              return true;
            }} : undefined}
        sort={false}
        insertDroppableFirst={!props.canSort}
        dropTargetOffset={props.canSort ? 10 : undefined }
        placeholderRender={props.canSort ? (node, { depth }) => (
          <Placeholder node={node} depth={depth} />
        ) : undefined }
      />
    </div>
  );
}

export default ProblemTree;
