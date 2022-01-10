import React, { useCallback } from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { NodeModel } from "@minoru/react-dnd-treeview";
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';

import { ProblemData } from "../../types/Types";
import TypedIcon from "../../types/TypedIcon";
import ProblemDisplay from "../../types/TypedText";

import styles from "./ProblemNode.module.css";
import * as Constants from "../../constants"

type Props = {
  node: NodeModel<ProblemData>;
  depth: number;
  isSelected: boolean;
  isOpen: boolean;
  editable: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onSelect: (node: NodeModel) => void;
  // ContextMenu 다루는 함수
  displayMenu: (e: any) => void;
  hideMenu: () => void;
};

/**
 * 문제집 트리 노드 컴포넌트
 * props.node.droppable 이 참이면 폴더, 거짓이면 문제
 */
function ProblemNode(props: Props) {
  const { droppable, data } = props.node;
  const indent = props.depth * Constants.TREE_ITEM_SPACE;
  const url = "https://www.acmicpc.net/problem/" + data?.problemId;

  const handleToggle = useCallback((e: React.MouseEvent) => {
    // console.log("handleToggle call");

    e.stopPropagation();
    props.onToggle(props.node.id);
    props.onSelect(props.node);
    props.hideMenu();
  }, [props]);

  const displayMenu = (e: any) => {
    props.onSelect(props.node);
    props.displayMenu(e);
  }

  return (
    <div
      className={`tree-node ${styles.root} 
      ${props.node.droppable ? styles.isDroppable : styles.nonDroppable}
      ${props.isSelected ? styles.isSelected : ""}
      `}
      style={{ paddingInlineStart: indent }}
      onClick={handleToggle}
      onContextMenu={displayMenu}
    >
      <div
        className={`${styles.expandIconWrapper} ${props.isOpen ? styles.isOpen : ""
          }`}
      >
        {props.node.droppable && (
          <div>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div>
        <TypedIcon droppable={droppable} level={data?.level} voteCnt={data?.voteCnt} />
      </div>
      <div className={styles.labelGridItem}>
        <ProblemDisplay droppable={droppable} id={props.node.data?.problemId} title={props.node.text} />
      </div>
      {(!droppable && !props.editable) &&
        <div>
          <IconButton onClick={() => window.open(url, "_blank")}>
            <LaunchIcon />
          </IconButton>
        </div>}
    </div>
  );
}

export default ProblemNode;
