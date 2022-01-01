import React, { useState } from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import { myPageChangeFlag } from "../../stores/DataChangeFlagStore";
import useDialog from '../../hooks/useDialog';
import UserStore from '../../stores/UserStore';

import * as Constants from "../../constants";

import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB, TreeDataDB } from "../../models";

interface Props {
    username: string;
    open: boolean;
    onClose: () => void;
}

/**
 * 문제집 생성 - 타이틀 입력 Modal 창
 */
function WorkbookCreateModal(props: Props) {
    const userStore = UserStore;
    const dataChangeFlag = myPageChangeFlag;
    const [title, setTitle] = useState("");
    const [alertOpen, handleAlertOpen, handleAlertClose] = useDialog();

    const createWorkbook = async (_title: string) => {
        const wb = await DataStore.save(
            new WorkbookDB({
                "title": _title,
                "author": props.username,
                "favorite": 0,
                "image": Constants.DEFAULT_COVER_IMAGE_KEY,
                "treeDataId": ""
            })
        );

        const td = await DataStore.save(
            new TreeDataDB({
                "treeData":  "[]",
                "workbookId": ""
            })
        );

        return [wb, td];
    }

    const updateId = async (created: any) => {
        const wb = created[0] as WorkbookDB;
        const td = created[1] as TreeDataDB;
        await DataStore.save(WorkbookDB.copyOf(wb, item => {
            item.treeDataId = td.id;
        }));

        await DataStore.save(TreeDataDB.copyOf(td, item => {
            item.workbookId = wb.id;
        }));
    }

    const handleClose = () => {
        props.onClose();
        console.log("handleClose call");
        setTitle("");
    };
    
    const handleEvent = () => {
        if (userStore.checkUsername(props.username)) {
            createWorkbook(title)
                .then((res) => updateId(res))
                .then(() => dataChangeFlag.effect())
                .catch(() => alert("문제집 생성 중 오류가 발생했습니다."));
        }
        
        handleClose();
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={props.open} >
                <DialogTitle>문제집 생성</DialogTitle>
                <DialogContent>
                    <TextField
                        InputProps={{
                            onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                                if (event.key === 'Enter') {
                                    handleEvent();
                                }
                            },
                            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                let ev = event.target as HTMLInputElement;
                                setTitle(ev.value);
                            }
                        }}
                        inputProps={{
                            maxLength: Constants.MAX_FOLDER_NAME,
                        }}
                        autoFocus
                        margin="dense"
                        label="문제집 제목"
                        type='text'
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleEvent}>추가</Button>
                    <Button variant="outlined" onClick={handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default WorkbookCreateModal;
