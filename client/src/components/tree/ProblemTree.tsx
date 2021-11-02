import React, { useState, useRef, useEffect } from "react";
import { Tree, NodeModel, TreeMethods } from "@minoru/react-dnd-treeview";
import { ProblemData } from "../Types";
import ProblemNode from "./ProblemNode";
import Placeholder from "./Placeholder";
import styles from "./ProblemTree.module.css";

type Props = {
  data: NodeModel<ProblemData>[];
  canSort: boolean;
};

/**
 * 문제집 트리 컴포넌트
 * ProblemData의 배열로 트리 데이터 구성
 */
function ProblemTree(props: Props) {
  const [treeData, setTreeData] = useState<NodeModel<ProblemData>[]>(props.data);

  const [newOpenIds, setNewOpenIds] = useState<NodeModel["id"][]>(
    () => JSON.parse(window.localStorage.getItem("openIds") || "[]")
  );

  const [selectedNode, setSelectedNode] = useState<NodeModel>(); 

  const ref = useRef<TreeMethods>(null);
  const handleOpen = () => {
    if (ref.current?.open) {
      ref.current.open(newOpenIds);
    }
  }

  useEffect(() => {
    handleOpen();
  }, []);

  const handleSelect = (node: NodeModel) => setSelectedNode(node);
  const resetSelect = () => setSelectedNode(undefined);
  const handleDrop = (newTree: NodeModel<ProblemData>[]) => setTreeData(newTree);

  const handleChangeOpen = (newOpenIds: NodeModel["id"][]) => {
    setNewOpenIds(newOpenIds);
    window.localStorage.setItem("openIds", JSON.stringify(newOpenIds));
  };

  return (
    <div className={styles.treeapp} onClick={resetSelect}>
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
