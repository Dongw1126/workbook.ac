import React from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

interface Props {
    inputTitle: string;
    inputLabel: string;
    open: boolean;
    onClose: () => void;
}


function InputModal(props: Props) {
    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog onClose={handleClose} open={props.open} >
            <DialogTitle>{props.inputTitle}</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={props.inputLabel}
                type='text'
                fullWidth
                variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>추가</Button>
                <Button variant="outlined" onClick={handleClose}>취소</Button>
            </DialogActions>
        </Dialog>
    );
}

export default InputModal;
