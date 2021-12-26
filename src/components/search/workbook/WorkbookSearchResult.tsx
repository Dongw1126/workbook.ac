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
    const [initData, setInitData] = useState<WorkbookDB[][]>([]);
    const [searchData, setSearchData] = useState<WorkbookDB[]>([]);
    

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
        console.log(byCreatedAt)
        
        return [byFavorite, byCreatedAt];
    };

    const fetchSearchDB = async (_query: string, _page: number = 0) => {
        const result = await DataStore.query(WorkbookDB, c => c.title("contains", _query), {
            sort: s => s.createdAt(SortDirection.DESCENDING),
            page: _page,
            limit: Constants.SEARCH_WORKBOOK_LOAD_NUM
        });

        return result;
    }

    useEffect(() => {
        if(!props.query) {
            setStatus(Constants.SEARCH_LOADING);
            fetchDBInit()
                .then(res => {
                    setInitData(res);
                    setStatus(Constants.SEARCH_COMPLETE);
                })
                .catch(() => {
                    setStatus(Constants.SEARCH_ERROR)
                });
        }
    }, []);

    useEffect(() => {
        if(props.query) {
            setStatus(Constants.SEARCH_LOADING);
            fetchSearchDB(props.query)
                .then(res => {
                    setSearchData(res);
                    if(res.length === 0) {
                        setStatus(Constants.SEARCH_EMPTY);
                    } else {
                        setStatus(Constants.SEARCH_COMPLETE);
                    }
                })
                .catch(() => {
                    setStatus(Constants.SEARCH_ERROR);
                })
        }
    }, [props.query])

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
                    <br/>
                    <div style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center" }}>
                        좋아요 많은
                    </div>
                    <WorkbookSearchList editable={false} data={initData[0]} />

                    <div style={{ marginTop: "5rem", fontSize: "2rem", fontWeight: 700, textAlign: "center" }}>
                        새로 나온
                    </div>
                    <WorkbookSearchList editable={false} data={initData[1]} />
                </div>
            );
        } else {
            return (
                <div>
                    <br/>
                    <div style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center" }}>
                        검색결과
                    </div>
                    <WorkbookSearchList editable={false} data={searchData} />
                </div>
            );
        }
    } else if (status === Constants.SEARCH_EMPTY) {
        return(
            <div style={{ fontSize: "2rem", textAlign: "center"}}>
                <p>
                    <br/>
                    😲 검색 결과가 없습니다!
                </p>
            </div>
        )
    } else {
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