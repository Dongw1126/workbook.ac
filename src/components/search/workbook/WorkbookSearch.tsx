import React, { useState } from 'react';
import WorkSearchBar from "./WorkbookSearchBar";
import WorkbookSearchResult from "./WorkbookSearchResult";
import WorkbookSearchInit from "./WorkbookSearchInit";
import MovePage from './MovePageInWorkbook';
import usePage from '../../../hooks/usePage';

function WorkbookSearch() {
    const [query, setQuery] = useState('');
    const [page, lastPage, setPage, setLastPage] = usePage();

    const handleQuery = (str: string) => {
        setPage(0);
        setQuery(str);
    }

    return (
        <div style={{ margin: "auto" }}>
            <div style={{ width: "60%", margin: "auto", textAlign: "center" }}>
                <WorkSearchBar setQuery={handleQuery} />
            </div>
            <div>
                <br/>
                {query && <MovePage page={page} lastPage={lastPage} setPage={setPage}/>}
                <br/>
                {query ? <WorkbookSearchResult key={query} query={query} page={page}/> : <WorkbookSearchInit />}
                <br/><br/>
                {query && <MovePage page={page} lastPage={lastPage} setPage={setPage}/>}
                <br/><br/>
            </div>
        </div>
    );
}

export default WorkbookSearch;