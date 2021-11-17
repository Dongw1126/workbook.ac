import React, { useState } from "react";

import usePage from "../hooks/usePage";
import MovePage from "./search/MovePage";
import SearchBar from "./search/SearchBar";
import SearchResult from "./search/ProblemSearchResult";

/**
 * parentQuery를 SearchBar에 넘겨주어 검색 시 query를 업데이트하고
 * query를 SearchResult 에 넘겨주어 검색 결과 출력
 */
function SearchComponent() {
    const [query, setQuery] = useState('');
    const [page, lastPage, setPage, setLastPage] = usePage();
    const handleQuery = (str: string) => {
        setPage(1);
        setQuery(str);
    }
    
    return(
        <div>
            <SearchBar setQuery={handleQuery} />
            {query && <MovePage key={page} page={page} lastPage={lastPage} setPage={setPage}/>}
            <div style={{ overflow:"auto", height:"490px" }}>
                <SearchResult key={query} query={query} page={page} lastPage={lastPage} setLastPage={setLastPage} />
            </div>
        </div>
    );
}

export default SearchComponent;

