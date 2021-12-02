import React, { useEffect, useState } from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';


interface Props {
    deleteTitle: string;
    name: string;
    open: boolean;
    onClose: () => void;
}

/**
 * 삭제 확인 Modal 창
 */
function WorkbookDeleteModal(props: Props) {
    const handleDelete = () => {
        props.onClose();
    };

    return(
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>{props.deleteTitle}</DialogTitle>
            <DialogContent>
                정말 "{props.name}"(을)를 삭제하시겠습니까?
            </DialogContent> 
            <DialogActions>
                <Button style={{ backgroundColor: '#DC143C' }} variant="contained" onClick={handleDelete}>삭제</Button>
                <Button autoFocus variant="outlined" onClick={props.onClose}>취소</Button>
            </DialogActions>
        </Dialog>
    );
}

export default WorkbookDeleteModal;