import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import { WorkbookData } from "../../types/Types";
import styles from './WorkbookCard.module.css';

type Props = {
    editable: boolean;
    data: WorkbookData;
    animated?: boolean;
}

const handleImgError = (e: any) => {
    e.target.onerror = null;
    e.target.src = process.env.PUBLIC_URL + "/images/wb-basic.jpg";
}

/**
 * 문제집 카드 컴포넌트
 */
function WorkbookCard(props: Props) {
    return (
        <div className={`${styles.card} ${
            props.animated ? styles.cardAnimation : ""
          }`}>
            <div className={styles.cardHeader}>
                <Link to="/workbook/read">
                    <img src={props.data.img} alt="Workbook Image" onError={handleImgError} />
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
                            <>
                                <Link to="/workbook/edit">
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <IconButton>
                                    <InsertPhotoIcon />
                                </IconButton>
                            </>
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
    );
}

export default WorkbookCard;