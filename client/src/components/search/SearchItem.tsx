import React from "react";
import styles from "./SearchItem.module.css";
import TypedIcon from "../tree/TypedIcon";
import ProblemDisplay from "../tree/TypedText";

type Props = {
    level: number;
    id: number;
    title: string;
};

function SearchItem(props: Props) {
    return (
        <div className={`${styles.root}`}>
            <div className={styles.itemSpacing}>
                <TypedIcon droppable={false} level={props.level} />
            </div>
            <div className={styles.itemSpacing}>
                <ProblemDisplay droppable={false} id={props.id} title={props.title} />
            </div>
        </div>
    );
}

export default SearchItem;
