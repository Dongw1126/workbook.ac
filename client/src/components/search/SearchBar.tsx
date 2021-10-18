import React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from "@mui/material";

function SearchBar() {
    return (
        <Box>
            <TextField fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton sx={{p:0}}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                id="outlined-search"
                label=""
                type="search"
            />
        </Box>
    );
}

export default SearchBar;
