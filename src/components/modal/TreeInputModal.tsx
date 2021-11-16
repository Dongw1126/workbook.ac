import React, { useState } from 'react';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import AlertModal from "./AlertModal";
import useDialog from '../../hooks/useDialog';

import selectedNodeStore from "../../stores/SelectedNodeStore";
import problemListStore from "../../stores/ProblemListStore";

import * as Constants from "../../constants";

interface Props {
    inputTitle: string;
    inputLabel: string;
    open: boolean;
    onClose: () => void;
    eventCode: number;
}

/**
 * 폴더 이름 입력 Modal 창
 */
function TreeInputModal(props: Props) {
    const problemList = problemListStore;
    const selectedNode = selectedNodeStore;

    const [inputText, setInputText] = useState("");
    const [alertOpen, handleAlertOpen, handleAlertClose] = useDialog();

    const handleClose = () => {
        props.onClose();
        setInputText("");
    };

    const handleFolderLimit = () => {
        console.log("handleFolderLimit call");

        handleClose();
        handleAlertOpen();
    }

    const handleEvent = () => {
        if (props.eventCode === Constants.ADD_FOLDER) {
            const id = problemList.addFolder(inputText, selectedNode.node);
            if(id === -1) {
                handleFolderLimit();
            }
        } else if (props.eventCode === Constants.EDIT_FOLDER) {
            problemList.editFolderName(inputText, selectedNode.node);
        }
        handleClose();
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={props.open} >
                <DialogTitle>{props.inputTitle}</DialogTitle>
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
                                setInputText(ev.value);
                            }
                        }}
                        inputProps={{
                            maxLength: Constants.MAX_FOLDER_NAME,
                        }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label={props.inputLabel}
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
                content="폴더는 최대 50개까지 생성 가능합니다!"
                open={alertOpen} 
                onClose={handleAlertClose}
            />
        </div>
    );
}

export default TreeInputModal;
