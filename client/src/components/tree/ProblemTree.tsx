import React, { useState, useRef, useEffect, useCallback } from "react";
import { Tree, NodeModel, TreeMethods } from "@minoru/react-dnd-treeview";
import { useContextMenu } from "react-contexify";

import { ProblemData } from "../Types";
import ProblemNode from "./ProblemNode";
import Placeholder from "./Placeholder";

import styles from "./ProblemTree.module.css";
import * as Constants from "../../constants"
import FolderContextMenu from "../contextMenu/FolderContextMenu";

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

  const [selectedNode, setSelectedNode] = useState<NodeModel>();

  const ref = useRef<TreeMethods>(null);

  const { show } = useContextMenu({
    id: Constants.FOLDER_CONTEXT_MENU_ID
  });

  const displayMenu = (e: any) => {
    // 노드 선택 추가
    resetSelect();
    show(e);
  }


  // newOpenIds로 부터 열려있던 폴더 상태 불러옴
  const handleOpen = useCallback(() => {
    console.log("handleOpen call");
    
    if (ref.current?.open) {
      ref.current.open(newOpenIds);
    }
  }, [newOpenIds])

  useEffect(() => {
    handleOpen();
  }, []);

  // 노드 선택 시 호출
  const handleSelect = useCallback((node: NodeModel) => {
    console.log("handleSelect call");

    setSelectedNode(node);
  }, [setSelectedNode]);

  const resetSelect = useCallback(() => {
    console.log("resetSelect call");

    setSelectedNode(undefined);
  }, [setSelectedNode]);


  const handleDrop = useCallback((newTree: NodeModel<ProblemData>[]) => {
    console.log("handleDrop call");

    setTreeData(newTree);
  }, [setTreeData]);

  // 폴더를 열때 어떤 폴더들을 열었는지 상태 저장
  const handleChangeOpen = useCallback((_newOpenIds: NodeModel["id"][]) => {
    console.log("handleChangeOpen call");

    setNewOpenIds(_newOpenIds);
    window.localStorage.setItem("openIds", JSON.stringify(_newOpenIds));
  }, [setNewOpenIds]);

  return (
    <div onClick={resetSelect} onContextMenu={displayMenu}>
      <div className={styles.treeapp}>
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
        <FolderContextMenu treeData={treeData} setTreeData={setTreeData} node={selectedNode}/>
      </div>
    </div>
  );
}

export default ProblemTree;
