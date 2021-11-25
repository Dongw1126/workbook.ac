import React, { useState, useEffect } from 'react';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { WorkbookDB } from '../../../models';
import WorkSearchBar from "./WorkbookSearchBar";
import WorkbookSearchResult from "./WorkbookSearchResult";

function WorkbookSearch() {
    const [query, setQuery] = useState('');
    const handleQuery = (str: string) => {
        setQuery(str);
    }

    return (
        <div style={{ width: "60%", margin: "auto" }}>
            <div style={{ textAlign: "center" }}>
                <WorkSearchBar setQuery={handleQuery} />
            </div>
                <WorkbookSearchResult key={query} query={query}/>
        </div>
    );
}

export default WorkbookSearch;