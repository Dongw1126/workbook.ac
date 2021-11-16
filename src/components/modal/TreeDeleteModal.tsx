import React from 'react';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';

import selectedNodeStore from "../../stores/SelectedNodeStore";
import problemListStore from "../../stores/ProblemListStore";

interface Props {
    deleteTitle: string;
    open: boolean;
    onClose: () => void;
}

/**
 * 삭제 확인 Modal 창
 */
function DeleteModal(props: Props) {
    const problemList = problemListStore;
    const selectedNode = selectedNodeStore;

    const handleDelete = () => {
        if(typeof selectedNode.node !== 'undefined') {
            problemList.deleteNode(selectedNode.node);
            selectedNode.setNode(undefined);
        }
        props.onClose();
    };

    return(
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>{props.deleteTitle}</DialogTitle>
            <DialogContent>
                정말 "{selectedNode.node?.text}"(을)를 삭제하시겠습니까?
            </DialogContent> 
            <DialogActions>
                <Button style={{ backgroundColor: '#DC143C' }} variant="contained" onClick={handleDelete}>삭제</Button>
                <Button autoFocus variant="outlined" onClick={props.onClose}>취소</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteModal;