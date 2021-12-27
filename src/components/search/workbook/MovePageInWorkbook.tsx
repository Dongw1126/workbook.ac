import React from 'react';
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
    return (
        <div style={{ textAlign: "center" }}>
            <IconButton disabled={props.page === 0}
                onClick={() => {
                    props.setPage(0);
                }}>
                <FirstPageIcon />
            </IconButton>
            <IconButton disabled={props.page === 0}
                onClick={() => {
                    props.setPage(props.page - 1);
                }}>
                <PrevPageIcon />
            </IconButton>

            <TextField variant="standard" type="text" margin="none" size="small" defaultValue={props.page + 1}
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
                                props.setPage(inputPage - 1);
                            }
                        }
                    }
                }}/>

            <IconButton 
                onClick={() => {
                    // disabled={props.lastPage <= props.page}
                    props.setPage(props.page + 1);
                }}>
                <NextPageIcon />
            </IconButton>
            <IconButton
                onClick={() => {
                    props.setPage(props.lastPage);
                }}>
                <LastPageIcon />
            </IconButton>
        </div>
    );
}

export default MovePageInWorkbook;