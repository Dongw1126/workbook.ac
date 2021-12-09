import React, { useState } from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import AlertModal from "./AlertModal";
import useDialog from '../../hooks/useDialog';

import * as Constants from "../../constants";

interface Props {
    open: boolean;
    onClose: () => void;
}

/**
 * 폴더 이름 입력 Modal 창
 */
function WorkbookCreateModal(props: Props) {
    const [title, setTitle] = useState("");
    const [alertOpen, handleAlertOpen, handleAlertClose] = useDialog();

    const handleClose = () => {
        props.onClose();
        setTitle("");
    };

    const handleWorkbookLimit = () => {
        console.log("handleFolderLimit call");

        handleClose();
        handleAlertOpen();
    }

    const handleEvent = () => {

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
