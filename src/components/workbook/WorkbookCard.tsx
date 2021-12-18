import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import { useContextMenu } from "react-contexify";

import { DataStore } from '@aws-amplify/datastore';

import WorkbookContextMenu from "../contextMenu/WorkbookContextMenu";
import { WorkbookDB, FavoriteDB } from "../../models";
import { useRouter } from "../../hooks/useRouter";
import UserStore from "../../stores/UserStore";
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
    const userStore = UserStore;

    const [fav, setFav] = useState(false);
    const [favNum, setFavNum] = useState(props.data.favorite);
    const [refresh, setRefresh] = useState(false);

    const goToPage = (_path: string) => {
        history.push("/workbook/" + _path + `/${props.data.id}`);
    }

    const { show, hideAll } = useContextMenu({
        id: props.data.id
    });

    const displayMenu = (e: any) => {
        // console.log("displayMenu call");
        e.stopPropagation();
        show(e);
    };

    const fetchFavData = async () => {
        // console.log("fetched");
        const result = await DataStore.query(FavoriteDB, c => 
            c.username("eq", userStore.getUser().username).workbookId("eq", props.data.id)
        );

        return result;
    }

    const updateWorkbook = async (adder: number) => {
        const wb = await DataStore.query(WorkbookDB, props.data.id);
        if (!wb) {
            throw new Error("Workbook DB Error");
        }
        
        const value = wb.favorite + adder;
        await DataStore.save(
            WorkbookDB.copyOf(wb, updated => {
                updated.favorite = value
            })
        );

        return value;
    }

    const createFavData = async () => {
        // console.log("liked")      
        await DataStore.save(
            new FavoriteDB({
                username: userStore.getUser().username,
                workbookId: props.data.id
            })
        );
    };

    const deleteFavData = async (_id: string) => {
        // console.log("unliked")
        await DataStore.delete(FavoriteDB, _id);
    };

    const handleLikeClick = () => {
        // 비로그인 시 alertModal 추가
        fetchFavData()
            .then((res) => {
                if (res.length > 0) {
                    // 좋아요 -> X
                    deleteFavData(res[0].id)
                        .then(() => updateWorkbook(-1))
                        .then((resFavNum) => {
                            setFav(true);
                            setRefresh(!refresh);
                            setFavNum(resFavNum);
                        })
                        .catch(() => alert("업데이트 중 오류가 발생했습니다."));
                } 
                else {
                    // X -> 좋아요
                    createFavData()
                        .then(() => updateWorkbook(1))
                        .then((resFavNum) => {
                            setFav(false);
                            setRefresh(!refresh);
                            setFavNum(resFavNum);
                        })
                        .catch(() => alert("업데이트 중 오류가 발생했습니다."));
                }
            })
    };

    useEffect(() => {
        if(userStore.getUser()) {
            fetchFavData()
                .then((res) => {
                    if (res.length > 0) {
                        setFav(true);
                    } else {
                        setFav(false);
                    }
                });
        }
    }, [refresh])

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
                            <IconButton onClick={handleLikeClick}>
                                {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                            <span className={styles.favNumber}>
                                {favNum}
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