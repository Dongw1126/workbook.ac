import React, { useEffect, useState } from "react";
import styles from "./SearchItem.module.css";
import { TypedIcon } from "../tree/TypedIcon";
import { ProblemDisplay } from "../tree/TypedText";

type Props = {
    level: number;
    id: number;
    title: string;
};

function SearchItem(props: Props) {
    return (
        <div className={`${styles.root}`}>
            <div>
                <TypedIcon droppable={false} level={props.level} />
            </div>
            <div className={styles.labelGridItem}>
                <ProblemDisplay droppable={false} id={props.id} title={props.title} />
            </div>
        </div>
    );
}

export default SearchItem;
