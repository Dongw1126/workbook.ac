import React, { useState, useEffect } from 'react';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { CircularProgress } from "@mui/material";
import { WorkbookDB } from '../../../models';
import WorkbookSearchList from "./WorkbookSearchList";
import example_wb from "../../workbook/example_wb.json";

type Props = {
    query: string;
    // page: number;
    // lastPage: number;
    // setLastPage: React.Dispatch<any>;
}

const SEARCH_LOADING = 0;
const SEARCH_COMPLETE = 1;
const SEARCH_EMPTY = 2;
const SEARCH_ERROR = 3;

const fetchDBInit = async () => {
    const byFavorite = await DataStore.query(WorkbookDB, Predicates.ALL, {
        sort: s => s.favorite(SortDirection.DESCENDING),
        page: 0,
        limit: 5
    });
    const byCreatedAt = await DataStore.query(WorkbookDB, Predicates.ALL, {
        sort: s => s.createdAt(SortDirection.DESCENDING),
        page: 0,
        limit: 5
    });

    return [byFavorite, byCreatedAt];
};

function WorkbookSearchResult(props: Props) {
    const [status, setStatus] = useState(SEARCH_LOADING);
    const [data, setData] = useState<WorkbookDB[][]>([]);

    useEffect(() => {
        setStatus(SEARCH_LOADING);
        fetchDBInit()
            .then(res => {
                setData(res);
                setStatus(SEARCH_COMPLETE);
            })
    }, []);

    if (status === SEARCH_LOADING) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress sx={{ m: 20 }} />
            </div>
        );
    }
    else if (status === SEARCH_COMPLETE) {
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