import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from "@mui/material";


function SearchComponent() {
    const [text, setText] = useState('');

    return(
        <div>
            <Box>
                <TextField fullWidth
                    InputProps={{
                        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                            if(event.key == 'Enter') {  
                                let ev = event.target as HTMLInputElement;
                                if(ev){
                                    setText(ev.value);
                                }
                            }
                        },
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
                        ),
                        style: {fontFamily: 'Pretendard'}
                    }}
                    id="outlined-search"
                    label=""
                    variant="outlined"
                />
            </Box>
            <Box>
                {text}
            </Box>
        </div>
    );
}

export default SearchComponent;

