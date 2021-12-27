import React, { useEffect, useState } from 'react';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import PrevPageIcon from '@mui/icons-material/KeyboardArrowLeft';
import NextPageIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';


interface Props {
    page: number
    setPage: React.Dispatch<any>
    lastPage: number
}

function MovePageInWorkbook(props: Props) {
    const handleMovePage = (_movePage: number) => {
        window.scrollTo(0, 0);
        props.setPage(_movePage);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <IconButton disabled={props.page === 0}
                onClick={() => {
                    handleMovePage(0);
                }}>
                <FirstPageIcon />
            </IconButton>
            <IconButton disabled={props.page === 0}
                onClick={() => {
                    handleMovePage(props.page - 1);
                }}>
                <PrevPageIcon />
            </IconButton>

            <TextField key={props.page}
                variant="standard" type="text" margin="none" size="small" defaultValue={props.page + 1}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'center' } }}
                style={{ width: "10%", height: "10%", marginTop: "8px" }}
                InputProps={{
                    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                            const ev = event.target as HTMLInputElement;
                            let inputPage = Number(ev.value);
                            
                            if(!isNaN(inputPage)) {
                                inputPage = Math.max(inputPage, 1);
                                // inputPage = Math.min(inputPage, props.lastPage);
                                handleMovePage(inputPage - 1);
                            }
                        }
                    }
                }}/>

            <IconButton 
                onClick={() => {
                    // disabled={props.lastPage <= props.page}
                    handleMovePage(props.page + 1);
                }}>
                <NextPageIcon />
            </IconButton>
            <IconButton
                onClick={() => {
                    handleMovePage(props.lastPage);
                }}>
                <LastPageIcon />
            </IconButton>
        </div>
    );
}

export default MovePageInWorkbook;