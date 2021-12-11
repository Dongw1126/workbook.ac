import React, { useState } from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import AlertModal from "./AlertModal";
import useDialog from '../../hooks/useDialog';

import * as Constants from "../../constants";

import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB, TreeDataDB } from "../../models";

interface Props {
    username: string;
    createFlag: number;
    setCreateFlag: any;
    open: boolean;
    onClose: () => void;
}

/**
 * 폴더 이름 입력 Modal 창
 */
function WorkbookCreateModal(props: Props) {
    const [title, setTitle] = useState("");
    const [alertOpen, handleAlertOpen, handleAlertClose] = useDialog();

    const createWorkbook = async (_title: string) => {
        const wb = await DataStore.save(
            new WorkbookDB({
                "title": _title,
                "author": props.username,
                "favorite": 0,
                "image": "",
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

    const handleWorkbookLimit = () => {
        console.log("handleFolderLimit call");

        handleClose();
        handleAlertOpen();
    }

    const handleEvent = () => {
        createWorkbook(title)
            .then((res) => updateId(res))
            .then(() => props.setCreateFlag((props.createFlag + 1) % 10))
            .catch(() => alert("문제집 생성 중 오류가 발생했습니다."));
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
            <AlertModal
                title="알림"
                content="문제집은 최대 50개까지 생성 가능합니다!"
                open={alertOpen} 
                onClose={handleAlertClose}
            />
        </div>
    );
}

export default WorkbookCreateModal;
