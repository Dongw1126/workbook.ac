import React, { useState, useEffect } from 'react';
import { SortDirection } from '@aws-amplify/datastore';
import { CircularProgress } from "@mui/material";

import * as Constants from "../../../constants";
import { WorkbookDB } from '../../../models';
import WorkbookSearchList from "./WorkbookSearchList";

type Props = {
    query: string;
    page: number;
    setLastPage: React.Dispatch<any>;
    fetcher: any;
}

/**
 * 문제집 검색 컴포넌트
 */
function WorkbookSearchResult(props: Props) {
    const [status, setStatus] = useState(Constants.SEARCH_LOADING);
    const [searchData, setSearchData] = useState<WorkbookDB[]>([]);

    const fetchSearchDB = async (_query: string, _page: number = 0) => {
        const result = await props.fetcher(_query, {
            sort: (s: any) => s.createdAt(SortDirection.DESCENDING),
            page: _page,
            limit: Constants.SEARCH_WORKBOOK_LOAD_NUM      
        });
        
        return result;
    }
    
    const fetchQueryNumber = async (_query: string) => {
        const result = await props.fetcher(_query);
        return result.length;
    }

    useEffect(() => {
        setStatus(Constants.SEARCH_LOADING);
        fetchSearchDB(props.query, props.page)
            .then(res => {
                setSearchData(res);
                // console.log(res);
                if(res.length === 0) {
                    setStatus(Constants.SEARCH_EMPTY);
                } else {
                    setStatus(Constants.SEARCH_COMPLETE);
                }
            })
            .catch(() => {
                setStatus(Constants.SEARCH_ERROR);
            })
    }, [props.query, props.page]);

    useEffect(() => {
        fetchQueryNumber(props.query)
            .then((res) => {
                props.setLastPage(Math.ceil(res / Constants.SEARCH_WORKBOOK_LOAD_NUM) - 1);
            });
    }, [props.query]);

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
                    검색결과
                </div>
                <WorkbookSearchList animated={true} editable={false} data={searchData} />
            </div>
        );      
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