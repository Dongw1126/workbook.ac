import React, { useState } from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import { myPageChangeFlag } from "../../stores/DataChangeFlagStore";
import * as Constants from "../../constants";

import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB } from "../../models";

interface Props {
    id: string;
    title: string;
    open: boolean;
    onClose: () => void;
}

/**
 * 문제집 제목 수정 Modal 창
 */
function WorkbookCreateModal(props: Props) {
    const dataChangeFlag = myPageChangeFlag;
    const [title, setTitle] = useState(props.title);

    const fetchData = async (_id: string) => {
        const wb = await DataStore.query(WorkbookDB, _id);
        return wb;
    }

    const updateTitle = async (res: WorkbookDB, _title: string) => {
        await DataStore.save(WorkbookDB.copyOf(res, item => {
            item.title = _title
        }));
    }

    const handleClose = () => {
        props.onClose();
        console.log("handleClose call");
        setTitle(props.title);
    };

    const handleEvent = () => {
        fetchData(props.id)
            .then((res) => updateTitle(res!, title))
            .then(() => dataChangeFlag.effect())
            .catch(() => alert("이름 변경 중 오류가 발생했습니다."));
        handleClose();
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
                                setTitle(ev.value);
                            }
                        }}
                        inputProps={{
                            maxLength: Constants.MAX_WORKBOOK_NAME,
                        }}
                        autoFocus
                        margin="dense"
                        label="문제집 제목"
                        defaultValue={props.title}
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

export default WorkbookCreateModal;
