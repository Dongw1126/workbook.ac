import React from 'react';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';

import problemListStore from "../../stores/ProblemListStore";

interface Props {
    deleteTitle: string;
    node?: NodeModel;
    open: boolean;
    onClose: () => void;
}

function DeleteModal(props: Props) {
    const problemList = problemListStore;

    const handleDelete = () => {
        if(typeof props.node !== 'undefined') {
            problemList.deleteNode(props.node);
        }
        props.onClose();
    };

    return(
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>{props.deleteTitle}</DialogTitle>
            <DialogContent>
                정말 "{props.node?.text}"(을)를 삭제하시겠습니까?
            </DialogContent> 
            <DialogActions>
                <Button style={{ backgroundColor: '#DC143C' }} variant="contained" onClick={handleDelete}>삭제</Button>
                <Button autoFocus variant="outlined" onClick={props.onClose}>취소</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteModal;