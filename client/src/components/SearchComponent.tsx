import React, { useState } from "react";
import SearchBar from "./search/SearchBar";
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
                {query}
            </Box>
        </div>
    );
}

export default SearchComponent;

