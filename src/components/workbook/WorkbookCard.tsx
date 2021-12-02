import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useContextMenu } from "react-contexify";

import WorkbookContextMenu from "../contextMenu/WorkbookContextMenu";
import { WorkbookData } from "../../types/Types";
import * as Constants from "../../constants";
import styles from './WorkbookCard.module.css';

type Props = {
    editable: boolean;
    data: WorkbookData;
    animated?: boolean;
    shadow?: boolean;
}

const handleImgError = (e: any) => {
    e.target.onerror = null;
    e.target.src = process.env.PUBLIC_URL + "/images/wb-basic.jpg";
}

/**
 * 문제집 카드 컴포넌트
 */
function WorkbookCard(props: Props) {
    const { show, hideAll } = useContextMenu({
        id: Constants.WORKBOOK_CONTEXT_MENU_ID
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
                <div className={styles.cardHeader}>
                    <Link to="/workbook/read">
                        <img src={props.data.image} alt="Workbook Image" onError={handleImgError} />
                    </Link>
                </div>
                <div className={styles.cardBody}>
                    <Link to="/workbook/read" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <div className={styles.cardTitle}>
                            {props.data.title}
                        </div>
                    </Link>
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