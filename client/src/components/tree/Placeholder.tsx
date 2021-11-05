import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import styles from "./Placeholder.module.css";
import * as Constants from "../../constants"

type Props = {
    node: NodeModel;
    depth: number;
}

function Placeholder(props: Props) {
    // const left = props.depth * Constants.TREE_ITEM_SPACE;
    const l_width = props.depth * Constants.TREE_ITEM_SPACE;
    const r_width = "calc(100% - " + l_width + "px)"; 
    // const r_width = (100 - props.depth * 10) + "%";
    return (
        <div className={styles.container}>
            <div className={styles.spacing} style={{ width: l_width }}></div>
            <div className={styles.main} style={{ width: r_width }}></div>
        </div>
    );
}

export default Placeholder;
