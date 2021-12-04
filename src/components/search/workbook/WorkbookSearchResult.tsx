import React, { useState, useEffect } from 'react';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { CircularProgress } from "@mui/material";

import * as Constants from "../../../constants";
import { WorkbookDB } from '../../../models';
import WorkbookSearchList from "./WorkbookSearchList";

type Props = {
    query: string;
    // page: number;
    // lastPage: number;
    // setLastPage: React.Dispatch<any>;
}


/**
 * 문제집 둘러보기 - 검색 컴포넌트
 */
function WorkbookSearchResult(props: Props) {
    const [status, setStatus] = useState(Constants.SEARCH_LOADING);
    const [data, setData] = useState<WorkbookDB[][]>([]);

    const fetchDBInit = async () => {
        let byFavorite: WorkbookDB[] = []
        let byCreatedAt: WorkbookDB[] = []
        try {
            byFavorite = await DataStore.query(WorkbookDB, Predicates.ALL, {
                sort: s => s.favorite(SortDirection.DESCENDING),
                page: 0,
                limit: 5,
            });
            byCreatedAt = await DataStore.query(WorkbookDB, Predicates.ALL, {
                sort: s => s.createdAt(SortDirection.DESCENDING),
                page: 0,
                limit: 5
            });
        } catch (error) {
            setStatus(Constants.SEARCH_ERROR);
        }

        console.log(byFavorite)
        return [byFavorite, byCreatedAt];
    };


    useEffect(() => {
        setStatus(Constants.SEARCH_LOADING);
        fetchDBInit()
            .then(res => {
                setData(res);
                setStatus(Constants.SEARCH_COMPLETE);
            })
    }, []);

    if (status === Constants.SEARCH_LOADING) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress sx={{ m: 20 }} />
            </div>
        );
    }
    else if (status === Constants.SEARCH_COMPLETE) {
        if (!props.query) {
            return (
                <div>
                    <div style={{ fontSize: "x-large", fontWeight: 700, textAlign: "center" }}>
                        좋아요 많은
                    </div>
                    <WorkbookSearchList editable={false} data={data[0]} />
                    <div style={{ fontSize: "x-large", fontWeight: 700, textAlign: "center" }}>
                        새로 나온
                    </div>
                    <WorkbookSearchList editable={false} data={data[0]} />
                </div>
            );
        } else {
            return (
                <div>
                    {props.query}
                </div>
            );
        }
    }
    return(
        <div>
            error
        </div>
    );
}

export default WorkbookSearchResult;