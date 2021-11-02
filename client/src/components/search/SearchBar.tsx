import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from "@mui/material";
import TextField from '@mui/material/TextField';;

interface Props {
    setQuery: (parm: string) => void;
}

/**
 * 검색 창 컴포넌트
 * props.setQuery 는 SearchComponent 에서 넘어옴
 */
function SearchBar(props: Props) {
    const [inputText, setInputText] = useState("");
    return (
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
    );
}

export default SearchBar;
