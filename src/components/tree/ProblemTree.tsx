import React, { useState, useRef, useEffect, useCallback } from "react";
import { Observer } from "mobx-react";
import { toJS } from "mobx";
import { Tree, NodeModel, TreeMethods } from "@minoru/react-dnd-treeview";
import { useContextMenu } from "react-contexify";

import { ProblemData } from "../types/Types";
import problemListStore from "../../stores/ProblemListStore";
import selectedNodeStore from "../../stores/SelectedNodeStore";
import ProblemNode from "./ProblemNode";
import Placeholder from "./Placeholder";

import styles from "./ProblemTree.module.css";
import * as Constants from "../../constants";
import TreeContextMenu from "../contextMenu/TreeContextMenu";

type Props = {
  canSort: boolean;
};

/**
 * 문제집 트리 컴포넌트 
 * ProblemData의 배열로 트리 데이터 구성
 * 폴더 ID : 1 ~ 100
 * 문제 ID : 1000 ~
 */
function ProblemTree(props: Props) {
  // Mobx 로드
  const problemList = problemListStore;
  const selectedNode = selectedNodeStore;

  const [newOpenIds, setNewOpenIds] = useState<NodeModel["id"][]>(
    () => JSON.parse(window.localStorage.getItem("openIds") || "[]")
  );

  const ref = useRef<TreeMethods>(null);

  // ContextMenu 관련 함수
  const { show, hideAll } = useContextMenu({
    id: Constants.TREE_CONTEXT_MENU_ID
  });

  const displayMenu = (e: any) => {
    console.log("displayMenu call");
    e.stopPropagation();
    show(e);
  };

  const rootDisplayMenu = (e: any) => {
    displayMenu(e);
    resetSelect();
  };

  
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
  const handleSelect = (node: NodeModel) => {
    console.log("handleSelect call");

    selectedNode.setNode(node);
  }

  const resetSelect = () => {
    console.log("resetSelect call");

    selectedNode.setNode(undefined);
  }

  const handleDrop = (newTree: NodeModel<ProblemData>[]) => {
    console.log("handleDrop call");

    problemList.setData(newTree);
  }

  // 폴더를 열때 호출
  const handleChangeOpen = useCallback((_newOpenIds: NodeModel["id"][]) => {
    console.log("handleChangeOpen call");

    // 어떤 폴더들을 열었는지 상태 저장
    setNewOpenIds(_newOpenIds);
    window.localStorage.setItem("openIds", JSON.stringify(_newOpenIds));
  }, [setNewOpenIds]);

  return (
    <Observer>
      {() => (
        <div onContextMenu={rootDisplayMenu}>
          <div className={styles.treeapp}>
            <Tree
              ref={ref}
              tree={toJS(problemList.data)}
              rootId={0}
              render={(
                node: NodeModel<ProblemData>,
                { depth, isOpen, onToggle }
              ) => (
                <ProblemNode
                  node={node}
                  depth={depth}
                  isOpen={isOpen}
                  isSelected={node.id === selectedNode.node?.id}
                  onToggle={onToggle}
                  onSelect={handleSelect}
                  displayMenu={displayMenu}
                  hideMenu={hideAll}
                />
              )}
              onDrop={handleDrop}
              onChangeOpen={handleChangeOpen}
              classes={{
                root: styles.treeRoot,
                draggingSource: styles.draggingSource,
                placeholder: styles.placeholder
              }}
              canDrop={props.canSort ?
                (tree, { dragSource, dropTargetId, dropTarget }) => {
                  if (dragSource?.parent === dropTargetId) {
                    return true;
                  }
                } : undefined}
              sort={false}
              insertDroppableFirst={!props.canSort}
              dropTargetOffset={props.canSort ? 7 : undefined}
              placeholderRender={props.canSort ? (node, { depth }) => (
                <Placeholder node={node} depth={depth} />
              ) : undefined}
            />
            <TreeContextMenu node={selectedNode.node}/>
          </div>
        </div>)}
    </Observer>
  );
}

export default ProblemTree;
