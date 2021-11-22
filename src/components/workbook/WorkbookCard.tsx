import React from "react";
import { Link } from "react-router-dom";
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

/**
 * 문제집 카드 컴포넌트
 */
function WorkbookCard() {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <Link to="/workbook/edit">
                    <img src="" alt="Workbook Image" onError={handleImgError} />
                </Link>
            </div>
            <div className={styles.cardBody}>
                <Link to="/workbook/edit" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <h2>익명의 문제집</h2>
                </Link>
                <div className={styles.cardContent}>
                    <p>sss777</p>
                    <div className={styles.buttonGroup}>
                        <IconButton>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <Link to="/workbook/edit">
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkbookCard;