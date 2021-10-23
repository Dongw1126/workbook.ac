import React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from "@mui/material";

function SearchComponent() {
    return(
        <div>
            <Box>
                <TextField fullWidth
                    InputProps={{
                        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                            if(event.key == 'Enter') {
                                console.log('fire');
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
                Hello
            </Box>
        </div>
    );
}

export default SearchComponent;

