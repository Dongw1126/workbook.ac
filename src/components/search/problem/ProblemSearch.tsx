import React, { useState } from "react";

import usePage from "../../../hooks/usePage";
import MovePage from "./MovePageInProblem";
import ProblemSearchBar from "./ProblemSearchBar";
import ProblemSearchResult from "./ProblemSearchResult";

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
            <ProblemSearchBar setQuery={handleQuery} />
            {query && <MovePage key={page} page={page} lastPage={lastPage} setPage={setPage}/>}
            <div style={{ overflow:"auto", height:"65vh" }}>
                <ProblemSearchResult key={query} query={query} page={page} setLastPage={setLastPage} />
            </div>
        </div>
    );
}

export default SearchComponent;

