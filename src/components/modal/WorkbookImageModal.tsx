import React, { useState } from 'react';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import { Input } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { myPageChangeFlag } from "../../stores/DataChangeFlagStore";
import * as Constants from "../../constants";

import { Storage } from "aws-amplify";
import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB } from "../../models";

interface Props {
    open: boolean;
    onClose: () => void;
}

const fileValidation = (_file: any) => {
    console.log(_file);
}

const fileUploadS3 = async (e: any) => {
    const file = e.target.files[0];
    fileValidation(file);
    /*try {
        await Storage.put(file.name, file, {
            contentType: "image/png", // contentType is optional
        });
    } catch (error) {
        alert("파일 업로드 오류");
        console.log("Error uploading file: ", error);
    }*/
}

/**
 * 문제집 표지 수정 Modal 창
 */
function WorkbookImageModal(props: Props) {
    const dataChangeFlag = myPageChangeFlag;

    const handleClose = () => {
        props.onClose();
    };

    const handleEvent = () => {
        
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={props.open} >
                <DialogTitle>문제집 표지 바꾸기</DialogTitle>
                <DialogContent>
                    <Input type="file" inputProps={{ accept: '.gif, .jpg, .png'}} onChange={fileUploadS3}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleEvent}>변경</Button>
                    <Button variant="outlined" onClick={handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default WorkbookImageModal;
