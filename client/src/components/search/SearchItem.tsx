import React from "react";
import styles from "./SearchItem.module.css";
import TypedIcon from "../TypedIcon";
import ProblemDisplay from "../TypedText";
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';


type Props = {
    level: number;
    id: number;
    title: string;
    voteCnt: number;
};

function SearchItem(props: Props) {
    return (
        <div className={`${styles.root}`}>
            <IconButton onClick={(event) => {

            }}>
                <AddIcon />
            </IconButton>
            <div className={styles.itemSpacing}>
                <TypedIcon droppable={false} level={props.level} voteCnt={props.voteCnt}/>
            </div>
            <div className={styles.itemSpacing}>
                <ProblemDisplay droppable={false} id={props.id} title={props.title} />
            </div>
            <IconButton onClick={(event) => {

            }}>
                <LaunchIcon />
            </IconButton>

        </div>
    );
}

export default SearchItem;
