import React, { useState } from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import TitleStore from "../../stores/TitleStore";
import * as Constants from "../../constants";

interface Props {
    open: boolean;
    onClose: () => void;
}

/**
 * Title 이름 입력 Modal 창
 */
function TreeInputModal(props: Props) {
    const [inputText, setInputText] = useState("");
    const problemTreeTitle = TitleStore;

    const handleClose = () => {
        props.onClose();
        setInputText("");
    };

    const handleEvent = () => {
        if(inputText.length !== 0) {
            problemTreeTitle.title = inputText;
            handleClose();
        }
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={props.open} >
                <DialogTitle>문제집 이름 바꾸기</DialogTitle>
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
                            maxLength: Constants.MAX_WORKBOOK_NAME,
                        }}
                        autoFocus
                        margin="dense"
                        label="문제집 이름"
                        type='text'
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleEvent}>변경</Button>
                    <Button variant="outlined" onClick={handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TreeInputModal;
