import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import { useContextMenu } from "react-contexify";

import WorkbookContextMenu from "../contextMenu/WorkbookContextMenu";
import { WorkbookDB } from "../../models";
import { useRouter } from "../../hooks/useRouter";
import * as Constants from "../../constants";
import styles from './WorkbookCard.module.css';

type Props = {
    editable: boolean;
    data: WorkbookDB;
    animated?: boolean;
    shadow?: boolean;
    cursorDefault?: boolean;
}

const handleImgError = (e: any) => {
    e.target.onerror = null;
    e.target.src = process.env.PUBLIC_URL + "/images/wb-basic.jpg";
}

/**
 * 문제집 카드 컴포넌트
 */
function WorkbookCard(props: Props) {
    const { history } = useRouter();

    const goToPage = (_path: string) => {
        history.push("/workbook/" + _path + `/${props.data.id}`);
    }

    const { show, hideAll } = useContextMenu({
        id: props.data.id
    });

    const displayMenu = (e: any) => {
        console.log("displayMenu call");
        e.stopPropagation();
        show(e);
    };

    return (
        <>
            <div className={`${styles.card} 
            ${props.animated ? styles.cardAnimation : ""}
            ${props.shadow ? styles.cardShadow : ""}`}>
                <div className={`${styles.cardHeader} ${props.cursorDefault ? styles.cursorDefault : ""}`} 
                    onClick={() => goToPage("read")}
                >
                    <img src={props.data?.image} alt="Workbook Image" onError={handleImgError} />
                </div>
                <div className={styles.cardBody}>
                    <div className={`${styles.cardTitle} ${props.cursorDefault ? styles.cursorDefault : ""}`} 
                        onClick={() => goToPage("read")}
                    >
                        {props.data.title}
                    </div>
                    <div className={styles.cardAuthor}>
                        {props.data.author}
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.buttonGroup}>
                            {props.editable &&
                                <IconButton onClick={displayMenu}>
                                    <EditIcon />
                                </IconButton>
                            }
                            <IconButton>
                                <FavoriteBorderIcon />
                            </IconButton>
                            <span className={styles.favNumber}>
                                {props.data.favorite}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {props.editable && <WorkbookContextMenu data={props.data} />}
        </>
    );
}

export default WorkbookCard;