import React, { useState, useEffect } from 'react';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { CircularProgress } from "@mui/material";

import * as Constants from "../../../constants";
import { WorkbookDB } from '../../../models';
import WorkbookSearchList from "./WorkbookSearchList";

/**
 * 문제집 둘러보기 - 초기 로드
 */
function WorkbookSearchResult() {
    const [status, setStatus] = useState(Constants.SEARCH_LOADING);
    const [initData, setInitData] = useState<WorkbookDB[][]>([]);
    
    const fetchDBInit = async () => {
        let byFavorite: WorkbookDB[] = []
        let byCreatedAt: WorkbookDB[] = []

        byFavorite = await DataStore.query(WorkbookDB, Predicates.ALL, {
            sort: s => s.favorite(SortDirection.DESCENDING).createdAt(SortDirection.DESCENDING),
            page: 0,
            limit: Constants.FIRST_WORKBOOK_LOAD_NUM
        });
        byCreatedAt = await DataStore.query(WorkbookDB, Predicates.ALL, {
            sort: s => s.createdAt(SortDirection.DESCENDING),
            page: 0,
            limit: Constants.FIRST_WORKBOOK_LOAD_NUM
        });
        // console.log(byCreatedAt)
        
        return [byFavorite, byCreatedAt];
    };


    useEffect(() => {
        setStatus(Constants.SEARCH_LOADING);
        fetchDBInit()
            .then(res => {
                setInitData(res);
                setStatus(Constants.SEARCH_COMPLETE);
            })
            .catch(() => {
                setStatus(Constants.SEARCH_ERROR)
            });
    }, []);

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
                <br/>
                <div style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center" }}>
                    좋아요 많은
                </div>
                <WorkbookSearchList animated={true} editable={false} data={initData[0]} />

                <div style={{ marginTop: "5rem", fontSize: "2rem", fontWeight: 700, textAlign: "center" }}>
                    새로 나온
                </div>
                <WorkbookSearchList animated={true} editable={false} data={initData[1]} />
            </div>
        );
    } 
    else {
        return (
            <div style={{ fontSize: "2rem", textAlign: "center"}}>
                <p>
                    <br/>
                    😲 검색 중 오류가 발생했습니다!
                </p>
            </div>
        );
    }
}

export default WorkbookSearchResult;