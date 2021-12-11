import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import { useSpring, animated } from 'react-spring';
import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';
import { CircularProgress } from "@mui/material";

import UserStore from "../../stores/UserStore";
import useDialog from '../../hooks/useDialog';
import WorkbookCreateModal from "../../components/modal/WorkbookCreateModal";
import WorkbookList from "../../components/search/workbook/WorkbookSearchList";
import example_wb_my from "../../components/workbook/example_wb_my.json"
import * as Constants from "../../constants";

import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB, TreeDataDB } from "../../models";

/**
 * 내 문제집 보기 페이지
 */
function MyWorkbook() {
    const userStore = UserStore;

    const [createClicked, setCreateClicked] = useState(false);
    const [status, setStatus] = useState(Constants.SEARCH_LOADING);
    const [data, setData] = useState<WorkbookDB[][]>([]);

    const { scale } = useSpring({
        scale: createClicked ? 0.8 : 1,
        config: {
            tension: 700
        }
    });

    const [createModalOpen, handleCreateModalOpen, handleCreateModalClose] = useDialog();

    const fetchData = async () => {
        let myWorkbook: WorkbookDB[] = []
        let myFavorite: WorkbookDB[] = []

        const author = userStore.getUser().username;
        myWorkbook = await DataStore.query(WorkbookDB, c => c.author("eq", author));

        return [myWorkbook, myFavorite];
    }

    useEffect(() => {
        console.log(userStore.loggedIn);
        setStatus(Constants.SEARCH_LOADING);
        if (userStore.loggedIn) {
            fetchData()
                .then((res) => {
                    setData(res);
                    setStatus(Constants.SEARCH_COMPLETE);
                    console.log(data);
                })
                .catch(() => {
                    setStatus(Constants.SEARCH_ERROR);
                });
        }
    }, [userStore.loggedIn]);


    if (userStore.loggedIn) {
        if (status === Constants.SEARCH_LOADING) {
            return (
                <div style={{ textAlign: "center" }}>
                    <CircularProgress sx={{ m: 20 }} />
                </div>
            );
        }
        else if (status === Constants.SEARCH_COMPLETE) {
            return (
                <div>
                    <div style={{ textAlign: "center", margin: "2rem 0", fontSize: "3rem", fontWeight: 700 }}>
                        나의 문제집
                    </div>
                    <div style={{ width: "56px", height: "56px", margin: "auto" }}>
                        <animated.div
                            onMouseDown={() => setCreateClicked(true)}
                            onMouseUp={() => setCreateClicked(false)}
                            onMouseLeave={() => setCreateClicked(false)}
                            onClick={handleCreateModalOpen}
                            style={{ transform: scale.to(s => `scale(${s})`) }}>
                            <SpeedDial
                                ariaLabel="Add Workbook"
                                icon={<AddIcon />}
                            />
                        </animated.div>
                    </div>
                    {data[0].length !== 0 ?
                        (<div>
                            <WorkbookList editable={true} data={example_wb_my} />
                        </div>) :
                        (<div style={{ fontSize: "2rem", textAlign: "center" }}>
                            <p>
                                <br />
                                만든 문제집이 없습니다
                            </p>
                        </div>)}
                    <WorkbookCreateModal open={createModalOpen} onClose={handleCreateModalClose} />
                    <div style={{ textAlign: "center", margin: "2rem 0", marginTop: "8rem", fontSize: "3rem", fontWeight: 700 }}>
                        좋아요 한 문제집
                    </div>
                    {data[1].length !== 0 ?
                        (<div>
                            <WorkbookList editable={true} data={example_wb_my} />
                        </div>) :
                        (<div style={{ fontSize: "2rem", textAlign: "center" }}>
                            <p>
                                <br />
                                좋아요 한 문제집이 없습니다
                            </p>
                        </div>)}
                </div >
            );
        }
        else {
            return (
                <div style={{ fontSize: "2rem", textAlign: "center" }}>
                    <p>
                        <br />
                        😲 로드 중 오류가 발생했습니다!
                    </p>
                </div>
            )
        }
    }
    else {
        return (
            <div style={{ fontSize: "2rem", textAlign: "center" }}>
                <p>
                    <br /><br /><br /><br />
                    로그인이 필요합니다.<br /><br />
                </p>
            </div>
        );
    }
}

export default observer(MyWorkbook);