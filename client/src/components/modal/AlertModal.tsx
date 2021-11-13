import React from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';


interface Props {
    title: string;
    content: string;
    open: boolean;
    onClose: () => void;
}

/**
 * 알림창 Modal 창
 */
function AlertModal(props: Props) {
    return(
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {props.content}
            </DialogContent> 
            <DialogActions>
                <Button variant="outlined" onClick={props.onClose}>확인</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertModal;