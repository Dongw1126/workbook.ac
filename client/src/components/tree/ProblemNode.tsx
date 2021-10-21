import React from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { NodeModel } from "@minoru/react-dnd-treeview";
import { ProblemData } from "./Types";
import { TypedIcon } from "./TypedIcon";
import { TypedText } from "./TypedText";
import styles from "./ProblemNode.module.css";

type Props = {
  node: NodeModel<ProblemData>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
};

export const ProblemNode: React.FC<Props> = (props) => {
  const { droppable, data } = props.node;
  const indent = props.depth * 36;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(props.node);
    props.onToggle(props.node.id);
  };

  return (
    <div
      className={`tree-node ${styles.root} ${
        props.node.droppable ? styles.isDroppable : styles.nonDroppable
      }`}
      style={{ paddingInlineStart: indent }}
      /*style={props.node.droppable ? 
        {paddingInlineStart: props.depth*indentWeight }
      :{paddingInlineStart: (props.depth - 1)*indentWeight}}*/
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
        <TypedText droppable={droppable} node={props.node} />
      </div>
    </div>
  );
};
