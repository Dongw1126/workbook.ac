import React from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

interface Props {
    open: boolean;
    onClose: () => void;
}


function AddFolderModal(props: Props) {
    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog onClose={handleClose} open={props.open}>
            <DialogTitle>폴더 추가</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="폴더 이름"
                type='text'
                fullWidth
                variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button>추가</Button>
                <Button onClick={handleClose}>취소</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddFolderModal;
