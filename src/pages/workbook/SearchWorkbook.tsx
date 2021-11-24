import React, { useEffect } from 'react';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { WorkbookDB } from '../../models';
import WorkbookList from "../../components/workbook/WorkbookList";
import example_wb from "../../components/workbook/example_wb.json"

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

function WorkbookSearch() {
    useEffect(() => {
        fetchDBInit();
    })
    return (
        <div>
            <div>
                <WorkbookList editable={false} data={example_wb}/>
            </div>
        </div>
    );
}

export default WorkbookSearch;