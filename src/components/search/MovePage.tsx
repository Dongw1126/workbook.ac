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
    lastPage?: number
}

function MovePage(props: Props) {
    return (
        <div>
            <IconButton>
                <FirstPageIcon />
            </IconButton>
            <IconButton>
                <PrevPageIcon />
            </IconButton>

            <TextField variant="standard" type="text" margin="none" size="small" defaultValue={props.page}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'center' }}}
            style={{ width:"10%", height:"10%", marginTop: "1%"}} />

            <IconButton>
                <NextPageIcon />
            </IconButton>
            <IconButton>
                <LastPageIcon />
            </IconButton>
        </div>
    );
}

export default MovePage;