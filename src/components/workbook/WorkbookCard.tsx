import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';

import { WorkbookData } from "../types/Types";
import styles from './WorkbookCard.module.css';

type Props = {
    data: WorkbookData;
}

const defaultImg = process.env.PUBLIC_URL + "/images/wb-basic.jpg";
const handleImgError = (e: any) => {
    e.target.onerror = null;
    e.target.src = defaultImg;
}

/**
 * 문제집 카드 컴포넌트
 */
function WorkbookCard(props: Props) {
    return (
        <span className={styles.card}>
            <div className={styles.cardHeader}>
                <Link to="/workbook/edit">
                    <img src={props.data.img} alt="Workbook Image" onError={handleImgError} />
                </Link>
            </div>
            <div className={styles.cardBody}>
                <Link to="/workbook/edit" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <h2>{props.data.title}</h2>
                </Link>
                <div className={styles.cardContent}>
                    <p>{props.data.author}</p>
                    <div className={styles.buttonGroup}>
                        <Link to="/workbook/edit">
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Link>
                        <IconButton>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <span className={styles.favNumber}>
                            {props.data.favorite}
                        </span>
                    </div>
                </div>
            </div>
        </span>
    );
}

export default WorkbookCard;