import { Observer } from "mobx-react";
import { toJS } from "mobx";
import { Tree, NodeModel } from "@minoru/react-dnd-treeview";
import { useContextMenu } from "react-contexify";

import { ProblemData } from "../../types/Types";
import problemListStore from "../../stores/ProblemListStore";
import selectedNodeStore from "../../stores/SelectedNodeStore";
import ProblemNode from "./ProblemNode";
import Placeholder from "./Placeholder";

import styles from "./ProblemTree.module.css";
import * as Constants from "../../constants";
import TreeContextMenu from "../contextMenu/TreeContextMenu";

type Props = {
  editable: boolean;
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

  // ContextMenu 관련 함수
  const { show, hideAll } = useContextMenu({
    id: Constants.TREE_CONTEXT_MENU_ID
  });

  const displayMenu = (e: any) => {
    // console.log("displayMenu call");
    e.stopPropagation();
    show(e);
  };

  const rootDisplayMenu = (e: any) => {
    displayMenu(e);
    resetSelect();
  };

  // 노드 선택 시 호출
  const handleSelect = (node: NodeModel) => {
    // console.log("handleSelect call");

    selectedNode.setNode(node);
  }

  const resetSelect = () => {
    // console.log("resetSelect call");

    selectedNode.setNode(undefined);
  }

  const handleDrop = (newTree: NodeModel<ProblemData>[]) => {
    // console.log("handleDrop call");

    problemList.setData(newTree);
  }

  return (
    <Observer>
      {() => (
        <div onContextMenu={rootDisplayMenu}>
          <div className={styles.treeapp}>
            <Tree
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
                  editable={props.editable}
                  isSelected={node.id === selectedNode.node?.id}
                  onToggle={onToggle}
                  onSelect={props.editable ? handleSelect: () => {}}
                  displayMenu={props.editable ? displayMenu: () => {}}
                  hideMenu={props.editable ? hideAll: () => {}}
                />
              )}
              onDrop={props.editable ? handleDrop : () => {}}
              classes={{
                root: styles.treeRoot,
                draggingSource: styles.draggingSource,
                placeholder: styles.placeholder
              }}
              canDrop={props.editable ?
                (tree, { dragSource, dropTargetId, dropTarget }) => {
                  if (dragSource?.parent === dropTargetId) {
                    return true;
                  }
                } : undefined}
              sort={false}
              insertDroppableFirst={false}
              dropTargetOffset={props.editable ? 7 : undefined}
              placeholderRender={props.editable ? (node, { depth }) => (
                <Placeholder node={node} depth={depth} />
              ) : undefined}
            />
            {props.editable && <TreeContextMenu node={selectedNode.node}/>}
          </div>
        </div>)}
    </Observer>
  );
}

export default ProblemTree;
