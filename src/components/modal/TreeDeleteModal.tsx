import React, { useEffect, useState } from 'react';
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
function TreeDeleteModal(props: Props) {
    const problemList = problemListStore;
    const selectedNode = selectedNodeStore;
    const [name, setName] = useState("");

    // node가 삭제되면서 Modal 내용에 즉시 반영되는 것 방지
    useEffect(() => {
        if(selectedNode.node) {
            setName(selectedNode.node ? selectedNode.node.text : "");
        }
    }, [selectedNode.node]);

    const handleDelete = () => {
        if(typeof selectedNode.node !== 'undefined') {
            problemList.deleteNode(selectedNode.node);
        }
        props.onClose();
        selectedNode.setNode(undefined);
    };

    return(
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>{props.deleteTitle}</DialogTitle>
            <DialogContent>
                정말 "{name}"(을)를 삭제하시겠습니까?
            </DialogContent> 
            <DialogActions>
                <Button style={{ backgroundColor: '#DC143C' }} variant="contained" onClick={handleDelete}>삭제</Button>
                <Button autoFocus variant="outlined" onClick={props.onClose}>취소</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TreeDeleteModal;