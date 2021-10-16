import React, { useState, useRef, useEffect } from "react";
import { Tree, NodeModel, TreeMethods } from "@minoru/react-dnd-treeview";
import { ProblemData } from "./Types";
import { ProblemNode } from "./ProblemNode";
import styles from "./ProblemTree.module.css";
import SampleData from "./sample.json";

function ProblemTree() {
  const [treeData, setTreeData] = useState<NodeModel<ProblemData>[]>(SampleData);

  const [newOpenIds, setNewOpenIds] = useState<NodeModel["id"][]>(
    () => JSON.parse(window.localStorage.getItem("openIds") || "[]")
  );

  const ref = useRef<TreeMethods>(null);
  const handleOpen = () => {
    if (ref.current?.open) {
      ref.current.open(newOpenIds);
    }
  }

  useEffect(() => {
    handleOpen();
  }, []);

  const handleDrop = (newTree: NodeModel<ProblemData>[]) => setTreeData(newTree);

  const handleChangeOpen = (newOpenIds: NodeModel["id"][]) => {
    setNewOpenIds(newOpenIds);
    window.localStorage.setItem("openIds", JSON.stringify(newOpenIds));
  };

  return (
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
            onToggle={onToggle}
          />
        )}
        onDrop={handleDrop}
        onChangeOpen={handleChangeOpen}
        classes={{
          root: styles.treeRoot,
          draggingSource: styles.draggingSource,
          dropTarget: styles.dropTarget
        }}
      />
    </div>
  );
}

export default ProblemTree;
