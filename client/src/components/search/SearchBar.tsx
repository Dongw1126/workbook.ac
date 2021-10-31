import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from "@mui/material";

interface Props {
    setQuery: (parm: string) => void;
}

function SearchBar(props: Props) {
    const [inputText, setInputText] = useState("");
    return (
        <Box sx={{ mb: 2 }}>
            <TextField fullWidth
                InputProps={{
                    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {                   
                            props.setQuery(inputText);
                        }
                    },
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        let ev = event.target as HTMLInputElement;
                        setInputText(ev.value);
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton sx={{ p: 0 }} onClick={(event) => {
                                props.setQuery(inputText);
                            }}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    style: { fontFamily: 'Pretendard' }
                }}
                id="outlined-search"
                label=""
                variant="outlined"
            />
        </Box>
    );
}

export default SearchBar;
