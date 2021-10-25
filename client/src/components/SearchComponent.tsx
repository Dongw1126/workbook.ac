import React, { useState } from "react";
import SearchBar from "./search/SearchBar";
import SearchResult from "./search/SearchResult";
import Box from '@mui/material/Box';

function SearchComponent() {
    const [query, setQuery] = useState('');
    function parentQuery(str: string) {
        setQuery(str);
    }
    
    return(
        <div>
            <SearchBar setQuery={parentQuery}/>
            <Box>
                <SearchResult query={query} />
            </Box>
        </div>
    );
}

export default SearchComponent;

