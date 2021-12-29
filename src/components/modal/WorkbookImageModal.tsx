import React, { useState } from 'react';
import { v1 } from 'uuid';
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material';
import { Input } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import { myPageChangeFlag } from "../../stores/DataChangeFlagStore";
import * as Constants from "../../constants";

import { Storage } from "aws-amplify";
import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB } from "../../models";


interface Props {
    data: WorkbookDB;
    open: boolean;
    onClose: () => void;
}

/**
 * 문제집 표지 수정 Modal 창
 */
function WorkbookImageModal(props: Props) {
    const dataChangeFlag = myPageChangeFlag;

    const [currFile, setCurrFile] = useState<any>(null);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState("파일이 없으면 기본 이미지로 대체됩니다.");

    const fileValidation = (_file: any) => {
        console.log(_file);
        if (typeof _file === "undefined") {
            setCurrFile(null);
            setError(false);
            setErrMsg("파일이 없으면 기본 이미지로 대체됩니다.");
        } else if (!_file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            setCurrFile(null);
            setError(true);
            setErrMsg("이미지가 아닙니다. (jpg, jpeg, png, gif)");
        } else if (_file.size > Constants.COVER_IMAGE_SIZE_LIMIT) {
            setCurrFile(null);
            setError(true);
            setErrMsg("파일이 너무 큽니다. (300KB 초과)");   
        } else {
            // 정상 파일 업로드
            setCurrFile(_file);
            setError(false);
            setErrMsg("");
        }
    }

    const handleFileOnChange = (e: any) => {
        const file = e.target.files[0];
        fileValidation(file);
    }
    
    const fileUploadS3 = async () => {
        if(!error) {
            let s3Key: string;

            if(currFile) {
                // console.log("clicked with file");
                const newKey = Constants.COVER_IMAGE_PATH + v1();
                const result = await Storage.put(newKey, currFile);
                s3Key = result.key;
            } else {
                // console.log("clicked with null");
                s3Key = Constants.DEFAULT_COVER_IMAGE_KEY;
            }

            // 이미 이미지가 있는 경우 삭제
            if ((typeof props.data.image != "undefined") && (props.data.image != Constants.DEFAULT_COVER_IMAGE_KEY)) {
                await Storage.remove(props.data.image);
            }

            await DataStore.save(WorkbookDB.copyOf(props.data, item => {
                item.image = s3Key;
            }));
        }
        /*try {
            await Storage.put(file.name, file, {
                contentType: "image/png", // contentType is optional
            });
        } catch (error) {
            alert("파일 업로드 오류");
            console.log("Error uploading file: ", error);
        }*/
    }


    const handleClose = () => {
        props.onClose();
    };

    const handleEvent = () => {
        fileUploadS3()
            .then(() => dataChangeFlag.effect())
            .catch(() => alert("표지 변경 중 오류가 발생했습니다."));
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={props.open} >
                <DialogTitle>문제집 표지 바꾸기</DialogTitle>
                <DialogContent>
                    <FormControl error={error}>
                        <Input 
                            type="file" 
                            inputProps={{ accept: '.gif, .jpg, .jpeg, .png'}} 
                            onChange={handleFileOnChange}
                        />
                        <FormHelperText>{errMsg}</FormHelperText>
                    </FormControl>
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
