import React, { useCallback, useEffect } from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import UserStore from "../../stores/UserStore";
import { myPageChangeFlag } from "../../stores/DataChangeFlagStore";
import * as Constants from "../../constants";

import { Storage } from "aws-amplify";
import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB, TreeDataDB, FavoriteDB } from "../../models";


interface Props {
    deleteTitle: string;
    data: WorkbookDB;
    open: boolean;
    onClose: () => void;
}

/**
 * 문제집 삭제 확인 Modal 창
 */
function WorkbookDeleteModal(props: Props) {
    const userStore = UserStore;
    const dataChangeFlag = myPageChangeFlag;

    const deleteWorkbook = async (wb: WorkbookDB) => {
        const td = await DataStore.query(TreeDataDB, wb.treeDataId!);
    
        // s3 삭제
        if ((typeof props.data.image != "undefined") && (props.data.image != Constants.DEFAULT_COVER_IMAGE_KEY)) {
            await Storage.remove(props.data.image);
        }
        
        await DataStore.delete(wb);
        await DataStore.delete(td!);
        await DataStore.delete(FavoriteDB, c => c.workbookId("eq", wb.id));
    }

    const handleDelete = useCallback(() => {
        if (userStore.checkUsername(props.data.author)) {
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