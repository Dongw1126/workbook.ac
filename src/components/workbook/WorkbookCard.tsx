import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import { useContextMenu } from "react-contexify";

import { DataStore } from '@aws-amplify/datastore';
import { Storage } from "aws-amplify";

import AlertModal from "../modal/AlertModal";
import WorkbookContextMenu from "../contextMenu/WorkbookContextMenu";
import { WorkbookDB, FavoriteDB } from "../../models";
import useDialog from "../../hooks/useDialog";
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

/**
 * 문제집 카드 컴포넌트
 */
function WorkbookCard(props: Props) {
    const userStore = UserStore;
    const [alertOpen, handleAlertOpen, handleAlertClose] = useDialog();
    
    const [disabledImg, setDisabledImg] = useState(true);
    const [disabledFav, setDisabledFav] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [fav, setFav] = useState(false);
    const [favNum, setFavNum] = useState(props.data.favorite);
    const [refresh, setRefresh] = useState(false);

    const _hideImage = () => setDisabledImg(true);
    const _displayImage = () => setDisabledImg(false);

    /*const goToPage = (_path: string) => {
        history.push("/workbook/" + _path + `/${props.data.id}`);
    }*/

    const getUrl = (_path: string) => {
        return "/workbook/" + _path + `/${props.data.id}`;
    }

    const { show } = useContextMenu({
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

    const handleFavClick = (e: any) => {
        if(userStore.getUser()) {
            setDisabledFav(true);
            e.preventDefault();
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
                });
                setTimeout(() => {
                    setDisabledFav(false);
                }, 500);
        } 
        else {
            // 비로그인 경우
            handleAlertOpen();
        }
    };

    const getCoverImage = async (_key: string | undefined) => {
        let currKey: string;
        if (typeof _key === "undefined") {
            currKey = Constants.DEFAULT_COVER_IMAGE_KEY;
        } else {
            currKey = _key;
        }

        const url = await Storage.get(currKey);
        //console.log(url);

        // 캐시 활성화를 위해 public URL 사용
        const urlWithoutSigniture = url.substring(0, url.indexOf('?'));
        return urlWithoutSigniture;
    }

    useEffect(() => {
        getCoverImage(props.data.image)
            .then((res) => {
                setImgUrl(res);
            });
    }, []);

    useEffect(() => {
        // 좋아요 정보 불러오기
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
                ${props.shadow ? styles.cardShadow : ""}`}
            >
                <Link to={getUrl("read")} style={{ textDecoration: "none" }}>
                    <div className={`${styles.cardHeader} ${props.cursorDefault ? styles.cursorDefault : ""}`}>
                        <img
                            src={imgUrl} 
                            alt="WorkbookCard"
                            onError={_hideImage}
                            onLoad={_displayImage}
                            style={{ visibility: disabledImg ? "hidden" : "visible" }}
                        />
                    </div>
                </Link>
                <div className={styles.cardBody}>
                    <Link to={getUrl("read")}>
                        <div className={`${styles.cardTitle} ${props.cursorDefault ? styles.cursorDefault : ""}`} >
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
                            <IconButton onClick={disabledFav ? undefined : handleFavClick}>
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
            <AlertModal
                title=""
                content="좋아요는 로그인 후에 가능합니다!"
                open={alertOpen} 
                onClose={handleAlertClose}
            />
        </>
    );
}

export default WorkbookCard;