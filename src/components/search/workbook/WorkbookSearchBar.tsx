import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from "@mui/material";
import TextField from '@mui/material/TextField';
import * as Constants from "../../../constants";

interface Props {
    setQuery: (parm: string) => void;
}

/**
 * 검색 창 컴포넌트
 * props.setQuery 는 상위 컴포넌트 에서 넘어옴
 */
function WorkbookSearchBar(props: Props) {
    const [inputText, setInputText] = useState("");
    return (
        <TextField fullWidth
            sx={{ width: "60%" ,borderRadius: 10, boxShadow: 4, padding: 1.5, marginTop: 7, marginBottom: 4}}
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
                    <InputAdornment position="start" sx={{ marginLeft: 1.2 }}>
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
                disableUnderline: true,
                style: { fontFamily: 'Pretendard', fontSize: "1.2rem" }
            }}
            inputProps={{
                maxLength: Constants.MAX_SEARCH_LENGTH,
            }}
            id="standard-search"
            label=""
            variant="standard"
            autoComplete="off"
            />
    );
}

export default WorkbookSearchBar;
