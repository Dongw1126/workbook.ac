import React from "react";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import styles from './WorkbookCard.module.css';

const defaultImg = process.env.PUBLIC_URL + "/images/wb-basic.jpg";
const handleImgError = (e: any) => {
    e.target.onerror = null;
    e.target.src = defaultImg;
}

function WorkbookCard() {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <img src="" alt="Workbook Image" onError={handleImgError} />
            </div>
            <div className={styles.cardBody}>
                <h2>익명의 문제집</h2>
                <div className={styles.cardContent}>
                    <p>sss777</p>
                    <div className={styles.buttonGroup}>
                        <IconButton>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkbookCard;