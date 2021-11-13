import React, { useState } from "react";
import SearchBar from "./search/SearchBar";
import SearchResult from "./search/SearchResult";

/**
 * parentQuery를 SearchBar에 넘겨주어 검색 시 query를 업데이트하고
 * query를 SearchResult 에 넘겨주어 검색 결과 출력
 */
function SearchComponent() {
    const [query, setQuery] = useState('');
    function parentQuery(str: string) {
        setQuery(str);
    }
    
    return(
        <div>
            <SearchBar setQuery={parentQuery} />
            <div style={{overflow:"auto", height:"70vh", marginTop: 5}}>
                <SearchResult query={query} />
            </div>
        </div>
    );
}

export default SearchComponent;

