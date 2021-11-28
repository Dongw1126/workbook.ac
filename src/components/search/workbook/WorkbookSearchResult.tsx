import React, { useState, useEffect } from 'react';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { WorkbookDB } from '../../../models';
import WorkbookSearchList from "./WorkbookSearchList";
import example_wb from "../../workbook/example_wb.json";

type Props = {
    query: string;
    // page: number;
    // lastPage: number;
    // setLastPage: React.Dispatch<any>;
}

const fetchDBInit = async () => {
    const byFavorite = await DataStore.query(WorkbookDB, Predicates.ALL, {
        sort: s => s.favorite(SortDirection.DESCENDING)
    });
    const byCreatedAt = await DataStore.query(WorkbookDB, Predicates.ALL, {
        sort: s => s.createdAt(SortDirection.DESCENDING)
    });
    console.log(byFavorite);
    console.log(byCreatedAt);
};

function WorkbookSearchResult(props: Props) {
    useEffect(() => {
        fetchDBInit();
    }, []);

    if(!props.query) {
        return(
            <div>
                <WorkbookSearchList editable={false} data={example_wb}/>
            </div>
        );
    } else {
        return (
            <div>
                {props.query}
            </div>
        )
    }
    
}

export default WorkbookSearchResult;