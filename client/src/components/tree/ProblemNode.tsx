import React from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { NodeModel } from "@minoru/react-dnd-treeview";
import { ProblemData } from "../Types";
import TypedIcon from "../TypedIcon";
import ProblemDisplay from "../TypedText";
import styles from "./ProblemNode.module.css";
import * as Constants from "../../constants"

type Props = {
  node: NodeModel<ProblemData>;
  depth: number;
  isSelected: boolean;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onSelect: (node: NodeModel) => void;
};

/**
 * 문제집 트리 노드 컴포넌트
 * props.node.droppable 이 참이면 폴더, 거짓이면 문제
 */
function ProblemNode(props: Props) {
  const { droppable, data } = props.node;
  const indent = props.depth * Constants.TREE_ITEM_SPACE;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
    props.onSelect(props.node);
  };

  return (
    <div
      className={`tree-node ${styles.root} 
      ${props.node.droppable ? styles.isDroppable : styles.nonDroppable}
      ${props.isSelected ? styles.isSelected : ""}
      `}
      style={{ paddingInlineStart: indent }}
      onClick={handleToggle}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
        {props.node.droppable && (
          <div>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div>
        <TypedIcon droppable={droppable} level={data?.level} />
      </div>
      <div className={styles.labelGridItem}>
        <ProblemDisplay droppable={droppable} id={props.node.data?.problemId} title={props.node.text} />
      </div>
    </div>
  );
}

export default ProblemNode;
