import React, { useState, useEffect } from 'react';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { WorkbookDB } from '../../../models';
import WorkSearchBar from "./WorkbookSearchBar";
import WorkbookSearchResult from "./WorkbookSearchResult";
import usePage from '../../../hooks/usePage';

function WorkbookSearch() {
    const [query, setQuery] = useState('');
    const [page, lastPage, setPage, setLastPage] = usePage();
    const handleQuery = (str: string) => {
        setQuery(str);
    }

    return (
        <div style={{ margin: "auto" }}>
            <div style={{ width: "60%", margin: "auto", textAlign: "center" }}>
                <WorkSearchBar setQuery={handleQuery} />
            </div>
                <WorkbookSearchResult key={query} query={query}/>
        </div>
    );
}

export default WorkbookSearch;