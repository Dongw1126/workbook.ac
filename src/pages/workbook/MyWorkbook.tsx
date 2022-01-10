import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import { useSpring, animated } from 'react-spring';
import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';

import UserStore from "../../stores/UserStore";
import { myPageChangeFlag } from "../../stores/DataChangeFlagStore";
import useDialog from '../../hooks/useDialog';
import WorkbookCreateModal from "../../components/modal/WorkbookCreateModal";
import WorkbookSearchResult from "../../components/search/workbook/WorkbookSearchResult";
import MovePage from '../../components/search/workbook/MovePageInWorkbook';
import usePage from '../../hooks/usePage';

import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { WorkbookDB } from "../../models";

/**
 * 내 문제집 보기 페이지
 */
function MyWorkbook() {
    const userStore = UserStore;
    const flag = myPageChangeFlag.flag;

    const [createClicked, setCreateClicked] = useState(false);
    const [page, lastPage, setPage, setLastPage] = usePage(0);

    const { scale } = useSpring({
        scale: createClicked ? 0.8 : 1,
        config: {
            tension: 700
        }
    });

    const [createModalOpen, handleCreateModalOpen, handleCreateModalClose] = useDialog();

    const fetcher = async (_query: string, paginationProducer?: any) => {
        const myUsername = userStore.getUser().username;
        const result = await DataStore.query(WorkbookDB, c => c.author("eq", myUsername), paginationProducer);
        return result;
    }

    const sorter = (s: any) => s.title(SortDirection.ASCENDING).createdAt(SortDirection.DESCENDING);

    useEffect(() => {
        // console.log(page);
    }, [userStore.loggedIn, flag]);


    if (userStore.loggedIn) {
        return (
            <div>
                <div style={{ textAlign: "center", margin: "2rem 0", marginTop: "3rem", fontSize: "3rem", fontWeight: 700 }}>
                    나의 문제집
                </div>
                <div style={{ width: "56px", height: "56px", margin: "auto", marginBottom: "2rem" }}>
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
                <div>
                    <WorkbookSearchResult
                        key={flag}
                        editable={true} query=''
                        page={page} setLastPage={setLastPage}
                        fetcher={fetcher}
                        sorter={sorter}
                        emptyMessage='문제집이 없습니다.&nbsp;&nbsp;&nbsp;\( •︠_•︡ )/'
                    />
                    <div style={{ marginTop: "3rem", marginBottom: "5rem" }}>
                        <MovePage page={page} lastPage={lastPage} setPage={setPage}/>
                    </div>
                </div>
                <WorkbookCreateModal
                    username={userStore.getUser().username}
                    open={createModalOpen} 
                    onClose={handleCreateModalClose} 
                />
            </div >
        );
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