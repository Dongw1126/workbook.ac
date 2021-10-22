import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import styles from "./Placeholder.module.css";
import * as Constants from "../../constants"

type Props = {
    node: NodeModel;
    depth: number;
}

export const Placeholder: React.FC<Props> = (props) => {
    const left = props.depth * Constants.TREE_ITEM_SPACE;
    return (
        <div className={styles.root} style={{ left }}></div>
    )
};
