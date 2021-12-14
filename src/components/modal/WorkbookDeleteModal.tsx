import React, { useCallback, useEffect } from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import UserStore from "../../stores/UserStore";
import DataChangeFlag from "../../stores/DataChangeFlagStore";

import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB, TreeDataDB } from "../../models";


interface Props {
    deleteTitle: string;
    data: WorkbookDB;
    open: boolean;
    onClose: () => void;
}

const deleteWorkbook = async (wb: WorkbookDB) => {
    const td = await DataStore.query(TreeDataDB, wb.treeDataId!);

    DataStore.delete(wb);
    DataStore.delete(td!);
}

/**
 * 문제집 삭제 확인 Modal 창
 */
function WorkbookDeleteModal(props: Props) {
    const userStore = UserStore;
    const dataChangeFlag = DataChangeFlag;

    const handleDelete = useCallback(() => {
        if (userStore.getUser().username == props.data.author) {
            deleteWorkbook(props.data)
                .then(() => dataChangeFlag.effect())
                .catch(() => alert("문제집 삭제 중 오류가 발생했습니다."));
        }
        props.onClose();
    }, [userStore.getUser().username]);

    return(
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>{props.deleteTitle}</DialogTitle>
            <DialogContent>
                정말 "{props.data.title}"(을)를 삭제하시겠습니까?
            </DialogContent> 
            <DialogActions>
                <Button style={{ backgroundColor: '#DC143C' }} variant="contained" onClick={handleDelete}>삭제</Button>
                <Button autoFocus variant="outlined" onClick={props.onClose}>취소</Button>
            </DialogActions>
        </Dialog>
    );
}

export default WorkbookDeleteModal;