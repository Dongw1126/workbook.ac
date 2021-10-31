import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import styles from "./Placeholder.module.css";
import * as Constants from "../../constants"

type Props = {
    node: NodeModel;
    depth: number;
}

function Placeholder(props: Props) {
    const left = props.depth * Constants.TREE_ITEM_SPACE;
    return (
        <div className={styles.root} style={{ left }}></div>
    );
}

export default Placeholder;
