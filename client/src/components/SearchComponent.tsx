import React, { useState } from "react";
import SearchBar from "./search/SearchBar";
import SearchResult from "./search/SearchResult";

function SearchComponent() {
    const [query, setQuery] = useState('');
    function parentQuery(str: string) {
        setQuery(str);
    }
    
    return(
        <div>
            <SearchBar setQuery={parentQuery} />
            <div style={{overflowY:"scroll", height:"500px"}}>
                <SearchResult query={query} />
            </div>
        </div>
    );
}

export default SearchComponent;

