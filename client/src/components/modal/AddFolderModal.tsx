import React, { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

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
            <DialogTitle>Add</DialogTitle>
        </Dialog>
    );
}

export default AddFolderModal;
