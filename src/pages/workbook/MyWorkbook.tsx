import React, { useState } from 'react';
import { Observer } from "mobx-react";
import { useSpring, animated } from 'react-spring';
import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';

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
        const models = await DataStore.query(WorkbookDB);
        let myWorkbook: WorkbookDB[] = []
        let myFavorite: WorkbookDB[] = []

        try {
            const author = userStore.getUser().username;
            myWorkbook = await DataStore.query(WorkbookDB, c => c.author("eq", author));

        } catch (error) {
            setStatus(Constants.SEARCH_ERROR);
        }
    }


    return (
        <Observer>
            {() => {
                if (userStore.loggedIn) {
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
                                    style={{ width: "56px", height: "56px", transform: scale.to(s => `scale(${s})`) }}>
                                    <SpeedDial
                                        ariaLabel="Add Workbook"
                                        icon={<AddIcon />}
                                    />
                                </animated.div>
                            </div>
                            <div>
                                <WorkbookList editable={true} data={example_wb_my} />
                            </div>
                            <WorkbookCreateModal open={createModalOpen} onClose={handleCreateModalClose} />
                        </div>
                    );
                } else {
                    return(
                        <div style={{ fontSize: "2rem", textAlign: "center"}}>
                            <p>
                                <br/><br/><br/><br/>
                                로그인이 필요합니다.<br/><br/>
                            </p>
                        </div>
                    );
                }
            }}
        </Observer>
    );
}

export default MyWorkbook;